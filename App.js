import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Menu from "./pages/Menu"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import ContextWrapper from "./ContextWrapper"
import Toast from "react-native-toast-message"

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <ContextWrapper>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Menu"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen
                        name="Menu"
                        component={Menu}
                        options={{ animation: "none" }}
                    />
                    <Stack.Screen
                        name="ProductDetail"
                        component={ProductDetail}
                        options={{ animation: "none" }}
                    />
                    <Stack.Screen
                        name="Cart"
                        component={Cart}
                        options={{ animation: "none" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </ContextWrapper>
    )
}
