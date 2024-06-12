import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const CreateUser = () => {
  const navigation = useNavigation();
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [showCedulaInput, setShowCedulaInput] = useState(false); // Define el estado showCedulaInput
  const [cedula, setCedula] = useState('');
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [correo, setCorreo] = useState('');
  const [sexo, setSexo] = useState('');
  const [rol, setRol] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [showPassword, setShowPassword] = useState(false); //Poner ojo dentro del cuadro

  const [correoValido, setCorreoValido] = useState(false); // Agrega el estado correoValido

  // Función para validar el correo electrónico
  const validarCorreo = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Función para manejar cambios en el campo de correo electrónico
  const handleChangeCorreo = (text) => {
    setCorreo(text); // Actualiza el estado del correo electrónico
    setCorreoValido(validarCorreo(text)); // Verifica si el correo electrónico es válido y actualiza el estado correspondiente
  };


  const handleChange = (name, value) => {////
    setFormState({
      ...formState,
      [name]: value,
    });
    //setTipoDocumento(value);
  };

  useEffect(() => {
    const generateUsername = () => { // Función para formar el nombre de usuario automáticamente
      if (cedula) {                  // Verificar si la cédula tiene un valor válido
            setUsuario(cedula);      // Usar solo el número de cédula como nombre de usuario
        }
    };
    generateUsername();    // Llamar a la función para generar el nombre de usuario cada vez que cambie el nombre, apellido o número de cédula

    const generatePassword = () => {
      const firstLetterOfName = nombre1.charAt(0).toUpperCase();   // Obtener la primera letra del nombre y del apellido
      const firstLetterOfSurname = apellido1.charAt(0).toUpperCase();
      const generatedPassword = `${firstLetterOfName}${firstLetterOfSurname}${cedula}`; // Formar el usuario con las letras obtenidas y el número de cédula
      setClave(generatedPassword);   // Actualizar el estado de la contraseña
    };
    generatePassword();    // Llamar a la función para generar el nombre de usuario cada vez que cambie el nombre, apellido o número de cédula
    
  }, [nombre1, apellido1, cedula]);
      
  const handleSubmit = async () => {
    // Verificar campos vacíos
    if (
      !tipoDocumento ||
      !cedula ||
      !nombre1 ||
      !apellido1 ||
      !correo ||
      !sexo ||
      !rol ||
      !usuario ||
      !clave
    ) {
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
          "tipoIdentificacion": tipoDocumento,
          "identificacion": cedula,
          "nombre1": nombre1,
          "nombre2": "",
          "apellido1": apellido1,
          "apellido2": "",
          "correo": correo,
          "sexo": sexo,
          "rol": rol,
          "estado": true,
          "userName": usuario,
          "clave": clave,
          //"fechaCreacion": new Date().toISOString(),
          //"fechaModificacion": new Date().toISOString(),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        //alert("Usuario registrado")
        Alert.alert("Usuario registrado")
        navigation.navigate('Dashboard');
        //navigation.navigate('SignIn');
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
        <Text style={styles.heading}>Creación de Usuario</Text>

        {/*
        <View style={styles.inputContainer}>  
          <Text style={[styles.normalText,{marginRight: 1}]}>Administrador encargado: </Text>
          <TextInput
            name="admin"
            placeholder="Juanito Alimaña (Nombre del administrador)"
            style={[styles.input, { width: '100%', color: 'gray' }]}
            //style={[styles.input, { width: '100%', color: usuario ? 'black' : 'gray' }]}
            //value={usuario}
            //onChangeText={setUsuario}
            editable={false} // Deshabilitar la edición del TextInput
          />
        </View>

        <View style={styles.line} />
        */}

        <View style={styles.inputContainer}>
          <Text style={styles.normalText}>Tipo de documento: </Text>
          <Picker
            selectedValue={tipoDocumento}
            onValueChange={(itemValue, itemIndex) => {
              setTipoDocumento(itemValue);
              if (itemValue === 'Cedula' || itemValue === 'Pasaporte') {
                setShowCedulaInput(true);
              } else {
                setShowCedulaInput(false);
              }
            }}
            style={[styles.picker, {width: '50%', color: tipoDocumento ? 'black' : 'gray' }]}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Cédula" value="Cedula" />
            <Picker.Item label="Pasaporte" value="Pasaporte" />
          </Picker>
        </View>

        {/*

        {showCedulaInput && (
          <View style={styles.inputContainer}>  
            {/*<View style={{ flex: 1 }}> {/* Este contenedor se expandirá para llenar el espacio restante /}
            <Text style={[styles.normalText, {marginRight: 0, }]}>Nº Documento: </Text>
            <TextInput
              name="numDocumento"
              //placeholder="Documento de indentidad: "
              style={styles.input}      
              keyboardType="numeric" // Esta línea permite ingresar solo números
              value={cedula}
              onChangeText={setCedula}
              /*onChangeText={(text) => {
                // Filtrar los caracteres no numéricos utilizando una expresión regular
                const numericValue = text.replace(/[^0-9]/g, '');
                // Actualizar el estado con el valor filtrado
                setCedula(numericValue);
              }}/
            />    
          </View>
          //</View>
        )}

        */}

        <View style={styles.inputContainer}>  
          <Text style={[styles.normalText, {marginRight: 35}]}>Nº Documento: </Text>
          <TextInput
            name="numDocumento"
            style={[styles.input, {width: '100%', paddingRight: 42}]}
            keyboardType="numeric" // Esta línea permite ingresar solo números
            value={cedula}
            //onChangeText={setCedula}
            onChangeText={(text) => {
                // Filtrar los caracteres no numéricos utilizando una expresión regular
                const numericValue = text.replace(/[^0-9]/g, '');
                // Actualizar el estado con el valor filtrado
                setCedula(numericValue);
            }}
          />
        </View>

        <View style={styles.inputContainer}>  
          <Text style={styles.normalText}>Nombres: </Text>
          <TextInput
            name="nombre"
            style={styles.input}
            value={nombre1}
            onChangeText={setNombre1}
          />
        </View>

        <View style={styles.inputContainer}>  
          <Text style={styles.normalText}>Apellidos: </Text>
          <TextInput
            name="apellido"
            style={styles.input}
            value={apellido1}
            onChangeText={setApellido1}
          />
        </View>

       

        <View style={styles.inputContainer}>  
          <Text style={[styles.normalText, {marginRight: 75}]}>Email: </Text>
          <TextInput
            name="email"
            style={styles.input}
            value={correo}
            //onChangeText={setCorreo}
            onChangeText={handleChangeCorreo} // Usa la función handleChangeCorreo para manejar cambios en el correo electrónico
          />
          {/* Muestra un mensaje de error si el correo no es válido /}
          {!correoValido && <Text style={styles.errorText}>Correo electrónico inválido</Text>}*/}
          

        </View>
        {!correoValido && correo.trim() !== '' && (
            //<Text style={styles.errorText}>Correo electrónico inválido</Text>

              //<View style={styles.inputContainer}>  
              <View style={[styles.inputContainer, { justifyContent: 'flex-end' }]}> 
                <View style={{ marginTop: -12 , marginBottom: 10}}>
                <Text style={{ color: 'red' }}>
                <MaterialCommunityIcons name="alert-circle" size={20} color="red" /> Correo electrónico inválido</Text>
              </View>
              </View>
            )}

        <View style={styles.inputContainer}>
        {/*<View style={[styles.inputContainer, { justifyContent: 'flex-start' }]}> */}
          <Text style={styles.normalText}>Sexo: </Text>
          <Picker
            selectedValue={sexo}
            onValueChange={setSexo}
            style={[styles.picker, { color: sexo ? 'black' : 'gray' }]}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.normalText}>Rol del usuario: </Text>
          <Picker
            selectedValue={rol}
            onValueChange={setRol}
            style={[styles.picker, {width: '50%', color: rol ? 'black' : 'gray' }]}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Administrador" value="Administrador" />
            <Picker.Item label="Supervisor" value="Supervisor" />
            <Picker.Item label="Inspector" value="Inspector" />
          </Picker>
        </View>

        {/*

        <View style={styles.line} />

        <View style={styles.inputContainer}>  
          <Text style={[styles.normalText, {marginRight: 50}]}>Usuario: </Text>
          <TextInput
            name="username"
            placeholder="Por defecto"
            style={[styles.input, { color: usuario ? 'black' : 'gray' }]}
            value={usuario}
            onChangeText={setUsuario}
            editable={false} // Deshabilitar la edición del TextInput
          />
        </View>

        <View style={styles.inputContainer}> 
          <Text style={[styles.normalText, {marginRight: 10 }]}>Contraseña: </Text>
          <TextInput
            //name="password"
            placeholder="Por defecto"
            //secureTextEntry
            //secureTextEntry={true}
            secureTextEntry={!showPassword} // Cambiar a texto visible si showPassword es verdadero
            style={[styles.input, {width: '100%', paddingRight: 42, transform: [{ translateX: 18}] , color: clave ? 'black' : 'gray' }]}
            value={clave}
            onChangeText={setClave}
            editable={false} // Deshabilitar la edición del TextInput
          />
          <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>

        */}

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
    flex: 1, 
    paddingTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Cambiar al color deseado
    //position: 'relative',
    //paddingBottom: 20, // Espacio adicional en la parte inferior para evitar que el último elemento se oculte detrás del botón de navegación
    //paddingTop: 40, // Añade espacio en la parte superior si es necesario
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
    height: 40,
    width: '70%', // Ajusta el ancho según sea necesario
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
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
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: 10,
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
    justifyContent: 'center',
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
    width: '100%', 
    marginBottom: 16,
  },
  eyeIcon: {
    transform: [{ translateX: -27 }], //sobreponer el ojo horizontalmente
    marginRight: -50, 
  },

});

export default CreateUser;
