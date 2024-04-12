import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FormularioFema3p2 = ({ route, navigation }) => {
  // Obtener datos de las pantallas anteriores
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
  } = params;

  // Estados para los campos del FormularioParte3
  const [tipoIdentificacionDNK, setTipoIdentificacionDNK] = useState('');
  const [resultadoBase, setResultadoBase] = useState('');
  const [irregularidadVerticalSevera, setIrregularidadVerticalSevera] = useState('');
  const [irregularidadVerticalModerada, setIrregularidadVerticalModerada] = useState('');
  const [plantaIrregular, setPlantaIrregular] = useState('');
  const [preCodigoSismico, setPreCodigoSismico] = useState('');
  const [postCodigoSismico, setPostCodigoSismico] = useState('');
  const [sueloTipoAoB, setSueloTipoAoB] = useState('');
  const [sueloTipoE1_3Pisos, setSueloTipoE1_3Pisos] = useState('');
  const [sueloTipoE_GT3Pisos, setSueloTipoE_GT3Pisos] = useState('');
  const [resultadoMinimoSmin, setResultadoMinimoSmin] = useState('');
  const [resultadoFinalSL1_GT_Smin, setResultadoFinalSL1_GT_Smin] = useState('');

  // Calcular la altura total del contenido
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const screenHeight = Dimensions.get('window').height;
    const totalContentHeight = screenHeight - 50; // Restar la altura del título y botones
    setContentHeight(totalContentHeight);
  }, []);

  const handleNext = () => {
    // Puedes realizar validaciones o enviar los datos a la siguiente parte del formulario
    // Por ahora, solo navegaré a una pantalla ficticia llamada 'FormularioParte4'
    navigation.navigate('FormularioFema4', {
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
      tipoIdentificacionDNK,
      resultadoBase,
      irregularidadVerticalSevera,
      irregularidadVerticalModerada,
      plantaIrregular,
      preCodigoSismico,
      postCodigoSismico,
      sueloTipoAoB,
      sueloTipoE1_3Pisos,
      sueloTipoE_GT3Pisos,
      resultadoMinimoSmin,
      resultadoFinalSL1_GT_Smin,
    });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { minHeight: contentHeight }]}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={styles.subtitle}>Resultado base, modificadores y resultado final del nivel 1 de análisis, SL1</Text>

      <Picker
        style={styles.input}
        selectedValue={sueloTipoE_GT3Pisos}
        onValueChange={(itemValue) => setSueloTipoE_GT3Pisos(itemValue)}
      >
        <Picker.Item label="Suelo tipo E (> 3 pisos): Sup" value="sup" />
        <Picker.Item label="Suelo tipo E (> 3 pisos): Inf" value="inf" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={resultadoMinimoSmin}
        onValueChange={(itemValue) => setResultadoMinimoSmin(itemValue)}
      >
        <Picker.Item label="Resultado mínimo, Smin: Sup" value="sup" />
        <Picker.Item label="Resultado mínimo, Smin: Inf" value="inf" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={resultadoFinalSL1_GT_Smin}
        onValueChange={(itemValue) => setResultadoFinalSL1_GT_Smin(itemValue)}
      >
        <Picker.Item label="Resul. final Nivel 1,SL1 ≥ Smin:Sup" value="sup" />
        <Picker.Item label="Resul. final Nivel 1,SL1 ≥ Smin:Inf" value="inf" />
      </Picker>

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
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 32,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  prevButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 8,
    cursor: 'pointer',
    backgroundColor: 'lightgray',
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 8,
    cursor: 'pointer',
    backgroundColor: 'lightblue',
  },
  nextButtonText: {
    fontSize: 20,
  },
});

export default FormularioFema3p2;
