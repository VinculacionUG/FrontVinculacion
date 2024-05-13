import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormularioFema3 = ({ route, navigation }) => {
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

  //Console.log("help:" , params);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={styles.subtitle}>Resultado base, modificadores y resultado final del nivel 1 de análisis, SL1</Text>

      {/* Selects */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tipo de identificación DNK:  </Text>
        <Picker
          style={styles.input}
          selectedValue={tipoIdentificacionDNK}
          onValueChange={(itemValue) => setTipoIdentificacionDNK(itemValue)}
        >
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Resultado Base:  </Text>
        <Picker
          style={styles.input}
          selectedValue={resultadoBase}
          onValueChange={(itemValue) => setResultadoBase(itemValue)}
        >
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Irregularidad vertical severa:  </Text>
        <Picker
          style={styles.input}
          selectedValue={irregularidadVerticalSevera}
          onValueChange={(itemValue) => setIrregularidadVerticalSevera(itemValue)}
      >
          {/* Agrega más opciones según sea necesario */}
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
        </Picker>
      </View>      


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Irregularidad vertical moderada:  </Text>
        <Picker
          style={styles.input}
          selectedValue={irregularidadVerticalModerada}
          onValueChange={(itemValue) => setIrregularidadVerticalModerada(itemValue)}
        >
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
        </Picker>
      </View> 


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Planta irregular:  </Text>
        <Picker
          style={styles.input}
          selectedValue={plantaIrregular}
          onValueChange={(itemValue) => setPlantaIrregular(itemValue)}
        >
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
       </Picker>
      </View>       

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Pre- código sísmico:  </Text>
        <Picker
          style={styles.input}
          selectedValue={preCodigoSismico}
          onValueChange={(itemValue) => setPreCodigoSismico(itemValue)}
      >
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
        </Picker>
      </View>  

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Post- código sísmico:  </Text>
        <Picker
          style={styles.input}
          selectedValue={postCodigoSismico}
          onValueChange={(itemValue) => setPostCodigoSismico(itemValue)}
        >
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
        </Picker>
      </View>  

      {/* Desde aquí */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Suelo tipo A o B:  </Text>
      <Picker
        style={styles.input}
        selectedValue={sueloTipoAoB}
        onValueChange={(itemValue) => setSueloTipoAoB(itemValue)}
      >
        <Picker.Item label="Sup" value="sup" />
        <Picker.Item label="Inf" value="inf" />
        </Picker>
      </View>        

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Suelo tipo E (1-3 pisos):  </Text>
        <Picker
          style={styles.input}
          selectedValue={sueloTipoE1_3Pisos}
          onValueChange={(itemValue) => setSueloTipoE1_3Pisos(itemValue)}
        >
          <Picker.Item label="Sup" value="sup" />
          <Picker.Item label="Inf" value="inf" />
          </Picker>
      </View>        

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Suelo tipo E (mayor 3 pisos):  </Text>
        <Picker
          style={styles.input}
          selectedValue={sueloTipoE_GT3Pisos}
          onValueChange={(itemValue) => setSueloTipoE_GT3Pisos(itemValue)}
        >
          <Picker.Item label="Sup" value="sup" />
          <Picker.Item label="Inf" value="inf" />
          </Picker>
      </View>        

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Resulado mínimo, Smin:  </Text>
        <Picker
          style={styles.input}
          selectedValue={resultadoMinimoSmin}
          onValueChange={(itemValue) => setResultadoMinimoSmin(itemValue)}
        >
          <Picker.Item label="Sup" value="sup" />
          <Picker.Item label="Inf" value="inf" />
          </Picker>
      </View>  


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Resultado final Nivel 1  </Text>
        <Picker
          style={styles.input}
          selectedValue={resultadoFinalSL1_GT_Smin}
          onValueChange={(itemValue) => setResultadoFinalSL1_GT_Smin(itemValue)}
        >
          <Picker.Item label="Sup" value="sup" />
          <Picker.Item label="Inf" value="inf" />
          </Picker>
      </View> 


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


export default FormularioFema3;