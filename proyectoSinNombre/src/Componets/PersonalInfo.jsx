import { useState } from 'react';

const PersonalInfo = () => {
    const [isEditable, setIsEditable] = useState(false);

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSave = () => {
        // Aquí puedes añadir lógica para guardar los datos
        setIsEditable(false);
    };

    return (
        <section className="informacionPersonal">
            <p>Nombre</p>
            <input type="text" disabled={!isEditable} />
            <p>Fecha Nacimiento</p>
            <input type="text" disabled={!isEditable} />
            <p>Género</p>
            <input type="text" disabled={!isEditable} />
            <p>Ciudad de Origen</p>
            <input type="text" disabled={!isEditable} />
            <p>Carrera</p>
            <input type="text" disabled={!isEditable} />
            <p>Habilidades</p>
            <textarea disabled={!isEditable}></textarea>
            <p>Descripción</p>
            <textarea disabled={!isEditable}></textarea>
            <p style={{ marginTop: '8px', marginBottom: '5px' }}>Contacto</p>
            <p>Teléfono</p>
            <input type="text" disabled={!isEditable} />
            <p>Email</p>
            <input type="text" disabled={!isEditable} />
            <div>
                <button onClick={handleEdit} disabled={isEditable}>Editar</button>
                <button onClick={handleSave} disabled={!isEditable}>Guardar</button>
            </div>
        </section>
    );
}

export default PersonalInfo;
