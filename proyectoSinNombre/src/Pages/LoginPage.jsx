import { useNavigate } from "react-router-dom";
import './Login.css';
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        console.log(data); // Muestra los datos del formulario en la consola
        navigate("/home");
    };

    return (
        <div className="Father">
            <div className="imagenFondo">
                <img src="src/assets/street-art-7888561_1920.jpg" alt="" />
                <div className="dialogo">
                    <div className="container">
                        <form className="formulario" onSubmit={handleSubmit(handleLogin)}>
                            <div className="field">
                                <i className="fa-solid fa-user"></i>
                                <input
                                    type="email"
                                    {...register("correoelectronico", {
                                        required: "Correo electrónico es requerido",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@unicesar\.edu\.co$/,
                                            message: "El correo debe ser del dominio @unicesar.edu.co"
                                        }
                                    })}
                                    placeholder="Correo Electrónico"
                                />
                                {errors.correoelectronico && <span className="error-message">{errors.correoelectronico.message}</span>}
                            </div>
                            <div className="field">
                                <i className="fa-solid fa-key"></i>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Contraseña es requerida",
                                    })}
                                    placeholder="Contraseña"
                                />
                                {errors.password && <span className="error-message">{errors.password.message}</span>}
                            </div>
                            <div className="field">
                                <a style={{ margin: 'auto', color: '#000' }} href="#">¿Olvidó su Contraseña?</a>
                            </div>
                            <div className="field">
                                <button type="submit">Iniciar Sesión</button>
                                <button className="sinGoogle">Iniciar Sesion con <img src="src/assets/google.png" alt="" /></button>
                            </div>
                        </form>
                    </div>
                    <div className="contribucion">
                        <p>Imagen de <a href="https://pixabay.com/es/users/tho-ge-113537/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7888561">Thomas G.</a> en <a href="https://pixabay.com/es//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7888561">Pixabay</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
