import { StatusBar } from 'expo-status-bar';
import { Roboto_400Regular, Roboto_700Bold, useFonts} from "@expo-google-fonts/roboto"
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Loading } from '@components/Loading';
import { SignIn } from '@screens/SignIn';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <GluestackUIProvider config={config}>
    
      { fontsLoaded ? (
        <SignIn />
        ) :( 
          <Loading />
        )}

      <StatusBar style="light" />
    </GluestackUIProvider>
  );
}
