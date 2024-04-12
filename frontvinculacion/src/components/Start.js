import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Start = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ImageBackground
      source={require('../image/vulnerabilidad.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Este View actúa como un contenedor y estará en la parte inferior */}
        <View style={styles.bottomContainer}>
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <MaterialIcons name="lock-open" size={24} color="white" />
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <Text style={styles.bodyText}>
              No tienes una cuenta?{' '}
              <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
                Regístrate
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  formContainer: {
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
  bodyText: {
    marginTop: 16,
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Start;
