import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { AppContext } from './AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormularioFema2 = ({ navigation }) => {
  const [ocupacion, setOcupacion] = useState([]);
  const [tipoocupacion, setTipoocupacion] = useState([]);
  const [tipoSuelo, setTipoSuelo] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedValuetipoocupacion, setSelectedValueTipoOcupacion] = useState('');
  const [selectedValuetipoSuelo, setSelectedValueTipoSuelo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    numeroPiso,
    setNumeroPiso,
    inf,
    setInf,
    anoConstruccion,
    setAnoConstruccion,
    ocupacion2,
    setOcupacion2,
    tipoocupacion1,
    setTipoocupacion1,
    tiposuelo1,
    setTiposuelo1,
    areaTotalDePiso,
    setAreaTotalDePiso,
    anoCodigo,
    setAnoCodigo,
    ampliacion,
    setAmpliacion,
    anoDeContruccion,
    setAnoDeContruccion,
    comentario,
    setComentario,
  } = useContext(AppContext);

  const handleNext = () => {
    // Validación de campos obligatorios
    if (!numeroPiso || !inf || !anoConstruccion || !areaTotalDePiso || !anoCodigo || !ampliacion || !anoDeContruccion ||
      !selectedValuetipoocupacion || !selectedValuetipoSuelo || selectedCheckboxes.length === 0 ) {
      alert('Por favor complete todos los campos.');
      return;
    }
    const ocupacion = {
      selectedCheckboxes,
      tipoocupacion1,
     
    };
    // Continuar con la navegación o el procesamiento de datos
    console.log('Datos guardados:', {
      numeroPiso,
      inf,
      anoConstruccion,
      areaTotalDePiso,
      anoCodigo,
      ampliacion,
      anoDeContruccion,
      tiposuelo1,
      comentario,
      ocupacion,
      ocupacion2

    });

    navigation.navigate('FormularioFema4');
  };

  useEffect(() => {
    setOcupacion2(ocupacion);
  }, [ocupacion]);

  useEffect(() => {
    const fetchTipoocupacion = async () => {
      try {
        const response = await fetch('https://www.fema.somee.com/Users/TipoOcupacion', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setTipoocupacion(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTipoSuelo = async () => {
      try {
        const response = await fetch('https://www.fema.somee.com/Users/TipoSuelo', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setTipoSuelo(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOcupacion = async () => {
      try {
        const response = await fetch('https://www.fema.somee.com/Users/Ocupacion', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setOcupacion(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTipoocupacion();
    fetchTipoSuelo();
    fetchOcupacion();
  }, []);

  const handleCheckboxChange = (codOcupacion) => {
    setSelectedCheckboxes(prevState => {
      const updatedCheckboxes = prevState.includes(codOcupacion)
        ? prevState.filter(item => item !== codOcupacion)
        : [...prevState, codOcupacion];

      return updatedCheckboxes;
    });
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

  const selectedDescriptions = ocupacion
    .filter(checkbox => selectedCheckboxes.includes(checkbox.codOcupacion))
    .map(checkbox => checkbox.descripcion);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>N° de Pisos:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={numeroPiso}
          onValueChange={(itemValue) => setNumeroPiso(itemValue)}
        >
          <Picker.Item label="Seleccione" value="" />
          {Array.from({ length: 26 }, (_, i) => (
   <Picker.Item key={i} label={`${i}`} value={`${i}`} />
          ))}
        </Picker>

        <Text style={[styles.inputLabel, styles.infLabel]}>Inf:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={inf}
          onValueChange={(itemValue) => setInf(itemValue)}
        >
          <Picker.Item label="Seleccione" value="" />
          {Array.from({ length: 6 }, (_, i) => (
             <Picker.Item key={i} label={`${i}`} value={`${i}`} />
            ))}
  
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Año Construcción:</Text>
        <TextInput
          style={[styles.input, { width: 50 }]}
          value={anoConstruccion}
          maxLength={4}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnoConstruccion(numericValue);
          }}
        />
        <Text style={[styles.inputLabel, { marginLeft: 10, width: 150 }]}>Área total de piso (m2):</Text>
        <TextInput
          style={[styles.input, { width: 60 }]}
          value={areaTotalDePiso}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAreaTotalDePiso(numericValue);
          }}
          maxLength={5}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Año de código:</Text>
        <TextInput
          style={[styles.input, { width: 50 }]}
          value={anoCodigo}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnoCodigo(numericValue);
          }}
        />

        <Text style={[styles.inputLabel, { marginLeft: 10 }]}>Ampliación:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={ampliacion}
          onValueChange={(itemValue) => {
            setAmpliacion(itemValue);
          }}
        >
          <Picker.Item label="Seleccione" value="" />
          <Picker.Item label="Sí" value="si" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Año de Construcción:</Text>

        <TextInput
          //style={[styles.input, { width: 20, height: 20 }]}
          style={styles.inputText}
          value={anoDeContruccion}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnoDeContruccion(numericValue);
          }}
          maxLength={4}
        />
      </View>

      <Text style={[styles.subtitle, styles.centerText]}>Ocupación:</Text>

      <View style={styles.checkboxGrid}>
        {ocupacion.map((checkbox) => (
          <View key={checkbox.codOcupacion} style={styles.checkboxContainer}>
            <CheckBox
              title={checkbox.descripcion}
              checked={selectedCheckboxes.includes(checkbox.codOcupacion)}
              onPress={() => handleCheckboxChange(checkbox.codOcupacion)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxLabel}
              checkedIcon={<MaterialCommunityIcons name="checkbox-marked" size={24} color="green" />}
              uncheckedIcon={<MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="gray" />}
            />
          </View>
        ))}
      </View>

      {selectedCheckboxes.length > 0 && (
        <Text style={styles.resultado}>
          Seleccionaste: {selectedDescriptions.join(', ')}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tipo de Ocupación:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={selectedValuetipoocupacion}
          onValueChange={(itemValue) => {
            setSelectedValueTipoOcupacion(itemValue);
            setTipoocupacion1(itemValue); // Guardar el valor seleccionado en tipoocupacion1
          }}
        >
          <Picker.Item label="Seleccione" value="" />
          {tipoocupacion.map((item, index) => (
            <Picker.Item label={item.descripcion} value={item.codTipoOcupacion} key={index} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tipo de Suelo:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={selectedValuetipoSuelo}
          onValueChange={(itemValue) => {
            setSelectedValueTipoSuelo(itemValue);
            setTiposuelo1(itemValue); // Guardar el valor seleccionado en tiposuelo1
          }}
        >
          <Picker.Item label="Seleccione" value="" />
          {tipoSuelo.map((item, index) => (
            <Picker.Item label={item.descripcion} value={item.codTipoSuelo} key={index} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Comentario:</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.multilineText]}
          multiline
          numberOfLines={4}
          value={comentario}
          onChangeText={(text) => setComentario(text)}
        />
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    marginRight: 4, // Espacio de 4 píxeles para los 2 mm
    fontWeight: 'normal',
  },
  infLabel: {
    marginLeft: 20, // Espacio de 4 píxeles entre el primer selector y el texto "Inf:"
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  smallPicker: {
    flex: 1,
    height: 40, // Reducir altura del selector
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    width: 80, // Reducir el ancho del selector
  },
  backButton: {
    backgroundColor: 'navy',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  nextButton: {
    backgroundColor: 'navy',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  multilineText: {
    minHeight: 100,
  },
  CheckBoxContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
    //justifyContent: 'space-between',
  },
  checkboxContainer: {
    width: '30%',
    padding: 0,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#2196F3',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
  inputText: {
    flex: .20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    width: 0,
    padding: 0,
    paddingHorizontal: 10,
    marginRight: 2,
    //backgroundColor: 'red',
  }, 
});
export default FormularioFema2;

