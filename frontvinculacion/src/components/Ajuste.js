import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el icono desde la biblioteca de iconos

const Advertencia = ({ mensaje }) => (
  <View style={[styles.advertenciaContainer, styles.errorContainer]}>
    <View style={styles.iconContainer}>
      <Icon name="alert-circle-outline" size={24} color="red" />
    </View>
    <View style={styles.advertenciaTextContainer}>
      <Text style={[styles.advertenciaText, styles.errorText]}>{mensaje}</Text>
    </View>
  </View>
);
//hola
const Ajuste = () => {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [contraseñaError, setContraseñaError] = useState('');
  const [cambioExitosoVisible, setCambioExitosoVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const obtenerNombreUsuario = async () => {
      try {
        const response = await fetch('https://www.fema.somee.com/Auth/login/Usuario', { //cambiar 
 
          headers: {
            Authorization: 'Bearer tu_token_de_autenticacion', // Reemplaza con tu token de autenticación(ojo)
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener el nombre de usuario');
        }
        const data = await response.json();
        const { nombreUsuario } = data;
        setUsuario(nombreUsuario);
        // Establecer la contraseña inicial con el valor del usuario actual
        setContraseña(nombreUsuario);
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerNombreUsuario();
  }, []);

  const guardarCambios = async () => {
    try {
      if (contraseña === confirmarContraseña) {
        if (!validarContraseña(contraseña)) {
          setContraseñaError('La contraseña debe tener al menos 6 caracteres, 1 mayúscula y 1 número.');
          return;
        }

        const response = await fetch('https://www.fema.somee.com/Auth/login', {//cambiar
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nuevaContraseña: contraseña,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al guardar la contraseña');
        }

        console.log('Contraseña cambiada exitosamente');

        // Mostrar mensaje de cambio exitoso durante 3 segundos
        setCambioExitosoVisible(true);
        setTimeout(() => {
          setCambioExitosoVisible(false);
          // Después de 3 segundos, regresar a la página anterior
          navigation.goBack();
        }, 3000);
      } else {
        setContraseñaError('Las contraseñas no coinciden');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#001f3f" />
        </TouchableOpacity>

        <View style={styles.formContainer}>

            <Text style={styles.title}>Ajustes</Text>

            <Text style={[styles.subtitle, styles.centerText]}>Cambio de Contraseña</Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { flex: 1 }]}>Usuario :</Text>
              <TextInput
                style={[styles.input, { flex: 2, marginRight: 12 }]}
                value={usuario}
                editable={false} // Campo de solo lectura
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { flex: 1 }]}>Contraseña :</Text>
              <TextInput
                style={[styles.input, { flex: 2 }]}
                //secureTextEntry={true}
                secureTextEntry={!showPassword} // Cambiar a texto visible si showPassword es verdadero
                value={contraseña}
                onChangeText={(text) => {
                  setContraseña(text);
                  setContraseñaError('');
                }}
              />
              <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowPassword(!showPassword)}>        
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
              </TouchableOpacity>
            </View>
            

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { flex: 1 }]}>Confirmar Contraseña :</Text>
              <TextInput
                style={[styles.input, { flex: 2 }]}
                secureTextEntry={!showConfirmPassword}
                //secureTextEntry={true}
                value={confirmarContraseña}
                onChangeText={setConfirmarContraseña}
              />
              <TouchableOpacity style={[styles.normalText, {marginBottom: 15, marginRight: 5, marginLeft: 10}]} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>        
                <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" style={styles.eyeIcon}/>
              </TouchableOpacity>
            </View>
            {contraseñaError ? <Advertencia mensaje={contraseñaError} /> : null}

          {/* <TouchableOpacity style={styles.regresarButton} onPress={() => navigation.goBack()}>
            <Icon name="exit-outline" size={24} color="black" /> 
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.guardarButton} onPress={guardarCambios}>
            <Text style={styles.guardarButtonText}>Guardar</Text>
          </TouchableOpacity>

          {cambioExitosoVisible && (
            <View style={styles.cambioExitosoContainer}>
              <Text style={styles.cambioExitosoText}>Cambio exitoso</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  formContainer: {
    paddingTop: 40,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  centerText: {
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 2,
  },
  guardarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001f3f',
    borderRadius: 20,
    padding: 12,
    marginTop: 16,
    alignSelf: 'center', // Alinea el botón en el centro horizontalmente
    width: '80%',
  },
  guardarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // regresarButton: {
  //   backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fondo transparente con opacidad del 0%
  //   borderRadius: 10,
  //   padding: 12,
  //   alignItems: 'center',
  //   marginBottom: 24,
  //   position: 'absolute',
  //   right: 16, // Posiciona el botón en la esquina superior derecha
  //   top: 16, // Puedes ajustar la posición vertical según tus necesidades
  // },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1, // Asegura que la flecha esté sobre otros elementos
  },
  regresarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cambia el color de fondo a negro con opacidad del 10%
    borderRadius: 5,
    padding: 8,
    marginTop: 8, // Ajusta el margen superior para separar del campo de contraseña
    flexDirection: 'row', // Añade flex-direction para alinear elementos horizontalmente
    alignItems: 'center', // Centra verticalmente los elementos en el contenedor
    justifyContent: 'space-between', // Alinea los elementos al principio y al final del contenedor
  },
  errorText: {
    color: 'black', // Cambia el color del texto a negro
    fontSize: 12, // Ajusta el tamaño del texto de la advertencia
    textAlign: 'left',
    marginLeft: 5, // Añade un margen izquierdo para separar el texto del icono
    flex: 1, // El texto ocupará todo el espacio disponible
  },
  advertenciaContainer: {
    marginBottom: 8,
  },
  advertenciaTextContainer: {
    flex: 1, // El texto de la advertencia ocupará todo el espacio disponible
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  advertenciaText: {
    color: 'red',
    fontSize: 12, // Ajusta el tamaño del texto de la advertencia
    textAlign: 'left', // Alinea el texto a la izquierda
  },
  cambioExitosoContainer: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  cambioExitosoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  eyeIcon: {
    transform: [{ translateX: -40 },  { translateY: -5 },], //sobreponer el ojo horizontalmente
    position: 'absolute', // Asegúrate de que sea absoluto o relativo
    zIndex: 999, // Un valor alto para superponer
    
  },
});

export default Ajuste;




































