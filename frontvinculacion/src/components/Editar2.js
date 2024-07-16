import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const Editar2 = ({ navigation, route }) => {
  // Obtener los datos existentes de la ruta
  const { edificio } = route.params;
  //const { nombre, fecha, direccion: direccionExistente, zip: zipExistente, otrasIdentificaciones: otrasIdentificacionesExistente, uso: usoExistente, latitud: latitudExistente, longitud: longitudExistente, inspector: inspectorExistente, hora: horaExistente } = edificio;
  const { direccion: direccionExistente, codigoPostal: zipExistente, otrosIdentificaciones: otrasIdentificacionesExistente, 
    nomEdificacion: nomEdificacionExistente, codTipoUsoEdificacion: usoExistente, nomEncuestador: inspectorExistente,           
    latitud: latitudExistente, longitud: longitudExistente, fechaEncuesta: fechaExistente, horaEncuesta: horaExistente } = edificio;


  // Establecer los estados con los datos existentes
  const [direccion, setDireccion] = useState(direccionExistente);
  const [zip, setZip] = useState(zipExistente);
  const [otrasIdentificaciones, setOtrasIdentificaciones] = useState(otrasIdentificacionesExistente);
  //const [nombreEdificio, setNombreEdificio] = useState(nombre);
  const [nombreEdificio, setNombreEdificio] = useState(nomEdificacionExistente);
  const [uso, setUso] = useState(usoExistente);
  const [latitud, setLatitud] = useState(latitudExistente);
  const [longitud, setLongitud] = useState(longitudExistente);
  const [inspector, setInspector] = useState(inspectorExistente);
  const [fechaFormulario, setFechaFormulario] = useState(fechaExistente);
  const [horaFormulario, setHoraFormulario] = useState(horaExistente);
  const [file1Name, setFile1Name] = useState('');
  const [file2Name, setFile2Name] = useState('');
  const [selectedFile1, setSelectedFile1] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(false);

  // Función para actualizar los datos
  const handleUpdate = async () => {
    try {
      // Implementación de la lógica para actualizar los datos
      // ...

      // Muestra una notificación de actualización exitosa
      Alert.alert('Actualización exitosa', 'Los datos han sido actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      // Manejar el error de actualización
      Alert.alert('Error', 'Hubo un problema al actualizar los datos. Por favor, inténtalo de nuevo.');
    }
  };

  // Funciones para manejar la selección de documentos
  const handleDocument1 = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg'],
      });
      if (result.assets.length > 0) {
        setFile1Name(result.assets[0].name);
        setSelectedFile1(true);
      }
    } catch (error) {
      console.error('Error al seleccionar documento 1:', error);
      // Manejar el error al seleccionar el documento
      Alert.alert('Error', 'Hubo un problema al seleccionar el documento 1. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDocument2 = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg'],
      });
      if (result.assets.length > 0) {
        setFile2Name(result.assets[0].name);
        setSelectedFile2(true);
      }
    } catch (error) {
      console.error('Error al seleccionar documento 2:', error);
      // Manejar el error al seleccionar el documento
      Alert.alert('Error', 'Hubo un problema al seleccionar el documento 2. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>

      {/* Sección para adjuntar fotografía */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Fotografía</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleDocument1}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          {selectedFile1 ? (
            <Text>{file1Name}</Text>
          ) : (
            <Text>No se eligió ningún archivo</Text>
          )}
        </View>
      </View>

      {/* Sección para adjuntar gráfico */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Gráfico</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleDocument2}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          {selectedFile2 ? (
            <Text>{file2Name}</Text>
          ) : (
            <Text>No se eligió ningún archivo</Text>
          )}
        </View>
      </View>

      {/* Inputs para la información del edificio */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la dirección"
          value={direccion}
          onChangeText={(text) => setDireccion(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ZIP</Text>
        <TextInput
          style={styles.input}
          placeholder="ZIP"
          value={zip}
          onChangeText={(text) => setZip(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Otras Identificaciones</Text>
        <TextInput
          style={styles.input}
          placeholder="Otras Identificaciones"
          value={otrasIdentificaciones}
          onChangeText={(text) => setOtrasIdentificaciones(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre del Edificio</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Edificio"
          value={nombreEdificio}
          onChangeText={(text) => setNombreEdificio(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Uso</Text>
        <TextInput
          style={styles.input}
          placeholder="Uso"
          value={uso}
          onChangeText={(text) => setUso(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Latitud</Text>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Latitud"
          value={latitud}
          onChangeText={(text) => setLatitud(text)}
        />
        <Text style={styles.inputLabel}>Longitud</Text>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Longitud"
          value={longitud}
          onChangeText={(text) => setLongitud(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Inspector</Text>
        <Picker
          style={styles.input}
          selectedValue={inspector}
          onValueChange={(itemValue) => setInspector(itemValue)}
        >
          <Picker.Item label="Inspector 1" value="inspector1" />
          <Picker.Item label="Inspector 2" value="inspector2" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Fecha</Text>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Fecha"
          value={fechaFormulario}
          onChangeText={(text) => setFechaFormulario(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Hora</Text>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Hora"
          value={horaFormulario}
          onChangeText={(text) => setHoraFormulario(text)}
        />
      </View>

      {/* Botón para guardar cambios */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
  },
  smallInput: {
    width: 100,
    marginRight: 10,
  },
});

export default Editar2;




