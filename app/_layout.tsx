import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useAuth } from '../hooks/useAuth'; 
import { useColorScheme } from '@/components/useColorScheme';

import  firtStart  from '@/services/firtStart'
import LoginScreen from './auth/auth';
import { useStorage } from '@/utils/useStorage';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';




export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(/tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { loading, userName,  isLoggedIn } = useAuth();
  const [loadingI, setLoadingI] = useState(true);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

 
  //console.log('Cargo', user, isLoggedIn);

  if (loading) {
    console.log('Loading user data...', userName, isLoggedIn);

     return (
       
         <ActivityIndicator size="large" color="#f47521"/>
       
     );
   } 

  if (!isLoggedIn) {
    console.log('User is not logged in, redirecting to login screen');
    return <LoginScreen />;
  }

  return <RootLayoutNav />;

  

  
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
 /*  console.log('Current color scheme:', colorScheme);
  console.log('Current theme:', DefaultTheme); */

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

     
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Version' }} />
        <Stack.Screen name="items/add" options={{ title: "Add", headerBackTitle: "Back" }} />
        <Stack.Screen name="items/edit" options={{ title: "Edit", headerBackTitle: "Back", presentation: 'modal' }} />
        <Stack.Screen name="auth/auth" options={{ title: "Log in"}} />
        
      </Stack>
    </ThemeProvider>
  );
}
