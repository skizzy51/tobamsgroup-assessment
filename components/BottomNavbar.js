import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import {
    Ionicons,
    AntDesign,
    SimpleLineIcons,
    FontAwesome5,
} from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native"

export default function BottomNavbar({ navigation }) {
    const route = useRoute()

    return (
        <View style={styles.navbar}>
            <Pressable style={styles.navbarItem}>
                <Ionicons name="ios-home-outline" size={24} color="#858585" />
                <Text style={{ color: "#858585" }}>Home</Text>
            </Pressable>
            {route.name === "Menu" ? (
                <Pressable style={styles.navbarItem}>
                    <AntDesign name="appstore1" size={24} color="#DB3C25" />
                    <Text style={{ color: "#DB3C25" }}>Menu</Text>
                </Pressable>
            ) : (
                <Pressable
                    onPress={() => navigation.navigate("Menu")}
                    style={styles.navbarItem}
                >
                    <AntDesign name="appstore-o" size={24} color="#858585" />
                    <Text style={{ color: "#858585" }}>Menu</Text>
                </Pressable>
            )}
            {route.name === "Cart" ? (
                <Pressable style={styles.navbarItem}>
                    <FontAwesome5
                        name="shopping-bag"
                        size={24}
                        color="#DB3C25"
                    />
                    <Text style={{ color: "#DB3C25" }}>Cart</Text>
                </Pressable>
            ) : (
                <Pressable
                    onPress={() => navigation.navigate("Cart")}
                    style={styles.navbarItem}
                >
                    <SimpleLineIcons name="handbag" size={24} color="#858585" />
                    <Text style={{ color: "#858585" }}>Cart</Text>
                </Pressable>
            )}
            <Pressable style={styles.navbarItem}>
                <Image
                    style={styles.profile}
                    source={require("../assets/profile.png")}
                />
                <Text style={{ color: "#858585" }}>Account</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "white",
        height: 83,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 16,
        borderTopColor: "#E1E5E9",
        borderTopWidth: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    navbarItem: {
        alignItems: "center",
        paddingHorizontal: 8,
        display: "flex",
        gap: 8,
    },
    profile: {
        width: 24,
        height: 24,
        backgroundColor: "white",
        borderRadius: 10,
    },
})
