import { View, Text, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { initializeFirebase } from '../../../firebase';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Érvénytelen email cím')
		.required('Email cím megadása kötelező'),
	password: yup
		.string()
		.min(6, 'A jelszónak legalább 6 karakter hosszúnak kell lennie')
		.required('Jelszó megadása kötelező'),
});

type LoginFormData = {
	email: string;
	password: string;
};

export function LoginScreen({ navigation }: Props) {
	const [isInitialized, setIsInitialized] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	useEffect(() => {
		const setupFirebase = async () => {
			try {
				await initializeFirebase();
				setIsInitialized(true);
			} catch (error) {
				console.error('Firebase initialization failed:', error);
			}
		};

		setupFirebase();
	}, []);

	const loginUser = async (data: LoginFormData) => {
		if (!isInitialized) {
			return;
		}

		setIsSubmitting(true);

		try {
			const auth = getAuth();
			await signInWithEmailAndPassword(auth, data.email, data.password);
		} catch (error: any) {
			console.error('Login error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View className="flex-1 justify-center px-5 bg-white">
				<Text className="text-3xl font-bold mb-8 text-center text-gray-800">
					Bejelentkezés
				</Text>

				<View className="mb-8">
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								<TextInput
									className="w-full h-12 px-4 mb-1 border border-gray-300 rounded-lg text-base"
									placeholder="Email"
									autoCapitalize="none"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholderTextColor="#9CA3AF"
									editable={!isSubmitting}
								/>
								{errors.email && (
									<Text className="text-red-500 text-sm">
										{errors.email.message}
									</Text>
								)}
							</>
						)}
					/>
				</View>

				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, onBlur, value } }) => (
						<>
							<TextInput
								className="w-full h-12 px-4 mb-1 border border-gray-300 rounded-lg text-base"
								placeholder="Jelszó"
								secureTextEntry
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholderTextColor="#9CA3AF"
								editable={!isSubmitting}
							/>
							{errors.password && (
								<Text className="text-red-500 text-sm">
									{errors.password.message}
								</Text>
							)}
						</>
					)}
				/>

				<TouchableOpacity
					className={`w-full h-12 rounded-lg items-center justify-center mt-6 ${
						isSubmitting ? 'bg-orange-300' : 'bg-orange-500'
					}`}
					onPress={handleSubmit(loginUser)}
					disabled={isSubmitting}
				>
					<Text className="text-white text-base font-semibold">
						Bejelentkezés
					</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
}