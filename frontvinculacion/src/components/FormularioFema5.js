import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [checkBox5, setCheckBox5] = useState(false);
  const [checkBox6, setCheckBox6] = useState(false);
  const [checkBox7, setCheckBox7] = useState(false);
  const [checkBox8, setCheckBox8] = useState(false);
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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={styles.subtitle}>Acción requerida</Text>

      <Text style={[styles.textoRojo, styles.subtitle1]}>
       ¿Se requiere de una evaluación estructural más detallada?
      </Text>
      <CheckBox
        title="Si, se desconoce el tipo de edificio según FEMA"
        checked={checkBox1}
        onPress={() => setCheckBox1(!checkBox1)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />
      <CheckBox
        title="Si, resultado menor que el límite"
        checked={checkBox2}
        onPress={() => setCheckBox2(!checkBox2)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />
      <CheckBox
        title="Si, otros peligros presentes"
        checked={checkBox3}
        onPress={() => setCheckBox3(!checkBox3)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />
      <CheckBox
        title="No"
        checked={checkBox4}
        onPress={() => setCheckBox4(!checkBox4)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />

      <Text style={[styles.textoRojo, styles.subtitle1]}>
         ¿Se requiere una evaluación detallada de elementos no estructurales?
      </Text>
      <CheckBox
        title="Si, hay peligro de caída de elementos"
        checked={checkBox5}
        onPress={() => setCheckBox5(!checkBox5)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />
      <CheckBox
        title="No, existe amenaza de elementos no estructurales y deben ser mitigados, pero la evaluación detallada no es necesaria"
        checked={checkBox6}
        onPress={() => setCheckBox6(!checkBox6)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />
      <CheckBox
        title="No, no existe peligro de elementos no estructurales"
        checked={checkBox7}
        onPress={() => setCheckBox7(!checkBox7)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />
      <CheckBox
        title="No, se sabe"
        checked={checkBox8}
        onPress={() => setCheckBox8(!checkBox8)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />

<View style={styles.inline}>
   <Text style={[styles.textoRojo, styles.subtitle1]}>
      ¿Se requiere de una inspección de Nivel 2?
  </Text>
  <Picker
    style={[styles.input, styles.pickerSmall]}
    selectedValue={inspeccionNivel2}
    onValueChange={(itemValue) => setInspeccionNivel2(itemValue)}
  >
    <Picker.Item label="Si" value="si" />
    <Picker.Item label="No" value="no" />
  </Picker>
</View>


      {/* Botones de Navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'navy' }]} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'navy' }]} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10 }}></View> {/* Espacio de 1 centímetro antes de finalizar la página */}
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
    fontWeight: 'bold',
    marginBottom: 10, // Ajusta según sea necesario
  },
  subtitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8, // Ajusta según sea necesario
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
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    ,
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 8,
    backgroundColor: 'navy',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 8,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 8,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 8,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inlineLabel: {
    fontSize: 16,
  },
  pickerSmall: {
    width: 60, // Ajusta el ancho según sea necesario
    borderRadius: 8, // Ajusta el radio de borde según sea necesario
  },
  textoRojo: {
    color: 'red',
  },  
});

export default FormularioFema5;







