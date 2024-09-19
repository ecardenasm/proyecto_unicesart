import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const NavBar = () => {
    const { isAuthenticated, user, logOut } = useAuth();
    const [userLink, setUserLink] = useState('');
    const navigate = useNavigate();

    // Redirigir cuando se autentique el usuario
    useEffect(() => {
        setUserLink(user?.username);
    }, [isAuthenticated, user, setUserLink]);

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
            navigate('/'); // Navegar a página principal tras cerrar sesión
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    return (
        <header>
            <div className="container">
                <div className="navBar">
                    {/* No autenticado */}
                    {!isAuthenticated ? (
                        <>
                            <div className="logo">
                                <Link to="/"><img src="src/assets/LogoUnicesArt.png" alt="Logo" /></Link>
                            </div>
                            <div className="container2">
                                <div className="enlaces">
                                    <ul>
                                        <li><Link to="/home">Continuar sin Registrarse</Link></li>
                                        <li className='singup'><Link to="/singup">Registrarse</Link></li>
                                        <li className='singin'><Link to="/singin">Iniciar Sesión</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="hamburguesa">

                            </div>
                        </>
                    ) : (
                        // Autenticado
                        <>
                            <div className="usuario">
                                <i className="fa-solid fa-user"></i>
                                <p><Link to={`/profile/${userLink}`}>{user?.fullName}</Link></p>
                            </div>
                            <div className="search">
                                <input type="text" placeholder="Buscar..." />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className="enlaces-dash">
                                <ul>
                                    <li>
                                        <Link to="/home"><div>
                                            <i className="fa-solid fa-house"></i>
                                            <p>Inicio</p></div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/configuration">
                                            <div>
                                                <i className="fa-solid fa-gear"></i>
                                                <p>Configuración</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut} style={{ background: '#fff', color: '#000' }}>
                                            <div>
                                                <i className="fa-solid fa-right-from-bracket"></i>
                                                <p>Cerrar Sesión</p>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="hamburguesa">
                                
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;
