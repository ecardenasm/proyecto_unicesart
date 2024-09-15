import { Link } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <header>
            <div className="container">
                <div className="navBar">
                    {/* Sin autenticar */}
                    {!isAuthenticated ? (
                        <>
                            <div className="logo">
                                <Link to="/"><img src="src/assets/LogoUnicesArt.png" alt="Logo" /></Link>
                            </div>
                            <div className="container2">
                                <div className="enlaces">
                                    <ul>
                                        <li className='continue'>
                                            <Link to="/home">Continuar sin Registrarse</Link>
                                        </li>
                                        <li className='singup'>
                                            <Link to="/singup">Registrarse</Link>
                                        </li>
                                        <li className="singin">
                                            <Link to="/singin">Iniciar Sesión</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="hamburguesa">
                                    <i className="fa-solid fa-bars"></i>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Autenticado
                        <>
                            <div className="usuario">
                                <i className="fa-solid fa-user"></i>
                                <p>Tu Nombre de Usuario</p>
                            </div>
                            <div className="search">
                                <input type="text" />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className="enlaces-dash">
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-house"></i>
                                        <Link to="/home">Inicio</Link>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-gear"></i>
                                        <Link to="/configuration">Configuración</Link>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <Link to="/signin">Cerrar Sesión</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="hamburguesa">
                                <i className="fa-solid fa-bars-staggered"></i>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default NavBar;
