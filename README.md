# iCell Homework - React Native App

React Native alkalmazás Expo-val, TypeScript-tel.

## Telepítés

### Előfeltételek
- Node.js (v16 vagy újabb)
- npm vagy yarn
- **Android Studio** (Android SDK-val)
- **Android emulátor** vagy fizikai eszköz (USB debugging engedélyezve)

### Package-ek telepítése

```bash
npm install
```

vagy

```bash
yarn install
```

## 🏃 Alkalmazás indítása

> **Fontos:** Ez a projekt `npx expo prebuild` paranccsal lett létrehozva, **nem használ Expo Go-t**. Natív build szükséges.
> 
```bash
npx expo prebuild
```
> 
> Ha a  natív Android mappa már létrejött és verziókezelve van, akkor **nem kell újra futtatni** a `prebuild` parancsot. Csak akkor, ha nincs még létrehozva az android mappa vagy natív dependenciák vannak módosítva (pl. új natív modul telepítése).

### Android indítása

```bash
npx expo run:android
```

Ez a parancs:
- Natív Android build-et készít (első futásnál lassabb)
- Android Studio-val compile-ol
- Automatikusan telepíti az emulátorra/eszközre
- Development módban fut Metro bundler-rel

### Első indítás előtt

Meggyőződni arról, hogy:
- Android Studio telepítve van
- Android SDK be van állítva
- Android emulátor fut VAGY fizikai eszköz csatlakoztatva van (USB debugging engedélyezve)

## 👤 Teszt bejelentkezési adatok

Az alkalmazásba a következő teszt felhasználóval lehet bejelentkezni:

- **Email:** `icellhomework11@gmail.com`
- **Jelszó:** `icell11` 

## 🛠️ Technológiai stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Firebase Authentication** - Felhasználó authentikáció
- **Redux Toolkit** - State management
- **RTK Query** - API calls és cache kezelés
- **React Navigation** - Drawer és Stack navigáció
- **NativeWind** - Tailwind CSS for React Native
- **React Hook Form + Yup** - Form validation

## 📁 Projekt struktúra

```
src/
├── navigations/       # Navigációs komponensek
├── screens/
│   ├── login/         # Login képernyő
│   ├── cars/          # Autók listája
│   └── carDetails/    # Autó részletei
├── store/
│   ├── api/           # RTK Query API konfiguráció
│   ├── slices/        # Redux slices (user, cars)
│   └── store.ts       # Redux store konfiguráció
├── types/             # Adatok típusai
└── nativewind-env.d.ts
```

## 📱 Funkciók

- ✅ Firebase email/jelszó bejelentkezés
- ✅ Drawer navigáció (Cars, Logout)
- ✅ Autók lista API-ból (RTK Query)
- ✅ Autó részletek több száz pozícióval
- ✅ Optimalizált FlatList virtualizált listával
- ✅ Redux cache kezelés (session-szintű)
- ✅ Form validáció (React Hook Form + Yup)

## 🔧 Troubleshooting

### Metro bundler reset
```bash
npx expo start -c
```

### Node modules újratelepítése
```bash
rm -rf node_modules
npm install
```