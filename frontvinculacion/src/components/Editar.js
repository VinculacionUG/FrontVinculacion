import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from './AppContext';

const Editar = ({ navigation, route }) => {
  // Obtener los datos existentes de la ruta
  const { edificio } = route.params;
  //const { nombre, fecha, direccion: direccionExistente, zip: zipExistente, otrasIdentificaciones: otrasIdentificacionesExistente, uso: usoExistente, latitud: latitudExistente, longitud: longitudExistente, inspector: inspectorExistente, hora: horaExistente } = edificio;
  const { direccion: direccionExistente, codigoPostal: zipExistente, otrosIdentificaciones: otrasIdentificacionesExistente, 
    nomEdificacion: nomEdificacionExistente, codTipoUsoEdificacion: usoExistente, nomEncuestador: inspectorExistente,           
    latitud: latitudExistente, longitud: longitudExistente, fechaEncuesta: fechaExistente, horaEncuesta: horaExistente
  } = edificio;

      const {
        adjuntarFotografica,
        setAdjuntarFotografica,
        adjuntarGrafico,
        setAdjuntarGrafico,
        /*
        direccion,
        setDireccion,
        zip,
        setZip,
        otrasIdentificaciones,
        setOtrasIdentificaciones,
        nombreEdificio,
        setNombreEdificio,
        uso,
        setUso,
        latitud,
        setLatitud,
        longitud,
        setLongitud,
        */       
        //fecha,
        //setFecha,
        //hora,
        //setHora,
        
      } = useContext(AppContext);



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
  const [fecha, setFechaFormulario] = useState(fechaExistente);
  const [hora, setHoraFormulario] = useState(horaExistente);
  const [file1Name, setFile1Name] = useState('');
  const [file2Name, setFile2Name] = useState('');
  const [selectedFile1, setSelectedFile1] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(false);
  

  //const [dateObject, setDateObject] = useState(null);
  //const newDate = new date(fechaExistente);
  //setDateObject(newDate);


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

  const handleNext = () => {
    if (
      !adjuntarFotografica ||
      !adjuntarGrafico ||
      !direccion ||
      !zip ||
      !otrasIdentificaciones ||
      !nombreEdificio ||
      !uso ||
      !latitud ||
      !longitud ||
      !fecha ||
      !hora
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }
    // Aquí puedes guardar los datos o hacer lo necesario antes de navegar
    console.log('Datos guardados:', {
      adjuntarFotografica,
      adjuntarGrafico,
      direccion,
      zip,
      otrasIdentificaciones,
      nombreEdificio,
      uso,
      latitud,
      longitud,
      fecha,
      hora,
    });
    //navigation.navigate('FormularioFema2');
    navigation.navigate('Editar2', { edificio })
  };


  // Funciones para manejar la selección de documentos
  const pickImage = async (setImage) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a las imágenes.');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled && result.assets && result.assets.length > 0 && result.assets[0].base64) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      } else {
        Alert.alert('Error', 'Hubo un problema al seleccionar la imagen. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al seleccionar imagen: ', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar la imagen. Por favor, intenta nuevamente.');
    }
  };

  const getFileNameFromUri = (uri) => {
    if (!uri) return null;
    const uriParts = uri.split('/');
    return uriParts[uriParts.length - 1];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Fotografía:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setAdjuntarFotografica)}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {adjuntarFotografica ? (
              <>
                {/* <Text style={styles.fileNameText}>{adjuntarFotografica}</Text>, */}
                <Text style={styles.fileNameText}>Imagen Seleccionada: </Text>
                <Image source={{ uri: adjuntarFotografica }} style={styles.image} />
              </>
            )  : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Gráfico:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setAdjuntarGrafico)}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {adjuntarGrafico ? (
              <>
                {/* <Text style={styles.fileNameText}>{adjuntarGrafico}</Text> */}
                <Text style={styles.fileNameText}>Gráfico Seleccionado: </Text>
                <Image source={{ uri: adjuntarGrafico }} style={styles.image} />
              </>
            ) : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dirección:</Text>
        <TextInput
          style={[styles.input, { textAlign: 'center', paddingHorizontal: 20 }]}
          value={direccion}
          onChangeText={(text) => setDireccion(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ZIP:</Text>
        <TextInput
          style={styles.inputText}
          value={zip}
          maxLength={6}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setZip(numericValue);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Otras Identificaciones:</Text>
        <TextInput
          style={styles.input}
          value={otrasIdentificaciones}
          onChangeText={(text) => setOtrasIdentificaciones(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre del Edificio:</Text>
        <TextInput
          style={styles.input}
          value={nombreEdificio}
          onChangeText={(text) => setNombreEdificio(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Uso:</Text>
        <TextInput
          style={styles.input}
          value={uso}
          onChangeText={(text) => setUso(text)}
        />
      </View>

      <View style={styles.inputContainerRow}>
        <View style={styles.dateInputContainer}>
          <Text style={styles.inputLabel}>Latitud:</Text>
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={latitud}
            onChangeText={(text) => setLatitud(text)}
          />
        </View>
        <View style={[styles.dateInputContainer, { marginLeft: -50 }]}>
          <Text style={[styles.inputLabel, { marginRight: -30 }]}>Longitud:</Text>
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={longitud}
            onChangeText={(text) => setLongitud(text)}
          />
        </View>
      </View>

      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Fecha:</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="MM"
            maxLength={2}
            keyboardType="numeric"
            value={fecha.month}
            onChangeText={(text) => setFechaFormulario(prevState => ({ ...prevState, month: text }))}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="DD"
            maxLength={2}
            keyboardType="numeric"
            value={fecha.day}
            onChangeText={(text) => setFechaFormulario(prevState => ({ ...prevState, day: text }))}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="AAAA"
            maxLength={4}
            keyboardType="numeric"
            value={fecha.year}
            onChangeText={(text) => setFechaFormulario(prevState => ({ ...prevState, year: text }))}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Hora:</Text>
        <TextInput
          style={styles.inputText}
          value={hora}
          onChangeText={(text) => setHoraFormulario(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleNext}>
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: 'normal',
    marginBottom: 8,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadButton: {
    backgroundColor: 'navy',
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
  },
  fileNameContainer: {
    marginLeft: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  fileNameText: {
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'normal',
    width: 100,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    padding: 0,
    paddingHorizontal: 10,
    marginRight: 2,
  },
  inputText: {
    flex: 0.20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    width: 0,
    padding: 0,
    paddingHorizontal: 10,
    marginRight: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    backgroundColor: 'navy',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    width: 70,
    marginRight: 5,
  },
  dateSeparator: {
    fontSize: 18,
    marginRight: 5,
  },
  inputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Editar;