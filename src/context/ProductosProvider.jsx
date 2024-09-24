import { useEffect, useState } from "react";
import { ProductosContext } from "./ProductosContext";

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    const fetchProductos = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data);
        setProductos(data);
        setProductosFiltrados(data); // Inicialmente, mostrar todos los productos
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const filtrarProductos = (term) => {
        if (term) {
            const filtered = productos.filter(producto =>
                producto.title.toLowerCase().includes(term.toLowerCase())
            );
            setProductosFiltrados(filtered);
        } else {
            setProductosFiltrados(productos);
        }
    };

    const filtrarProductosPorCategoria = (categoria) => {
        if (categoria) {
            const filtered = productos.filter(producto =>
                producto.category === categoria
            );
            setProductosFiltrados(filtered);
        } else {
            setProductosFiltrados(productos);
        }
    };

    const restablecerProductos = () => {
        setProductosFiltrados(productos);
    };

    return (
        <ProductosContext.Provider value={{ productos, productosFiltrados, setProductosFiltrados, filtrarProductos, filtrarProductosPorCategoria, restablecerProductos }}>
            {children}
        </ProductosContext.Provider>
    );
};
