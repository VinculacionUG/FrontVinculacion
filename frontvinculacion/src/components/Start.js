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
        <Text style={styles.heading}>FEMA{'\n'}Vulnerabilidades Sísmicas</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {/*<MaterialIcons name="lock-open" size={24} color="white" />*/}
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            {/*<Text style={styles.bodyText}>
              No tienes una cuenta?{' '}
              <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
                Regístrate
              </Text>
            </Text>*/}
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
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,255,0.1), rgba(0,0,100,0.3))', //Degradado, doble color
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  heading: {
    //fontStyle: 'fantasy',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: 'white',
    marginTop: 200,
  },
  formContainer: {
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 40,
    width: '100%',
    paddingHorizontal:30, 
    paddingVertical: 15, 
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
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
});

export default Start;
