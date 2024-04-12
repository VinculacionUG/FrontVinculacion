import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Register = () => {
  const navigation = useNavigation();
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

  const handleChange = (name, value) => {
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
          "tipoIdentificacion": "C",
          "identificacion": cedula,
          "nombre1": nombre1,
          "nombre2": "",
          "apellido1": apellido1,
          "apellido2": "",
          "direccion": "guayaquil",
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
        alert("Usuario registrado")
        navigation.navigate('SignIn');
      } else {
        alert('Error Details:', await response.text());
        console.log('Fetch Error:', response.statusText);
        console.log('Error Details:', await response.text());
      }
    } catch (error) {
      console.log('Fetch Error:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Registro</Text>
        <TextInput
          name="identificacion"
          placeholder="identificacion"
          style={styles.input}
          value={cedula}
          onChangeText={setCedula}
        />
        <TextInput
          name="nombre"
          placeholder="Nombre"
          style={styles.input}
          value={nombre1}
          onChangeText={setNombre1}
        />
        <TextInput
          name="apellido"
          placeholder="Apellido"
          style={styles.input}
          value={apellido1}
          onChangeText={setApellido1}
        />
        <TextInput
          name="email"
          placeholder="Email"
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          name="telefono"
          placeholder="Teléfono"
          style={styles.input}
          value={celular}
          onChangeText={setCelular}
        />
        <Picker
          selectedValue={sexo}
          onValueChange={setSexo}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el sexo" value="" />
          <Picker.Item label="Masculino" value="m" />
          <Picker.Item label="Femenino" value="f" />
        </Picker>


        <TextInput
          name="username"
          placeholder="Usuario"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          name="password"
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          value={clave}
          onChangeText={setClave}
        />
        <TextInput
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
          value={clave}
          onChangeText={setClave}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <MaterialCommunityIcons size={24} color="white" />
          <Text style={styles.buttonText}>Continuar</Text>
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
    backgroundColor: '#ffffff', // Cambiar al color deseado
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
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
    backgroundColor: '#001f3f',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    marginLeft: 120,
    textAlign: 'center',
  },
});

export default Register;
