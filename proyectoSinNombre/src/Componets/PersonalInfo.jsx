
const PersonalInfo = () => {

    return (
        <section className="informacionPersonal">
            <p>Ciudad de Origen</p>
            <input type="text" name="" id="" />
            <p>Carrera</p>
            <input type="text" name="" id="" />
            <p>Habilidades</p>
            <textarea name="" id=""></textarea>
            <p>Descripcion</p>
            <textarea name="" id=""></textarea>
            <p style={{marginTop:'8px', marginBottom:'5px'}}>Contacto</p>
            <p>Telefono</p>
            <input type="text" name="" id="" />
            <p>Email</p>
            <input type="text" name="" id="" />
            <div>
                <button>Editar</button>
                <button>Guardar</button>
            </div>
        </section>
    );
}

export default PersonalInfo;