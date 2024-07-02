import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const FormularioFema = ({ navigation }) => {
  const [direccion, setDireccion] = useState('');
  const [zip, setZip] = useState('');
  const [otrasIdentificaciones, setOtrasIdentificaciones] = useState('');
  const [nombreEdificio, setNombreEdificio] = useState('');
  const [uso, setUso] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fecha, setFecha] = useState({ year: '', month: '', day: '' });
  const [hora, setHora] = useState('');
  const [file1Name, setFile1Name] = useState('');
  const [file2Name, setFile2Name] = useState('');
  const [selectedFile1, setSelectedFile1] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(false);

  const handleNext = () => {
    navigation.navigate('FormularioFema2', {
      direccion,
      zip,
      otrasIdentificaciones,
      nombreEdificio,
      uso,
      latitud,
      longitud,
      fecha,
      hora,
      file1Name,
      file2Name,
    });
  };

  const handleDocument1 = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg'],
      });
      if (result.assets.length > 0) {
        setFile1Name(result.assets[0].name);
        setSelectedFile1(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocument2 = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg'],
      });
      if (result.assets.length > 0) {
        setFile2Name(result.assets[0].name);
        setSelectedFile2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Fotografía:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleDocument1}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {selectedFile1 ? (
              <Text>{file1Name}</Text>
            ) : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adjuntar Gráfico:</Text>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleDocument2}>
            <Text style={styles.uploadButtonText}>Subir</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {selectedFile2 ? (
              <Text>{file2Name}</Text>
            ) : (
              <Text>No se eligió ningún archivo</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dirección:</Text>
        <TextInput
          style={[styles.input, { textAlign: 'center', paddingHorizontal: 20 }]} // Ajuste manual hacia la izquierda y hacia la derecha
          value={direccion}
          onChangeText={(text) => setDireccion(text)}
        />
      </View>
         
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ZIP:</Text>
        <TextInput
          style={styles.inputText}     
          value={zip}
          maxLength={6}
          onChangeText={(text) => {
         // Filtrar los caracteres no numéricos utilizando una expresión regular
         const numericValue = text.replace(/[^0-9]/g, '');
         setZip(numericValue);
        }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Otras Identificaciones:</Text>
        <TextInput
          style={styles.input}
          value={otrasIdentificaciones}
          onChangeText={(text) => setOtrasIdentificaciones(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre del Edificio:</Text>
        <TextInput
          style={styles.input}
          value={nombreEdificio}
          onChangeText={(text) => setNombreEdificio(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Uso:</Text>
        <TextInput
          style={styles.input}
          value={uso}
          onChangeText={(text) => setUso(text)}
        />
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
            placeholder="AAAA"
            maxLength={4}
            keyboardType="numeric"
            value={fecha.year}
            onChangeText={(text) => setFecha(prevState => ({ ...prevState, year: text }))}
          />
        </View>
      </View>
 {/*   */}
      <View style={styles.inputContainer}>        
        <Text style={styles.inputLabel}>Hora:</Text>
        <TextInput
          style={styles.inputText}
          value={hora}
          onChangeText={(text) => setHora(text)}
        />
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
});

export default FormularioFema;





       


         


         




