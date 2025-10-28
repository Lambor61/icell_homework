import { getApp } from '@react-native-firebase/app';

export const initializeFirebase = async () => {
	try {
		const app = getApp();
		return app;
	} catch (error) {
		console.error('Firebase initialization error:', error);
		throw error;
	}
};