import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import './Post.css';

const Post = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogReportRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const autoResize = (e) => {
        e.target.style.height = 'auto'; // Resetea la altura
        e.target.style.height = e.target.scrollHeight + 'px'; // Establece la altura basada en el scrollHeight
    };

    const openDialog = () => {
        if (dialogReportRef.current && !dialogReportRef.current.open) {
            dialogReportRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogReportRef.current && dialogReportRef.current.open) {
            dialogReportRef.current.close();
        }
    };

    const handleReport = (option) => {
        console.log(`Reportado por: ${option}`);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.closest('.report-dropdown')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="post">
            <div className="post-top">
                <div className="userInfo">
                    <i className="fa-solid fa-user"></i>
                    <p><Link to={`/profile/${post.user.userName}`}>{post.user.userName}</Link></p>
                </div>
                <div className="report-dropdown">
                    <button className="report-button" onClick={toggleMenu}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
                {isOpen && (
                    <ul className="report-menu">
                        <li className="report-item" onClick={openDialog}>
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
                    <button style={{ background: '#1d8348' }} onClick={closeDialog}>Reportar</button>
                    <button style={{ background: '#DE2D18' }} onClick={closeDialog}>Cancelar</button>
                </div>
            </dialog>

            <div className="publicacion">
                <img src={post.imageUrl} alt={post.title} />
                <div className="publicacion contenido">
                    <div className="descripcion">
                        <div className="reseña">
                            <p>Título: {post.title}</p>
                            <p>Descripción: <br />
                                <span>{post.description}</span>
                            </p>
                            <div style={{ marginTop: '20px' }}>
                                <p>Categoría: {post.category}</p>
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
};

Post.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        category: PropTypes.string,
        imageUrl: PropTypes.string, // Cambia esto a 'imageUrl' en lugar de 'imagen'
        user: PropTypes.shape({
            userName: PropTypes.string.isRequired // Cambia 'username' a 'userName'
        }).isRequired
    }).isRequired,
};


export default Post;
