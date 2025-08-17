import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'cosas',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
 /*  console.log('Current color scheme:', colorScheme);
  console.log('Current theme:', DefaultTheme); */

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="add" options={{ headerShown: true, headerTitle: 'Custom' }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
         */}
        {/*<Stack.Screen name="items/add" options={{ title: 'Add Item' }} />
         <Stack.Screen name="items/edit" options={{ title: 'Edit Item' }} />
        <Stack.Screen name="items/view" options={{ title: 'View Item' }} />
        <Stack.Screen name="items/delete" options={{ title: 'Delete Item' }} />
        <Stack.Screen name="items/list" options={{ title: 'Items List' }} />
        <Stack.Screen name="items/search" options={{ title: 'Search Items' }} />
        <Stack.Screen name="items/filter" options={{ title: 'Filter Items' }} />
        <Stack.Screen name="items/sort" options={{ title: 'Sort Items' }} />
        <Stack.Screen name="items/clear" options={{ title: 'Clear Items' }} />
        <Stack.Screen name="items/export" options={{ title: 'Export Items' }} />
        <Stack.Screen name="items/import" options={{ title: 'Import Items' }} />
        <Stack.Screen name="items/settings" options={{ title: 'Settings' }} /> */}
      </Stack>
    </ThemeProvider>
  );
}
