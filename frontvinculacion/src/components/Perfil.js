import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const Perfil = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaReg, setFechaReg] = useState('');

 
  const handleEditarPerfil = () => {
    Alert.alert(
      "¡Formulario editar perfil con éxito!",
      "",
      [
          {
              text: "Ok",
              onPress: () => navigation.navigate('Dashboard')
          }
      ],
      { cancelable: false }
  );
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.title}>Nombre de Usuario</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Usuario</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Usuario"
          value={usuario}
          editable={false} // Campo de solo lectura
        />
       </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Fecha de Nacimiento (MM/DD/AAAA)</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Fecha de Nacimiento (MM/DD/AAAA)"
          value={fechaNac}
          editable={false} // Campo de solo lectura
        />
       </View>

       <View style={styles.inputContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Correo)</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Correo"
          value={correo}
          editable={false} // Campo de solo lectura
        />
       </View>

       <View style={styles.inputContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Fecha de Registro (MM/DD/AAAA)</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Fecha de Registro (MM/DD/AAAA)"
          value={fechaReg}
          editable={false} // Campo de solo lectura
        />
       </View>

      {/* Botones de Navegación            <MaterialCommunityIcons name="arrow-right" size={24} color="white" />     */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        <Text style={styles.ButtonText}>Regresar</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.editarPerfilButton} onPress={handleEditarPerfil}>
          <Text style={styles.ButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',  // Cambia el color de fondo según tus preferencias
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  documentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 8,
    cursor: 'pointer',
  },
  nextButtonText: {
    fontSize: 20,
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  backButton: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
    },
    editarPerfilButton: {
      backgroundColor: 'blue',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 10,
      marginBottom: 12,
      paddingHorizontal: 24,
      },
});

export default Perfil;
