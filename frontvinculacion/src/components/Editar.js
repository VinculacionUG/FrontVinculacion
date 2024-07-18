// Editar.js
import React, { useEffect, useState } from 'react';
//import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import Icon from 'react-native-vector-icons/FontAwesome';

const Editar = ({ navigation }) => {
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCodigo, setBusquedaCodigo] = useState('');
  const [busquedaFecha, setBusquedaFecha] = useState('');
  const [edificiosEncontrados, setEdificiosEncontrados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);


/*
  // Función para buscar el edificio en la base de datos por nombre
  const buscarEdificioPorNombre = async () => {
    // Simulación de búsqueda asincrónica ficticia
    setTimeout(() => {
      const edificios = [
        {
          nombre: 'Nombre del edificio 1',
          fecha: 'Fecha del formulario 1',
        },
        {
          nombre: 'Nombre del edificio 2',
          fecha: 'Fecha del formulario 2',
        },
      ];
      setEdificiosEncontrados(edificios);
      setMostrarResultados(true);
    }, 1000);
  };

  // Función para buscar el edificio en la base de datos por código
  const buscarEdificioPorCodigo = async () => {
    // Simulación de búsqueda asincrónica ficticia
    setTimeout(() => {
      const edificios = [
        {
          nombre: 'Nombre del edificio 3',
          fecha: 'Fecha del formulario 3',
        },
        {
          nombre: 'Nombre del edificio 4',
          fecha: 'Fecha del formulario 4',
        },
        {
          nombre: 'Nombre del edificio 5',
          fecha: 'Fecha del formulario 5',
        },
        {
          nombre: 'Nombre del edificio 6',
          fecha: 'Fecha del formulario 6',
         
        },
      ];
      setEdificiosEncontrados(edificios);
      setMostrarResultados(true);
    }, 1000);
  };
*/

  const [datosFema, setDatosFema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // Función para buscar el edificio en la base de datos por código
  const buscarEdificioPorCodigo = async () => {
    
    setTimeout(() => {

      const url = 'https://www.fema.somee.com/Users/FormularioFEMAHistAll';
      const fetchDatosFema = async () => {
        try {
          const response = await fetch(url, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Error en la red');
          }
          const result = await response.json();
         // Mostrar los datos en la consola
         console.log('Datos recibidos de FormularioFEMAHistAll: ', result);

          setDatosFema(result);
        } catch (error) {
          setError(error);
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchDatosFema();
      setMostrarResultados(true);
    }, []);

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
      </TouchableOpacity>
      <Text style={styles.title}>Editar FEMA P-154</Text>
{/*  */}
      <Text style={styles.inputLabel}>Nombre del edificio:</Text>
      {/* Texto y búsqueda por nombre del edificio */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del edificio"
          value={busquedaNombre}
          onChangeText={(text) => setBusquedaNombre(text)}
        />
        {/*
        <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => {
            buscarEdificioPorNombre();
            setMostrarResultados(true);
          }}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
        */}
      </View>

      <Text style={styles.inputLabel}>Código del formulario:</Text>
      {/* Texto y búsqueda por código del formulario */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Código del formulario"
          value={busquedaCodigo}
          onChangeText={(text) => setBusquedaCodigo(text)}
        /> 
        {/*     
        <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => {
            buscarEdificioPorCodigo();
            setMostrarResultados(true);
          }}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
        */}
      </View>

      <Text style={styles.inputLabel}>Fecha de Inspección:</Text>
      <View style={styles.searchContainerDate}>
        <TextInput
          style={styles.input}
          value={busquedaFecha}
          onChangeText={(text) => setBusquedaFecha(text)}
        />
        {/* 
          <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => {
            buscarEdificioPorCodigo();
            setMostrarResultados(true);
          }}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
        */}
      </View>


      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => {
            buscarEdificioPorCodigo();
            setMostrarResultados(true);
          }}
        >
          <MaterialCommunityIcons name="magnify" size={44} color="black" />
        </TouchableOpacity>
      </View>




      {/* Mostrar detalles de los edificios encontrados si hay resultados */}
      {mostrarResultados && (
       
       datosFema.map((edificio, index) => (
        <View style={styles.edificiosEncontradosContainer}>                
            <View key={index} style={styles.edificioEncontrado}>
              <MaterialCommunityIcons name="file-document" size={30} color="black" />
              <View>
                <Text style={styles.verlistaregistros}>Inspector: {edificio.nomEncuestador}</Text>
                <Text style={styles.verlistaregistros}> </Text>
                <Text style={styles.formularioFecha}>FEMA P-154 - {edificio.fechaEncuesta} </Text>
                                
                {/* 
                <Text style={styles.formularioFecha}>{edificio.nomEncuestador}</Text>
                */}
              </View>
              <TouchableOpacity
                style={[styles.editButton, styles.transparentButton]}
                onPress={() => navigation.navigate('Editar2', { edificio })}
              >
                <MaterialCommunityIcons name="pencil" size={30} color="blue" />               
                <MaterialCommunityIcons name="check-circle" size={30} color="green" />
                <MaterialCommunityIcons name="close-circle" size={30} color="red" />
                
              {/*  
                <MaterialCommunityIcons name="task_alt" size={30} color="green" />
                <MaterialCommunityIcons name="new_releases" size={30} color="green" />
                <MaterialCommunityIcons name="checkbox-marked" size={30} color="green" />
                <MaterialCommunityIcons name="checkbox-marked-circle" size={30} color="green" />
                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={30} color="green" />
                <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={30} color="green" />
                <MaterialCommunityIcons name="checkbox-marked-outline" size={30} color="green" />
              */}
              </TouchableOpacity>
            </View>
        </View>
       
      )))}
        
      
      <TouchableOpacity style={[styles.backButton, styles.transparentButton]} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="exit-to-app" size={24} color="black" />
      </TouchableOpacity>
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
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginLeft: 60,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  searchButton: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  backButton: {
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 24,
    position: 'absolute',
    right: 16,
    top: 16,
  },
  edificiosEncontradosContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  edificioEncontrado: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  formularioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  formularioFecha: {
    fontSize: 14,
    color: 'gray',
  },
  editButton: {
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  searchContainerDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginLeft: 60,
    marginRight: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginTop: 16,
    marginLeft: 250,
    //marginRight: 20,
  },
  verlistaregistros: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Editar;
