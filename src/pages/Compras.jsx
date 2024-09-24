import { useContext } from "react";
import { Card } from "../components/Card";
import { ProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";

export const Compras = () => {
    const { productosFiltrados } = useContext(ProductosContext);
    const { agregarCompra, eliminarCompra } = useContext(CarritoContext);

    const handleAgregar = (compra) => {
        agregarCompra(compra);
    };

    const handleQuitar = (id) => {
        eliminarCompra(id);
    };

    return (
        <>
            <h3>Productos</h3>
            <hr />
            <div className="container-tarjetas">
                {/* Usar paréntesis () en lugar de llaves {} para retornar implícitamente el componente Card.
                de lo contrario se deberá usar un return() luego de las {}*/}
                {productosFiltrados.map(producto => (
                    <Card
                        key={producto.id}
                        imagen={producto.image}
                        titulo={producto.title}
                        descripcion={producto.description}
                        precio={producto.price}
                        handleAgregar={() => handleAgregar(producto)}
                        handleQuitar={() => handleQuitar(producto.id)}
                    />
                ))}
            </div>
        </>
    );
};
