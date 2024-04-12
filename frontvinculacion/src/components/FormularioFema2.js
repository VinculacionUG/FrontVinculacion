import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import Dropzone from 'react-dropzone';
import { Picker } from '@react-native-picker/picker';

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
      
      {/* Inputs y Select */}
      <TextInput
        style={styles.input}
        placeholder="Número de pisos: Sup:"
        value={numPisos}
        onChangeText={(text) => setNumPisos(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Info:"
        value={info}
        onChangeText={(text) => setInfo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Año Construcción"
        value={anioConstruccion}
        onChangeText={(text) => setAnioConstruccion(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Área total de piso (m2)"
        value={areaTotalPiso}
        onChangeText={(text) => setAreaTotalPiso(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Año código"
        value={anioCodigo}
        onChangeText={(text) => setAnioCodigo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Año de construcción"
        value={anioConstruccion2}
        onChangeText={(text) => setAnioConstruccion2(text)}
      />
      <Picker
        style={styles.input}
        selectedValue={ampliacion}
        onValueChange={(itemValue) => setAmpliacion(itemValue)}
      >
        <Picker.Item label="Ampliación: Sí" value="si" />
        <Picker.Item label="Ampliación: No" value="no" />
        {/* Agrega más opciones según necesites */}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={ocupacion}
        onValueChange={(itemValue) => setOcupacion(itemValue)}
      >
        <Picker.Item label="Ocupación" value="ocupacion1" />
        <Picker.Item label="Ocupación 2" value="ocupacion2" />
        {/* Agrega más opciones según necesites */}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={tipoSuelo}
        onValueChange={(itemValue) => setTipoSuelo(itemValue)}
      >
        <Picker.Item label="Tipo de suelo" value="tipoSuelo1" />
        <Picker.Item label="Tipo de suelo 2" value="tipoSuelo2" />
        {/* Agrega más opciones según necesites */}
      </Picker>

      {/* Área de texto para Comentario */}
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        multiline
        numberOfLines={4}
        value={comentario}
        onChangeText={(text) => setComentario(text)}
      />
      {/* Botones de Navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={() => navigation.goBack()}>
          <Text style={styles.nextButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      </View>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  prevButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 8,
    cursor: 'pointer',
    backgroundColor: 'lightgray',
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 8,
    cursor: 'pointer',
    backgroundColor: 'lightblue',
  },
  nextButtonText: {
    fontSize: 20,
  },
});

export default FormularioFema2;
