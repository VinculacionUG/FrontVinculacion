import React, { useEffect, useState ,useContext} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { AppContext } from './AppContext'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormularioFema2 = ({ navigation }) => {
  const [ocupacion, setOcupacion] = useState([]);
  const [tipoocupacion, setTipoocupacion] = useState([]);
  const [tipoSuelo, setTipoSuelo] = useState([]);
  
  const {
    numeroPiso, 
    setNumeroPiso,
    inf, 
    setInf,
    anoConstruccion,
    setAnoConstruccion,
    tiposuelo1,
    setTiposuelo1,
    tipoocupacion1, 
    setTipoocupacion1,
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
    //if (vali()) {
      console.log('Datos guardados:', {
        numeroPiso,
        inf,
        anoConstruccion,
        areaTotalDePiso,
        anoCodigo, 
        ampliacion, 
        anoDeContruccion, 
        tiposuelo1,
        tipoocupacion1,
        comentario, 
        ocupacion: selectedCheckboxes,
      });

      navigation.navigate('FormularioFema3');
  };
  const[selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleCheckboxChange = (codOcupacion) => {
    setSelectedCheckboxes(prevState => {
      const updatedCheckboxes = prevState.includes(codOcupacion)
        ? prevState.filter(item => item !== codOcupacion)
        : [...prevState, codOcupacion];

      // Mostrar IDs seleccionados en la consola
      console.log('Selected IDs:', updatedCheckboxes);

      return updatedCheckboxes;
    });
  };

 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValuetipoocupacion, setSelectedValueTipoOcupacion] = useState('');
  const [selectedValuetipoSuelo, setSelectedValueTipoSuelo] = useState('');

  useEffect(() => {

    const url = 'https://www.fema.somee.com/Users/TipoOcupacion';   
    const fetchTipoocupacion = async () => {
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
        setTipoocupacion(result);
		//console.log(result);    
      } catch (error) {
        setError(error);
		console.log(error);    
      } finally {
        setLoading(false);
      }
    };
    fetchTipoocupacion();

    const url2 = 'https://www.fema.somee.com/Users/TipoSuelo';
    const fetchTipoSuelo = async () => {
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
        setTipoSuelo(result);
		//console.log(result);    
      } catch (error) {
        setError(error);
		console.log(error);    
      } finally {
        setLoading(false);
      }
    };
    fetchTipoSuelo();

    const url3 = 'https://www.fema.somee.com/Users/Ocupacion';
    const fetchOcupacion = async () => {
      try {
        const response = await fetch(url3,
		{
			method: 'GET',
		}
		);
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setOcupacion(result);
		//console.log(result);    
      } catch (error) {
        setError(error);
		console.log(error);    
      } finally {
        setLoading(false);
      }
    };
    fetchOcupacion();


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
  const selectedDescriptions = ocupacion
  .filter(checkbox => selectedCheckboxes.includes(checkbox.codOcupacion))
  .map(checkbox => checkbox.descripcion);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>N° de Pisos: Sup:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={numeroPiso || '1'}
          onValueChange={(itemValue) => setNumeroPiso(itemValue)}
        >
          {Array.from({ length: 29 }, (_, i) => (
          <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
        
        <Text style={[styles.inputLabel, styles.infLabel]}>Inf:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={inf}
          onValueChange={(itemValue) => setInf(itemValue)}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Picker.Item key={i} label={`${i}`} value={`${i}`} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { height: 40, marginRight: 2 }]}>Año Construcción:</Text>
        <View style={{ width: 5, height: 40 }} /> 
        <TextInput
          style={[styles.input, { width: 50, height: 40 }]}
          value={anoConstruccion}
          maxLength={4}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnoConstruccion(numericValue);
           }}
        />
        <View style={{ width: 10, height: 40 }} />
        <Text style={[styles.inputLabel, { height: 40, width: 150 }]}>Área total de piso (m2):</Text>
        <TextInput
          style={[styles.input, { width: 60, height: 40 }]}
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
        <View style={{ width: 5 }} /> 
        <TextInput
          style={[styles.input, { width: 0 }]} 
          value={anoCodigo}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnoCodigo(numericValue);
          }}
        />
      <View style={{ width: 10 }} />
      <Text style={styles.inputLabel}>Ampliación:</Text>
      <Picker
        style={styles.smallPicker}
        selectedValue={ampliacion}
        onValueChange={(itemValue) => {
          setAmpliacion(itemValue);
        }}
      >
        <Picker.Item label="Sí" value="si" />
        <Picker.Item label="No" value="no" />
      </Picker>
    </View>



      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel }>Año de Construcción:</Text>
       
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
 {/*   */}

 <Text style={[styles.subtitle, styles.centerText]}>Ocupación:</Text>
    <Text style={[styles.subtitle, styles.boldRedText, styles.centerText]}></Text>
 
    <View style={styles.checkboxGrid}>
        {ocupacion.map((checkbox) => (
          <View key={checkbox.codOcupacion} style={styles.checkboxContainer}>
            <CheckBox
              title={checkbox.descripcion}
              checked={selectedCheckboxes === checkbox.codOcupacion}
              onPress={() => handleCheckboxChange(checkbox.codOcupacion)}
              containerStyle={styles.checkbox}
            />
          </View>
        ))}
      </View>
      {selectedCheckboxes !== null && (
        <Text style={styles.resultado}>
          Seleccionaste: {selectedDescriptions.join(', ')}
        </Text>
      )}


<View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Tipo de Ocupación:</Text>
      <View style={{ width: 5, height: 40 }} /> 
      <Picker
        style={styles.smallPicker}
        selectedValue={selectedValuetipoocupacion}
        onValueChange={(itemValue) => {
          setSelectedValueTipoOcupacion(itemValue);
          setTipoocupacion1(itemValue); // Guardar el valor seleccionado en tipoocupacion1
        }}
      >
        {tipoocupacion.map((item, index) => (
          <Picker.Item label={item.descripcion} value={item.descripcion} key={index} />
        ))}
      </Picker>
      {/* <Text style={styles.selected}>Seleccionado: {selectedValuetipoocupacion}</Text> */}
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Tipo de Suelo:</Text>
      <View style={{ width: 5, height: 40 }} /> 
      <Picker
        style={styles.smallPicker}
        selectedValue={selectedValuetipoSuelo}
        onValueChange={(itemValue) => {
          setSelectedValueTipoSuelo(itemValue);
          setTiposuelo1(itemValue); // Guardar el valor seleccionado en tiposuelo1
        }}
      >
        {tipoSuelo.map((item, index) => (
          <Picker.Item label={item.descripcion} value={item.descripcion} key={index} />
        ))}
      </Picker>
      {/* <Text style={styles.selected}>Seleccionado: {selectedValue}</Text> */}
    </View>
        <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Comentario:</Text>
</View>
<View style={styles.inputContainer}>
  <TextInput
    style={[styles.input, styles.multilineText, { width: '100%' }]}
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