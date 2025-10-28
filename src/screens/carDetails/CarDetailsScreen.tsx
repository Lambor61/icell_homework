import { View, Text, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CarsStackParamList, Position } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React from 'react';

type Props = NativeStackScreenProps<CarsStackParamList, 'CarDetails'>;

const PositionItem = React.memo(({ position, index }: { position: Position; index: number }) => {
	return (
		<View className="mb-3">
			<Text className="text-lg text-gray-600 font-semibold mb-2">
				{index + 1}. pozíció
			</Text>
			<View className="bg-white p-3 mb-2 rounded border border-gray-200">
				<Text className="text-sm text-gray-700">
					GPS fix: {position.gps_fix ? 'Igen' : 'Nem'}
				</Text>
				<Text className="text-sm text-gray-700">
					Ország: {position.country}
				</Text>
				<Text className="text-sm text-gray-700">
					Város: {position.city}
				</Text>
				<Text className="text-sm text-gray-700">
					Utca: {position.road}
				</Text>
				<Text className="text-sm text-gray-700">
					GPS szélesség: {position.gps_lat}
				</Text>
				<Text className="text-sm text-gray-700">
					GPS hosszúság: {position.gps_lng}
				</Text>
				<Text className="text-sm text-gray-700">
					GPS irány: {position.gps_heading}
				</Text>
				<Text className="text-sm text-gray-700">
					GPS sebesség: {position.gps_speed} km/h
				</Text>
				<Text className="text-sm text-gray-700">
					Össz távolság: {position.total_dist} km
				</Text>
				<Text className="text-sm text-gray-700">
					Gyújtás: {position.ign ? 'Be' : 'Ki'}
				</Text>
				<Text className="text-sm text-gray-700">
					Időpont: {position.t}
				</Text>
				<Text className="text-sm text-gray-700">
					Fogyasztás: {position.milage} l/100km
				</Text>
			</View>
		</View>
	);
});

export function CarDetailsScreen({ route }: Props) {
	const { carId } = route.params;
		
	const car = useSelector((state: RootState) => 
		state.cars.allCars.find(c => c.license_no === carId)
	);

	if (!car) {
		return (
			<View className="flex-1 bg-gray-100 justify-center items-center">
				<Text className="text-gray-500">Nincs kiválasztott autó</Text>
			</View>
		);
	}

  return (
		<View className="flex-1 bg-gray-100">
			<FlatList
				data={car.positions}
				keyExtractor={(item, index) => `${carId}-${index}`}
				renderItem={({ item, index }) => (
					<PositionItem position={item} index={index} />
				)}
				ListHeaderComponent={
					<View className="bg-white rounded-lg p-6 shadow-sm mb-4">
						<Text className="text-2xl font-bold text-gray-800 mb-2">
							{car.license_no}
						</Text>
						<Text className="text-base text-gray-600">
							Összes pozíció: {car.positions.length}
						</Text>
					</View>
				}
				contentContainerStyle={{ padding: 16 }}
				initialNumToRender={10}
				maxToRenderPerBatch={5}
				windowSize={5}
				removeClippedSubviews={true}
				ListEmptyComponent={
					<Text className="text-gray-500 text-sm">Nincs elérhető pozíció</Text>
				}
			/>
		</View>
  );
}