import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
//import { CheckBox, Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormularioFema2 = ({ route, navigation }) => {
  const [numPisos, setNumPisos] = useState('');
  const [info, setInfo] = useState('');
  const [anioConstruccion, setAnioConstruccion] = useState('');
  const [areaTotalPiso, setAreaTotalPiso] = useState('');
  const [anioCodigo, setAnioCodigo] = useState('');
  const [anioConstruccion2, setAnioConstruccion2] = useState('');
  const [ampliacion, setAmpliacion] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [tipoSuelo, setTipoSuelo] = useState('');
  const [comentario, setComentario] = useState('');
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);
  const [checkBox5, setCheckBox5] = useState(false);
  const [checkBox6, setCheckBox6] = useState(false);
  const [checkBox7, setCheckBox7] = useState(false);
  const [checkBox8, setCheckBox8] = useState(false);
  const [checkBox9, setCheckBox9] = useState(false);
  
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
  } = params;

  const handleNext = () => {
    navigation.navigate('FormularioFema3', {
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
      info,
      anioConstruccion,
      areaTotalPiso,
      anioCodigo,
      anioConstruccion2,
      ampliacion,
      ocupacion,
      tipoSuelo,
      comentario,
      checkBox1,
      checkBox2,
      checkBox3,
      checkBox4,
      checkBox5,
      checkBox6,
      checkBox7,
      checkBox8,
      checkBox9,
    });
  };


  //const FormularioCheckbox = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  
    const checkboxes = [
      { id: 1, label: 'Asamblea' },
      { id: 2, label: 'Industria' },
      { id: 3, label: 'Herramientas' },
      { id: 4, label: 'Comercial' },
      { id: 5, label: 'Oficina' },
      { id: 6, label: 'Almacén' },
      { id: 7, label: 'Servicios Em.' },
      { id: 8, label: 'Escuela' },
      { id: 9, label: 'Residencia' },
    ];
  
    const handleCheckboxChange = (id) => {
      setSelectedCheckbox(id);
    };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>N° de Pisos: Sup:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={numPisos}
          onValueChange={(itemValue) => setNumPisos(itemValue)}
        >
          {Array.from({ length: 29 }, (_, i) => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
        
        <Text style={[styles.inputLabel, styles.infLabel]}>Inf:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={info}
          onValueChange={(itemValue) => setInfo(itemValue)}
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
          value={anioConstruccion}
          maxLength={4}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnioConstruccion(numericValue);
           }}
        />
        <View style={{ width: 10, height: 40 }} />
        <Text style={[styles.inputLabel, { height: 40, width: 150 }]}>Área total de piso (m2):</Text>
        <TextInput
          style={[styles.input, { width: 60, height: 40 }]}
          value={areaTotalPiso}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAreaTotalPiso(numericValue);
          }}
          maxLength={5}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Año de código:</Text>
        <View style={{ width: 5 }} /> 
        <TextInput
          style={[styles.input, { width: 0 }]} 
          value={anioCodigo}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnioCodigo(numericValue);
          }}
        />
        <View style={{ width: 10 }} />
        <Text style={styles.inputLabel}>Ampliación:</Text>
        <Picker
          style={styles.smallPicker}
          selectedValue={ampliacion}
          onValueChange={(itemValue) => setAmpliacion(itemValue)}
        >
          <Picker.Item label="Sí" value="si" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel }>Año de Construcción:</Text>
        {/*        
        <Text style={[styles.inputLabel, { height: 40, width: 110, marginRight: 2 }]}>Año de Construcción:</Text>
        <View style={{ width: 20, height: 20 }} />
       */} 
       
        <TextInput
          //style={[styles.input, { width: 20, height: 20 }]}
          style={styles.inputText}
          value={anioConstruccion2}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setAnioConstruccion2(numericValue);
          }}
          maxLength={4}
        />
      </View>
 {/*   */}

    <Text style={[styles.subtitle, styles.centerText]}>Ocupación:</Text>
    <Text style={[styles.subtitle, styles.boldRedText, styles.centerText]}></Text>
 
    <View style={styles.checkboxGrid}>
        {checkboxes.map((checkbox) => (
          <View key={checkbox.id} style={styles.checkboxContainer}>
            <CheckBox
              title={checkbox.label}
              checked={selectedCheckbox === checkbox.id}
              onPress={() => handleCheckboxChange(checkbox.id)}
              containerStyle={styles.checkbox}
            />
          </View>
        ))}
      </View>

      {/*   
      <Button
        title="Guardar Datos"
        onPress={() => {
          if (selectedCheckbox !== null) {
            const seleccionada = checkboxes.find(checkbox => checkbox.id === selectedCheckbox);
            Alert.alert('Datos guardados', `Seleccionaste: ${seleccionada.label}`);
          } else {
            Alert.alert('Error', 'Debes seleccionar una opción');
          }
        }}    
        buttonStyle={styles.button}
      />   */}
      {selectedCheckbox !== null && (
        <Text style={styles.resultado}>
          Seleccionaste: {checkboxes.find(checkbox => checkbox.id === selectedCheckbox).label}
        </Text>
      )}


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tipo de Ocupación:</Text>
        <View style={{ width: 5, height: 40 }} /> 
        <Picker
          style={styles.smallPicker}
          selectedValue={ocupacion}
          on          ValueChange={(itemValue) => setOcupacion(itemValue)}
          >
            <Picker.Item label="Histórico" value="Histórico" />
            <Picker.Item label="Albergue" value="Albergue" />
            <Picker.Item label="Gubernamnetal" value="Gubernamnetal" />
          </Picker>
        </View>
  
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tipo de suelo:</Text>
          <View style={{ width: 43, height: 40 }} /> 
          <Picker
            style={styles.smallPicker}
            selectedValue={tipoSuelo}
            onValueChange={(itemValue) => setTipoSuelo(itemValue)}
          >
            <Picker.Item label="Roca Dura" value="Roca Dura" />
            <Picker.Item label="Roca Semi-dura" value="Roca Semi-dura" />
            <Picker.Item label="Suelo Denso" value="Suelo Denso" />
            <Picker.Item label="Suelo Rigido" value="Suelo Rigido" />
            <Picker.Item label="Suelo Blando" value="Suelo Blando" />
            <Picker.Item label="Suelo Pobre" value="Suelo Pobre" />
          </Picker>
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
  





