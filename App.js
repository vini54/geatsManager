import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Dashboard } from "./src/Screens/Dashboard";
import { StatusBar } from "expo-status-bar";
import { ListRegisters } from "./src/Screens/List";
import { Config } from "./src/Screens/Config";
import { FormPj } from "./src/Screens/FormPj";
import { FormPf } from "./src/Screens/FormPf";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="light" translucent={false} backgroundColor="#17181C" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={Dashboard} />

          <Stack.Screen name="list" component={ListRegisters} />

          <Stack.Screen name="config" component={Config} />

          <Stack.Screen name="formPj" component={FormPj} />

          <Stack.Screen name="formPf" component={FormPf} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
