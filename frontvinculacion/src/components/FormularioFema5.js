import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';

const FormularioFema5 = ({ route, navigation }) => {
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
  } = params;

  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);
  // Estados para los campos del FormularioParte5
  const [accionRequerida, setAccionRequerida] = useState('');
  const [evaluacionDetalladaElementosNoEstructurales, setEvaluacionDetalladaElementosNoEstructurales] = useState('');
  const [inspeccionNivel2, setInspeccionNivel2] = useState('');

  const handleGuardar = () => {
    Alert.alert(
      "¡Formulario guardado con éxito!",
      "",
      [
          {
              text: "Ok",
              onPress: () => navigation.navigate('Dashboard')
          }
      ],
      { cancelable: false }
  );

    /*navigation.navigate('FormularioGuardado', {
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
      accionRequerida,
      evaluacionDetalladaElementosNoEstructurales,
      inspeccionNivel2,
    });*/
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={styles.subtitle}>Acción requerida</Text>

      <Text>¿Se requiere de una evaluación estructural más detallada?</Text>
      <CheckBox
        title="Si, se desconoce el tipo de edificio según FEMA"
        checked={checkBox1}
        onPress={() => setCheckBox1(!checkBox1)}
      />
      <CheckBox
        title="Si, resultado menor que el límite"
        checked={checkBox2}
        onPress={() => setCheckBox2(!checkBox2)}
      />
      <CheckBox
        title="Si, otros peligros presentes"
        checked={checkBox3}
        onPress={() => setCheckBox3(!checkBox3)}
      />
      <CheckBox
        title="No"
        checked={checkBox4}
        onPress={() => setCheckBox4(!checkBox4)}
      />

      <Text>¿Se requiere una evaluación detallada de elementos no estructurales?</Text>
      <Picker
        style={styles.input}
        selectedValue={evaluacionDetalladaElementosNoEstructurales}
        onValueChange={(itemValue) => setEvaluacionDetalladaElementosNoEstructurales(itemValue)}
      >
        <Picker.Item label="Si, hay peligro de caída de elementos" value="siPeligroCaidaElementos" />
        <Picker.Item label="No, existe amenaza de elementos no estructurales y deben ser mitigados, pero la evaluación detallada no es necesaria" value="noAmenazaMitigada" />
        <Picker.Item label="No, no existe peligro de elementos no estructurales" value="noPeligroElementos" />
        <Picker.Item label="No, se sabe" value="noSabe" />
      </Picker>

      <Text>¿Se requiere de una inspección de Nivel 2?</Text>
      <Picker
        style={styles.input}
        selectedValue={inspeccionNivel2}
        onValueChange={(itemValue) => setInspeccionNivel2(itemValue)}
      >
        <Picker.Item label="Si" value="si" />
        <Picker.Item label="No" value="no" />
      </Picker>

      {/* Botones de Navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={() => navigation.goBack()}>
          <Text style={styles.nextButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.guardarButton} onPress={handleGuardar}>
          <Text style={styles.nextButtonText}>Guardar</Text>
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
    marginTop: 16,
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
  guardarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 8,
    cursor: 'pointer',
    backgroundColor: 'green',
  },
  nextButtonText: {
    fontSize: 20,
  },
});

export default FormularioFema5;
