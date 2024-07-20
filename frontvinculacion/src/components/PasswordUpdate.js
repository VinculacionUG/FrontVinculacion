import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const PasswordUpdate = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [claveAntigua, setClaveAntigua] = useState('');

  //Comparar contraseñas
  const [confirmPassword, setConfirmPassword] = useState('');//
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  //Poner ojo dentro del cuadro
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (name, value) => {////
    setFormState({
      ...formState,
      [name]: value,
    });
    //setTipoDocumento(value);
  };

   // Función para manejar cambios en el campo de contraseña
   const handlePasswordChange = (text) => {
    setClave(text);
    if (text !== confirmPassword) {   // Verificar si las contraseñas coinciden cuando se cambia la contraseña
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  // Función para manejar cambios en el campo de confirmar contraseña
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== clave) {             // Verificar si las contraseñas coinciden cuando se cambia la confirmación de la contraseña
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };
  
  const handleSubmit = async () => {
    // Verificar campos vacíos
    if (
      !usuario ||
      !claveAntigua ||
      !clave ||
      !confirmPassword
    ) {
      /*if (clave != confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
      } else {
        Alert.alert('¡Revise el formulario porfavor, hay campos incompletos!');
      }*/
      Alert.alert('¡Revise el formulario porfavor, hay campos incompletos!');
      setPasswordMatchError(true);
      return;  
    }

    try {
      const response = await fetch('https://www.fema.somee.com/Users/CrearUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "idTipo": 0,
          //"tipoIdentificacion": tipoDocumento,
          //"identificacion": cedula,
          "estado": true,
          "userName": usuario,
          "clave": clave,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        //alert("Usuario registrado")
        Alert.alert("Usuario registrado")
        //navigation.navigate('SignIn');
        navigation.navigate('Register');
        //navigation.navigate('Dashboard');
      } else {
        //alert('Error Details:', await response.text());
        Alert.alert('Error Details:', await response.text());
        console.log('Fetch Error:', response.statusText);
        console.log('Error Details:', await response.text());
        /*
        const errorDetails = await response.text();
        Alert.alert('Error Details:', errorDetails);
        console.log('Fetch Error:', response.statusText);
        console.log('Error Details:', errorDetails);
        //Alert.alert('Error', 'Ha ocurrido un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
        */
      }
    } catch (error) {
      console.log('Fetch Error:', error.message);
      Alert.alert('Error', 'Ha ocurrido un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Actualización de contraseña</Text>

        {/*
        <View style={styles.inputContainer}>  
          <Text style={styles.normalText}>Usuario: </Text>
          {/*<Text style={[styles.normalText,{marginRight: 1}]}>Usuario: </Text>*/}
          {/*<TextInput
            name="username"
            placeholder="Por defecto"
            style={[styles.input, { color: 'gray' }]}
            editable={false} // Deshabilitar la edición del TextInput
          />
        </View>
        */}

        <View style={styles.inputContainer}>  
          <Text style={[styles.normalText, {marginRight: 30, }]}>Contraseña actual: </Text>
          <TextInput
            secureTextEntry={!showOldPassword} // Cambiar a texto visible si showPassword es verdadero
            style={[styles.input, {width: '100%', transform: [{ translateX: 17 }], color: claveAntigua ? 'black' : 'gray' }]}      
            value={claveAntigua}
            onChangeText={text => {
              // Limitar la longitud del texto a 50 caracteres
              if (text.length <= 50) {
                setClaveAntigua(text);
              }
            }}
          />
          <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowOldPassword(!showOldPassword)}>        
            <MaterialCommunityIcons name={showOldPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <View style={styles.inputContainer}>  
          <Text style={[styles.normalText, {marginRight: 30, }]}>Nueva contraseña: </Text>
          <TextInput
            secureTextEntry={!showPassword} // Cambiar a texto visible si showPassword es verdadero
            style={[styles.input, {width: '100%', transform: [{ translateX: 17 }], color: clave ? 'black' : 'gray' }]}      
            value={clave}
            onChangeText={text => {
              // Limitar la longitud del texto a 50 caracteres
              if (text.length <= 50) {
                handlePasswordChange(text);
              }
            }}
          />
          <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowPassword(!showPassword)}>        
            <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>  
          <Text style={[styles.normalText, {marginRight: 30, }]}>Confirmar contraseña: </Text>
          <TextInput
            secureTextEntry={!showConfirmPassword} // Cambiar a texto visible si showPassword es verdadero
            style={[styles.input, {width: '100%', transform: [{ translateX: 17 }], color: confirmPassword ? 'black' : 'gray' }]}      
            value={confirmPassword}
            onChangeText={text => {
              // Limitar la longitud del texto a 50 caracteres
              if (text.length <= 50) {
                handleConfirmPasswordChange(text);
              }
            }}
          />
          <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>        
            <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
          </TouchableOpacity>
        </View>

        {passwordMatchError && (
          <View style={[styles.inputContainer, { justifyContent: 'flex-end' }]}> 
            <Text style={{ color: 'red' }}>
            <MaterialCommunityIcons name="alert-circle" size={20} color="red" /> Las contraseñas no coinciden</Text>
          </View>
        )}

        {/* Botón de envío */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //Da error con el color al final del form
    paddingTop: 40,
    //justifyContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Cambiar al color deseado
  },
  formContainer: {
    width: '80%',
    //maxWidth: 400,
    paddingBottom: 35, // Espacio adicional en la parte inferior para evitar que el último elemento se oculte detrás del botón de navegación
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    //color: 'gray',
    height: 40,
    width: '70%', // Ajusta el ancho según sea necesario
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingRight: 42,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  picker: {
    height: 40,
    width: '100%', // Ajusta el ancho según sea necesario
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    //width: '100%',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  birthdayContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  birthdayInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  birthdayInput: {
    flex: 1,
    height: 40,
    marginBottom: 8,
    marginRight: 0,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente el contenido del botón
    backgroundColor: '#001f3f',
    padding: 12,
    borderRadius: 20,
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    //marginLeft: 120,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Asegura que la flecha esté sobre otros elementos
  },

  normalText: {
    justifyContent: 'center', // Alineación vertical
    //textAlign: 'center',
    marginBottom: 16,
    marginRight: 50,
  },
   
  horizontalPadding: {
    paddingHorizontal: 20, // Ajusta este valor para cambiar el espacio horizontal del botón
  },

  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%', // Puedes ajustar el ancho según sea necesario
    marginBottom: 16,
  },
  eyeIcon: {
    transform: [{ translateX: -28 }], //sobreponer el ojo horizontalmente
    //marginRight: -40, 
    position: 'absolute', // Asegúrate de que sea absoluto o relativo
    zIndex: 999, // Un valor alto para superponer
    
  },

});

export default PasswordUpdate;
