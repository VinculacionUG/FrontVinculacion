import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, CheckBox } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormularioFema3 = ({ route, navigation }) => {
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
    numPisos,
    sup,
    info,
    anioConstruccion,
    areaTotalPiso,
    anioCodigo,
    anioConstruccion2,
    ampliacion,
    ocupacion,
    tipoSuelo,
    comentario,
  } = params;

  const [tipoEdificacion, setTipoEdificacion] = useState('');
  const [subTipo, setSubTipo] = useState('');
  const [resultadoBase, setResultadoBase] = useState('');
  const [irregularidadVerticalSevera, setIrregularidadVerticalSevera] = useState('');
  const [irregularidadVerticalModerada, setIrregularidadVerticalModerada] = useState('');
  const [plantaIrregular, setPlantaIrregular] = useState('');
  const [preCodigoSismico, setPreCodigoSismico] = useState('');
  const [postCodigoSismico, setPostCodigoSismico] = useState('');
  const [sueloTipoAB, setSueloTipoAB] = useState('');
  const [sueloTipoE1a3, setSueloTipoE1a3] = useState('');
  const [sueloTipoEMayor3, setSueloTipoEMayor3] = useState('');
  const [resultadoSmin, setResultadoSmin] = useState('');
  const [resultadoFinal, setResultadoFinal] = useState('');

  const [estChecked, setEstChecked] = useState(false);
  const [dnkChecked, setDnkChecked] = useState(false);

  const getSubTipos = (tipo) => {
    switch (tipo) {
      case 'W':
        return ['W1', 'W1A', 'W2'];
      case 'S':
        return ['S1', 'S2', 'S3', 'S4', 'S5'];
      case 'C':
        return ['C1', 'C2', 'C3'];
      case 'PC':
        return ['PC1', 'PC2'];
      case 'RM':
        return ['RM1', 'RM2'];
      case 'URM':
        return ['URM'];
      case 'MH':
        return ['MH'];
      default:
        return [];
    }
  };

  const handleTipoEdificacionChange = (itemValue) => {
    setTipoEdificacion(itemValue);
    const subTipos = getSubTipos(itemValue);
    if (subTipos.length === 1) {
      setSubTipo(subTipos[0]);
    } else {
      setSubTipo('');
    }
  };

  const handleNext = () => {
    navigation.navigate('FormularioFema4', {
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
      sup,
      info,
      anioConstruccion,
      areaTotalPiso,
      anioCodigo,
      anioConstruccion2,
      ampliacion,
      ocupacion,
      tipoSuelo,
      comentario,
      tipoEdificacion,
      subTipo,
      resultadoBase,
      irregularidadVerticalSevera,
      irregularidadVerticalModerada,
      plantaIrregular,
      preCodigoSismico,
      postCodigoSismico,
      sueloTipoAB,
      sueloTipoE1a3,
      sueloTipoEMayor3,
      resultadoSmin,
      resultadoFinal,
    });
  };
  
  const handleBack = () => {
    navigation.goBack();
  };

  const calcularResultadoFinal = () => {
    setResultadoFinal('Resultado calculado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={styles.subtitle}>Resultado Base, Modificadores y Resultado Final de Nivel 1 de Análisis, SL1</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tipo de Edificación:</Text>
        <Picker
          style={styles.picker}
          selectedValue={tipoEdificacion}
          onValueChange={handleTipoEdificacionChange}
        >
          <Picker.Item label="Seleccione..." value="" />
          <Picker.Item label="W" value="W" />
          <Picker.Item label="S" value="S" />
          <Picker.Item label="C" value="C" />
          <Picker.Item label="PC" value="PC" />
          <Picker.Item label="RM" value="RM" />
          <Picker.Item label="URM" value="URM" />
          <Picker.Item label="MH" value="MH" />
        </Picker>
        <Text style={[styles.inputLabel, { marginLeft: 8 }]}>Sub Tipo:</Text>
        <Picker
          style={styles.picker}
          selectedValue={subTipo}
          onValueChange={(itemValue) => setSubTipo(itemValue)}
        >
          <Picker.Item label="Seleccione..." value="" />
          {getSubTipos(tipoEdificacion).map((subTipo) => (
            <Picker.Item key={subTipo} label={subTipo} value={subTipo} />
          ))}
        </Picker>
      </View>

      <View style={styles.squareContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>RESULTADO BASE:</Text>
          <TextInput
            style={[styles.resultInput1, { marginRight: 17 }]}
            value={resultadoBase}
            onChangeText={setResultadoBase}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Irregularidad Vertical Severa:</Text>
            <TextInput
              style={styles.resultInput}
              value={irregularidadVerticalSevera}
              onChangeText={setIrregularidadVerticalSevera}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Irregularidad Vertical Moderada:</Text>
            <TextInput
              style={styles.resultInput}
              value={irregularidadVerticalModerada}
              onChangeText={setIrregularidadVerticalModerada}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Planta Irregular:</Text>
            <TextInput
              style={styles.resultInput}
              value={plantaIrregular}
              onChangeText={setPlantaIrregular}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Pre-código Sísmico:</Text>
            <TextInput
              style={styles.resultInput}
              value={preCodigoSismico}
              onChangeText={setPreCodigoSismico}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Post-código Sísmico:</Text>
            <TextInput
              style={styles.resultInput}
              value={postCodigoSismico}
              onChangeText={setPostCodigoSismico}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo tipo A o B:</Text>
            <TextInput
              style={styles.resultInput}
              value={sueloTipoAB}
              onChangeText={setSueloTipoAB}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo tipo E (1-3 pisos):</Text>
            <TextInput
              style={styles.resultInput}
              value={sueloTipoE1a3}
              onChangeText={setSueloTipoE1a3}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo tipo E (mayor a 3 pisos):</Text>
            <TextInput
              style={styles.resultInput}
              value={sueloTipoEMayor3}
              onChangeText={setSueloTipoEMayor3}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>RESULTADO SMIN:</Text>
          <TextInput
            style={[styles.resultInput, { marginRight: 18 }]}
            value={resultadoSmin}
            onChangeText={setResultadoSmin}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.resultContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calcularResultadoFinal}>
          <Text style={styles.calculateButtonText}>Calcular</Text>
        </TouchableOpacity>
        <Text style={[styles.resultLabel, { marginLeft: 50 }]}>Resultado Final:</Text>
        <TextInput
          style={[styles.resultInput, { marginRight: 35 }]}
          value={resultadoFinal}
          onChangeText={setResultadoFinal}
          editable={false}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={estChecked}
          onValueChange={setEstChecked}
        />
        <Text style={styles.checkboxLabel}>EST</Text>
        <CheckBox
          value={dnkChecked}
          onValueChange={setDnkChecked}
        />
        <Text style={styles.checkboxLabel}>DNK</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  picker: {
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  squareContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    padding: 16,
    marginBottom: 16,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  resultLabel: {
    fontSize: 16,
    marginLeft: 0,
    width: '60%',
    textAlign: 'left',
  },
  resultInput: {
    height: 30,
    width: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  resultInput1: {
    height: 30,
    width: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  calculateButton: {
    backgroundColor: 'navy',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 8,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 16,
  },
  saveButton: {
    backgroundColor: 'navy',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // Alinea los elementos en una fila
    justifyContent: 'space-between', // Distribuye los elementos horizontalmente
  },
  backButton: {
    backgroundColor: 'navy',
    flexDirection: 'row', // Alinea los elementos en una fila
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 24,
    marginRight: 10, // Agregué un margen derecho para separar los botones
  },
  nextButton: {
    backgroundColor: 'navy',
    flexDirection: 'row', // Alinea los elementos en una fila
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
});

export default FormularioFema3;


  















  









