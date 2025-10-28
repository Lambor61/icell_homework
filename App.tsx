import "./global.css"
import { View } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen } from './src/screens/login/LoginScreen';
import { AuthStackParamList, DrawerParamList } from './src/types/types';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged, signOut } from '@react-native-firebase/auth';
import { CarsScreen } from "./src/screens/cars/CarsScreen";
import { CarDetailsScreen } from "./src/screens/carDetails/CarDetailsScreen";

const EmptyComponent = () => <View />;
const Stack = createNativeStackNavigator<AuthStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
	const handleLogout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

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
			<Drawer.Screen 
				name="Logout" 
				component={EmptyComponent}
				options={{
					title: 'Kijelentkezés',
				}}
				listeners={{
					focus: () => {
						handleLogout();
						return false;
					}
				}}
			/>
		</Drawer.Navigator>
	);
}

function AppContent() {
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsSignedIn(user !== null);
		});
		
		return () => unsubscribe();
	}, []);

	return (
		<NavigationContainer>
			{!isSignedIn ? (
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={LoginScreen} />
				</Stack.Navigator>
			) : (
				<DrawerNavigator />
			)}
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<AppContent />
	);
}