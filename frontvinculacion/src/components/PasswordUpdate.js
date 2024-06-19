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
  //const [claveMatch, setClavedMatch] = useState(true);

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
/*
  // Función para manejar cambios en el campo de contraseña
  const handlePasswordChange = (text) => {
    setClaveAntigua(text);
    if (text !== confirmPassword) {   // Verificar si las contraseñas coinciden cuando se cambia la contraseña
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };
*/
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
      //!confirmClave ||
      //clave !== confirmPassword
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
    {/*</View><View style={styles.container}>*/}

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Actualización de contraseña</Text>

        <View style={styles.inputContainer}>  
          <Text style={styles.normalText}>Usuario: </Text>
          {/*<Text style={[styles.normalText,{marginRight: 1}]}>Usuario: </Text>*/}
          <TextInput
            name="username"
            placeholder="Por defecto"
            //style={styles.input}
            //style={[styles.input, { width: '100%', color: 'gray' }]}
            style={[styles.input, { color: 'gray' }]}
            //style={[styles.input, { color: usuario ? 'black' : 'gray' }]}
            //value={usuario}
            //onChangeText={setUsuario}
            editable={false} // Deshabilitar la edición del TextInput
          />
        </View>

        <View style={styles.inputContainer}>  
          {/*<Text style={styles.normalText}>Contraseña: </Text>*/}
          <Text style={[styles.normalText, {marginRight: 30, }]}>Contraseña actual: </Text>
          {/*<View style={styles.inputWithIcon}> {/* Contenedor para el campo de entrada con icono */}
          <TextInput
            //name="password"
            //placeholder="Por defecto"
            //secureTextEntry
            //secureTextEntry={true}
            secureTextEntry={!showOldPassword} // Cambiar a texto visible si showPassword es verdadero
            //style={styles.input}
            //style={[styles.input, { width: '60%' }]} // Ajusta el ancho del input aquí
            style={[styles.input, {width: '100%', transform: [{ translateX: 17 }], color: claveAntigua ? 'black' : 'gray' }]}      
            //style={[styles.input, { color: clave ? 'black' : 'gray' }]}
            value={claveAntigua}
            //onChangeText={setClaveAntigua}
            //onChangeText={handlePasswordChange}
            //onChangeText={text => setClave(text)}
            onChangeText={text => {
              // Limitar la longitud del texto a 50 caracteres
              if (text.length <= 50) {
                setClaveAntigua(text);
              }
            }}
            //maxLength={25} // Limita la longitud del texto a 25 caracteres
          />
          {/*<TouchableOpacity style={styles.normalText} onPress={() => setShowPassword(!showPassword)}>*/}
          {/*<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>*/}
          <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowOldPassword(!showOldPassword)}>        
            <MaterialCommunityIcons name={showOldPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
          </TouchableOpacity>
        {/*</View>*/}
        </View>

        <View style={styles.line} />

        <View style={styles.inputContainer}>  
          {/*<Text style={styles.normalText}>Contraseña: </Text>*/}
          <Text style={[styles.normalText, {marginRight: 30, }]}>Nueva contraseña: </Text>
          {/*<View style={styles.inputWithIcon}> {/* Contenedor para el campo de entrada con icono */}
          <TextInput
            //name="password"
            //placeholder="Contraseña por defecto"
            //secureTextEntry
            //secureTextEntry={true}
            secureTextEntry={!showPassword} // Cambiar a texto visible si showPassword es verdadero
            //style={styles.input}
            //style={[styles.input, { width: '60%' }]} // Ajusta el ancho del input aquí
            style={[styles.input, {width: '100%', transform: [{ translateX: 17 }], color: clave ? 'black' : 'gray' }]}      
            //style={[styles.input, { color: clave ? 'black' : 'gray' }]}
            value={clave}
            //onChangeText={setClave}
            //onChangeText={handlePasswordChange}
            //onChangeText={text => setClave(text)}
            onChangeText={text => {
              // Limitar la longitud del texto a 50 caracteres
              if (text.length <= 50) {
                handlePasswordChange(text);
              }
            }}
          />
          {/*<TouchableOpacity style={styles.normalText} onPress={() => setShowPassword(!showPassword)}>*/}
          {/*<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>*/}
          <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowPassword(!showPassword)}>        
            <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
          </TouchableOpacity>
        {/*</View>*/}
        </View>

        <View style={styles.inputContainer}>  
          {/*<Text style={styles.normalText}>Contraseña: </Text>*/}
          <Text style={[styles.normalText, {marginRight: 30, }]}>Confirmar contraseña: </Text>
          {/*<View style={styles.inputWithIcon}> {/* Contenedor para el campo de entrada con icono */}
          <TextInput
            //name="confirmPassword"
            //placeholder="Contraseña por defecto"
            //secureTextEntry
            //secureTextEntry={true}
            secureTextEntry={!showConfirmPassword} // Cambiar a texto visible si showPassword es verdadero
            //style={styles.input}
            //style={[styles.input, { width: '60%' }]} // Ajusta el ancho del input aquí
            style={[styles.input, {width: '100%', transform: [{ translateX: 17 }], color: confirmPassword ? 'black' : 'gray' }]}      
            //style={[styles.input, { color: clave ? 'black' : 'gray' }]}
            value={confirmPassword}
            //onChangeText={handleConfirmPasswordChange}
            //onChangeText={handlePasswordChange}
            //onChangeText={text => setClave(text)}
            onChangeText={text => {
              // Limitar la longitud del texto a 50 caracteres
              if (text.length <= 50) {
                handleConfirmPasswordChange(text);
              }
            }}
          />
          {/*<TouchableOpacity style={styles.normalText} onPress={() => setShowPassword(!showPassword)}>*/}
          {/*<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>*/}
          <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>        
            <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
          </TouchableOpacity>
        {/*</View>*/}
        </View>

        {passwordMatchError && (
          //<View style={styles.inputContainer}>  
          <View style={[styles.inputContainer, { justifyContent: 'flex-end' }]}> 
            <Text style={{ color: 'red' }}>
            <MaterialCommunityIcons name="alert-circle" size={20} color="red" /> Las contraseñas no coinciden</Text>
          </View>
        )}

        {/* Botón de envío */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {/*<MaterialCommunityIcons size={24} color="white" />*/}
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    {/*</View>*/}
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
    //position: 'relative',
    //paddingBottom: 20, // Espacio adicional en la parte inferior para evitar que el último elemento se oculte detrás del botón de navegación
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
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
    //marginLeft: 1,
    //flex: 1, // Hace que el TextInput ocupe todo el espacio disponible
    //textAlign: 'left', // Alinea el texto a la izquierda dentro del TextInput
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginRight: 25,
    //justifyContent: 'left',
    //marginLeft: 10,
    //justifyContent: 'flex-start'
    //marginBottom: 16,
    //marginEnd: 20,
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
    //marginLeft: 50, // Ajusta el margen izquierdo
    //color: 'gray',
    //alignSelf: 'flex-start', // Alinea a la izquierda
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
    textAlign: 'center',
  },

  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Asegura que la flecha esté sobre otros elementos
  },

  normalText: {
    //fontSize: 24,
    //fontWeight: 'bold',
    justifyContent: 'center', // Alineación vertical
    //textAlign: 'center',
    marginBottom: 16,
    marginRight: 50,
  },

  /*errorText: {
    color: 'red',
    marginBottom: 10,
  },*/
   
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
    marginRight: -40, 
  },

});

export default PasswordUpdate;
