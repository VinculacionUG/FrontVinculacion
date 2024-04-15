import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Importar ícono del paquete Expo
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Función para buscar el edificio en la base de datos
const buscarEnBaseDeDatosPorNombre = async (nombreEdificio) => {
  // Lógica para buscar el edificio en la base de datos usando el nombre
  // Aquí simulamos una búsqueda asincrónica ficticia
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const edificio = {
        nombre: nombreEdificio,
        direccion: 'Dirección del edificio',
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

      {/* Texto y búsqueda por nombre */}
      <View>
        <Text style={styles.inputLabel}>Nombre del edificio</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del edificio"
            value={busquedaNombre}
            onChangeText={(text) => setBusquedaNombre(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={buscarEdificioPorNombre}>
            <MaterialCommunityIcons name="magnify" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Texto y búsqueda por código */}
      <View>
        <Text style={styles.inputLabel}>Código del edificio</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Código del edificio"
            value={busquedaCodigo}
            onChangeText={(text) => setBusquedaCodigo(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={buscarEdificioPorCodigo}>
            <MaterialCommunityIcons name="magnify" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mostrar detalles del edificio encontrado */}
      <View style={styles.edificioEncontradoContainer}>
        {edificioEncontrado && (
          <>
            <Text>Nombre: {edificioEncontrado.nombre}</Text>
            <Text>Dirección: {edificioEncontrado.direccion}</Text>
            {/* Agregar más detalles según sea necesario */}
          </>
        )}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        <Text style={styles.backButtonText}>Regresar</Text>
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
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  edificioEncontradoContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
});

export default Editar;









