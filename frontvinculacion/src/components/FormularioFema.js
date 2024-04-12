import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const FormularioFema = ({ navigation }) => {
  const [direccion, setDireccion] = useState('');
  const [zip, setZip] = useState('');
  const [otrasIdentificaciones, setOtrasIdentificaciones] = useState('');
  const [nombreEdificio, setNombreEdificio] = useState('');
  const [uso, setUso] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [inspector, setInspector] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [file1Name, setFile1Name] = useState('');
  const [file2Name, setFile2Name] = useState('');

  const handleNext = () => {
    // Aquí puedes realizar validaciones o enviar los datos a la siguiente parte del formulario
    // Por ahora, solo navegaré a una pantalla ficticia llamada 'FormularioParte2'
    // navigation.navigate('FormularioParte2');
    navigation.navigate('FormularioFema2', {
      direccion,
      zip,
      otrasIdentificaciones,
      nombreEdificio,
      uso,
      latitud,
      longitud,
      inspector,
      fecha,
      hora,
      file1Name,
      file2Name,
    });
  };

  const handleDocument1 = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg'],
      });
      if (result.assets.length > 0) {
        setFile1Name(result.assets[0].name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocument2 = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg'],
      });
      if (result.assets.length > 0) {
        setFile2Name(result.assets[0].name);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>

      {/* Dos botones para cargar documentos (puedes personalizar según tus necesidades) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.documentButton} onPress={handleDocument1}>
          <Text>Subir Documento 1 (JPG o PDF)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.documentButton} onPress={handleDocument2}>
          <Text>Subir Documento 2 (JPG o PDF)</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrar nombre de los archivos seleccionados */}
      {file1Name !== '' && <Text style={styles.fileName}>Archivo 1: {file1Name}</Text>}
      {file2Name !== '' && <Text style={styles.fileName}>Archivo 2: {file2Name}</Text>}

      {/* Inputs y Select */}
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={(text) => setDireccion(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP"
        value={zip}
        onChangeText={(text) => setZip(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Otras Identificaciones"
        value={otrasIdentificaciones}
        onChangeText={(text) => setOtrasIdentificaciones(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del Edificio"
        value={nombreEdificio}
        onChangeText={(text) => setNombreEdificio(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Uso"
        value={uso}
        onChangeText={(text) => setUso(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitud"
        value={latitud}
        onChangeText={(text) => setLatitud(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitud"
        value={longitud}
        onChangeText={(text) => setLongitud(text)}
      />
      <Picker
        style={styles.input}
        selectedValue={inspector}
        onValueChange={(itemValue) => setInspector(itemValue)}
      >
        <Picker.Item label="Inspector 1" value="inspector1" />
        <Picker.Item label="Inspector 2" value="inspector2" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Fecha (MM/DD/AAAA)"
        value={fecha}
        onChangeText={(text) => setFecha(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora"
        value={hora}
        onChangeText={(text) => setHora(text)}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',  // Cambia el color de fondo según tus preferencias
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  documentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 8,
    cursor: 'pointer',
  },
});

export default FormularioFema;
