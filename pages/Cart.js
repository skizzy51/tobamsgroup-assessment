import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import BottomNavbar from "../components/BottomNavbar"
import { AntDesign, Entypo, Feather, Octicons } from "@expo/vector-icons"
import { useContext } from "react"
import { CartContext } from "../ContextWrapper"

const Cart = ({ navigation }) => {
    const { cartState, dispatch } = useContext(CartContext)

    function calculatePrice(state) {
        let add = 0
        state.cart.forEach((item) => {
            let sum = item.price * item.amount
            add += sum
        })
        return add
    }

    return (
        <SafeAreaView style={styles.statusbar}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={{ flex: 1, padding: 24 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Pressable
                        style={{
                            backgroundColor: "white",
                            width: 36,
                            height: 36,
                            borderColor: "#E1E5E9",
                            borderWidth: 1,
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Entypo name="chevron-left" size={20} color="black" />
                    </Pressable>
                    <Text
                        style={{
                            fontWeight: "500",
                            textAlign: "center",
                            flex: 1,
                        }}
                    >
                        Cart
                    </Text>
                </View>
                <FlatList
                    contentContainerStyle={{
                        borderTopColor: "#E1E5E9",
                        borderTopWidth: 1,
                        marginTop: 12,
                        paddingTop: 24,
                    }}
                    data={cartState.cart}
                    keyExtractor={(item) => cartState.cart.indexOf(item)}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                ...styles.alignRowCenter,
                                padding: 8,
                                marginBottom: 24,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    style={{ width: 92, height: 92 }}
                                    source={item.img}
                                />
                                <View style={{ rowGap: 8 }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontWeight: "500",
                                            flexShrink: 1,
                                        }}
                                    >
                                        {item.name}{" "}
                                        {item.alias && (
                                            <Text
                                                style={{
                                                    color: "#4A4A4A",
                                                    fontWeight: "400",
                                                }}
                                            >
                                                {`(${item.alias})`}
                                            </Text>
                                        )}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#DB3C25",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ${item.price}
                                    </Text>
                                    <Pressable
                                        onPress={() => {
                                            let filteredArray = []
                                            cartState.cart.forEach(
                                                (product) => {
                                                    if (
                                                        product.name ===
                                                        item.name
                                                    )
                                                        filteredArray =
                                                            cartState.cart.filter(
                                                                (it) =>
                                                                    it.name !==
                                                                    item.name
                                                            )
                                                }
                                            )
                                            dispatch({
                                                type: "update cart",
                                                payload: [...filteredArray],
                                            })
                                        }}
                                    >
                                        <Feather
                                            name="trash-2"
                                            size={24}
                                            color="#4A4A4A"
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    rowGap: 9.5,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        cartState.cart.forEach((product) => {
                                            if (
                                                product.name === item.name &&
                                                product.amount > 1
                                            )
                                                product.amount -= 1
                                        })
                                        dispatch({
                                            type: "update cart",
                                            payload: [...cartState.cart],
                                        })
                                    }}
                                    style={styles.cartUpdateBtn}
                                >
                                    <Octicons
                                        name="dash"
                                        size={16}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                    }}
                                >
                                    {item.amount}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        cartState.cart.forEach((product) => {
                                            if (product.name === item.name)
                                                product.amount += 1
                                        })
                                        dispatch({
                                            type: "update cart",
                                            payload: [...cartState.cart],
                                        })
                                    }}
                                    style={styles.cartUpdateBtn}
                                >
                                    <AntDesign
                                        name="plus"
                                        size={16}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                <View style={{ rowGap: 8 }}>
                    <View style={styles.alignRowCenter}>
                        <Text style={{ fontWeight: "500" }}>
                            Total{" "}
                            <Text
                                style={{ color: "#4A4A4A" }}
                            >{`(${cartState.cart.length} items)`}</Text>
                        </Text>
                        <Text style={{ fontWeight: "500" }}>
                            ${calculatePrice(cartState)}
                        </Text>
                    </View>
                    <Pressable style={styles.checkoutbtn}>
                        <Text style={{ color: "white", fontWeight: "500" }}>
                            Checkout - ${calculatePrice(cartState)}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <BottomNavbar navigation={navigation} />
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    statusbar: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    alignRowCenter: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    checkoutbtn: {
        backgroundColor: "#DB3C25",
        height: 48,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    cartUpdateBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
})
