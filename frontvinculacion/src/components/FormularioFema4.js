import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

        <Text style={styles.title}>Formulario FEMA P-154</Text>
        <Text style={styles.subtitle}>Extensión de la revisión</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Exterior:  </Text>
          <Picker
            style={styles.input}
            selectedValue={revisionExterior}
            onValueChange={(itemValue) => setRevisionExterior(itemValue)}
          >
            <Picker.Item label="Exterior" value="exterior" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Interior:  </Text>
          <Picker
            style={styles.input}
            selectedValue={revisionInterior}
            onValueChange={(itemValue) => setRevisionInterior(itemValue)}
          >
            <Picker.Item label="Interior" value="interior" />
          </Picker>
        </View>      


        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Revisión planos:  </Text>
          <Picker
            style={[styles.input, styles.picker]}
            selectedValue={revisionPlanos}
            onValueChange={(itemValue) => setRevisionPlanos(itemValue)}
          >
            <Picker.Item label="Rev si" value="si" />
            <Picker.Item label="Rev No" value="no" />
          </Picker>
        </View>
      
      <Text style={styles.inputLabel}>Fuente del tipo de suelo  </Text>
      <TextInput
          style={styles.input}
          placeholder="Fuente del tipo de suelo"
          value={fuenteTipoSuelo}
          onChangeText={(text) => setFuenteTipoSuelo(text)}
        />
      <Text style={styles.inputLabel}> </Text>
      <Text style={styles.inputLabel}>Fuente de peligros geológicos 1  </Text>
      <TextInput
          style={styles.input}
          placeholder="Fuente de peligros geológicos 1"
          value={fuentePeligrosGeologicos1}
          onChangeText={(text) => setFuentePeligrosGeologicos1(text)}
        />

      <Text style={styles.inputLabel}> </Text>
      <Text style={styles.inputLabel}>Fuente de peligros geológicos 2  </Text>
      <TextInput
          style={styles.input}
          placeholder="Fuente de peligros geológicos 2"
          value={fuentePeligrosGeologicos2}
          onChangeText={(text) => setFuentePeligrosGeologicos2(text)}
        />

      <View>
        <Text style={styles.subtitle}> </Text>
        <Text style={styles.subtitle}>Otros Peligros</Text>

        <Text style={styles.inputLabelred}>¿Hay peligros que desencadenan una evaluación estructural detallada?</Text>
   
        <CheckBox
        º  title="Posible golpeteo entre edificios"
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


   {/*   </View> */}
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
  inputLabelred: {
    fontSize: 16,
    marginLeft: 8,     
    color: 'red',
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

export default FormularioFema4;
