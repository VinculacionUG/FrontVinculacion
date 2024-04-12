import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';

const FormularioFema4 = ({ route, navigation }) => {
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
  } = params;

  const [revisionExterior, setRevisionExterior] = useState('');
  const [revisionInterior, setRevisionInterior] = useState('');
  const [revisionPlanos, setRevisionPlanos] = useState('');
  const [fuenteTipoSuelo, setFuenteTipoSuelo] = useState('');
  const [fuentePeligrosGeologicos1, setFuentePeligrosGeologicos1] = useState('');
  const [fuentePeligrosGeologicos2, setFuentePeligrosGeologicos2] = useState('');
  const [evaluacionDetallada, setEvaluacionDetallada] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);

  const handleNext = () => {
    navigation.navigate('FormularioFema5', {
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
      revisionExterior,
      revisionInterior,
      revisionPlanos,
      fuenteTipoSuelo,
      fuentePeligrosGeologicos1,
      fuentePeligrosGeologicos2,
      evaluacionDetallada,
      checkBox1,
      checkBox2,
      checkBox3,
      checkBox4,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.title}>Formulario FEMA P-154</Text>
        <Text style={styles.subtitle}>Extensión de la revisión</Text>

        <View style={styles.pickerContainer}>
          <Picker
            style={[styles.input, styles.picker]}
            selectedValue={revisionExterior}
            onValueChange={(itemValue) => setRevisionExterior(itemValue)}
          >
            <Picker.Item label="Exterior" value="exterior" />
          </Picker>

          <Picker
            style={[styles.input, styles.picker]}
            selectedValue={revisionInterior}
            onValueChange={(itemValue) => setRevisionInterior(itemValue)}
          >
            <Picker.Item label="Interior" value="interior" />
          </Picker>

          <Picker
            style={[styles.input, styles.picker]}
            selectedValue={revisionPlanos}
            onValueChange={(itemValue) => setRevisionPlanos(itemValue)}
          >
            <Picker.Item label="Revisión planos: Sí" value="si" />
            <Picker.Item label="Revisión planos: No" value="no" />
          </Picker>
        </View>
      </View>


      <View style={styles.part2}>
        <TextInput
          style={styles.input}
          placeholder="Fuente del tipo de suelo"
          value={fuenteTipoSuelo}
          onChangeText={(text) => setFuenteTipoSuelo(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Fuente de peligros geológicos 1"
          value={fuentePeligrosGeologicos1}
          onChangeText={(text) => setFuentePeligrosGeologicos1(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Fuente de peligros geológicos 2"
          value={fuentePeligrosGeologicos2}
          onChangeText={(text) => setFuentePeligrosGeologicos2(text)}
        />
      </View>

      <View>
        <Text style={styles.subtitle}>Otros Peligros</Text>

        <CheckBox
          title="¿Hay peligros que desencadenan una evaluación estructural detallada?"
          checked={evaluacionDetallada}
          onPress={() => setEvaluacionDetallada(!evaluacionDetallada)}
        />

        <CheckBox
          title="Posible golpeteo entre edificios"
          checked={checkBox1}
          onPress={() => setCheckBox1(!checkBox1)}
        />

        <CheckBox
          title="Riesgo de caída de edificios adyacentes más altos"
          checked={checkBox2}
          onPress={() => setCheckBox2(!checkBox2)}
        />

        <CheckBox
          title="Peligro geológico o Suelo tipo F"
          checked={checkBox3}
          onPress={() => setCheckBox3(!checkBox3)}
        />

        <CheckBox
          title="Daños significativos/deterioro del sistema estructural"
          checked={checkBox4}
          onPress={() => setCheckBox4(!checkBox4)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={() => navigation.goBack()}>
            <Text style={styles.nextButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>→</Text>
          </TouchableOpacity>
        </View>

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
  pickerContainer: {
    justifyContent: 'space-between', 
  }, picker: {
    flex: 1,  
    marginRight: 10,  
  },part2:{
    marginTop:30
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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

export default FormularioFema4;
