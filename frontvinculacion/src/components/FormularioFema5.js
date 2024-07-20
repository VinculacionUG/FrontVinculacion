import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from './AppContext';

const FormularioFema5 = ({ navigation }) => {

  const [accionPreguntas, setAccionPreguntas] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedCheckbox2, setSelectedCheckbox2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accionPreguntas1 = accionPreguntas.filter(item => item.codAccionPregunta >= 1 && item.codAccionPregunta <= 4);
  const accionPreguntas2 = accionPreguntas.filter(item => item.codAccionPregunta >= 5 && item.codAccionPregunta <= 8);
  const pregunta1 = accionPreguntas1.find(item => item.codAccionPregunta === 1);
  const pregunta2 = accionPreguntas2.find(item => item.codAccionPregunta === 5);

  const {
    adjuntarFotografica,
    adjuntarGrafico,
    direccion,
    zip,
    otrasIdentificaciones,
    nombreEdificio,
    uso,
    latitud,
    longitud,
    fecha,
    hora,
    numeroPiso,
    inf,
    anoConstruccion,
    areaTotalDePiso,
    anoCodigo,
    ampliacion,
    anoDeContruccion,
    tiposuelo1,
    ocupacion2,
    tipoSuelo,
    comentario,
    resultado,
    exterior,
    interior,
    revisionPlanos,
    fuenteDelTipoDeSuelo,
    fuenteDePeligrosGeologicos,
    contactoDeLaPersona,
    otrosPeligros1,
    pregunta1Fema5,
    pregunta2Fema5,
    inspeccionNivel,
  } = useContext(AppContext);




  const handleCheckboxChange = (codAccionPregunta) => {
    setSelectedCheckbox(codAccionPregunta);
    let nuevaPregunta1Fema5 = codAccionPregunta;

    switch (codAccionPregunta) {
      case 1:
        nuevaPregunta1Fema5 = 1;
        break;
      case 2:
        nuevaPregunta1Fema5 = 2;
        break;
      case 3:
        nuevaPregunta1Fema5 = 3;
        break;
      case 4:
        nuevaPregunta1Fema5 = 4;
        break;
      default:
        break;
    }

    setPregunta1Fema5(nuevaPregunta1Fema5);
  };

  const handleCheckboxChange2 = (codAccionPregunta) => {
    setSelectedCheckbox2(codAccionPregunta);
    let nuevaPregunta2Fema5 = codAccionPregunta;

    switch (codAccionPregunta) {
      case 5:
        nuevaPregunta2Fema5 = 5;
        break;
      case 6:
        nuevaPregunta2Fema5 = 6;
        break;
      case 7:
        nuevaPregunta2Fema5 =7;
        break;
      case 8:
        nuevaPregunta2Fema5 = 8;
        break;
      default:
        break;
    }

    setPregunta2Fema5(nuevaPregunta2Fema5);
  };

  const handleGuardar = () => {
    console.log('Datos del AppContext:', {
      adjuntarFotografica,
      adjuntarGrafico,
      direccion,
      zip,
      otrasIdentificaciones,
      nombreEdificio,
      uso,
      latitud,
      longitud,
      fecha,
      hora,
      numeroPiso,
      inf,
      anoConstruccion,
      areaTotalDePiso,
      anoCodigo,
      ampliacion,
      anoDeContruccion,
      tiposuelo1,
      tipoocupacion1,
      tipoSuelo,
      comentario,
      resultado,
      exterior,
      interior,
      revisionPlanos,
      fuenteDelTipoDeSuelo,
      fuenteDePeligrosGeologicos,
      contactoDeLaPersona,
      otrosPeligros1,
      pregunta1Fema5,
      pregunta2Fema5,
      inspeccionNivel,
    });
    if (
      !pregunta1Fema5 ||
      !pregunta2Fema5 ||
      !inspeccionNivel
      
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }
    console.log('Datos guardados:', {
      pregunta1Fema5,
      pregunta2Fema5,
      inspeccionNivel,
    },
    
  );
    
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
    const url = 'https://www.fema.somee.com/api/FemaCinco/accionPreguntas';
    const fetchAccionPreguntas = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setAccionPreguntas(result);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccionPreguntas();
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
          selectedValue={inspeccionNivel}
          onValueChange={(itemValue) => setInspeccionNivel(itemValue)}
        >
          <Picker.Item label="Si" value="si" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

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
    marginTop: 30,
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 8,
    backgroundColor: '#001f3f',
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
    borderRadius: 8, // Ajusta
  },
  textoRojo: {
    color: 'red',
  },
});
export default FormularioFema5;







