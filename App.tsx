import { StatusBar } from 'expo-status-bar';
import { Roboto_400Regular, Roboto_700Bold, useFonts} from "@expo-google-fonts/roboto"

import { GluestackUIProvider } from '@gluestack-ui/themed';

import { config } from './config/gluestack-ui.config';

import { Routes } from '@routes/index';
import { Loading } from '@components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <GluestackUIProvider config={config}>
    
      { fontsLoaded ? (
        <Routes />
        ) :( 
          <Loading />
        )}

      <StatusBar style="light" />
    </GluestackUIProvider>
  );
}
