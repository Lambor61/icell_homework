import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CarsStackParamList, Car } from '../../types/types';
import { Ionicons } from '@expo/vector-icons';
import { useGetCarsQuery } from '../../store/api/carsApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllCars } from '../../store/slices/carsSlice';

type Props = NativeStackScreenProps<CarsStackParamList, 'Cars'>;

export function CarsScreen({ navigation }: Props) {
	const dispatch = useDispatch();
	const { data: apiData, error } = useGetCarsQuery('Mr2Gbdax9cac93LDUMZPZqQssFfbaIB9');

	useEffect(() => {
		if (apiData) {		
			dispatch(setAllCars(apiData));
		}
	}, [apiData, dispatch]);

	useEffect(() => {
		if (error) {
			console.log('API Error:', error);
		}
	}, [error]);

	const handleCarPress = (car: Car) => {
		navigation.navigate('CarDetails', { carId: car.license_no });
	};

	const renderCarItem = ({ item }: { item: Car }) => (
		<TouchableOpacity
			onPress={() => handleCarPress(item)}
			className="active:opacity-70"
		>
			<View className="flex-row justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-sm">
				<View className="flex-row items-center">
					<Ionicons name="car" size={24} color="#f36f21" style={{ marginRight: 12 }} />
					<Text className="text-lg font-semibold text-gray-800">
						{item.license_no}
					</Text>
				</View>
				<Text className="text-base text-gray-600">
					Pozíció: {item.positions.length}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<FlatList
				data={apiData}
				renderItem={renderCarItem}
				keyExtractor={item => item.license_no}
				className="w-full"
			/>
		</View>
	);
}