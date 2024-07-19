import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Consultar = ({ navigation }) => {
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCodigo, setBusquedaCodigo] = useState('');
  const [edificiosEncontrados, setEdificiosEncontrados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [datosFema, setDatosFema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'https://www.fema.somee.com/Users/FormularioFEMAHistAll';

  const fetchDatosFema = async () => {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Error en la red');
      }
      const result = await response.json();
      // console.log('Datos recibidos de FormularioFEMAHistAll: ', result);
      setDatosFema(result);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatosFema();
  }, []);

  // Función para buscar el edificio en la base de datos por nombre
  const buscarEdificioPorNombre = async () => {
    const resultados = datosFema.filter(edificio =>
      edificio.nomEdificacion.toLowerCase().includes(busquedaNombre.toLowerCase())
    );
    setEdificiosEncontrados(resultados);
    setMostrarResultados(true);
  };

  // Función para buscar el edificio en la base de datos por código
  const buscarEdificioPorCodigo = async () => {
    const resultados = datosFema.filter(edificio =>
      edificio.otrosIdentificaciones.includes(busquedaCodigo)
    );
    setEdificiosEncontrados(resultados);
    setMostrarResultados(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
      </TouchableOpacity>
      <Text style={styles.title}>Consultar FEMA P-154</Text>

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
          onChangeText={(text) => {
            // Filtrar entrada para permitir solo números
            const numericText = text.replace(/[^0-9]/g, '');
            setBusquedaCodigo(numericText);
          }}
          keyboardType="numeric"
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
      <ScrollView contentContainerStyle={styles.contener}>
        {mostrarResultados && (

          <View style={styles.edificiosEncontradosContainer}>
            {edificiosEncontrados.map((edificio, index) => (
              <View key={index} style={styles.edificioEncontrado}>
                <MaterialCommunityIcons name="file-document" size={24} color="black" />
                <View>
                  <Text style={styles.formularioTitle}>FEMA P-154</Text>
                  <Text style={styles.formularioFecha}>{" " + edificio.fechaEncuesta}</Text>
                  <Text style={styles.formularioFecha}>{" " + edificio.nomEncuestador}</Text>
                </View>
                {/* <TouchableOpacity
                  style={[styles.editButton, styles.transparentButton]}
                // onPress={() => navigation.navigate('Editar2', { edificio })}
                >
                  <MaterialCommunityIcons name="pencil" size={24} color="black" />
                </TouchableOpacity> */}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contener:{
    display: "flex",
    width: "100%",
    alignitems: "center",
    height: "6px",
    border: "none"
  },
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
    borderRadius: 10,
  },
  edificioEncontrado: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10, 
    marginBottom: 8, 
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
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Asegura que la flecha esté sobre otros elementos
  },
});

export default Consultar;