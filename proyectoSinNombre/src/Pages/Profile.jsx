import Post from '../Componets/Post.jsx';
import './Profile.css'
import { useState } from 'react';

const Profile = () => {
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
        <>
            <div className="main">
                <div className="profile">
                    <section className="aboutme">
                        <div>
                            <img src="src/assets/user.png" alt="fotoPerfil" />
                            <p>Nombre de Usuario</p>
                        </div>
                        <div style={{ width: '10%', marginLeft: '90%' }} className="report-dropdown" >
                            <button className="report-button" onClick={toggleMenu}>
                                <i style={{ fontSize: '35px', overflowY: 'hidden' }} className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                        </div>
                        {isOpen && (
                            <ul className="report-menu2">
                                <li className="report-item" onClick={() => handleReport('Contenido inapropiado')}>
                                    <i className="fa-solid fa-ban" ></i>Suspender Usuario
                                </li>
                                <li className="report-item" onClick={() => handleReport('Spam')}>
                                    <i className="fa-solid fa-flag"></i>Reportar Usuario
                                </li>
                                <li className="report-item" onClick={() => handleReport('Otro')}>Otro</li>
                                <li className="report-item" onClick={toggleMenu}>
                                    <i className="fa-solid fa-x"></i> Cerrar
                                </li>
                            </ul>
                        )}
                    </section>
                    <section className="mycontent">
                        <div className="skills">
                            <div className="cloud" style={{ border: '3px solid #2ecc71' }}>
                                <p>Informacion Personal</p>
                                <div>
                                    <p>Edad: 21 Años</p>
                                    <p>Ciudad Origen: Valledupar, César</p>
                                    <p>Carrera: Lic. Arte</p>
                                </div>
                            </div>
                            <div className="cloud" style={{ border: '3px solid #27ae60' }} >
                                <p>Hablididades</p>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro iste maxime eaque quas debitis? Quaerat, adipisci porro, perferendis repellendus nesciunt necessitatibus, rem dignissimos doloremque quis quia veritatis soluta voluptate quisquam voluptas aliquam. Atque error aperiam praesentium veniam velit sed odio iusto sunt porro? Et vitae nesciunt soluta dolore aspernatur voluptate!</p>
                                </div>
                            </div>
                            <div className="cloud" style={{ border: '3px solid #27ae60' }}>
                                <p>Descripcion</p>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At quod sunt dolorum voluptates culpa, repudiandae maiores rerum earum et dolore veritatis recusandae saepe ipsa obcaecati esse, consequatur explicabo tempore in, similique perspiciatis itaque. Et eaque labore laudantium doloremque provident cumque.</p>
                                </div>
                            </div>
                            <div className="cloud" style={{ border: '3px solid #2ecc71' }}>
                                <p>Contacto</p>
                                <div>
                                    <p>Email: example@unicesar.edu.co</p>
                                    <p>Telefono: +57 300-456-3300</p>
                                </div>
                            </div>
                        </div>
                        <div className="myPost">
                            <h2>Trabajos destacados</h2>
                            <div>
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Profile;