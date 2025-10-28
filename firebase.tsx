import { getApp, getApps, initializeApp } from '@react-native-firebase/app';
import { FirebaseConfig } from './src/types/types';


const firebaseConfig: FirebaseConfig = {
	apiKey: 'AIzaSyABMFl5R5D3TY55z4JMs7OYMWMhoanWzZc',
	appId: '1:999419481345:android:8ca7fc57d55012b8a55f00',
	projectId: 'icellhomework',
	storageBucket: 'icellhomework.firebasestorage.app',
	messagingSenderId: '999419481345',
	databaseURL: `https://icellhomework-default-rtdb.europe-west1.firebasedatabase.app`,
};

export const initializeFirebase = async () => {
	try {
		if (getApps().length === 0) {
			const app = await initializeApp(firebaseConfig);
			return app;
		} else {
			const app = getApp();
			return app;
		}
	} catch (error) {
		console.error('Firebase initialization error:', error);
		throw error;
	}
};