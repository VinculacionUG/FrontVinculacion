import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Register = () => {
  const navigation = useNavigation();
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [showCedulaInput, setShowCedulaInput] = useState(false); // Define el estado showCedulaInput
  const [cedula, setCedula] = useState('');
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [direccion, setDireccion] = useState('Guayaquil');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [sexo, setSexo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleChange = (name, value) => {////
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /* const handleSubmit = async () => {
     try {
       console.log("he aqqui", formState);
       const response = await axios.post('https://www.fema.somee.com/Users/CrearUsuario', formState);
       console.log('Response:', response.data);
        navigation.navigate('SignIn');
     } catch (error) {
       console.error('Error:', error);
      }
   };*/

  const handleSubmit = async () => {
    // Verificar campos vacíos
    if (
      !tipoDocumento ||
      !cedula ||
      !nombre1 ||
      !apellido1 ||
      !correo ||
      !celular ||
      !sexo ||
      !usuario ||
      !clave
    ) {
      Alert.alert('¡Revise el formulario porfavor, hay campos incompletos!');
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
          "direccion": "Guayaquil",
          "correo": correo,
          "contacto": celular,
          "sexo": sexo,
          "fechaNacimiento": new Date().toISOString(),
          "estado": true,
          "userName": usuario,
          "clave": clave,
          "fechaCreacion": new Date().toISOString(),
          "fechaModificacion": new Date().toISOString(),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        //alert("Usuario registrado")
        Alert.alert("Usuario registrado")
        navigation.navigate('SignIn');
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
    <View style={styles.container}>

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Registro</Text>

        <View style={styles.inputContainer}>
        <Text style={styles.normalText}>Tipo de documento: </Text>

        {/*<Picker
          selectedValue={tipoDocumento}
          onValueChange={(itemValue, itemIndex) => {
            setTipoDocumento(itemValue);
            if (itemValue === 'Cedula') {
              setShowCedulaInput(true);
            } else {
              setShowCedulaInput(false);
            }
          }}
        style={styles.picker}*/}

        <Picker
          selectedValue={tipoDocumento}
          //onValueChange={(itemValue, itemIndex) => setTipoDocumento(itemValue)}
          
          onValueChange={(itemValue, itemIndex) => {
            setTipoDocumento(itemValue);
            if (itemValue === 'Cedula' || itemValue === 'Pasaporte') {
              setShowCedulaInput(true);
            } else {
              setShowCedulaInput(false);
            }
          }}
          
          style={[styles.picker, { color: tipoDocumento ? 'black' : 'gray' }]}

        >
          <Picker.Item label="Seleccione" value="" />
          <Picker.Item label="Cédula" value="Cedula" />
          <Picker.Item label="Pasaporte" value="Pasaporte" />
        </Picker>
      </View>

      {/*
      {tipoDocumento === 'Cedula' && (
          <TextInput
            placeholder="Cedula"
            style={styles.input}
            keyboardType="numeric"
            value={cedula}
            onChangeText={setCedula}
          />
        )}
      */}

        {showCedulaInput && (
          <TextInput
            placeholder="Número del documento"
            style={[styles.input, { color: cedula ? 'black' : 'gray' }]}
            keyboardType="numeric"
            value={cedula}
            onChangeText={setCedula}
          />
        )}

      {/*{showCedulaInput && (
        <TextInput
          placeholder="Cedula"
          style={styles.input}
          keyboardType="numeric"
          value={cedula}
          onChangeText={setCedula}
        />
      )}

        <TextInput
          name="identificacion"
          placeholder="Identificacion"
          style={styles.input}
          value={cedula}
          onChangeText={setCedula}
        />*/}


        <TextInput
          name="nombre"
          placeholder="Nombre"
          style={[styles.input, { color: nombre1 ? 'black' : 'gray' }]}
          value={nombre1}
          onChangeText={setNombre1}
        />
        <TextInput
          name="apellido"
          placeholder="Apellido"
          style={[styles.input, { color: apellido1 ? 'black' : 'gray' }]}
          value={apellido1}
          onChangeText={setApellido1}
        />
        <TextInput
          name="email"
          placeholder="Email"
          style={[styles.input, { color: correo ? 'black' : 'gray' }]}
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          name="telefono"
          placeholder="Teléfono"
          style={[styles.input, { color: celular ? 'black' : 'gray' }]}
          value={celular}
          onChangeText={setCelular}
        />

        <View style={styles.inputContainer}>
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

        {/*<Picker
          selectedValue={sexo}
          onValueChange={setSexo}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el sexo" value="" />
          <Picker.Item label="Masculino" value="m" />
          <Picker.Item label="Femenino" value="f" />
        </Picker>

        <View style={styles.inputContainer}>
            <Text>Sexo</Text>
            <Picker
              selectedValue={sexo}
              onValueChange={setSexo}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
            </Picker>
        </View>*/}
        
          {/*<TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <MaterialCommunityIcons size={24} color="white" />
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>*/}
        


        <TextInput
          name="username"
          placeholder="Usuario"
          style={[styles.input, { color: usuario ? 'black' : 'gray' }]}
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          name="password"
          placeholder="Contraseña"
          secureTextEntry
          style={[styles.input, { color: clave ? 'black' : 'gray' }]}
          value={clave}
          onChangeText={setClave}
        />
        <TextInput
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={[styles.input, { color: celular ? 'black' : 'gray' }]}
          value={clave}
          onChangeText={setClave}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <MaterialCommunityIcons size={24} color="white" />
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity style={[styles.goBackButton, styles.horizontalPadding]} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          <Text style={styles.goBackButtonText}>Regresar</Text>
        </TouchableOpacity>*/}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Cambiar al color deseado
    position: 'relative',
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    
  },
  input: {
    //color: 'gray',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginBottom: 16,
    //marginEnd: 20,
  },

  picker: {
    height: 40,
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    marginLeft: 16,
    //color: 'gray',
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
    padding: 10,
    borderRadius: 5,
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
  },
  
  /*goBackButton: {
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
  },*/
  
  horizontalPadding: {
    paddingHorizontal: 20, // Ajusta este valor para cambiar el espacio horizontal del botón
  },

});

export default Register;
