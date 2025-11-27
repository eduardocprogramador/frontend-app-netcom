import { StatusBar } from 'expo-status-bar';
import Boleto from './src/screens/Boleto';
import Login from './src/screens/Login';
import Horario from './src/screens/Horario';
import Aviso from './src/screens/Aviso';
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
import { View } from 'react-native';
import bs from './library/bootstrap';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}
function Tabs() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.primary,
        tabBarLabelStyle: {
          fontSize: s(12)
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          marginHorizontal: s(16) 
        },
        headerLeftContainerStyle: {
          paddingLeft: s(8)
        },
        headerRightContainerStyle: {
          paddingRight: s(10)
        },
        headerLeft: () => (
          <BtnHistorico />
        ),
        headerRight: () => (
          <Btn
            childrenStyle={{
              fontSize: s(10)
            }}
            color={Color.danger}
            onPress={() => logout(navigation, dispatch)}
          >
            Sair
          </Btn>
        )
      }}
    >
      <Tab.Screen name='Horários' component={Horario}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="calendar" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen name='Boleto' component={Boleto}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="money" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen name='Avisos' component={Aviso}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="bell" size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}
function MainStack() {
  const userData = useSelector(state => state.userReducer.userData)
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={userData?.uid ? 'Tabs' : 'AuthStack'}
    >
      <Stack.Screen name='AuthStack' component={AuthStack} />
      <Stack.Screen name='Tabs' component={Tabs} />
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
