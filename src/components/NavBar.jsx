import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { ProductosContext } from "../context/ProductosContext";

export const NavBar = () => {
    const { listaCompras } = useContext(CarritoContext);
    const { productos, filtrarProductos, filtrarProductosPorCategoria, restablecerProductos } = useContext(ProductosContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const totalArticulos = listaCompras.reduce((total, item) => total + item.cantidad, 0);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term) {
            const results = productos.filter(producto =>
                producto.title.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchClick = () => {
        filtrarProductos(searchTerm);
        setSearchResults([]);
    };

    const handleResultClick = (producto) => {
        filtrarProductos(producto.title);
        setSearchResults([]);
        setSearchTerm(producto.title);
    };

    const handleCatalogoClick = () => {
        restablecerProductos();
        setSearchTerm("");
        setSearchResults([]);
    };

    const handleCategoryClick = (categoria) => {
        filtrarProductosPorCategoria(categoria);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link active" aria-current="page" onClick={handleCatalogoClick}>Catálogo</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ropa
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => handleCategoryClick("men's clothing")}>Hombres</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleCategoryClick("women's clothing")}>Mujeres</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Otros
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => handleCategoryClick("jewelery")}>Joyería</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleCategoryClick("electronics")}>Electrónicos</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex position-relative form-container" role="search" onSubmit={e => e.preventDefault()}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar un artículo"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-outline-success" type="button" onClick={handleSearchClick}>Buscar</button>
                        {searchResults.length > 0 && (
                            <ul className="list-group">
                                {searchResults.map(producto => (
                                    <li key={producto.id} className="list-group-item" onClick={() => handleResultClick(producto)}>
                                        {producto.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                    <NavLink to={'/carrito'} className="btn-carrito">
                        <Badge badgeContent={totalArticulos} color="warning">
                            <ShoppingCart color="secondary" />
                        </Badge>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
