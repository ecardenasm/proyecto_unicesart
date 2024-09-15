import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import PropTypes from 'prop-types';
import './Post.css';

const Post = ({ imagen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogReportRef = useRef(null); // Cambiamos a useRef en lugar de useState

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const autoResize = (e) => {
        e.target.style.height = 'auto'; // Resetea la altura
        e.target.style.height = e.target.scrollHeight + 'px'; // Establece la altura basada en el scrollHeight
    }

    const showDialog = () => {
        if (dialogReportRef.current) {
            if (!dialogReportRef.current.open) {
                dialogReportRef.current.showModal();
            } else {
                dialogReportRef.current.close();
            }
        }
    };

    const handleReport = (option) => {
        console.log(`Reportado por: ${option}`);
        setIsOpen(false);
    };

    return (
        <div className="post">
            <div className="post-top">
                <div className="userInfo">
                    <i className="fa-solid fa-user"></i>
                    <p><Link to={"/profile"}>Usuario</Link></p>
                </div>
                <div className="report-dropdown">
                    <button className="report-button" onClick={toggleMenu}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
                {isOpen && (
                    <ul className="report-menu">
                        <li className="report-item" onClick={showDialog}>
                            <i className="fa-solid fa-flag"></i> Contenido inapropiado
                        </li>
                        <li className="report-item" onClick={() => handleReport('Spam')}>
                            <i className="fa-solid fa-trash"></i> Eliminar Publicación
                        </li>
                        <li className="report-item" onClick={() => handleReport('Acoso')}>
                            <i className="fa-solid fa-pen"></i> Editar Publicación
                        </li>
                        <li className="report-item" onClick={() => handleReport('Otro')}>Otro</li>
                        <li className="report-item" onClick={toggleMenu}>
                            <i className="fa-solid fa-x"></i> Cerrar
                        </li>
                    </ul>
                )}
            </div>

            <dialog ref={dialogReportRef} className="dialogPost dialogReport">
                <h3>Reportar</h3>
                <div className="sub">
                    <form method="dialog" className="formPost">
                        <p>Selecciona un motivo:</p>
                        <p>
                            <label>
                                <input type="checkbox" name="motivo" value="spam" />
                                Spam
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" name="motivo" value="contenido_inapropiado" />
                                Contenido inapropiado
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" name="motivo" value="acoso" />
                                Acoso
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" name="motivo" value="otro" />
                                Otro
                            </label>
                        </p>

                        <p>
                            <label>Descripción (Opcional):</label>
                            <textarea name="descripcion" id="descripcion" onChange={autoResize}></textarea>
                        </p>
                    </form>
                </div>

                <div className="botones">
                    <button style={{ background: '#1d8348' }} onClick={showDialog}>Reportar</button>
                    <button style={{ background: '#DE2D18' }} onClick={showDialog}>Cancelar</button>
                </div>
            </dialog>


            <div className="publicacion">
                <img src={imagen} alt="Post" />
                <div className="publicacion contenido">
                    <div className="descripcion">
                        <div className="reseña">
                            <p>Título:</p>
                            <p>Descripción: <br />
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe hic nihil facilis quibusdam debitis impedit doloribus aspernatur amet eos. Expedita?</span>
                            </p>
                            <div style={{ marginTop: '20px' }}>
                                <p>Categoría:</p>
                                <p style={{ marginTop: '10px' }}>Técnica Utilizada:</p>
                            </div>
                        </div>
                    </div>
                    <div className="reaccion">
                        <p>
                            <span>x</span>
                            <i className="fa-regular fa-heart"></i>
                            <span>Me encanta</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    imagen: PropTypes.string.isRequired,
};

export default Post;
