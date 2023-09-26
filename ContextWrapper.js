import { createContext, useReducer } from "react"

export const CartContext = createContext()

function reducer(state, action) {
    switch (action.type) {
        case "update cart":
            return {
                cart: action.payload,
            }
        default:
            return state
    }
}

export default function ContextWrapper({ children }) {
    const [cartState, dispatch] = useReducer(reducer, {
        cart: [
            {
                name: "Asaro",
                alias: "Yam Porridge",
                img: require("./assets/asaro.png"),
                price: 50,
                amount: 1,
            },
            {
                name: "Moi Moi",
                alias: "Bean Cake",
                img: require("./assets/moi-moi.png"),
                price: 22,
                amount: 1,
            },
            {
                name: "Efo Riro",
                alias: "",
                img: require("./assets/efo-riro.png"),
                price: 10,
                amount: 1,
            },
        ],
    })

    const products = [
        {
            name: "African Doughnut Mix",
            alias: "",
            img: require("./assets/donut-mix.png"),
            price: 30,
            amount: 1,
        },
        {
            name: "Efo Riro",
            alias: "",
            img: require("./assets/efo-riro.png"),
            price: 10,
            amount: 1,
        },
        {
            name: "Asaro",
            alias: "Yam Porridge",
            img: require("./assets/asaro.png"),
            price: 50,
            amount: 1,
        },
        {
            name: "Chicken Stew",
            alias: "",
            img: require("./assets/chicken-stew.png"),
            price: 30,
            amount: 1,
        },
        {
            name: "Moi Moi",
            alias: "Bean Cake",
            img: require("./assets/moi-moi.png"),
            price: 22,
            amount: 1,
        },
        {
            name: "Asaro",
            alias: "Yam Porridge",
            img: require("./assets/asaro.png"),
            price: 30,
            amount: 1,
        },
    ]

    return (
        <CartContext.Provider value={{ dispatch, cartState, products }}>
            {children}
        </CartContext.Provider>
    )
}
