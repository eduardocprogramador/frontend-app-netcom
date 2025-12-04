import { StatusBar } from 'expo-status-bar';
import Boleto from './src/screens/Boleto';
import Login from './src/screens/Login';
import Horario from './src/screens/Horario';
import Aviso from './src/screens/Aviso';
import Home from './src/screens/Home';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color } from './library/colors';
import { vs, s } from 'react-native-size-matters'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './src/redux/store';
import Toast from 'react-native-toast-message'
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './src/components/Loading';
import { useSelector } from 'react-redux';
import { logout } from './src/utils/auth';
import { Btn } from './library/html';
import BtnHistorico from './src/components/Historico/BtnHistorico';

const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}
function Screens() {
  return (
    <Stack.Navigator screenOptions={{
      headerBackTitle: 'Voltar'
    }}>
      <Stack.Screen name='Home' component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='Horários' component={Horario} />
      <Stack.Screen name='Boleto' component={Boleto} />
      <Stack.Screen name='Avisos' component={Aviso} />
    </Stack.Navigator>
  )
}
function MainStack() {
  const userData = useSelector(state => state.userReducer.userData)
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={userData?.uid ? 'Screens' : 'AuthStack'}
    >
      <Stack.Screen name='AuthStack' component={AuthStack} />
      <Stack.Screen name='Screens' component={Screens} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
        <Toast topOffset={60} />
      </PersistGate>
    </Provider>
  );
}
