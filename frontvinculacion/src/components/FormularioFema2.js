import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { AppContext } from './AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormularioFema2 = ({ navigation }) => {
  const [tipoocupacion1, setTipoocupacion1] = useState('');
  const [tipoocupacion, setTipoocupacion] = useState([]);
  const [tipoSuelo, setTipoSuelo] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedValuetipoocupacion, setSelectedValueTipoOcupacion] = useState('');
  const [selectedValuetipoSuelo, setSelectedValueTipoSuelo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    nroPisosSup,
    setNumeroPiso,
    nroPisosInf,
    setInf,
    anioContruccion,
    setAnoConstruccion,
    areaTotalPiso,
    setAreaTotalDePiso,
    anioCodigo,
    setAnoCodigo,
    ampliacion,
    setAmpliacion,
    amplAnioConstruccion,
    setAnoDeContruccion,
    codTipoSuelo,
    setTiposuelo1,
    femaOcupacions,
    setOcupacion,
    comentarios,
    setComentario,
  } = useContext(AppContext);

  const handleNext = () => {
    if (!nroPisosSup || !nroPisosInf || !anioContruccion || !areaTotalPiso || !anioCodigo || !ampliacion || !amplAnioConstruccion ||
      !selectedValuetipoocupacion || !selectedValuetipoSuelo || selectedCheckboxes.length === 0 ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Replicar codTipoSuelo tantas veces como elementos seleccionados
    const replicatedTiposuelo = new Array(selectedCheckboxes.length).fill(tipoocupacion1);

    // Combinar selectedCheckboxes y replicatedTiposuelo en un solo array
    const ocupacionArray = selectedCheckboxes.map((checkbox, index) => ({
      codOcupacion: checkbox,
      codTipoOcupacion: replicatedTiposuelo[index]
    }));

    setOcupacion(ocupacionArray);

    console.log('Datos guardados:', {
      nroPisosSup,
      nroPisosInf,
      anioContruccion,
      areaTotalPiso,
      anioCodigo,
      ampliacion,
      amplAnioConstruccion,
      codTipoSuelo,
      comentarios,
      femaOcupacions: ocupacionArray
    });

    navigation.navigate('FormularioFema3');
  };

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

  const selectedDescriptions = femaOcupacions
    .filter(checkbox => selectedCheckboxes.includes(checkbox.codOcupacion))
    .map(checkbox => checkbox.descripcion);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>N° de Pisos:</Text>
        <Picker
        style={styles.smallPicker}
        selectedValue={nroPisosSup}
        onValueChange={(itemValue) => setNumeroPiso(parseInt(itemValue, 10))}
      >
        <Picker.Item label="Seleccione" value="" />
        {Array.from({ length: 26 }, (_, i) => (
          <Picker.Item key={i} label={`${i}`} value={i} />
        ))}
        </Picker>

        <Text style={[styles.inputLabel, styles.nroPisosInfLabel]}>Inf:</Text>
        <Picker
        style={styles.smallPicker}
        selectedValue={nroPisosInf}
        onValueChange={(itemValue) => setInf(parseInt(itemValue, 10))}
      >
        <Picker.Item label="Seleccione" value="" />
        {Array.from({ length: 6 }, (_, i) => (
          <Picker.Item key={i} label={`${i}`} value={i} />
        ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Año Construcción:</Text>
        <TextInput
        style={[styles.input, { width: 50 }]}
        value={anioContruccion.toString()}
        maxLength={4}
        keyboardType="numeric"
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, '');
          setAnoConstruccion(numericValue ? parseInt(numericValue, 10) : '');
        }}
        />
        <Text style={[styles.inputLabel, { marginLeft: 10, width: 150 }]}>Área total de piso (m2):</Text>
        <TextInput
  style={[styles.input, { width: 60 }]}
  value={areaTotalPiso} // Convertir el número decimal a cadena para mostrar en el TextInput
  keyboardType="decimal-pad" // Usar teclado numérico con punto decimal
  onChangeText={(text) => {
    // Permitir solo números y un solo punto decimal
    const numericValue = text.replace(/[^0-9.]/g, '');
    // Asegurarse de que haya solo un punto decimal
    const [integerPart, decimalPart] = numericValue.split('.');
    const formattedValue = decimalPart
      ? `${integerPart}.${decimalPart.slice(0, 2)}` // Limitar a dos dígitos decimales
      : integerPart;
    // Convertir a número decimal y actualizar el estado
    setAreaTotalDePiso(formattedValue ? parseFloat(formattedValue) : 0);
  }}
  maxLength={5}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Año de código:</Text>
        <TextInput
        style={[styles.input, { width: 50 }]}
        value={anioCodigo} // Convertir el número entero a cadena para mostrar en el TextInput
        onChangeText={(text) => {
          // Permitir solo números
          const numericValue = text.replace(/[^0-9]/g, '');
          // Convertir a número entero y actualizar el estado
          setAnoCodigo(numericValue);
        }}
        keyboardType="numeric"
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
        <Text style={styles.inputLabel}>Año Construcción (Ampliación):</Text>
        <TextInput
        style={styles.inputText}
        value={amplAnioConstruccion.toString()} // Convertir el número entero a cadena para mostrar en el TextInput
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, '');
          // Convertir a número entero y actualizar el estado
          setAnoDeContruccion(numericValue ? parseInt(numericValue, 10) : 0);
        }}
        keyboardType="numeric"
        maxLength={4}
        />
      </View>

      <Text style={[styles.subtitle, styles.centerText]}>Ocupación:</Text>

      <View style={styles.checkboxGrid}>
        {femaOcupacions.map((checkbox) => (
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
            setSelectedValueTipoOcupacion(parseInt(itemValue, 10)); // Convertir el valor a número entero
            setTipoocupacion1(parseInt(itemValue, 10));
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
            setSelectedValueTipoSuelo(parseInt(itemValue, 10)); // Convertir el valor a número entero
            setTiposuelo1(parseInt(itemValue, 10)); // Actualizar el estado como número entero
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
          value={comentarios}
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
    marginTop: 30,
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
  nroPisosInfLabel: {
    marginLeft: 20, // Espacio de 4 píxeles entre el primer selector y el texto "Inf:"
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  smallPicker: {
    flex: 1,
    height: 40, // Reducir altura del selector
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    width: 80, // Reducir el ancho del selector
  },
  backButton: {
    backgroundColor: '#001f3f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  nextButton: {
    backgroundColor: '#001f3f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
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
    backgroundColor: '#001f3f',
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
    borderRadius: 10,
    height: 40,
    width: 0,
    padding: 0,
    paddingHorizontal: 10,
    marginRight: 2,
    //backgroundColor: 'red',
  }, 
});
export default FormularioFema2;

