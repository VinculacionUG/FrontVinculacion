import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from './AppContext';

const FormularioFema = ({ navigation }) => {
  const [tipoUso, setTipoUso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValuetipoUso, setSelectedValueTipoUso] = useState('');

  const {
    mimeType,
    setAdjuntarFotografica,
    data,
    setAdjuntarGrafico,
    direccion,
    setDireccion,
    CodigoPostal,
    setZip,
    otrosIdentificaciones,
    setOtrasIdentificaciones,
    nomEdificacion,
    setNombreEdificio,
    CodTipoUsoEdificacion,
    setUso,
    latitud,
    setLatitud,
    longitud,
    setLongitud,
    fechaEncuesta,
    setFecha,
    horaEncuesta,
    setHora,
  } = useContext(AppContext);

  const handleNext = () => {
    if (
      !mimeType ||
      !data ||
      !direccion ||
      !CodigoPostal ||
      !otrosIdentificaciones ||
      !nomEdificacion ||
      !tipoUso ||
      !latitud ||
      !longitud ||
      !fechaEncuesta ||
      !horaEncuesta
    ) {
      console.log('Datos guardados:', {
        mimeType,
        data,
        direccion,
        CodigoPostal,
        otrosIdentificaciones,
        nomEdificacion,
        CodTipoUsoEdificacion,
        latitud,
        longitud,
        fechaEncuesta,
        horaEncuesta,
      });
      alert('Por favor complete todos los campos.');
      return;
    }
    // Aquí puedes guardar los datos o hacer lo necesario antes de navegar
    console.log('Datos guardados:', {
      mimeType,
      data,
      direccion,
      CodigoPostal,
      otrosIdentificaciones,
      nomEdificacion,
      tipoUso,
      CodTipoUsoEdificacion,
      latitud,
      longitud,
      fechaEncuesta,
      horaEncuesta,
    });
    navigation.navigate('FormularioFema2');
  };

  const pickImage = async (setImage) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a las imágenes.');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled && result.assets && result.assets.length > 0 && result.assets[0].base64) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      } else {
        Alert.alert('Error', 'Hubo un problema al seleccionar la imagen. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al seleccionar imagen: ', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar la imagen. Por favor, intenta nuevamente.');
    }
  };

  const getFileNameFromUri = (uri) => {
    if (!uri) return null;
    const uriParts = uri.split('/');
    return uriParts[uriParts.length - 1];
  };




  useEffect(() => {

    const url = 'https://www.fema.somee.com/Users/TipoUso';

    const fetchTipoUso = async () => {
      try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result = await response.json();
        setTipoUso(result);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTipoUso();


  }, []);


  const handleUsoValueChange = (itemValue) => {
    setSelectedValueTipoUso(itemValue);
    setUso(itemValue); // Actualiza la variable CodTipoUsoEdificacion
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

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
      </TouchableOpacity>

      <Text style={styles.title}>Formulario FEMA P-154</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Fotografía:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setAdjuntarFotografica)}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {mimeType ? (
              <>
                {/* <Text style={styles.fileNameText}>{mimeType}</Text>, */}
                <Text style={styles.fileNameText}>Imagen Seleccionada: </Text>
                <Image source={{ uri: mimeType }} style={styles.image} />
              </>
            ) : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Gráfico:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setAdjuntarGrafico)}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {data ? (
              <>
                {/* <Text style={styles.fileNameText}>{data}</Text> */}
                <Text style={styles.fileNameText}>Gráfico Seleccionado: </Text>
                <Image source={{ uri: data }} style={styles.image} />
              </>
            ) : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dirección:</Text>
        <TextInput
          style={[styles.input, { paddingHorizontal: 20 }]}
          value={direccion}
          onChangeText={(text) => setDireccion(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ZIP:</Text>
        <TextInput
          style={styles.inputText}
          value={CodigoPostal}
          maxLength={6}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setZip(numericValue);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Otras Identificaciones:</Text>
        <TextInput
          style={styles.input}
          value={otrosIdentificaciones}
          onChangeText={(text) => setOtrasIdentificaciones(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre del Edificio:</Text>
        <TextInput
          style={styles.input}
          value={nomEdificacion}
          onChangeText={(text) => setNombreEdificio(text)}
        />
      </View>


      {/*

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Uso:</Text>
        <TextInput
          style={styles.input}
          value={CodTipoUsoEdificacion}
          onChangeText={(text) => setUso(text)}
        />
      </View>
*/}


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Uso:</Text>
        <Picker
          style={[styles.input]}
          selectedValue={selectedValuetipoUso}
          onValueChange={handleUsoValueChange} // Utiliza el nuevo método
        >
          <Picker.Item label="Seleccione" value="" />
          {tipoUso.map((item, index) => (
            <Picker.Item label={item.descripcion} value={item.codTipoUsoEdificacion} key={index} />
          ))}
        </Picker>
      </View>


      <View style={styles.inputContainerRow}>
        <View style={styles.dateInputContainer}>
          <Text style={styles.inputLabel}>Latitud:</Text>
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={latitud}
            onChangeText={(text) => setLatitud(text)}
          />
        </View>
        <View style={[styles.dateInputContainer, { marginLeft: -50 }]}>
          <Text style={[styles.inputLabel, { marginRight: -30 }]}>Longitud:</Text>
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={longitud}
            onChangeText={(text) => setLongitud(text)}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Fecha:</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="MM"
            //maxLength={2}
            keyboardType="numeric"
            value={fechaEncuesta.month}
            //onChangeText={(text) => setFecha(prevState => ({ ...prevState, month: text }))}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^a-zA-Z0-9]/g, ''); // Filtrar los caracteres no numéricos
              const intValue = parseInt(numericValue, 10); // Convertir el valor a un número entero
              if (
                (numericValue === '' || (intValue >= 1 && intValue <= 12)) &&  // Verificar si el valor está dentro del rango permitido (1 - 31)
                numericValue.length <= 2                                       // Filtrar la cantidad de números
              ) {
                //setDay(numericValue);
                setFecha(prevState => ({ ...prevState, month: text }))                                       // Actualizar el estado con el valor filtrado
              }
            }}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="DD"
            maxLength={2}
            keyboardType="numeric"
            value={fechaEncuesta.day}
            // onChangeText={(text) => setFecha(prevState => ({ ...prevState, day: text }))}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^a-zA-Z0-9]/g, ''); // Filtrar los caracteres no numéricos
              const intValue = parseInt(numericValue, 10); // Convertir el valor a un número entero
              if (
                (numericValue === '' || (intValue >= 1 && intValue <= 31)) &&  // Verificar si el valor está dentro del rango permitido (1 - 31)
                numericValue.length <= 2                                       // Filtrar la cantidad de números
              ) {
                //setDay(numericValue);
                setFecha(prevState => ({ ...prevState, day: text }))                                            // Actualizar el estado con el valor filtrado
              }
            }}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="AAAA"
            maxLength={4}
            keyboardType="numeric"
            value={fechaEncuesta.year}
            //onChangeText={(text) => setFecha(prevState => ({ ...prevState, year: text }))}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^a-zA-Z0-9]/g, ''); // Filtrar los caracteres no numéricos
              const intValue = parseInt(numericValue, 10); // Convertir el valor a un número entero
              if (
                (numericValue === '' || (intValue >= 1 && intValue <= 3000)) &&  // Verificar si el valor está dentro del rango permitido (1 - 31)
                numericValue.length <= 4                                       // Filtrar la cantidad de números
              ) {
                //setDay(numericValue);
                setFecha(prevState => ({ ...prevState, year: text }))                                          // Actualizar el estado con el valor filtrado
              }
            }}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Hora:</Text>
        <TextInput
          style={styles.inputText}
          value={horaEncuesta}
          onChangeText={(text) => setHora(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.backButton} onPress={handleNext}>
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
          <Text style={styles.buttonText}>Siguiente</Text>
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
    marginTop: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 8,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadButton: {
    //backgroundColor: 'navy',
    backgroundColor: '#001f3f',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
  },
  fileNameContainer: {
    marginLeft: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  fileNameText: {
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'normal',
    width: 100,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    height: 40,
    padding: 0,
    paddingHorizontal: 10,
    marginRight: 2,
  },
  inputText: {
    flex: 0.20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    height: 40,
    width: 0,
    padding: 0,
    paddingHorizontal: 10,
    marginRight: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  backButton: {
    backgroundColor: '#001f3f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
    paddingHorizontal: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    width: 70,
    marginRight: 5,
  },
  dateSeparator: {
    fontSize: 18,
    marginRight: 5,
  },
  inputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Asegura que la flecha esté sobre otros elementos
  },
});

export default FormularioFema;