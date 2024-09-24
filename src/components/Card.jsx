import { useState } from "react"
import '../styles/Card.css'

export const Card = ({ imagen, titulo, descripcion, precio, handleAgregar, handleQuitar }) => {

    const [agregado, setAgregado] = useState(false)

    const clickAgregar = () => {
        handleAgregar()
        setAgregado(true)
    }

    const clickQuitar = () => {
        handleQuitar()
        setAgregado(false)
    }

    return (
        <div className="tarjeta col-lg-11">
            <img src={imagen} alt={titulo} className="tarjeta-imagen" />
            <div className="tarjeta-contenido">
                <h4 className="tarjeta-titulo">{titulo}</h4>
                <p className="tarjeta-descripcion">{descripcion}</p>
                <p className="tarjeta-precio">$ {precio}</p>

                {agregado
                    ? <button
                        type="button"
                        className="btn-quitar"
                        onClick={clickQuitar}
                    >
                        Quitar del carrito
                    </button>
                    : <button
                        type="button"
                        className="btn-agregar"
                        onClick={clickAgregar}
                    >
                        Agregar al carrito
                    </button>
                }
            </div>
        </div>
    )
}
