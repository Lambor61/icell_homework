export type AuthStackParamList = {
	Login: undefined;
};

export type Position = {
	gps_fix: boolean;
	country: string;
	city: string;
	gps_lat: string;
	gps_lng: string;
	gps_speed: string;
	total_dist: string;
	ign: boolean;
	t: string;
	gps_alt: string;
	milage: string;
	road: string;
	gps_heading: string;
};

export type Car = {
	license_no: string;
	positions: Position[];
};

export type CarsStackParamList = {
	Cars: undefined;
	CarDetails: { carId: string };
};

export type DrawerParamList = {
	CarsStackScreen: CarsStackParamList;
	Logout: undefined;
};