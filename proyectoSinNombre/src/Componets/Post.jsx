import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from 'prop-types';
import './Post.css'

const Post = ({ imagen }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleReport = (option) => {
        // Aquí manejarías la lógica para reportar la publicación
        console.log(`Reportado por: ${option}`);
        // Cierra el menú después de seleccionar una opción
        setIsOpen(false);
    };

    return (
        <div className="post">

            <div className="post-top">
                <div className="userInfo">
                    <i className="fa-solid fa-user"></i>
                    <p><Link to={"/profile"}>Usuario</Link></p>
                </div>
                <div className="report-dropdown" >
                    <button className="report-button" onClick={toggleMenu}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
                {isOpen && (
                    <ul className="report-menu">
                        <li className="report-item" onClick={() => handleReport('Contenido inapropiado')}>
                            <i className="fa-solid fa-flag"></i>Contenido inapropiado
                        </li>
                        <li className="report-item" onClick={() => handleReport('Spam')}>
                            <i className="fa-solid fa-trash"></i>Eliminar Publicacion
                        </li>
                        <li className="report-item" onClick={() => handleReport('Acoso')}>
                            <i className="fa-solid fa-pen"></i>Editar Publicación
                        </li>
                        <li className="report-item" onClick={() => handleReport('Otro')}>Otro</li>
                        <li className="report-item" onClick={toggleMenu}>
                            <i className="fa-solid fa-x"></i> Cerrar
                        </li>
                    </ul>
                )}
            </div>

            <div className="publicacion">
                <img src={imagen} alt={imagen} />
                <div className="publicacion contenido">
                    <div className="descripcion">
                        <div className="reseña">
                            <p>Titulo:</p>
                            <p>Descripcion: <br />
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe hic nihil facilis quibusdam debitis impedit doloribus aspernatur amet eos. Expedita?</span>
                            </p>
                            <div style={{ marginTop: '20px' }}>
                                <p>Categoría:</p>
                                <p style={{ marginTop: '10px' }}>Tecnica Utilizada: </p>
                            </div>
                        </div>
                    </div>
                    <div className="reaccion">
                        <p>
                            <span>x</span>
                            <i className="fa-regular fa-heart"></i>
                            <span>Me encanca</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    imagen: PropTypes.string.isRequired,  // Se espera que 'imagen' sea una string y es obligatorio
};

export default Post;