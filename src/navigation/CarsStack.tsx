import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CarsStackParamList } from "../types/types";
import { CarsScreen } from "../screens/cars/CarsScreen";
import { CarDetailsScreen } from "../screens/carDetails/CarDetailsScreen";

const CarsStack = createNativeStackNavigator<CarsStackParamList>();

export default function CarsStackScreen() {
	return (
		<CarsStack.Navigator
			screenOptions={{
					headerTintColor: '#000',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
		>
			<CarsStack.Screen 
				name="Cars" 
				component={CarsScreen} 
				options={{ title: 'Autók', headerShown: false, }}
			/>
			<CarsStack.Screen 
				name="CarDetails" 
				component={CarDetailsScreen} 
				options={{ title: 'Autó részletei', }}
			/>
		</CarsStack.Navigator>
	);
}