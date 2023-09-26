import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import BottomNavbar from "../components/BottomNavbar"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { useContext } from "react"
import { CartContext } from "../ContextWrapper"
import Toast from "react-native-toast-message"

const Menu = ({ navigation }) => {
    const { cartState, dispatch, products } = useContext(CartContext)

    function addToCart(item) {
        let dummyArray = [...cartState.cart]
        let add = 0
        dummyArray.forEach((product) => {
            if (product.name === item.name) {
                add += 1
                product.amount += 1
            }
        })
        if (add < 1) {
            dispatch({
                type: "update cart",
                payload: [...cartState.cart, item],
            })
        } else {
            dispatch({
                type: "update cart",
                payload: [...dummyArray],
            })
        }
        Toast.show({
            type: "success",
            text1: "Product successfully added to cart",
        })
    }

    return (
        <SafeAreaView style={styles.statusbar}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontWeight: "500",
                        textAlign: "center",
                        paddingVertical: 10,
                    }}
                >
                    Menu
                </Text>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <AntDesign name="search1" size={16} color="#151515" />
                        <TextInput
                            placeholder="Search"
                            style={{ width: "65%" }}
                        />
                    </View>
                    <FlatList
                        numColumns={2}
                        horizontal={false}
                        data={products}
                        keyExtractor={(item) => products.indexOf(item)}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("ProductDetail", item)
                                }
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 8,
                                    padding: 14,
                                    flex: 1,
                                    alignItems: "center",
                                    marginRight: item.id % 2 !== 0 ? 8 : 0,
                                    marginLeft: item.id % 2 === 0 ? 8 : 0,
                                    marginBottom: 16,
                                }}
                            >
                                <AntDesign
                                    name="hearto"
                                    size={24}
                                    color="#4A4A4A"
                                    style={{ marginLeft: "auto" }}
                                />
                                <Image
                                    style={{
                                        height: 92,
                                        width: 60,
                                    }}
                                    source={item.img}
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginTop: 8,
                                        width: "100%",
                                    }}
                                >
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
                                            >{`(${item.alias})`}</Text>
                                        )}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#DB3C25",
                                            fontWeight: "500",
                                        }}
                                    >
                                        $ {item.price}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => addToCart(item)}
                                    style={{
                                        backgroundColor: "#DB3C25",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        borderRadius: 50,
                                        height: 45,
                                        columnGap: 6.67,
                                        marginTop: 14,
                                    }}
                                >
                                    <SimpleLineIcons
                                        name="handbag"
                                        size={20}
                                        color="white"
                                    />
                                    <Text style={{ color: "white" }}>
                                        Add to cart
                                    </Text>
                                </TouchableOpacity>
                            </Pressable>
                        )}
                    />
                </View>
            </View>
            <BottomNavbar navigation={navigation} />
        </SafeAreaView>
    )
}

export default Menu

const styles = StyleSheet.create({
    statusbar: {
        flex: 1,
        paddingTop: 24,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "white",
    },
    container: {
        marginTop: 12,
        borderTopColor: "#E1E5E9",
        borderTopWidth: 1,
        flex: 1,
        backgroundColor: "#F9F9F9",
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    inputContainer: {
        width: "100%",
        backgroundColor: "white",
        height: 40,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8,
        marginBottom: 16,
    },
})
