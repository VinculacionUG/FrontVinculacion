import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const [inspector, setInspector] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [fecha, setFecha] = useState('');
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
      inspector,
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


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Inspector  </Text>
        <Picker
          style={styles.input}
          selectedValue={inspector}
          onValueChange={(itemValue) => setInspector(itemValue)}
        >
          <Picker.Item label="Inspector 1" value="inspector1" />
          <Picker.Item label="Inspector 2" value="inspector2" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Supervisor  </Text>
        <Picker
          style={styles.input}
          selectedValue={supervisor}
          onValueChange={(itemValue) => setSupervisor(itemValue)}
        >
          <Picker.Item label="Supervisor 1" value="supervisor1" />
          <Picker.Item label="Supervisor 2" value="supervisor2" />
        </Picker>
      </View>


  <View style={styles.section}>
  <Text style={styles.sectionTitle}>Adjuntar Fotografía</Text>
  <View style={styles.uploadButtonContainer}>
    <TouchableOpacity style={styles.uploadButton} onPress={handleDocument1}>
      <Text style={styles.uploadButtonText}>Subir</Text>
    </TouchableOpacity>
    {selectedFile1 ? (
      <Text>{file1Name}</Text>
    ) : (
      <Text>No se eligió ningún archivo</Text>
    )}
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Adjuntar Gráfico</Text>
  <View style={styles.uploadButtonContainer}>
    <TouchableOpacity style={styles.uploadButton} onPress={handleDocument2}>
      <Text style={styles.uploadButtonText}>Subir</Text>
    </TouchableOpacity>
    {selectedFile2 ? (
      <Text>{file2Name}</Text>
    ) : (
      <Text>No se eligió ningún archivo</Text>
    )}
  </View>
</View>


      <Text style={styles.subtitle}>Información del Edificio</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dirección  </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la dirección"
          value={direccion}
          onChangeText={(text) => setDireccion(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ZIP  </Text>
        <TextInput
          style={styles.input}
          placeholder="ZIP"
          value={zip}
          onChangeText={(text) => setZip(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Otras Identificaciones  </Text>
        <TextInput
          style={styles.input}
          placeholder="Otras Identificaciones"
          value={otrasIdentificaciones}
          onChangeText={(text) => setOtrasIdentificaciones(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre del Edificio  </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Edificio"
          value={nombreEdificio}
          onChangeText={(text) => setNombreEdificio(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Uso  </Text>
        <TextInput
          style={styles.input}
          placeholder="Uso"
          value={uso}
          onChangeText={(text) => setUso(text)}
        />
      </View>

      <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Latitud  </Text>
  <TextInput
    style={[styles.input, styles.smallInput]}
    placeholder="Latitud"
    value={latitud}
    onChangeText={(text) => setLatitud(text)}
  />
  <Text style={styles.inputLabel}>Longitud  </Text>
  <TextInput
    style={[styles.input, styles.smallInput]}
    placeholder="Longitud"
    value={longitud}
    onChangeText={(text) => setLongitud(text)}
  />
</View>

  <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Fecha  </Text>
  <View style={styles.dateInputContainer}>
    <TextInput
      style={[styles.input, styles.dateInput]}
      placeholder="MM"
      maxLength={2}
      keyboardType="numeric"
      value={fecha.substring(0, 2)}
      onChangeText={(text) => {
        if (text.length <= 2) {
          setFecha(text + fecha.substring(2, 3) + fecha.substring(3, 10));
        }
      }}
    />
    <Text style={styles.dateSeparator}>/</Text>
    <TextInput
      style={[styles.input, styles.dateInput]}
      placeholder="DD"
      maxLength={2}
      keyboardType="numeric"
      value={fecha.substring(3, 5)}
      onChangeText={(text) => {
        if (text.length <= 2) {
          setFecha(fecha.substring(0, 3) + text + fecha.substring(5, 10));
        }
      }}
    />
    <Text style={styles.dateSeparator}>/</Text>
    <TextInput
      style={[styles.input, styles.dateInput]}
      placeholder="AAAA"
      maxLength={4}
      keyboardType="numeric"
      value={fecha.substring(6, 10)}
      onChangeText={(text) => {
        if (text.length <= 4) {
          setFecha(fecha.substring(0, 6) + text);
        }
      }}
    />
  </View>
</View>


    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Hora  </Text>
      <TextInput
       style={[styles.input, styles.smallInput1]} // Aplicar el estilo smallInput aquí
       placeholder="Hora"
       value={hora}
       onChangeText={(text) => setHora(text)}
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        <Text style={styles.ButtonText}>Regresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleNext}>
        <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        <Text style={styles.ButtonText}>Continuar</Text>
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  documentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
  },
  documentButtonText: {
    color: 'black',
  },
  fileName: {
    marginLeft: 8,
    fontStyle: 'italic',
    color: 'gray',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginLeft: 8,  
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10, // Ajusta este valor para cambiar la ovalidad
  },
  backButton: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
    },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    width: 50,
    marginRight: 5,
  },
  dateSeparator: {
    fontSize: 20,
    marginRight: 5,
  },
  locationInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  smallInput: {
    width: 60,
    marginRight: 10,
  },
  smallInput1: {
    width: 60,
    marginRight: 200,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para distribuir los elementos horizontalmente
  },
  uploadButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
  },
  documentButtonText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
    
});

export default FormularioFema;




