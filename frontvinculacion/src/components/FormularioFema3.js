import React, { useEffect, useState, useContext } from 'react';
//import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, CheckBox } from 'react-native';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, CheckBox } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from './AppContext';

const FormularioFema3 = ({ route, navigation }) => {

  const [tipoEdificacion, setTipoEdificacion] = useState([]);
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

  //const [selectedValueTipoEdificacion, setSelectedValueTipoEdificacion] = useState('');
  //const [subTipo, setSubTipo] = useState('');
  const [subTipos, setSubTipos] = useState([]);

  const [tipoEdificacionList, setTipoEdificacionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValueTipoEdificacion, setSelectedValueTipoEdificacion] = useState('');

  const [estChecked, setEstChecked] = useState(false);
  const [dnkChecked, setDnkChecked] = useState(false);

  const [selectedValues, setSelectedValues] = useState([]);

  //Suma
  const [includeResultadoBase, setIncludeResultadoBase] = useState(false);
  const [includeIrregularidadSevera, setIncludeIrregularidadSevera] = useState(false);
  const [includeIrregularidadModerada, setIncludeIrregularidadModerada] = useState(false);
  const [includePlantaIrregular, setIncludePlantaIrregular] = useState(false);
  const [includePreCodigoSismico, setIncludePreCodigoSismico] = useState(false);
  const [includePostCodigoSismico, setIncludePostCodigoSismico] = useState(false);
  const [includeSueloTipoAB, setIncludeSueloTipoAB] = useState(false);
  const [includeSueloTipoE1a3, setIncludeSueloTipoE1a3] = useState(false);
  const [includeSueloTipoEMayor3, setIncludeSueloTipoEMayor3] = useState(false);
  const [includeResultadoSmin, setIncludeResultadoSmin] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [codPuntuacionMatrizSec, setCodPuntuacionMatrizSec] = useState('');

  const handleChangeCheckboxResultadoBase = () => {
    setIncludeResultadoBase(!includeResultadoBase);
  };

  const handleChangeCheckboxSevera = () => {
    setIncludeIrregularidadSevera(!includeIrregularidadSevera);
  };

  const handleChangeCheckboxModerada = () => {
    setIncludeIrregularidadModerada(!includeIrregularidadModerada);
  };

  const handleChangeCheckboxPlantaIrregular = () => {
    setIncludePlantaIrregular(!includePlantaIrregular);
  };

  const handleChangeCheckboxPreCodigoSismico = () => {
    setIncludePreCodigoSismico(!includePreCodigoSismico);
  };

  const handleChangeCheckboxPostCodigoSismico = () => {
    setIncludePostCodigoSismico(!includePostCodigoSismico);
  };

  const handleChangeCheckboxSueloTipoAB = () => {
    setIncludeSueloTipoAB(!includeSueloTipoAB);
  };

  const handleChangeCheckboxSueloTipoE1a3 = () => {
    setIncludeSueloTipoE1a3(!includeSueloTipoE1a3);
  };

  const handleChangeCheckboxSueloTipoEMayor3 = () => {
    setIncludeSueloTipoEMayor3(!includeSueloTipoEMayor3);
  };

  const handleChangeCheckboxResultadoSmin = () => {
    setIncludeResultadoSmin(!includeResultadoSmin);
  };


  const handleInputPress = (setCheckboxState, currentCheckboxState) => {
    setCheckboxState(!currentCheckboxState); // Cambia el estado del checkbox
  };

  const {
    resultado
  } = useContext(AppContext);

  const handleNext = () => {
    navigation.navigate('FormularioFema4', {
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Función para resetear los valores mostrados
  const resetearValoresMostrados = () => {
    setResultadoBase('');
    setIrregularidadVerticalSevera('');
    setIrregularidadVerticalModerada('');
    setPlantaIrregular('');
    setPreCodigoSismico('');
    setPostCodigoSismico('');
    setSueloTipoAB('');
    setSueloTipoE1a3('');
    setSueloTipoEMayor3('');
    setResultadoSmin('');
    setResultadoFinal('');

    // Resetear estados de los checkboxes
    setIncludeResultadoBase(false);
    setIncludeIrregularidadSevera(false);
    setIncludeIrregularidadModerada(false);
    setIncludePlantaIrregular(false);
    setIncludePreCodigoSismico(false);
    setIncludePostCodigoSismico(false);
    setIncludeSueloTipoAB(false);
    setIncludeSueloTipoE1a3(false);
    setIncludeSueloTipoEMayor3(false);
    setIncludeResultadoSmin(false);
  };

  const calcularResultadoFinal = () => {

    let suma = parseFloat(resultadoBase);

    // if (includeResultadoBase) {
    //   suma += parseFloat(resultadoBase);
    // }
    if (includeIrregularidadSevera) {
      suma += parseFloat(irregularidadVerticalSevera);
    }
    if (includeIrregularidadModerada) {
      suma += parseFloat(irregularidadVerticalModerada);
    }
    if (includePlantaIrregular) {
      suma += parseFloat(plantaIrregular);
    }
    if (includePreCodigoSismico) {
      suma += parseFloat(preCodigoSismico);
    }
    if (includePostCodigoSismico) {
      suma += parseFloat(postCodigoSismico);
    }
    if (includeSueloTipoAB) {
      suma += parseFloat(sueloTipoAB);
    }
    if (includeSueloTipoE1a3) {
      suma += parseFloat(sueloTipoE1a3);
    }
    if (includeSueloTipoEMayor3) {
      suma += parseFloat(sueloTipoEMayor3);
    }
    if (includeResultadoSmin) {
      suma += parseFloat(resultadoSmin);
    }

    const resultadoFinal = suma.toFixed(2); // Redondea a 2 decimales si es necesario
    setResultadoFinal(resultadoFinal.toString());

  };

  useEffect(() => {

    const url = 'https://www.fema.somee.com/Users/TipoEdificaciones';
    const fetchTipoEdificacion = async () => {
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
        setTipoEdificacion(result);
        //if (result.length > 0) {
        //  setTipoEdificacion(result[0].descripcion); // Adjust based on your API response structure
        //}
        //console.log(result);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTipoEdificacion();
  }, []);


  const fetchSubTipos = async (tipo) => {
    const url2 = 'https://www.fema.somee.com/Users/SubTipoEdificacion';
    try {
      const response = await fetch(url2);
      if (!response.ok) {
        throw new Error('Error al obtener los subtipos de edificación');
      }
      const result = await response.json();
      //console.log('Datos recibidos de SubTipoEdificacion: ', result);
      const filteredSubTipos = result
        .filter(item => item.descripcion.startsWith(tipo))
        .map(item => item.descripcion);
      setSubTipos(filteredSubTipos);
    } catch (error) {
      setError(error.message);
    }
  };
  //  if (selectedValueTipoEdificacion) {
  //    fetchSubTipos(selectedValueTipoEdificacion);
  //  }


  useEffect(() => {
    const fetchResultadoBase = async () => {
      resetearValoresMostrados(); // Resetear los valores mostrados al comenzar la carga de nueva información
      if (!selectedValueTipoEdificacion || !subTipo || subTipo === 'Seleccione') {
        // Si falta alguno de los valores o subTipo es 'Seleccione', reseteamos los valores mostrados
        resetearValoresMostrados(); 
        return;
      }

      const baseUrl = 'https://www.fema.somee.com/FemaTres/consultarResultadoBase/';

      const tipoEdificacionMap = {
        'W-W1': 1,
        'W-W1A': 2,
        'W-W2': 3,
        'S-S1(MRF)': 4,
        'S-S2(BR)': 5,
        'S-S3(LM)': 6,
        'S-S4(RCSW)': 7,
        'S-S5(URMINF)': 8,
        'C-C1(MRF)': 9,
        'C-C2(SW)': 10,
        'C-C3(URMINF)': 11,
        'PC-PC1(TU)': 12,
        'PC-PC2': 13,
        'RM-RM1(FD)': 14,
        'RM-RM2(RD)': 15,
        'URM-URM': 16,
        'MH-MH': 17,
      };

      const key = `${selectedValueTipoEdificacion}-${subTipo}`;

      // Verifica si existe una entrada válida en el mapa para la combinación Tipo de Edificación y Subtipo
      if (!tipoEdificacionMap.hasOwnProperty(key)) {
        resetearValoresMostrados(); 
        console.warn(`No se encontró una combinación válida para Tipo de Edificación: ${selectedValueTipoEdificacion} y Subtipo: ${subTipo}`);
        return; // Si no hay una combinación válida, salimos de la función
      }

      const numeroFinalUrl = tipoEdificacionMap[key];
      const url3 = `${baseUrl}${numeroFinalUrl}`;

      try {
        const response = await fetch(url3,
          {
            method: 'GET',
          }
        );
        if (!response.ok) {
          throw new Error(`Error en la red ${response.status} ${response.statusText}`);
        }
        const result = await response.json();

        // Verificar si result es un array y no está vacío antes de iterar sobre él
        if (Array.isArray(result) && result.length > 0) {
          result.forEach((item) => {
            const valor = item.valor ?? '0'; // Asigna '0' si item.valor es null o undefined
              switch (item.codTipoPuntuacion) {
                case 9:
                  setResultadoBase(valor);
                  break;
                case 1:
                  setIrregularidadVerticalSevera(valor);
                  break;
                case 2:
                  setIrregularidadVerticalModerada(valor);
                  break;
                case 3:
                  setPlantaIrregular(valor);
                  break;
                case 4:
                  setPreCodigoSismico(valor);
                  break;
                case 5:
                  setPostCodigoSismico(valor);
                  break;
                case 6:
                  setSueloTipoAB(valor);
                  break;
                case 7:
                  setSueloTipoE1a3(valor);
                  break;
                case 8:
                  setSueloTipoEMayor3(valor);
                  break;
                case 10:
                  setResultadoSmin(valor);
                  break;
                default:
                  break;
              }
          });
        } else {
          console.warn(`No se encontró resultado para Tipo de Edificación: ${selectedValueTipoEdificacion} y Subtipo: ${subTipo}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // // Función para resetear los valores mostrados
    // const resetearValoresMostrados = () => {
    //   setResultadoBase('');
    //   setIrregularidadVerticalSevera('');
    //   setIrregularidadVerticalModerada('');
    //   setPlantaIrregular('');
    //   setPreCodigoSismico('');
    //   setPostCodigoSismico('');
    //   setSueloTipoAB('');
    //   setSueloTipoE1a3('');
    //   setSueloTipoEMayor3('');
    //   setResultadoSmin('');
    //   setResultadoFinal('');
    // };

    if (selectedValueTipoEdificacion) {
      fetchSubTipos(selectedValueTipoEdificacion);
      //fetchResultadoBase();
    }
    if (selectedValueTipoEdificacion && subTipo) {
      fetchResultadoBase();
    }
  }, [selectedValueTipoEdificacion, subTipo]);

  const handleSaveSelection = () => {
    const newSelection = {
      tipoEdificacion: selectedValueTipoEdificacion,
      subTipo,
      resultadoFinal,
      estChecked,
      dnkChecked,
      codPuntuacionMatrizSec
    };
    setSelectedValues([selectedValues, newSelection]); // Agrega la nueva selección al array

    // Aquí puedes hacer lo necesario para guardar la selección, como enviar a una API o almacenarlo en un estado global
    console.log(newSelection);
  }

  useEffect(() => {
    calcularResultadoFinal();
  }, [
    resultadoBase,
    includeIrregularidadSevera,
    irregularidadVerticalSevera,
    includeIrregularidadModerada,
    irregularidadVerticalModerada,
    includePlantaIrregular,
    plantaIrregular,
    includePreCodigoSismico,
    preCodigoSismico,
    includePostCodigoSismico,
    postCodigoSismico,
    includeSueloTipoAB,
    sueloTipoAB,
    includeSueloTipoE1a3,
    sueloTipoE1a3,
    includeSueloTipoEMayor3,
    sueloTipoEMayor3,
    includeResultadoSmin,
    resultadoSmin,
  ]);


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
      <Text style={styles.subtitle}>Resultado Base, Modificadores y Resultado Final de Nivel 1 de Análisis, SL1</Text>


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tipo de Edificación:</Text>

        <Picker
          // placeholder="Seleccione..."
          style={styles.picker}
          selectedValue={selectedValueTipoEdificacion}
          onValueChange={(itemValue) => {
            setSelectedValueTipoEdificacion(itemValue);
            //setSubTipo(''); // Reiniciar el subtipo seleccionado cuando cambia el tipo de edificación
          }}
        >
          <Picker.Item label="Seleccione..." value="" enabled={false}/>
          {tipoEdificacion.map((item) => (
            <Picker.Item key={item.codTipoEdificacion} label={item.descripcion} value={item.descripcion} />
          ))}
        </Picker>
        <Text style={[styles.inputLabel, { marginLeft: 8 }]}>Sub Tipo:</Text>
        <Picker
          // placeholder="Seleccione..."
          style={styles.picker}
          selectedValue={subTipo}
          onValueChange={(itemValue) => setSubTipo(itemValue)}
        >
          {/* <Picker.Item label="Seleccione..." value="" enabled={false}/> */}
          <Picker.Item label="Seleccione..." value=""/>
          {subTipos.map((subTipoItem, index) => (
            <Picker.Item key={index} label={subTipoItem} value={subTipoItem} />
          ))}
        </Picker>

      </View>

      <View style={styles.squareContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>RESULTADO BASE:</Text>
          {/* <CheckBox value={includeResultadoBase} onValueChange={handleChangeCheckboxResultadoBase} /> */}
          <TextInput
            style={[styles.resultInput1, { marginRight: 17, backgroundColor: '#d4edda' }]}
            value={resultadoBase}
            onChangeText={setResultadoBase}
            keyboardType="numeric"
            editable={false}
          />
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Irregularidad Vertical Severa:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludeIrregularidadSevera, includeIrregularidadSevera)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includeIrregularidadSevera && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' } // Aplica el marco verde si está marcado
                ]}
                value={irregularidadVerticalSevera}
                onChangeText={setIrregularidadVerticalSevera}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includeIrregularidadSevera}
              onValueChange={() => handleInputPress(setIncludeIrregularidadSevera, includeIrregularidadSevera)}
              style={{ display: 'none' }} // Hiding the checkbox
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Irregularidad Vertical Moderada:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludeIrregularidadModerada, includeIrregularidadModerada)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includeIrregularidadModerada && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
                ]}
                value={irregularidadVerticalModerada}
                onChangeText={setIrregularidadVerticalModerada}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includeIrregularidadModerada}
              onValueChange={() => handleInputPress(setIncludeIrregularidadModerada, includeIrregularidadModerada)}
              style={{ display: 'none' }}
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Planta Irregular:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludePlantaIrregular, includePlantaIrregular)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includePlantaIrregular && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
                ]}
                value={plantaIrregular}
                onChangeText={setPlantaIrregular}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includePlantaIrregular}
              onValueChange={() => handleInputPress(setIncludePlantaIrregular, includePlantaIrregular)}
              style={{ display: 'none' }}
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Pre Código Sismico:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludePreCodigoSismico, includePreCodigoSismico)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includePreCodigoSismico && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
                ]}
                value={preCodigoSismico}
                onChangeText={setPreCodigoSismico}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includePreCodigoSismico}
              onValueChange={() => handleInputPress(setIncludePreCodigoSismico, includePreCodigoSismico)}
              style={{ display: 'none' }}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Post Código Sismico:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludePostCodigoSismico, includePostCodigoSismico)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includePostCodigoSismico && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
                ]}
                value={postCodigoSismico}
                onChangeText={setPostCodigoSismico}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includePostCodigoSismico}
              onValueChange={() => handleInputPress(setIncludePostCodigoSismico, includePostCodigoSismico)}
              style={{ display: 'none' }}
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo Tipo AB:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludeSueloTipoAB, includeSueloTipoAB)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includeSueloTipoAB && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
                ]}
                value={sueloTipoAB}
                onChangeText={setSueloTipoAB}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includeSueloTipoAB}
              onValueChange={() => handleInputPress(setIncludeSueloTipoAB, includeSueloTipoAB)}
              style={{ display: 'none' }}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo Tipo E1a3:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludeSueloTipoE1a3, includeSueloTipoE1a3)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includeSueloTipoE1a3 && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
                ]}
                value={sueloTipoE1a3}
                onChangeText={setSueloTipoE1a3}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includeSueloTipoE1a3}
              onValueChange={() => handleInputPress(setIncludeSueloTipoE1a3, includeSueloTipoE1a3)}
              style={{ display: 'none' }}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo Tipo EMayor3:</Text>
            <TouchableOpacity onPress={() => handleInputPress(setIncludeSueloTipoEMayor3, includeSueloTipoEMayor3)}>
              <TextInput
                style={[
                  styles.resultInput,
                  includeSueloTipoEMayor3 && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
                ]}
                value={sueloTipoEMayor3}
                onChangeText={setSueloTipoEMayor3}
                editable={false}
              />
            </TouchableOpacity>
            <CheckBox
              value={includeSueloTipoEMayor3}
              onValueChange={() => handleInputPress(setIncludeSueloTipoEMayor3, includeSueloTipoEMayor3)}
              style={{ display: 'none' }}
            />
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Resultado Smin:</Text>
          <TouchableOpacity onPress={() => handleInputPress(setIncludeResultadoSmin, includeResultadoSmin)}>
            <TextInput
              style={[
                styles.resultInput,
                includeResultadoSmin && { borderColor: 'green', borderWidth: 2, backgroundColor: '#d4edda' }
              ]}
              value={resultadoSmin}
              onChangeText={setResultadoSmin}
              editable={false}
            />
          </TouchableOpacity>
          <CheckBox
            value={includeResultadoSmin}
            onValueChange={() => handleInputPress(setIncludeResultadoSmin, includeResultadoSmin)}
            style={{ display: 'none' }}
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
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={estChecked}
          onValueChange={(newValue) => {
            if (newValue) setDnkChecked(false);
            setEstChecked(newValue);
          }}
        />
        <Text style={styles.checkboxLabel}>EST</Text>
        <CheckBox
          value={dnkChecked}
          onValueChange={(newValue) => {
            if (newValue) setEstChecked(false);
            setDnkChecked(newValue);
          }}
        />
        <Text style={styles.checkboxLabel}>DNK</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}
            onPress={handleSaveSelection}
          >Guardar</Text>
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
    marginTop: 30,
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
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
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
    backgroundColor: '#001f3f',
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
    backgroundColor: '#001f3f',
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
    backgroundColor: '#001f3f',
    flexDirection: 'row', // Alinea los elementos en una fila
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 24,
    marginRight: 10, // Agregué un margen derecho para separar los botones
  },
  nextButton: {
    backgroundColor: '#001f3f',
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
