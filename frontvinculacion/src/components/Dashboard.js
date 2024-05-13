import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  const handleCardPress = (routeName) => {
    navigation.navigate(routeName);
  };
  const handleFormularioPress = () => {
    navigation.navigate('FormularioFema');
  };

  const handleLogout = () => {
    // Aquí va la lógica para cerrar sesión
    // Por ejemplo, limpiar el almacenamiento de tokens o redireccionar a la pantalla de inicio de sesión
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
        <Text style={styles.username}>Nombre de Usuario{'\n\n'}</Text>
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
          // onPress={() => handleCardPress('Perfil')}
          onPress={handlePerfilPress}
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
          <Text style= {styles.cardText}>Crear Usuario</Text>
          
        </TouchableOpacity>

{/*
        <TouchableOpacity
          style={styles.card}
          //onPress={() => handleCardPress('Register')}
          onPress={() => handleCardPress('Register')}
        >
          <MaterialCommunityIcons name="file-document" size={40} color="#001f3f"/>
          <Text style= {styles.cardText}>Registro - PRUEBA</Text>
          
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('PasswordUpdate')}
        >
          <MaterialCommunityIcons name="key" size={40} color="#001f3f"/>
          <Text style= {styles.cardText}>Actualización contraseña - PRUEBA</Text>
          
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('EditProfile')}
        >
          <MaterialCommunityIcons name="pencil" size={40} color="#001f3f"/>
          {/*<Text style= {[styles.cardText, { width: 120 }]}>Crear Usuario</Text>/}
          <Text style= {styles.cardText}>Editar perfil - PRUEBA</Text>
          
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
    margin: 8,
    alignItems: 'center',
    width: 80, // Ancho del contenedor
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

export default Dashboard;
