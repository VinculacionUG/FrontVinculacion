import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();
  const [nombre, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [showPassword, setShowPassword] = useState(false); // Nueva variable de estado

  const handleSubmit = async () => {    
    try {
      const response = await fetch('https://www.fema.somee.com/Auth/login',{
      //const response = await fetch('http://localhost:7040/Auth/login', {
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
        const responseData = await response.json(); // Obtener el mensaje de error del cuerpo de la respuesta
        if (responseData && responseData.error === 'invalid_password') {
          Alert.alert('Error', 'Contraseña inválida. Por favor, inténtalo de nuevo.');
        } else {
          Alert.alert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
      }
    } catch (error) {
      console.console('Error al procesar la solicitud:', error.message);
      Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

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
            style={[styles.input, { color: nombre ? 'black' : 'gray' }]}
            value={nombre}
            onChangeText={setEmail}
          />
          <Text style={styles.forgotLink} onPress={() => navigation.navigate('ForgotUsername')}>
            ¿Olvidaste tu nombre de usuario?
          </Text>
          <TextInput
            placeholder="Constraseña"
            secureTextEntry
            style={[styles.input, { color: password ? 'black' : 'gray' }]}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.forgotLink} onPress={() => navigation.navigate('RecoveryPassword')}>
            ¿Olvidaste tu contraseña?
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    position: 'relative',
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
    //color: 'gray',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  forgotLink: {
    color: '#001f3f',
    textDecorationLine: 'underline',
    //marginTop: 2,
    //marginEnd: 5,
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001f3f',
    padding: 10,
    borderRadius: 5,
    marginTop: 24,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    textAlign: 'center',
  },

  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001f3f',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
  },
  goBackButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  horizontalPadding: {
    paddingHorizontal: 20, // Ajusta este valor para cambiar el espacio horizontal del botón
  },
  
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Asegura que la flecha esté sobre otros elementos
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    //marginBottom: 10,
    //marginTop:10,
    flex: 1,
  },
  passwordVisibilityButton: {
    paddingHorizontal: 10,
  },

});

export default SignIn;
