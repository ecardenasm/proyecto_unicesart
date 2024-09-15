import { useState } from "react";

const EliminarCuenta = () => {
    const [step, setStep] = useState(1); // Estado para controlar el paso actual
    const [buttonText, setButtonText] = useState('Eliminar Cuenta'); // Estado para el texto del botón

    const handleButtonClick = () => {
        if (step === 1) {
            setStep(2); // Avanza al siguiente paso
            setButtonText('Confirmar'); // Cambia el texto del botón
        } else {
            // Aquí puedes agregar la lógica para verificar el código
            alert('Cuenta Eliminada');
        }
    };

    return (
        <div className="cambioContrasena">
            <div style={{background:'#f1948a', width:'98%', margin:'auto'}}>
                <p>Al eliminar la cuenta se borrarán todos sus datos incluyendo publicaciones reacciones</p>
                <p>¿Está seguro de que desea eliminar su cuenta?</p>
            </div>

            {step === 2 && (
                <section style={{ marginTop: '2%' }}>
                    <p>Ingrese por favor su Contraseña: </p>
                    <input type="text" name="verification-code" />
                </section>
            )
            }

            <button onClick={handleButtonClick}>{buttonText}</button>
        </div >
    );

}

export default EliminarCuenta;