import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el icono desde la biblioteca de iconos

// Función para buscar el edificio en la base de datos por nombre
const buscarEnBaseDeDatosPorNombre = async (nombreEdificio) => {
  // Lógica para buscar el edificio en la base de datos usando el nombre
  // Aquí puedes implementar la lógica real para buscar en la base de datos
  return new Promise((resolve, reject) => {
    // Simulación de búsqueda asincrónica ficticia
    setTimeout(() => {
      const edificio = {
        nombre: 'Nombre del edificio',
        direccion: 'Dirección del edificio',
        fecha: 'Fecha del formulario',
        // Agregar más detalles del edificio si es necesario
      };
      resolve(edificio);
    }, 1000); // Simular una demora de 1 segundo para la búsqueda
  });
};

// Función para buscar el edificio en la base de datos por código
const buscarEnBaseDeDatosPorCodigo = async (codigoFormulario) => {
  // Lógica para buscar el edificio en la base de datos usando el código
  // Aquí puedes implementar la lógica real para buscar en la base de datos
  return new Promise((resolve, reject) => {
    // Simulación de búsqueda asincrónica ficticia
    setTimeout(() => {
      const edificio = {
        nombre: 'Nombre del edificio',
        direccion: 'Dirección del edificio',
        fecha: 'Fecha del formulario',
        // Agregar más detalles del edificio si es necesario
      };
      resolve(edificio);
    }, 1000); // Simular una demora de 1 segundo para la búsqueda
  });
};

const Editar = ({ navigation }) => {
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCodigo, setBusquedaCodigo] = useState('');
  const [edificioEncontrado, setEdificioEncontrado] = useState(null);

  // Función para buscar el edificio en la base de datos por nombre
  const buscarEdificioPorNombre = async () => {
    const edificio = await buscarEnBaseDeDatosPorNombre(busquedaNombre);
    setEdificioEncontrado(edificio);
  };

  // Función para buscar el edificio en la base de datos por código
  const buscarEdificioPorCodigo = async () => {
    const edificio = await buscarEnBaseDeDatosPorCodigo(busquedaCodigo);
    setEdificioEncontrado(edificio);
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
        <TouchableOpacity style={[styles.searchButton, styles.transparentButton]} onPress={buscarEdificioPorNombre}>
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
        <TouchableOpacity style={[styles.searchButton, styles.transparentButton]} onPress={buscarEdificioPorCodigo}>
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Mostrar detalles del edificio encontrado */}
      <View style={styles.edificioEncontradoContainer}>
        {edificioEncontrado && (
          <View style={styles.formularioHeader}>
            <MaterialCommunityIcons name="file-document" size={24} color="black" />
            <Text style={styles.formularioTitle}>FEMA P-154</Text>
            <Text style={styles.formularioFecha}>{edificioEncontrado.fecha}</Text>
            <TouchableOpacity style={[styles.editButton, styles.transparentButton]} onPress={() => navigation.navigate('Editar2', { edificio: edificioEncontrado })}>
              <MaterialCommunityIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>

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
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fondo transparente con opacidad del 0%
  },
  backButton: {
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 24,
    position: 'absolute',
    right: 16, // Posiciona el botón en la esquina superior derecha
    top: 16, // Puedes ajustar la posición vertical según tus necesidades
  },
  edificioEncontradoContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  formularioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  formularioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
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


















