import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from './AppContext';

const FormularioFema = ({ navigation }) => {
  const {
    adjuntarFotografica,
    setAdjuntarFotografica,
    adjuntarGrafico,
    setAdjuntarGrafico,
    direccion,
    setDireccion,
    zip,
    setZip,
    otrasIdentificaciones,
    setOtrasIdentificaciones,
    nombreEdificio,
    setNombreEdificio,
    uso,
    setUso,
    latitud,
    setLatitud,
    longitud,
    setLongitud,
    fecha,
    setFecha,
    hora,
    setHora,
  } = useContext(AppContext);

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const missingFields = validateForm();
    if (missingFields.length === 0) {
      // Aquí puedes guardar los datos o hacer lo necesario antes de navegar
      console.log('Datos guardados:', {
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
      });

      navigation.navigate('FormularioFema2');
    } else {
      const errorMessages = {};
      missingFields.forEach(field => {
        errorMessages[field] = true; // Ahora solo guardamos el estado de error como true
      });
      setErrors(errorMessages);
    }
  };

  const validateForm = () => {
    const missingFields = [];
    if (!adjuntarFotografica) missingFields.push('Fotografía');
    if (!adjuntarGrafico) missingFields.push('Gráfico');
    if (!direccion) missingFields.push('Dirección');
    if (!zip) missingFields.push('ZIP');
    if (!otrasIdentificaciones) missingFields.push('Otras Identificaciones');
    if (!nombreEdificio) missingFields.push('Nombre del Edificio');
    if (!uso) missingFields.push('Uso');
    if (!latitud) missingFields.push('Latitud');
    if (!longitud) missingFields.push('Longitud');
    if (!fecha.month || !fecha.day || !fecha.year) missingFields.push('Fecha');
    if (!hora) missingFields.push('Hora');
    return missingFields;
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
      console.error("Error al seleccionar imagen: ", error);
      Alert.alert("Error", "Hubo un problema al seleccionar la imagen. Por favor, intenta nuevamente.");
    }
  };

  const getFileNameFromUri = (uri) => {
    if (!uri) return null;
    const uriParts = uri.split('/');
    return uriParts[uriParts.length - 1];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Fotografía:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setAdjuntarFotografica)}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {adjuntarFotografica ? (
              <>
                <Text style={styles.fileNameText}>Imagen Seleccionada: </Text>
                <Image source={{ uri: adjuntarFotografica }} style={styles.image} />
              </>
            ) : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
          {errors.Fotografía && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Gráfico:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setAdjuntarGrafico)}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {adjuntarGrafico ? (
              <>
                <Text style={styles.fileNameText}>Gráfico Seleccionado: </Text>
                <Image source={{ uri: adjuntarGrafico }} style={styles.image} />
              </>
            ) : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
          {errors.Gráfico && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dirección:</Text>
        <TextInput
          style={[styles.input, { textAlign: 'center', paddingHorizontal: 20 }]}
          value={direccion}
          onChangeText={(text) => setDireccion(text)}
        />
        {errors.Dirección && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ZIP:</Text>
        <TextInput
          style={styles.inputText}
          value={zip}
          maxLength={6}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setZip(numericValue);
          }}
        />
        {errors.ZIP && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Otras Identificaciones:</Text>
        <TextInput
          style={styles.input}
          value={otrasIdentificaciones}
          onChangeText={(text) => setOtrasIdentificaciones(text)}
        />
        {errors['Otras Identificaciones'] && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre del Edificio:</Text>
        <TextInput
          style={styles.input}
          value={nombreEdificio}
          onChangeText={(text) => setNombreEdificio(text)}
        />
        {errors['Nombre del Edificio'] && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Uso:</Text>
        <TextInput
          style={styles.input}
          value={uso}
          onChangeText={(text) => setUso(text)}
        />
        {errors.Uso && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
      </View>

      <View style={styles.inputContainerRow}>
        <View style={styles.dateInputContainer}>
          <Text style={styles.inputLabel}>Latitud:</Text>
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={latitud}
            onChangeText={(text) => setLatitud(text)}
          />
          {errors.Latitud && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
        </View>
        <View style={[styles.dateInputContainer, { marginLeft: -50 }]}>
          <Text style={[styles.inputLabel, { marginRight: -30 }]}>Longitud:</Text>
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={longitud}
            onChangeText={(text) => setLongitud(text)}
          />
          {errors.Longitud && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Fecha:</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="MM"
            maxLength={2}
            keyboardType="numeric"
            value={fecha.month}
            onChangeText={(text) => setFecha(prevState => ({ ...prevState, month: text }))}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="DD"
            maxLength={2}
            keyboardType="numeric"
            value={fecha.day}
            onChangeText={(text) => setFecha(prevState => ({ ...prevState, day: text }))}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="YYYY"
            maxLength={4}
            keyboardType="numeric"
            value={fecha.year}
            onChangeText={(text) => setFecha(prevState => ({ ...prevState, year: text }))}
          />
        </View>
        {errors.Fecha && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Hora:</Text>
        <TextInput
          style={styles.inputText}
          value={hora}
          onChangeText={(text) => setHora(text)}
        />
        {errors.Hora && <MaterialCommunityIcons name="alert-circle" size={24} color="red" />}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
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
    backgroundColor: 'navy',
    borderRadius: 10,
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
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  fileNameText: {
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
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
    borderRadius: 5,
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
    borderRadius: 5,
    height: 40,
    width: 0,
    padding: 0,
    paddingHorizontal: 10,
    marginRight: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    backgroundColor: 'navy',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default FormularioFema;

