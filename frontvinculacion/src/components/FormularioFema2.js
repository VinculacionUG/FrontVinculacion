import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import Dropzone from 'react-dropzone';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormularioFema2 = ({ route, navigation }) => {
  const [numPisos, setNumPisos] = useState('');
  const [sup, setSup] = useState('');
  const [info, setInfo] = useState('');
  const [anioConstruccion, setAnioConstruccion] = useState('');
  const [areaTotalPiso, setAreaTotalPiso] = useState('');
  const [anioCodigo, setAnioCodigo] = useState('');
  const [anioConstruccion2, setAnioConstruccion2] = useState('');
  const [ampliacion, setAmpliacion] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [tipoSuelo, setTipoSuelo] = useState('');
  const [comentario, setComentario] = useState('');

  // Recibir datos de la pantalla anterior
  const { params } = route;
  const {
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
    files1,
    files2,
  } = params;

  const handleNext = () => {
    // Puedes realizar validaciones o enviar los datos a la siguiente parte del formulario
    // Por ahora, solo navegaré a una pantalla ficticia llamada 'FormularioParte3'
    navigation.navigate('FormularioFema3', {
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
      files1,
      files2,
      numPisos,
      sup,
      info,
      anioConstruccion,
      areaTotalPiso,
      anioCodigo,
      anioConstruccion2,
      ampliacion,
      ocupacion,
      tipoSuelo,
      comentario,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Numero de Pisos: Sup  </Text>
        <Picker
          style={styles.input}
          selectedValue={numPisos}
          onValueChange={(itemValue) => setNumPisos(itemValue)}
        >
          <Picker.Item label="numpiso 1" value="inspector1" />
          <Picker.Item label="numpiso 2" value="inspector2" />
        </Picker>

        <Text style={styles.inputLabel}>Info:  </Text>
        <Picker
          style={styles.input}
          selectedValue={info}
          onValueChange={(itemValue) => setInfo(itemValue)}
        >
          <Picker.Item label="info 1" value="supervisor1" />
          <Picker.Item label="info 2" value="supervisor2" />
        </Picker>
      </View>


  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Año Construcción  </Text>
    <TextInput
      style={styles.input}
      placeholder="Año Construcción"
      value={anioConstruccion}
      onChangeText={(text) => setAnioConstruccion(text)}
    />

    <Text style={styles.inputLabel}>Área total de piso (m2)  </Text>
    <TextInput
      style={styles.input}
      placeholder="Área total de piso (m2)"
      value={areaTotalPiso}
      onChangeText={(text) => setAreaTotalPiso(text)}
    />
  </View>


  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Año de código  </Text>      
    <TextInput
      style={styles.input}
      placeholder="Año de código"
      value={anioCodigo}
      onChangeText={(text) => setAnioCodigo(text)}
    />

    <Text style={styles.inputLabel}>Ampliación  </Text>      
    <Picker
      style={styles.input}
      selectedValue={ampliacion}
      onValueChange={(itemValue) => setAmpliacion(itemValue)}
    >
    <Picker.Item label="Sí" value="si" />
    <Picker.Item label="No" value="no" />
    {/* Agrega más opciones según necesites */}
    </Picker>

    <Text style={styles.inputLabel}>Año de construcción  </Text>      
    <TextInput
      style={styles.input}
      //placeholder="Año de construcción"
      value={anioConstruccion2}
      onChangeText={(text) => setAnioConstruccion2(text)}
    />
  </View>


  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Ocupación  </Text>
    <Picker
      style={styles.input}
      selectedValue={ocupacion}
      onValueChange={(itemValue) => setOcupacion(itemValue)}
    >
      <Picker.Item label="Ocupación 1" value="ocupacion1" />
      <Picker.Item label="Ocupación 2" value="ocupacion2" />
      {/* Agrega más opciones según necesites */}
    </Picker>
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Tipo de suelo  </Text>
      <Picker
        style={styles.input}
        selectedValue={tipoSuelo}
        onValueChange={(itemValue) => setTipoSuelo(itemValue)}
      >
        <Picker.Item label="Tipo de suelo 1" value="tipoSuelo1" />
        <Picker.Item label="Tipo de suelo 2" value="tipoSuelo2" />
        {/* Agrega más opciones según necesites */}
      </Picker>
  </View>

  <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Comentario  </Text>
    {/* Área de texto para Comentario */}
    <TextInput
      style={styles.input}
      placeholder="Comentario"
      multiline
      numberOfLines={4}
      value={comentario}
      onChangeText={(text) => setComentario(text)}
    />

  </View> 
      {/* Botones de Navegación */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        <Text style={styles.ButtonText}>Regresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleNext}>
        <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        <Text style={styles.ButtonText}>Continuar</Text>
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  documentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
  },
  documentButtonText: {
    color: 'black',
  },
  fileName: {
    marginLeft: 8,
    fontStyle: 'italic',
    color: 'gray',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 8,
    marginBottom: 16,
    textAlign: 'center',
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
    borderRadius: 10, // Ajusta este valor para cambiar la ovalidad
  },
  backButton: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
    },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    width: 50,
    marginRight: 5,
  },
  dateSeparator: {
    fontSize: 20,
    marginRight: 5,
  },
  locationInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  smallInput: {
    width: 60,
    marginRight: 10,
  },
  smallInput1: {
    width: 60,
    marginRight: 200,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para distribuir los elementos horizontalmente
  },
  uploadButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
  },
  documentButtonText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },  
    
});

export default FormularioFema2;
