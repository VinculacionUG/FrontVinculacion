import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Consultar = ({ navigation }) => {
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCodigo, setBusquedaCodigo] = useState('');
  const [edificiosEncontrados, setEdificiosEncontrados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [datosFema, setDatosFema] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = 'https://www.fema.somee.com/Users/FormularioFEMAHistAll';

  const fetchDatosFema = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Error en la red');
      }
      const result = await response.json();
      setDatosFema(result);
      setMostrarResultados(result.length > 0);
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

  const buscarEdificioPorNombre = async () => {
    setLoading(true);
    try {
      const resultados = datosFema.filter(edificio =>
        edificio.nomEdificacion.toLowerCase().includes(busquedaNombre.toLowerCase())
      );
      
      setMostrarResultados(resultados.length > 0);
      setEdificiosEncontrados(resultados);
    } finally {
      setLoading(false);
    }
  };

  const buscarEdificioPorCodigo = async () => {
    setLoading(true);
    try {
      const resultados = datosFema.filter(edificio =>
        edificio.otrosIdentificaciones.includes(busquedaCodigo)
      );
      
      setMostrarResultados(resultados.length > 0);
      setEdificiosEncontrados(resultados);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
      </TouchableOpacity>
      <Text style={styles.title}>Consultar FEMA P-154</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del edificio"
          value={busquedaNombre}
          onChangeText={(text) => setBusquedaNombre(text)}
        />
        <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => buscarEdificioPorNombre()}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Código del formulario"
          value={busquedaCodigo}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setBusquedaCodigo(numericText);
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.searchButton, styles.transparentButton]}
          onPress={() => buscarEdificioPorCodigo()}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.resultContainer}>
        {mostrarResultados && (
          <View style={styles.edificiosEncontradosContainer}>
            {edificiosEncontrados.map((edificio, index) => (
              <View key={index} style={styles.edificioEncontrado}>
                <MaterialCommunityIcons name="file-document" size={24} color="black" />
                <View>
                  <Text style={styles.formularioTitle}>FEMA P-154</Text>
                  <Text style={styles.formularioFecha}>
                    {new Date(edificio.fechaEncuesta).toISOString().split('T')[0]}
                  </Text>
                  <Text style={styles.formularioFecha}>{edificio.horaEncuesta}</Text>
                  <Text style={styles.formularioFecha}>{edificio.nomEncuestador}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contener: {
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
    alignitems: 'center',
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

  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default Consultar;