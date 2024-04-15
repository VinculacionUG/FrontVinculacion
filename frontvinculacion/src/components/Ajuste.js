import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Ajuste = () => {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [contraseñaError, setContraseñaError] = useState('');

  useEffect(() => {
    const obtenerNombreUsuario = async () => {
      try {
        const response = await fetch('https://www.fema.somee.com/Auth/login', { //cambiar 
          // Agrega las cabeceras necesarias para autenticación si es necesario
          headers: {
            Authorization: 'Bearer tu_token_de_autenticacion', // Reemplaza con tu token de autenticación
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener el nombre de usuario');
        }
        const data = await response.json();
        const { nombreUsuario } = data;
        setUsuario(nombreUsuario);
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerNombreUsuario();
  }, []);

  const guardarCambios = async () => {
    try {
      if (contraseña === confirmarContraseña) {
        if (!validarContraseña(contraseña)) {
          setContraseñaError('La contraseña debe tener al menos 6 caracteres, 1 mayúscula y 1 número.');
          return;
        }

        const response = await fetch('https://www.fema.somee.com/Auth/login', {//cambiar
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nuevaContraseña: contraseña,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al guardar la contraseña');
        }

        console.log('Contraseña cambiada exitosamente');
      } else {
        alert('Las contraseñas no coinciden');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <Text style={[styles.subtitle, styles.centerText]}>Cambio de Contraseña</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Usuario</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          value={usuario}
          editable={false} // Campo de solo lectura
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Contraseña</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          secureTextEntry={true}
          value={contraseña}
          onChangeText={(text) => {
            setContraseña(text);
            setContraseñaError('');
          }}
        />
      </View>
      {contraseñaError ? <Text style={styles.error}>{contraseñaError}</Text> : null}

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Confirmar Contraseña</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          secureTextEntry={true}
          value={confirmarContraseña}
          onChangeText={setConfirmarContraseña}
        />
      </View>

      <TouchableOpacity style={styles.regresarButton} onPress={() => navigation.goBack()}>
        <Text style={styles.regresarButtonText}>Regresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guardarButton} onPress={guardarCambios}>
        <Text style={styles.guardarButtonText}>Guardar</Text>
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  centerText: {
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  guardarButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  guardarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  regresarButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  regresarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default Ajuste;







