import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/components/Start';
import SignIn from './src/components/SignIn';
import Register from './src/components/Register';
import Dashboard from './src/components/Dashboard';
import FormularioFema from './src/components/FormularioFema';
import FormularioFema2 from './src/components/FormularioFema2';
import FormularioFema3 from './src/components/FormularioFema3';
import FormularioFema3p2 from './src/components/FormularioFema3p2';
import FormularioFema4 from './src/components/FormularioFema4';
import FormularioFema5 from './src/components/FormularioFema5';
import RecoveryPassword from './src/components/RecoveryPassword';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema" component={FormularioFema} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema2" component={FormularioFema2} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema3" component={FormularioFema3} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema3p2" component={FormularioFema3p2} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema4" component={FormularioFema4} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioFema5" component={FormularioFema5} options={{ headerShown: false }} />
        <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} options={{ headerShown: false }} />
      </Stack.Navigator>
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
