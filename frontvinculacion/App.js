import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/components/Start';
import SignIn from './src/components/SignIn';
import Register from './src/components/Register';
import EditarInicio from './src/components/EditarInicio';
import Editar from './src/components/Editar';
import Editar2 from './src/components/Editar2';
import Editar3 from './src/components/Editar3';
import Editar4 from './src/components/Editar4';
import Editar5 from './src/components/Editar5';
import Ajuste from './src/components/Ajuste';
import Dashboard from './src/components/Dashboard';
import Consultar from './src/components/Consultar';
import FormularioFema from './src/components/FormularioFema';
import FormularioFema2 from './src/components/FormularioFema2';
import FormularioFema3 from './src/components/FormularioFema3';
import FormularioFema4 from './src/components/FormularioFema4';
import FormularioFema5 from './src/components/FormularioFema5';
import RecoveryPassword from './src/components/RecoveryPassword';
import PasswordUpdate from './src/components/PasswordUpdate';
import EditProfile from './src/components/EditProfile';
import CreateUser from './src/components/CreateUser';
import Perfil from './src/components/Perfil';
import { AppProvider } from './src/components/AppContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>{}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="EditarInicio" component={EditarInicio} options={{ headerShown: false }} />
        <Stack.Screen name="Editar" component={Editar} options={{ headerShown: false }} />
        <Stack.Screen name="Editar2" component={Editar2} options={{ headerShown: false }} />
        <Stack.Screen name="Editar3" component={Editar3} options={{ headerShown: false }} />
        <Stack.Screen name="Editar4" component={Editar4} options={{ headerShown: false }} />
        <Stack.Screen name="Editar5" component={Editar5} options={{ headerShown: false }} />
        <Stack.Screen name="Consultar" component={Consultar} options={{ headerShown: false }} />
        <Stack.Screen name="Ajuste" component={Ajuste} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema" component={FormularioFema} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema2" component={FormularioFema2} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema3" component={FormularioFema3} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema4" component={FormularioFema4} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema5" component={FormularioFema5} options={{ headerShown: false }} />
        <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordUpdate" component={PasswordUpdate} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUser" component={CreateUser} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;



/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
