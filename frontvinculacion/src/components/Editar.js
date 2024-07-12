// Editar.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Editar = ({ navigation }) => {
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCodigo, setBusquedaCodigo] = useState('');
  const [edificiosEncontrados, setEdificiosEncontrados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

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
      ];
      setEdificiosEncontrados(edificios);
      setMostrarResultados(true);
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar FEMA P-154</Text>

      {/* Texto y búsqueda por nombre del edificio */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del edificio"
          value={busquedaNombre}
          onChangeText={(text) => setBusquedaNombre(text)}
        />
        <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => {
            buscarEdificioPorNombre();
            setMostrarResultados(true);
          }}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Texto y búsqueda por código del formulario */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Código del formulario"
          value={busquedaCodigo}
          onChangeText={(text) => setBusquedaCodigo(text)}
        />
        <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => {
            buscarEdificioPorCodigo();
            setMostrarResultados(true);
          }}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Mostrar detalles de los edificios encontrados si hay resultados */}
      {mostrarResultados && (
        <View style={styles.edificiosEncontradosContainer}>
          {edificiosEncontrados.map((edificio, index) => (
            <View key={index} style={styles.edificioEncontrado}>
              <MaterialCommunityIcons name="file-document" size={24} color="black" />
              <View>
                <Text style={styles.formularioTitle}>FEMA P-154</Text>
                <Text style={styles.formularioFecha}>{edificio.fecha}</Text>
              </View>
              <TouchableOpacity
                style={[styles.editButton, styles.transparentButton]}
                onPress={() => navigation.navigate('Editar2', { edificio })}
              >
                <MaterialCommunityIcons name="pencil" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
    marginTop: 16,
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
    fontSize: 16,
    color: 'gray',
  },
  editButton: {
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Editar;
