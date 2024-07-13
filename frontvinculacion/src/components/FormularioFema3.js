import React, { useEffect, useState } from 'react';
//import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, CheckBox } from 'react-native';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,CheckBox } from 'react-native';
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
  // Agrega estados similares para los demás checkboxes

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
      //tipoEdificacion,
      tipoEdificacion: selectedValuetipoEdificacion,
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
    // Agrega condiciones similares para los demás checkboxes
  
    const resultadoFinal = suma.toFixed(2); // Redondea a 2 decimales si es necesario
  
    setResultadoFinal(resultadoFinal.toString());

  };

  useEffect(() => {
    // URL del servicio GET
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
         //const data = await response.json();
         const result = await response.json();
         // Mostrar los datos en la consola
         console.log('Datos recibidos de SubTipoEdificacion: ', result);
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
        //const url3 = 'https://www.fema.somee.com/FemaTres/consultarResultadoBase/1';

        if (!selectedValueTipoEdificacion || !subTipo) {
          return; // Si falta alguno de los valores, salimos de la función
        }
    
        const baseUrl  = 'https://www.fema.somee.com/FemaTres/consultarResultadoBase/';
        // const url3 = `${baseUrl}${numeroFinalUrl}`;
        
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
            //setNumeroFinalUrl(tipoEdificacionMap[key]);
          //} else {
            console.warn(`No se encontró una combinación válida para Tipo de Edificación: ${selectedValueTipoEdificacion} y Subtipo: ${subTipo}`);
            return; // Si no hay una combinación válida, salimos de la función
          }

          //const numeroFinalUrl = tipoEdificacionMap[selectedValueTipoEdificacion];
          const numeroFinalUrl = tipoEdificacionMap[key];
          //const numeroFinalUrl = item.codSubtipoEdificacion;
          //const url3 = baseUrl + numeroFinalUrl;
          const url3 = `${baseUrl}${numeroFinalUrl}`;

          console.log('Número final de URL:', numeroFinalUrl);
          console.log('URL completa:', url3);
          try {
          const response = await fetch(url3,
		      {
		  	    method: 'GET',
		      }
		      );
          if (!response.ok) {
            //throw new Error('Error en la red ' + response.status + ' ' + response.statusText);
            throw new Error(`Error en la red ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          console.log('Resultado desde URL2:', result); // Imprimir resultado en consola
          //setResultadoBase(result);

          // Verificar si result es un array y no está vacío antes de iterar sobre él
          if (Array.isArray(result) && result.length > 0) {
            result.forEach((item) => {
              //let valor = item.valor;
              // if (valor === null || valor === undefined) {
              //   valor = 0;   // Darle valor NA ya que si es null muestra otro valor
              // } else {
              //   valor = valor.toString();               
              // }
              // Verificar si item tiene la propiedad 'valor'
              //let valor = item.valor !== undefined && item.valor !== null ? item.valor.toString() : '0';

              if (item.valor !== undefined && item.valor !== null) {
                //let valor = item.valor.toString(); // Convertir a string si no es null ni undefined
                let valor = item.valor !== undefined && item.valor !== null ? item.valor.toString() : '0';
                
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
              } else {
                console.warn(`El item ${item.codTipoPuntuacion} no tiene la propiedad 'valor' definida correctamente.`);
              }
            });
          } else {
            console.warn('El resultado obtenido no es un array válido o está vacío.');
          }

          // Estado con el resultado obtenido
          // setResultadoBase(result); // Suponiendo que tienes un estado para el resultado base
          // setLoading(false); // Marca la carga como completada
		    //console.log(result);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error);
		      // console.log(error);
        } finally {
          setLoading(false);
        }
      };
      if (selectedValueTipoEdificacion) {
        fetchSubTipos(selectedValueTipoEdificacion);
        //fetchResultadoBase();
      }
       if (selectedValueTipoEdificacion && subTipo) {
         fetchResultadoBase();
       }
     //fetchResultadoBase();
  //}, []);
    }, [selectedValueTipoEdificacion, subTipo]);

  const handleSubTipoChange = (tipo) => {
    //Sin implementar por el problema con el endPoint de Subtipo
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
      <Text style={styles.title}>Formulario FEMA P-154</Text>
      <Text style={styles.subtitle}>Resultado Base, Modificadores y Resultado Final de Nivel 1 de Análisis, SL1</Text>

 
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Tipo de Edificación:</Text>

      <Picker
          style={styles.picker}
          selectedValue={selectedValueTipoEdificacion}
          onValueChange={(itemValue) => {
            setSelectedValueTipoEdificacion(itemValue);
            // Aquí manejas la lógica para obtener los subtipos según el tipo de edificación seleccionado
            // Esto es solo un ejemplo, deberías llamar a la función fetchSubTipos aquí o manejar los subtipos como necesites
            // fetchSubTipos(itemValue);
          }}
        >
          <Picker.Item label="Seleccione..." value="" />
          {tipoEdificacion.map((item) => (
            <Picker.Item key={item.codTipoEdificacion} label={item.descripcion} value={item.descripcion} />
          ))}
        </Picker>
        <Text style={[styles.inputLabel, { marginLeft: 8 }]}>Sub Tipo:</Text>
        <Picker
          style={styles.picker}
          selectedValue={subTipo}
          onValueChange={(itemValue) => setSubTipo(itemValue)}
        >
          <Picker.Item label="Seleccione..." value="" />
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
            style={[styles.resultInput1, { marginRight: 17 }]}
            value={resultadoBase}
            onChangeText={setResultadoBase}
            keyboardType="numeric"
            editable={false}
          />
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Irregularidad Vertical Severa:</Text>
            <CheckBox value={includeIrregularidadSevera} onValueChange={handleChangeCheckboxSevera} />
            <TextInput
              style={styles.resultInput}
              value={irregularidadVerticalSevera}
              onChangeText={setIrregularidadVerticalSevera}
              keyboardType="numeric"
              editable={false}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Irregularidad Vertical Moderada:</Text>
            <CheckBox value={includeIrregularidadModerada} onValueChange={handleChangeCheckboxModerada} />
            <TextInput
              style={styles.resultInput}
              value={irregularidadVerticalModerada}
              onChangeText={setIrregularidadVerticalModerada}
              keyboardType="numeric"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Planta Irregular:</Text>
            <CheckBox value={includePlantaIrregular} onValueChange={handleChangeCheckboxPlantaIrregular} />
            <TextInput
              style={styles.resultInput}
              value={plantaIrregular}
              onChangeText={setPlantaIrregular}
              keyboardType="numeric"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Pre-código Sísmico:</Text>
            <CheckBox value={includePreCodigoSismico} onValueChange={handleChangeCheckboxPreCodigoSismico} />
            <TextInput
              style={styles.resultInput}
              value={preCodigoSismico}
              onChangeText={setPreCodigoSismico}
              keyboardType="numeric"
              editable={false}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Post-código Sísmico:</Text>
            <CheckBox value={includePostCodigoSismico} onValueChange={handleChangeCheckboxPostCodigoSismico} />
            <TextInput
              style={styles.resultInput}
              value={postCodigoSismico}
              onChangeText={setPostCodigoSismico}
              keyboardType="numeric"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.squareContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo tipo A o B:</Text>
            <CheckBox value={includeSueloTipoAB} onValueChange={handleChangeCheckboxSueloTipoAB} />
            <TextInput
              style={styles.resultInput}
              value={sueloTipoAB}
              onChangeText={setSueloTipoAB}
              keyboardType="numeric"
              editable={false}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo tipo E (1-3 pisos):</Text>
            <CheckBox value={includeSueloTipoE1a3} onValueChange={handleChangeCheckboxSueloTipoE1a3} />
            <TextInput
              style={styles.resultInput}
              value={sueloTipoE1a3}
              onChangeText={setSueloTipoE1a3}
              keyboardType="numeric"
              editable={false}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Suelo tipo E (mayor a 3 pisos):</Text>
            <CheckBox value={includeSueloTipoEMayor3} onValueChange={handleChangeCheckboxSueloTipoEMayor3} />
            <TextInput
              style={styles.resultInput}
              value={sueloTipoEMayor3}
              onChangeText={setSueloTipoEMayor3}
              keyboardType="numeric"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>RESULTADO SMIN:</Text>
          <CheckBox value={includeResultadoSmin} onValueChange={handleChangeCheckboxResultadoSmin} />
          <TextInput
            style={[styles.resultInput, { marginRight: 18 }]}
            value={resultadoSmin}
            onChangeText={setResultadoSmin}
            keyboardType="numeric"
            editable={false}
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
