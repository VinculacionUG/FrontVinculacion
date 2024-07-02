import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const navigation = useNavigation();
  const [nombre, setEmail] = useState('');
  //const [usuario, setusuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Nueva variable de estado

  const handleSubmit = async () => {    
    try {
      if (!nombre || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        console.log('Campos vacíos PRUEBA');
        return;
      }
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
        //const responseData = await response.json();
        //await AsyncStorage.setItem('userData', JSON.stringify(responseData));

        //const responseData = response.json
        //console.log
        navigation.navigate('Dashboard');
      } else {
        const responseData = await response.json(); // Obtener el mensaje de error del cuerpo de la respuesta
        if (responseData && responseData.error === 'invalid_password') {
          console.log('Contraseña Invalida PRUEBA');
          Alert.alert('Error', 'Contraseña inválida. Por favor, inténtalo de nuevo.');
                } else {
          console.log('Credenciales incorrectas PRUEBA');
          Alert.alert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
      }
    } catch (error) {
      //console.console('Error al procesar la solicitud:', error.message);
      console.error('Error al procesar la solicitud:', error.message);
      Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      console.log('Error solicitud PRUEBA');
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
            //onChangeText={text => {
              // Filtrar caracteres no deseados
            //  const filteredText = text.replace(/[^0-9]/g, ''); // Solo permite números
            //  setEmail(filteredText);
            //}}
          />
        </View>
          
        <View style={styles.inputContainer}>  
          <TextInput
            placeholder="Constraseña"
            secureTextEntry={!showPassword} // ShowPassword para alternar la visibilidad de la contraseña
            style={[styles.input, { color: password ? 'black' : 'gray' }]}      
            value={password}
            //onChangeText={setPassword}
            onChangeText={text => {
              if (text.length <= 50) { // Máx 50
                // Filtrar caracteres no deseados
                const filteredText = text.replace(/[^a-zA-Z0-9]/g, ''); // Solo permite letras y números
                setPassword(filteredText);
              }
            }}
          />
          <TouchableOpacity style={styles.normalText} onPress={() => setShowPassword(!showPassword)}>        
              <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon} />
            </TouchableOpacity>
        </View>

        <Text style={styles.forgotLink} onPress={() => navigation.navigate('RecoveryPassword')}>
          ¿Olvidaste tu contraseña?
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {/*<Text style={styles.buttonText} onPress={() => navigation.navigate('Dashboard')} >Iniciar Sesión</Text>*/}
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
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
    borderRadius: 25,
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
    backgroundColor: 'rgba(0, 31, 63, 0.05)',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 18,
    paddingHorizontal: 10,
    //borderRadius: 40,
    borderRadius: 10,
    width: '100%',
    paddingRight: 42,
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
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    //marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    //marginLeft: 10,
    textAlign: 'center',
  },
  eyeIcon: {
    transform: [{ translateX: -35 }], //sobreponer el ojo horizontalmente
    marginRight: -50, 
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
    textAlign: 'center',
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
    flex: 1,
  },
  normalText: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordVisibilityButton: {
    paddingHorizontal: 10,
  },

});

export default SignIn;
