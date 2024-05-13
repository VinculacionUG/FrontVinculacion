import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();
  const [nombre, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {    
    try {
      const response = await fetch('https://www.fema.somee.com/Auth/login', {
      // const response = await fetch('http://localhost:7040/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "nombre": nombre,
          "password": password,
        }),
      });

      if (response.ok) {
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.console('Error al procesar la solicitud:', error.message);
      Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="description" size={60} color="white" style={styles.icon} />
      <View style={styles.paper}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Bienvenido</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Usuario"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={nombre}
            onChangeText={setEmail}
          />
          <Text style={styles.forgotLink} onPress={() => navigation.navigate('ForgotUsername')}>
            ¿Olvidaste tu nombre de usuario?
          </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.forgotLink} onPress={() => navigation.navigate('RecoveryPassword')}>
            ¿Olvidaste tu contraseña?
          </Text>
          {/* x problemas de coneccion, saltamos la autenticacion */}
          {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>  */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
            <MaterialCommunityIcons name="lock-open" size={24} color="white" />
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001f3f',
  },
  icon: {
    marginBottom: 20,
  },
  paper: {
    padding: 20,
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderColor: '#001f3f',
    borderWidth: 2,
    borderRadius: 10,
  },
  headingContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  forgotLink: {
    color: '#001f3f',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001f3f',
    padding: 10,
    borderRadius: 5,
    marginTop: 24,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default SignIn;
