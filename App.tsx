import { StatusBar } from 'expo-status-bar';
import { Roboto_400Regular, Roboto_700Bold, useFonts} from "@expo-google-fonts/roboto"

import { GluestackUIProvider } from '@gluestack-ui/themed';

import { config } from './config/gluestack-ui.config';


import { Routes } from '@routes/index';

import { AuthContext } from '@contexts/AuthContext';

import { Loading } from '@components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <GluestackUIProvider config={config}>
    
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Arthur',
        email: 'arthur@email.com',
        avatar: 'arthur.png',
      }
    }} >
      
      { fontsLoaded ? ( <Routes /> ) :( <Loading /> )}

    </AuthContext.Provider>
      <StatusBar style="light" />
    </GluestackUIProvider>
  );
}
