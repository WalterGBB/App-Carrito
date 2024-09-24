import { useReducer } from "react"
import { CarritoContext } from "./CarritoContext"

const initialState = ([])

export const CarritoProvider = ({ children }) => {

    const comprasReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CARRITO] Agregar compra':
                return [...state, action.payload]
            case '[CARRITO] Aumentar cantidad compra':
                return state.map(item => {
                    const cant = item.cantidad + 1
                    if (item.id === action.payload) return { ...item, cantidad: cant }
                    return item
                })
            case '[CARRITO] Disminuir cantidad compra':
                return state.map(item => {
                    const cant = item.cantidad - 1
                    if (item.id === action.payload && item.cantidad > 1) return { ...item, cantidad: cant }
                    return item
                })
            case '[CARRITO] Eliminar compra':
                return state.filter(compra => compra.id !== action.payload)
            default:
                return state;
        }
    }

    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState)

    const agregarCompra = (compra) => {
        compra.cantidad = 1 //Agregamos la propiedad cantidad a compra
        const action = {
            type: '[CARRITO] Agregar compra',
            payload: compra
        }
        dispatch(action)
    }
    const aumentarCantidad = (id) => {
        const action = {
            type: '[CARRITO] Aumentar cantidad compra',
            payload: id
        }
        dispatch(action)
    }
    const disminuirCantidad = (id) => {
        const action = {
            type: '[CARRITO] Disminuir cantidad compra',
            payload: id
        }
        dispatch(action)
    }
    const eliminarCompra = (id) => {
        const action = {
            type: '[CARRITO] Eliminar compra',
            payload: id
        }
        dispatch(action)
    }


    return (
        <CarritoContext.Provider value={{ listaCompras, agregarCompra, aumentarCantidad, disminuirCantidad, eliminarCompra }}>
            {children}
        </CarritoContext.Provider>
    )
}
