import { Link } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NavBar = () => {
    const { isAuthenticated, user, logOut } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated) ;
    }, [isAuthenticated, user] );

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut(); // No es necesario pasar 'user', logOut ya debería manejarlo internamente
            navigate('/'); // Navegar al login o página principal tras cerrar sesión
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

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
                                <p>{user.username}</p>
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
                                        <p><i className="fa-solid fa-gear"></i></p><br />
                                        <p><Link to="/configuration">Configuración</Link></p>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut} style={{ background: '#fff', color: '#000' }}>
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                            <p>Cerrar Sesión</p>
                                        </button>
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
