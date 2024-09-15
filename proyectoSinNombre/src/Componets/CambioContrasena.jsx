import { useState } from 'react';

const CambioContrasena = () => {
    const [step, setStep] = useState(1); // Estado para controlar el paso actual
    const [buttonText, setButtonText] = useState('Cambiar Contraseña'); // Estado para el texto del botón

    const handleButtonClick = () => {
        if (step === 1) {
            setStep(2); // Avanza al siguiente paso
            setButtonText('Verificar Código'); // Cambia el texto del botón
        } else {
            // Aquí puedes agregar la lógica para verificar el código
            alert('Código verificado');
        }
    };

    return (
        <div className="cambioContrasena">
            <p>Contraseña Actual</p>
            <input type="password" name="current-password" />

            <p>Nueva Contraseña</p>
            <input type="password" name="new-password" />

            <p>Confirmar Contraseña</p>
            <input type="password" name="confirm-password" />

            {step === 2 && (
                <section style={{ marginTop: '2%' }}>
                    <p style={{ fontSize: '15px' }}>Hemos enviado un código de verificación al correo ex...@u...co</p>
                    <p>Ingrese el código de confirmación</p>
                    <input type="text" name="verification-code" />
                </section>
            )
            }

            <button onClick={handleButtonClick}>{buttonText}</button>
        </div >
    );
}

export default CambioContrasena;
