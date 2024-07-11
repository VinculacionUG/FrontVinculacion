import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
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



  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedCheckbox2, setSelectedCheckbox2] = useState(null);

  const handleCheckboxChange = (codAccionPregunta) => {
    setSelectedCheckbox(codAccionPregunta);
  };

  const handleCheckboxChange2 = (codAccionPregunta) => {
    setSelectedCheckbox2(codAccionPregunta);
  };



/*

  //Preguntas en un arreglo
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedCheckbox2, setSelectedCheckbox2] = useState(null);

  const checkboxes = [
    { id: 1, label: 'Si, se desconoce el tipo de edificio según FEMA' },
    { id: 2, label: 'Si, resultado menor que el límite' },
    { id: 3, label: 'Si, otros peligros presentes' },
    { id: 4, label: 'No' },
  ];

  const checkboxes2 = [
    { id: 1, label: 'Si, hay peligro de caída de elementos' },
    { id: 2, label: 'No, existe amenaza de elementos no estructurales y deben ser mitigados, pero la evaluación detallada no es necesaria' },
    { id: 3, label: 'No, no existe peligro de elementos no estructurales' },
    { id: 4, label: 'No, se sabe' },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(id);
  };

  const handleCheckboxChange2 = (id) => {
    setSelectedCheckbox2(id);
  };
*/

  // Estados para los campos del FormularioParte5
  const [accionRequerida, setAccionRequerida] = useState('');
  const [evaluacionDetalladaElementosNoEstructurales, setEvaluacionDetalladaElementosNoEstructurales] = useState('');
  const [inspeccionNivel2, setInspeccionNivel2] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [accionPreguntas, setAccionPreguntas] = useState([]);  

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


  useEffect(() => {
    // URL del servicio GET
    //const url = 'http://localhost:3000/api/TipoOcupacion';
    const url = 'https://www.fema.somee.com/api/FemaCinco/accionPreguntas';   
    const fetchAccionPreguntas = async () => {
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
        setAccionPreguntas(result);
		    //console.log(result);    
      } catch (error) {
        setError(error);
		console.log(error);    
      } finally {
        setLoading(false);
      }
    };
    fetchAccionPreguntas();

    
   
  }, []);

  //console.log(accionPreguntas);    


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



  const accionPreguntas1 = accionPreguntas.filter(item => item.codAccionPregunta >= 1 && item.codAccionPregunta <= 4);
  const accionPreguntas2 = accionPreguntas.filter(item => item.codAccionPregunta >= 5 && item.codAccionPregunta <= 8);

const pregunta1 = accionPreguntas1.find(item => item.codAccionPregunta === 1);
const pregunta2 = accionPreguntas2.find(item => item.codAccionPregunta === 5);

//console.log(accionPreguntas1);
//console.log(pregunta1);
//console.log(accionPreguntas2);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={styles.subtitle}>Acción requerida</Text>

      <Text style={[styles.textoRojo, styles.subtitle1]}>       
      <Text>{pregunta1.pregunta}</Text>
      </Text>

      <View style={styles.checkboxGrid}>
        {accionPreguntas1.map((checkbox) => (
          <View key={checkbox.codAccionPregunta} style={styles.checkboxContainer}>
            <CheckBox
              title={checkbox.respuesta}
              checked={selectedCheckbox === checkbox.codAccionPregunta}
              onPress={() => handleCheckboxChange(checkbox.codAccionPregunta)}
              containerStyle={styles.checkbox}
            />
          </View>
        ))}
      </View>

      <Text style={[styles.textoRojo, styles.subtitle1]}>       
      <Text>{pregunta2.pregunta}</Text>
      </Text>

      <View style={styles.checkboxGrid}>
        {accionPreguntas2.map((checkbox2) => (
          <View key={checkbox2.codAccionPregunta} style={styles.checkboxContainer}>
            <CheckBox
              title={checkbox2.respuesta}
              checked={selectedCheckbox2 === checkbox2.codAccionPregunta}
              onPress={() => handleCheckboxChange2(checkbox2.codAccionPregunta)}
              containerStyle={styles.checkbox}
            />
          </View>
        ))}
      </View>



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







