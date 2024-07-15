import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  Alert} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState(''); // Estado para el nombre del usuario
  
  const handleCardPress = (routeName) => {
    navigation.navigate(routeName);
  };
  const handleFormularioPress = () => {
    navigation.navigate('FormularioFema');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { nombre, apellido } = JSON.parse(userData);
          setUserName(`${nombre} ${apellido}`);
        } else {
          // Manejo de situación donde no se encuentra información de usuario
          console.log('No se encuentra información de usuario PRUEBA'); //Mensaje de prueba
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error.message);
        Alert.alert('Error', 'Ha ocurrido un error al obtener los datos del usuario.');
      }
    };

    fetchUserData();
  }, []);

/*
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://www.fema.somee.com/Auth/login', {
        method: 'POST', // Cambiado a método POST
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}), // Ajusta el cuerpo según necesites
      });

      if (response.ok) {
        const userData = await response.json();
        const { nombre, apellido } = userData.userInfo;
        setUserName(`${nombre} ${apellido}`);
      } else {
        console.error('Error al obtener datos del usuario:', response.statusText);
        Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error.message);
      Alert.alert('Error', 'Ha ocurrido un error al obtener los datos del usuario.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
*/

  /*
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { nombre, apellido } = JSON.parse(userData);
          setUserName(`${nombre} ${apellido}`);
        } else {
          // Manejo de situación donde no se encuentra información de usuario
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error.message);
        // Manejo de errores
      }
    };

    fetchUserData();
  }, []);
  */

  const handleLogout = () => {
  //const handleLogout = async () => {
    // Aquí va la lógica para cerrar sesión
    // Por ejemplo, limpiar el almacenamiento de tokens o redireccionar a la pantalla de inicio de sesión
    /*
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Start'); // Redirige a la pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      // Manejo de errores
    }
    */
    navigation.navigate('Start');
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={25} color="#001f3f" />
        <Text style={styles.normalText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        {/* Icono de perfil  */}
        <MaterialCommunityIcons name="account" size={70} color="#001f3f" />
        <Text style={styles.username}>{userName}</Text>
        {/*<Text style={styles.username}>{userName ? userName : 'Nombre de Usuario'}{'\n\n'}</Text>*/}
      </View>
      <View style={styles.cardsContainer}>
        {/* Mini Cards */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Ajuste')}
        >
          <MaterialCommunityIcons name="account-settings" size={40} color="#001f3f" />
          <Text style={styles.cardText}>Ajuste</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Perfil')}
        >
          <MaterialCommunityIcons name="account-circle" size={40} color="#001f3f" />
          <Text style={styles.cardText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={handleFormularioPress}
        >
          <MaterialCommunityIcons name="newspaper-check" size={40} color="#001f3f" />
          <Text style={styles.cardText}>FEMA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Editar')}
        >
          <MaterialCommunityIcons name="pencil" size={40} color="#001f3f" />
          <Text style={styles.cardText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Consultar')}
        >
          <MaterialCommunityIcons name="magnify" size={40} color="#001f3f" />
          <Text style={styles.cardText}>Consultar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('PDF')}
        >
          <MaterialCommunityIcons name="file-pdf-box" size={40} color="#001f3f" />
          <Text style={styles.cardText}>PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('CreateUser')}
        >
          <MaterialCommunityIcons name="account-plus" size={36} color="#001f3f"/>
          {/*<Text style= {styles.cardText}>Crear Usuario</Text>*/}
          <Text style= {styles.cardText}>Registrar Usuario</Text>
          
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('EditProfile')}
        >
          <MaterialCommunityIcons name="pencil" size={40} color="#001f3f"/>
          {/*<Text style= {[styles.cardText, { width: 120 }]}>Crear Usuario</Text>*/}
          <Text style= {styles.cardText}>Actualizar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('PasswordUpdate')}
        >
          <MaterialCommunityIcons name="key" size={40} color="#001f3f"/>
          <Text style= {styles.cardText}>Actualizar contraseña</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity
          style={styles.card}
          //onPress={() => handleCardPress('Register')}
          onPress={() => handleCardPress('Register')}
        >
          <MaterialCommunityIcons name="file-document" size={40} color="#001f3f"/>
          <Text style= {styles.cardText}>Registro_P</Text>
          
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
    backgroundColor: '#ffffff',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 75,
  },
  username: {
    fontSize: 20,
    marginTop: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderRadius: 18,
    padding: 25,
    margin: 5,
    alignItems: 'center',
    width: 85, // Ancho del contenedor
    height: 115, // Altura del contenedor
  },
  cardText: {
    //fontWeight: 'bold',
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center',
  },
  normalText: {
    fontSize: 12,
    //fontWeight: 'bold',
    justifyContent: 'flex-end', // Alineación vertical
    //textAlign: 'center',
    marginBottom: 16,
    color: '#001f3f',
  },
});

export default Dashboard;
