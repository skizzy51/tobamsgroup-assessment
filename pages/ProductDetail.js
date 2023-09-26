import { AntDesign, Entypo, Octicons } from "@expo/vector-icons"
import { useContext, useState } from "react"
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { CartContext } from "../ContextWrapper"
import Toast from "react-native-toast-message"

const ProductDetail = ({ navigation, route }) => {
    const { cartState, dispatch } = useContext(CartContext)
    const { name, alias, img, price } = route.params
    const [amount, setAmount] = useState(1)

    function addToCart(item) {
        let dummyArray = [...cartState.cart]
        let add = 0
        dummyArray.forEach((product) => {
            if (product.name === item.name) {
                add += 1
                product.amount += amount
            }
        })
        if (add < 1) {
            dispatch({
                type: "update cart",
                payload: [...cartState.cart, item],
            })
            Toast.show({
                type: "success",
                text1: "Product successfully added to cart",
            })
        } else {
            dispatch({
                type: "update cart",
                payload: [...dummyArray],
            })
            Toast.show({
                type: "success",
                text1: "Cart successfully updated",
            })
        }
    }

    return (
        <SafeAreaView style={styles.statusbar}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={{ flex: 1, padding: 24 }}>
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
                    onPress={() => navigation.navigate("Menu")}
                >
                    <Entypo name="chevron-left" size={20} color="black" />
                </Pressable>
                <ScrollView style={{ marginTop: 32 }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 16,
                            alignItems: "center",
                        }}
                    >
                        <Image source={img} />
                    </View>
                    <View style={{ marginTop: 25, rowGap: 8 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                style={{ fontSize: 16, fontWeight: "500" }}
                            >
                                {name} {alias && `(${alias})`}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "500",
                                    color: "#DB3C25",
                                }}
                            >
                                ${price}
                            </Text>
                        </View>
                        <Text style={{ color: "#4A4A4A", lineHeight: 18 }}>
                            Rare Eat Puff Puff Mix can be made into a deep-fried
                            dough. They are made from yeast dough, shaped into
                            balls and deep-fried until golden brown. It has a
                            doughnut-like texture but slightly o
                        </Text>
                    </View>
                    <View style={{ marginTop: 44 }}>
                        <TouchableOpacity style={styles.accordion}>
                            <Text style={{ fontWeight: "500" }}>
                                Ingredients
                            </Text>
                            <Entypo
                                name="chevron-down"
                                size={16}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.accordion}>
                            <Text style={{ fontWeight: "500" }}>
                                Nutritional Information
                            </Text>
                            <Entypo
                                name="chevron-down"
                                size={16}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.accordion}>
                            <Text style={{ fontWeight: "500" }}>
                                How to Prepare
                            </Text>
                            <Entypo
                                name="chevron-down"
                                size={16}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.accordion}>
                            <Text style={{ fontWeight: "500" }}>
                                Dietary Infromation
                            </Text>
                            <Entypo
                                name="chevron-down"
                                size={16}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.accordion}>
                            <Text style={{ fontWeight: "500" }}>
                                Storage Information
                            </Text>
                            <Entypo
                                name="chevron-down"
                                size={16}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.accordion}>
                            <Text style={{ fontWeight: "500" }}>Extra</Text>
                            <Entypo
                                name="chevron-down"
                                size={16}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 40,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                setAmount((prev) =>
                                    prev > 1 ? prev - 1 : prev
                                )
                            }
                            style={styles.cartUpdateBtn}
                        >
                            <Octicons name="dash" size={15} color="black" />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "600" }}>{amount}</Text>
                        <TouchableOpacity
                            onPress={() => setAmount((prev) => prev + 1)}
                            style={styles.cartUpdateBtn}
                        >
                            <AntDesign name="plus" size={15} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 24, rowGap: 16 }}>
                        <TouchableOpacity
                            onPress={() =>
                                addToCart({ name, alias, img, price, amount })
                            }
                            style={styles.addToCart}
                        >
                            <Text style={{ color: "white", fontWeight: "500" }}>
                                Add to cart
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.subscribePlan}>
                            <Text
                                style={{ color: "#DB3C25", fontWeight: "500" }}
                            >
                                Subscribe to a plan
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    statusbar: {
        flex: 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#F9F9F9",
    },
    accordion: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E1E5E9",
        height: 48,
    },
    cartUpdateBtn: {
        width: 48,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E1E5E9",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    addToCart: {
        backgroundColor: "#DB3C25",
        height: 48,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    subscribePlan: {
        borderColor: "#DB3C25",
        borderWidth: 1,
        height: 48,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
})
