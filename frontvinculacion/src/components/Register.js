import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
//import DatePicker from 'react-native-datepicker';

const Register = () => {
  const navigation = useNavigation();
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [showCedulaInput, setShowCedulaInput] = useState(false); // Define el estado showCedulaInput
  const [cedula, setCedula] = useState('');
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [sexo, setSexo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  //const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  //Comparar contraseñas
  const [confirmPassword, setConfirmPassword] = useState('');//
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  //Ojo
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [correoValido, setCorreoValido] = useState(false); // Agrega el estado correoValido

  // Validar el formato del correo electrónico
  const validarCorreo = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Manejar cambios en el campo de correo electrónico
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

  // Manejar cambios en el campo de contraseña
  const handlePasswordChange = (text) => {
    setClave(text);
    // Verificar si las contraseñas coinciden cuando se cambia la contraseña
    if (text !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  // Manejar cambios en el campo de confirmar contraseña
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== clave) { // Verificar si las contraseñas coinciden cuando se cambia la confirmación de la contraseña
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleDatePick = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        mode: 'spinner', 
        date: new Date(), 
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Si el usuario selecciona una fecha, actualiza el estado con la fecha seleccionada
        setFechaNacimiento(`${year}-${month + 1}-${day}`);
      }
    } catch ({ code, message }) {
      console.warn('No se pudo abrir el selector de fecha', message);
    }
  };

  // Función para validar la fecha de nacimiento
  const validarFechaNacimiento = () => {
    const selectedDay = parseInt(day);
    const selectedMonth = parseInt(month) - 1;
    const selectedYear = parseInt(year);

    // Verificar si la fecha es válida
    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
    const currentDate = new Date();

    if (
      isNaN(selectedDay) ||
      isNaN(selectedMonth) ||
      isNaN(selectedYear) ||
      selectedDate >= currentDate //||
      //selectedYear < 1900 // Verificar si el año es menor a 1900
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Verificar campos vacíos
    if (
      !tipoDocumento ||
      !cedula ||
      !nombre1 ||
      !apellido1 ||
      !direccion ||
      !correo ||
      !celular ||
      !sexo ||
      !fechaNacimiento ||
      !usuario ||
      !clave || 
      !day || 
      !month || 
      !year
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

    // Verificar la validez del correo electrónico
    if (!validarCorreo(correo)) {
      Alert.alert('Correo electrónico inválido');
      return;
    }

    // Verificar la validez de la fecha de nacimiento
    if (!validarFechaNacimiento()) {
      Alert.alert('Fecha de nacimiento inválida');
      return;
    }

    // Convertir los valores de día, mes y año a números enteros
    const selectedDay = parseInt(day);
    const selectedMonth = parseInt(month) - 1; // Los meses comienzan desde 0 en JavaScript (enero es 0)
    const selectedYear = parseInt(year);

    // Verificar si la fecha es válida
    if (isNaN(selectedDay) || isNaN(selectedMonth) || isNaN(selectedYear)) {
      Alert.alert('Error', 'Por favor ingrese una fecha válida.');
      return;
    }

    // Crear la fecha completa
    //const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
    const selectedDate = new Date(selectedDay, selectedMonth, selectedYear);
    console.log('Fecha seleccionada:', selectedDate);
    setSelectedDate(formattedDate);

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
          "nombre1": nombre1,
          //"nombre2": "",
          "apellido1": apellido1,
          //"apellido2": "",
          "direccion": direccion,
          "correo": correo,
          "contacto": celular,
          "sexo": sexo,
          "fechaNacimiento": fechaNacimiento,
          //"fechaNacimiento": new Date().toISOString(),
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
        <Text style={styles.heading}>Registro</Text>

        <View style={styles.inputContainer}>  
          <Text style={styles.normalText}>Direccion: </Text>
          <TextInput
            name="direccion"
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
          />
        </View>


        <View style={styles.inputContainer}>  
          <Text style={styles.normalText}>Celular: </Text>
          <TextInput
            //placeholder="Teléfono"
            name="telefono"
            style={styles.input}
            value={celular}
            onChangeText={(text) => {
              
              let formattedText = text.trim(); // Elimina los espacios en blanco al principio y al final
              // Verifica si el texto no está vacío y si el primer carácter no es un "+"
              if (formattedText && formattedText[0] !== '+') {
                  formattedText = '+' + formattedText; // Agrega el "+" al principio del texto
              }
              // Verifica si el texto cumple con el patrón deseado
              if (/^\+[0-9]*$/.test(formattedText)) {
                  formattedText = formattedText.slice(0, 13);
                  setCelular(formattedText); // Actualiza el estado solo si el texto es válido
              }
            }}
          />
        </View>

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

        <View style={styles.inputContainer}>
            <Text style={styles.normalText}>Fecha de Nacimiento:</Text>
            <View style={styles.dateInputsContainer}>
            <TextInput
              keyboardType="numeric"
              placeholder="Día"
              value={day}
              //onChangeText={setDay}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/, ''); // Filtrar los caracteres no numéricos
                const intValue = parseInt(numericValue, 10); // Convertir el valor a un número entero
                  if (
                    (numericValue === '' || (intValue >= 1 && intValue <= 31)) &&  // Verificar si el valor está dentro del rango permitido (1 - 31)
                    numericValue.length <= 2                                       // Filtrar la cantidad de números
                  ) {
                  setDay(numericValue);                                            // Actualizar el estado con el valor filtrado
                 }
              }}
              //style={styles.input}
              style={[styles.input, { width: '10%', color: day ? 'black' : 'gray' }]}
            />
            <Picker
              selectedValue={month}
              onValueChange={(itemValue) => setMonth(itemValue)}
              style={[styles.picker, { marginLeft: 5, marginRight: 5, width: '22%' , color: month ? 'black' : 'gray' }]}
            >
              <Picker.Item label="Mes" value="" />
              <Picker.Item label="Enero" value="1" />
              <Picker.Item label="Febrero" value="2" />
              <Picker.Item label="Marzo" value="3" />
              <Picker.Item label="Abril" value="4" />
              <Picker.Item label="Mayo" value="5" />
              <Picker.Item label="Junio" value="6" />
              <Picker.Item label="Julio" value="7" />
              <Picker.Item label="Agosto" value="8" />
              <Picker.Item label="Septiembre" value="9" />
              <Picker.Item label="Octubre" value="10" />
              <Picker.Item label="Noviembre" value="11" />
              <Picker.Item label="Diciembre" value="12" />
            </Picker>
            <TextInput
              keyboardType="numeric"
              placeholder="Año"
              value={year}
              //onChangeText={setYear}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, ''); // Filtrar los caracteres no numéricos 
                const intValue = parseInt(numericValue, 10); // Convertir el valor a un número entero
                const currentYear = new Date().getFullYear(); // Obtener el año actual
                const minYear = 1000; // Año mínimo permitido

                if (numericValue.length <= 4 || intValue <= 2020) { // Filtrar la cantidad de números
                    setYear(numericValue); // Actualizar el estado con el año válido
                }
                }}
                //style={styles.input}
              style={[styles.input, { width: '12%', color: year ? 'black' : 'gray' }]}
            />
          </View>
        </View>

        {/* Botón de envío */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <MaterialCommunityIcons size={24} color="white" />
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
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
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  picker: {
    height: 40,
    width: '50%', // Ajusta el ancho según sea necesario
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    //width: '100%',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: 50,
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
  dateInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Esto centra verticalmente los elementos dentro de este contenedor
    marginLeft: 10,
    //justifyContent: 'flex-end', // Alinea los elementos a la derecha
    //justifyContent: 'flex-end', // Alinea los elementos a la derecha
  },

});

export default Register;
