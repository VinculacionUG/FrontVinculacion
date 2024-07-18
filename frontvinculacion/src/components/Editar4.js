import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from './AppContext';

const Editar4 = ({ navigation, route }) => {
  // Obtener los datos existentes de la ruta
  const { edificio } = route.params;
  const { fuenteTipoSuelo: fuenteTipoSueloExistente, fuentePeligroGeologicos: fuentePeligroGeologicosExistente,
          nombreContacto: nombreContactoExistente, peligorsGeologicos: peligorsGeologicosExistente, 
          codEvalExterior: codEvalExteriorExistente, codEvalInterior: codEvalInteriorExistente, 
          revisionPlanos: revisionPlanosExistente
  } = edificio;

  const {
    exterior,
    setExterior,
    interior,
    setInterior,
    revisionPlanos,
    setRevisionPlanos,
    //fuenteDelTipoDeSuelo,
    //setFuenteDelTipoDeSuelo,
    //fuenteDePeligrosGeologicos,
    //setFuenteDePeligrosGeologicos,
    //contactoDeLaPersona,
    //setContactoDeLaPersona,
    otrosPeligros1,
    setOtrosPeligros1,
  } = useContext(AppContext);


  const [revisionExterior, setRevisionExterior] = useState([]);
  const [revisionInterior, setRevisionInterior] = useState([]);
  const [otrosPeligros, setOtrosPeligros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValuerevisionExterior, setSelectedValueRevisionExterior] = useState('');
  const [selectedValuerevisionInterior, setSelectedValueRevisionInterior] = useState('');


  // Establecer los estados con los datos existentes
  const [fuenteDelTipoDeSuelo, setFuenteDelTipoDeSuelo] = useState(fuenteTipoSueloExistente);
  const [fuenteDePeligrosGeologicos, setFuenteDePeligrosGeologicos] = useState(fuentePeligroGeologicosExistente);
  const [contactoDeLaPersona, setContactoDeLaPersona] = useState(nombreContactoExistente);

  
  const handleNext = () => {
    // Validación de campos obligatorios
    if (
      !exterior ||
      !interior ||
      !revisionPlanos ||
      !fuenteDelTipoDeSuelo ||
      !fuenteDePeligrosGeologicos ||
      !contactoDeLaPersona ||
      !otrosPeligros1
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Continuar con la navegación o el procesamiento de datos
    console.log('Datos guardados:', {
      exterior,
      interior,
      revisionPlanos,
      fuenteDelTipoDeSuelo,
      fuenteDePeligrosGeologicos,
      contactoDeLaPersona,
      otrosPeligros1,
    });
    navigation.navigate('Editar5', { edificio }); 
  };

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const handleCheckboxChange = (codOtrosPeligorsSec) => {
    const peligroAsignado = asignarPeligro(codOtrosPeligorsSec);
    setSelectedCheckbox(codOtrosPeligorsSec);
    setOtrosPeligros1(peligroAsignado); // Actualiza la variable otrosPeligros1
  };

  function asignarPeligro(codigoPeligro) {
    let otrosPeligros1;

    switch (codigoPeligro) {
      case 1:
        otrosPeligros1 = 1;
        break;
      case 2:
        otrosPeligros1 = 2;
        break;
      case 3:
        otrosPeligros1 = 3;
        break;
      case 4:
        otrosPeligros1 = 4;
        break;
      default:
        otrosPeligros1 = 'Código de peligro no válido';
    }

    return otrosPeligros1;
  }

  useEffect(() => {
    const url = 'https://www.fema.somee.com/api/FemaCuatro/consultarEvaluacionExterior';

    const fetchRevisionExterior = async () => {
      try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setRevisionExterior(result);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRevisionExterior();

    const url2 = 'https://www.fema.somee.com/api/FemaCuatro/consultarEvaluacionInterior';
    const fetchRevisionInterior = async () => {
      try {
        const response = await fetch(url2, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setRevisionInterior(result);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRevisionInterior();

    const url3 = 'https://www.fema.somee.com/api/FemaCuatro/consultarFemaOtrosPeligros';
    const fetchOtrosPeligros = async () => {
      try {
        const response = await fetch(url3, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setOtrosPeligros(result);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOtrosPeligros();
  }, []);

  const handleExteriorValueChange = (itemValue) => {
    setSelectedValueRevisionExterior(itemValue);
    setExterior(itemValue); // Actualiza la variable exterior
  };

  const handleInteriorValueChange = (itemValue) => {
    setSelectedValueRevisionInterior(itemValue);
    setInterior(itemValue); // Actualiza la variable interior
  };

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

      <View style={styles.row}>
        <Text style={styles.inputLabel}>Exterior:</Text>
        <View style={{ width: 65 }} />
        <Picker
          style={[styles.input, styles.picker]}
          selectedValue={selectedValuerevisionExterior}
          onValueChange={handleExteriorValueChange} // Utiliza el nuevo método
        >
          <Picker.Item label="Seleccione" value="" />
          {revisionExterior.map((item, index) => (
            <Picker.Item label={item.descripcion} value={item.codEvalExterior} key={index} />
          ))}
        </Picker>
      </View>

      <View style={styles.row}>
        <Text style={styles.inputLabel}>Interior:</Text>
        <View style={{ width: 65 }} />
        <Picker
          style={[styles.input, styles.picker]}
          selectedValue={selectedValuerevisionInterior}
          onValueChange={handleInteriorValueChange} // Utiliza el nuevo método
        >
          <Picker.Item label="Seleccione" value="" />
          {revisionInterior.map((item, index) => (
            <Picker.Item label={item.descripcion} value={item.codEvalInterior} key={index} />
          ))}
        </Picker>
      </View>

      <View style={styles.row}>
        <Text style={styles.inputLabel}>Revisión planos:</Text>
        <View style={{ width: 5 }} />
        <Picker
          style={[styles.input, styles.picker]}
          selectedValue={revisionPlanos}
          onValueChange={(itemValue) => setRevisionPlanos(itemValue)}
        >
          <Picker.Item label="Seleccione" value="" />
          <Picker.Item label="Sí" value="si" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <View style={styles.part1}>
        <Text style={styles.inputLabel}>Fuente del tipo de suelo:</Text>
        <TextInput
          style={styles.input}
          value={fuenteDelTipoDeSuelo}
          onChangeText={(text) => setFuenteDelTipoDeSuelo(text)}
        />
      </View>

      <View style={styles.part1}>
        <Text style={styles.inputLabel}>Fuente de Peligros Geológicos</Text>
        <TextInput
          style={styles.input}
          value={fuenteDePeligrosGeologicos}
          onChangeText={(text) => setFuenteDePeligrosGeologicos(text)}
        />
      </View>

      <View style={styles.part1}>
        <Text style={styles.inputLabel}>Contacto de la Persona</Text>
        <TextInput
          style={styles.input}
          value={contactoDeLaPersona}
          onChangeText={(text) => setContactoDeLaPersona(text)}
        />
      </View>

      <View>
        <Text style={[styles.subtitle, styles.centerText]}>Otros Peligros</Text>
        <Text style={[styles.subtitle, styles.boldRedText, styles.centerText]}>¿Hay peligros que desencadenan una evaluación estructural detallada?</Text>

        <View style={styles.checkboxContainer}>
          {otrosPeligros.map((checkbox) => (
            <View key={checkbox.codOtrosPeligorsSec} style={styles.checkboxContainer}>
              <CheckBox
                title={checkbox.respuesta}
                checked={selectedCheckbox === checkbox.codOtrosPeligorsSec}
                onPress={() => handleCheckboxChange(checkbox.codOtrosPeligorsSec)}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
              />
            </View>        
          ))}
      </View>
        
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
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 8,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 8,
  },  
});

export default Editar4;