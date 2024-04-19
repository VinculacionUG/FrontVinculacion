import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RecoveryPassword = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');

  const handleSendEmail = async () => {    
    if (!correo) {
        Alert.alert('¡Revise correo porfavor, esta incompleto!');
        return;  
      }
    try {
        const response = await fetch(`https://www.fema.somee.com/Users/Recuperacion/${correo}?motivo=CLAVE`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        navigation.navigate('SignIn');
      } else {
        console.log('Fetch Error:', response.statusText);
        console.log('Error Details:', await response.text());
      }
      // Aquí deberías enviar la solicitud para recuperar la contraseña con el correo electrónico ingresado
      // Por ahora, simplemente mostraremos un mensaje de éxito
    // Alert.alert('Mensaje enviado', 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
    } catch (error) {
      console.console('Error al procesar la solicitud:', error.message);
      Alert.alert('Error', 'Ha ocurrido un error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <MaterialCommunityIcons name="lock-reset" size={60} color="white" style={styles.icon} />
      <View style={styles.paper}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Recuperación de contraseña</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: correo ? 'black' : 'gray' }]}
            value={correo}
            onChangeText={setCorreo}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <MaterialCommunityIcons name="email-send" size={24} color="white" />
            <Text style={styles.buttonText}>Enviar</Text>
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
    color: 'gray',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
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
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default RecoveryPassword;
