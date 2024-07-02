//import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
//import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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

  const [revisionExterior, setRevisionExterior] = useState([]);
  const [revisionInterior, setRevisionInterior] = useState([]);
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValuerevisionExterior, setSelectedValueRevisionExterior] = useState('');
  const [selectedValuerevisionInterior, setSelectedValueRevisionInterior] = useState('');
  
  useEffect(() => {
    // URL del servicio GET
    //const url = 'http://localhost:3003/api/Exterior';
    const url = 'https://www.fema.somee.com/api/FemaCuatro/consultarEvaluacionExterior';
    const fetchRevisionExterior = async () => {
      try {
        const response = await fetch(url,
		{
			method: 'GET',
		}
		);
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setRevisionExterior(result);
		//console.log(result);    
      } catch (error) {
        setError(error);
		console.log(error);    
      } finally {
        setLoading(false);
      }
    };
    fetchRevisionExterior();



    // URL del servicio GET
      //const url2 = 'http://localhost:3004/api/Interior';
      const url2 = 'https://www.fema.somee.com/api/FemaCuatro/consultarEvaluacionInterior';
      const fetchRevisionInterior = async () => {
        try {
          const response = await fetch(url2,
      {
        method: 'GET',
      }
      );
          if (!response.ok) {
            throw new Error('Error en la red');
          }
          const result = await response.json();
          setRevisionInterior(result);
      //console.log(result);    
        } catch (error) {
          setError(error);
      console.log(error);    
        } finally {
          setLoading(false);
        }
      };
      fetchRevisionInterior();
  

  }, []);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }


  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={[styles.subtitle, styles.blackText, styles.centerText]}>Extensión de la revisión</Text>

 {/*   
      <View style={styles.row}>
        <Text style={styles.inputLabel}>Exterior:</Text>
        <View style={{ width: 65 }} /> 
        <Picker
          style={[styles.input, styles.picker]}
          selectedValue={revisionExterior}
          onValueChange={(itemValue) => setRevisionExterior(itemValue)}
        >
          <Picker.Item label="Parcial" value="Parcial" />
          <Picker.Item label="Todos los Lados" value="Todos los Lados" />
          <Picker.Item label="Aéreo" value="Aéreo" />
        </Picker>
      </View>
*/}

    <View style={styles.row}>
      <Text style={styles.inputLabel}>Exterior:</Text>
      <View style={{ width: 65 }} /> 
      <Picker
        style={[styles.input, styles.picker]}
        selectedValue={selectedValuerevisionExterior}
        onValueChange={(itemValue) => setSelectedValueRevisionExterior(itemValue)}
      >
        {revisionExterior.map((item, index) => (
          <Picker.Item label={item.descripcion} value={item.descripcion} key={index} />
        ))}
      </Picker>
      {/*  <Text style={styles.selected}>Seleccionado: {selectedValue}</Text> */}
    </View>


    <View style={styles.row}>
      <Text style={styles.inputLabel}>Interior:</Text>
      <View style={{ width: 65 }} /> 
      <Picker
        style={[styles.input, styles.picker]}
        selectedValue={selectedValuerevisionInterior}
        onValueChange={(itemValue) => setSelectedValueRevisionInterior(itemValue)}
      >
        {revisionInterior.map((item, index) => (
          <Picker.Item label={item.descripcion} value={item.descripcion} key={index} />
        ))}
      </Picker>
      {/*  <Text style={styles.selected}>Seleccionado: {selectedValue}</Text> */}
    </View>
	  

      <View style={styles.row}>
        <Text style={styles.inputLabel}>Revisión planos:</Text>
        <View style={{ width: 5 }} /> 
        <Picker
          style={[styles.input, styles.picker]}
          selectedValue={revisionPlanos}
          onValueChange={(itemValue) => setRevisionPlanos(itemValue)}
        >
          <Picker.Item label="Sí" value="si" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <View style={styles.part1}>
        <Text style={styles.inputLabel}>Fuente del tipo de suelo:</Text>
        <TextInput
          style={styles.input}
          value={fuenteTipoSuelo}
          onChangeText={(text) => setFuenteTipoSuelo(text)}
        />
      </View>

      <View style={styles.part1}>
        <Text style={styles.inputLabel}>Fuente de Peligros Geológicos</Text>
        <TextInput
          style={styles.input}
          value={fuentePeligrosGeologicos1}
          onChangeText={(text) => setFuentePeligrosGeologicos1(text)}
        />
      </View>

      <View style={styles.part1}>
        <Text style={styles.inputLabel}>Contacto de la Persona</Text>
        <TextInput
          style={styles.input}
          value={fuentePeligrosGeologicos2}
          onChangeText={(text) => setFuentePeligrosGeologicos2(text)}
        />
      </View>

      <View>
        <Text style={[styles.subtitle, styles.centerText]}>Otros Peligros</Text>
        <Text style={[styles.subtitle, styles.boldRedText, styles.centerText]}>¿Hay peligros que desencadenan una evaluación estructural detallada?</Text>
        <CheckBox
          title="Posible golpeteo entre edificios"
          checked={checkBox1}
          onPress={() => setCheckBox1(!checkBox1)}
          containerStyle={styles.transparentCheckBox}
        />
        <CheckBox
          title="Riesgo de caída de edificios adyacentes más altos"
          checked={checkBox2}
          onPress={() => setCheckBox2(!checkBox2)}
          containerStyle={styles.transparentCheckBox}
        />
        <CheckBox
          title="Peligro geológico o Suelo tipo F"
          checked={checkBox3}
          onPress={() => setCheckBox3(!checkBox3)}
          containerStyle={styles.transparentCheckBox}
        />
        <CheckBox
          title="Daños significativos/deterioro del sistema estructural"
          checked={checkBox4}
          onPress={() => setCheckBox4(!checkBox4)}
          containerStyle={styles.transparentCheckBox}
        />
               </View>
        <View style={{ marginBottom: 50 }}></View> {/* Espacio de 1 centímetro entre los CheckBox y los botones */}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Siguiente</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
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
    paddingBottom: 50, 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 4,
    fontWeight: 'normal',
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    width: 150,
  },
  part1: {
    height: 75,
    justifyContent: 'center',
    marginBottom: 16,
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
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, 
    paddingHorizontal: 16,
    paddingBottom: 20, 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopColor: 'lightgray',
  },
  prevButton: {
    backgroundColor: 'navy',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 24,
  },
  nextButton: {
    backgroundColor: 'navy',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  transparentCheckBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  blackText: {
    color: 'black',
  },
  boldRedText: {
    color: 'red',
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
});

export default FormularioFema4;