import "./global.css"
import { View, Image } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen } from './src/screens/login/LoginScreen';
import { AuthStackParamList, DrawerParamList } from './src/types/types';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged, signOut } from '@react-native-firebase/auth';
import CarsStackScreen from "./src/navigation/CarsStack";
import { useAppDispatch } from "./src/store/hooks";
import { clearUser, setUser } from "./src/store/slices/userSlice";
import { Provider } from "react-redux";
import { store } from './src/store/store';

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
				name="CarsStackScreen" 
				component={CarsStackScreen}
				options={({ route }) => {
					const routeName = getFocusedRouteNameFromRoute(route) ?? 'Cars';
							
					return {
						headerShown: routeName !== 'CarDetails',
						title: 'Autók',
					};
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
	const dispatch = useAppDispatch();
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsSignedIn(user !== null);
			if (user) {
				dispatch(setUser(user));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

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
		<Provider store={store}>
      <AppContent />
    </Provider>
	);
}