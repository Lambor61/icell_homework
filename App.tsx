import "./global.css"
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import LoginScreen from "./src/screens/login/LoginScreen";
import CarsScreen from "./src/screens/cars/CarsScreen";
import CarDetailsScreen from "./src/screens/carDetails/CarDetailsScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        options={{
          title: 'Bejelentkezés',
        }}
      />
      <Drawer.Screen 
        name="CarsScreen" 
        component={CarsScreen}
        options={{
          title: 'Autók',
        }}
      />
			<Drawer.Screen 
        name="CarDetailsScreen" 
        component={CarDetailsScreen}
        options={{
          title: 'Autó részletei',
        }}
      />
    </Drawer.Navigator>
  );
}

function AppContent() {

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}