import { Link } from 'react-router-dom';
import './Configuration.css';
import { useState } from 'react';
import CambioContrasena from '../Componets/CambioContrasena';
import PersonalInfo from '../Componets/PersonalInfo';
import EliminarCuenta from '../Componets/EliminarCuenta';

const Configuration = () => {
    const [activeOption, setActiveOption] = useState(null);

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    return (
        <>
            <div className="configuration">
                <div className="options">
                    <div
                        className={`option ${activeOption === 'option1' ? 'active' : ''}`}
                        onClick={() => handleOptionClick('option1')}
                    >
                        <p><Link to="#">Cambiar Contraseña</Link></p>
                    </div>
                    <div
                        className={`option ${activeOption === 'option2' ? 'active' : ''}`}
                        onClick={() => handleOptionClick('option2')}
                    >
                        <p><Link to="#">Eliminar Cuenta</Link></p>
                    </div>
                    <div
                        className={`option ${activeOption === 'option3' ? 'active' : ''}`}
                        onClick={() => handleOptionClick('option3')}
                    >
                        <p><Link to="#">Actualizar Información Personal</Link></p>
                    </div>
                    <div
                        className={`option ${activeOption === 'option4' ? 'active' : ''}`}
                        onClick={() => handleOptionClick('option4')}
                    >
                        <p><Link to="#">Reportes</Link></p>
                    </div>
                </div>
                <div className="contenido-opcion">
                    {activeOption === 'option1' && <CambioContrasena />}
                    {activeOption === 'option2' && <EliminarCuenta />}
                    {activeOption === 'option3' && <PersonalInfo />}
                    {activeOption === 'option4' && <h1>Opcion 4</h1>}
                </div>
            </div>
        </>
    );
}

export default Configuration;
