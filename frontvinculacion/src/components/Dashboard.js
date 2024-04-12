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
  
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Icono de perfil (puedes reemplazarlo con tu propio icono) */}
        <MaterialCommunityIcons name="account" size={60} color="#001f3f" />
        <Text style={styles.username}>Nombre de Usuario</Text>
      </View>
      <View style={styles.cardsContainer}>
        {/* Mini Cards */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Ajuste')}
        >
          <MaterialCommunityIcons name="account-settings" size={30} color="#001f3f" />
          <Text style={styles.cardText}>Ajuste</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Perfil')}
        >
          <MaterialCommunityIcons name="account-circle" size={30} color="#001f3f" />
          <Text style={styles.cardText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={handleFormularioPress}
        >
          <MaterialCommunityIcons name="newspaper-check" size={30} color="#001f3f" />
          <Text style={styles.cardText}>FEMA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Editar')}
        >
          <MaterialCommunityIcons name="pencil" size={30} color="#001f3f" />
          <Text style={styles.cardText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Consultar')}
        >
          <MaterialCommunityIcons name="magnify" size={30} color="#001f3f" />
          <Text style={styles.cardText}>Consultar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('PDF')}
        >
          <MaterialCommunityIcons name="file-pdf-box" size={30} color="#001f3f" />
          <Text style={styles.cardText}>PDF</Text>
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
    backgroundColor: '#ffffff',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    marginTop: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  cardText: {
    marginTop: 8,
  },
});

export default Dashboard;
