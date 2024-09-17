import './Login.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const { singUp, ubicaciones, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/home');
    }, [isAuthenticated, navigate]);

    const autoResize = (e) => {
        e.target.style.height = 'auto'; // Resetea la altura
        e.target.style.height = e.target.scrollHeight + 'px'; // Establece la altura basada en el scrollHeight
    };

    const handleRegister = async (data) => {
        singUp(data);
    };

    // Verifica si ubicaciones está definido y es un array
    const departamentos = Array.isArray(ubicaciones) ? ubicaciones : [];
    const municipios = selectedDepartamento
        ? departamentos.find((ubicacion) => ubicacion.nombre === selectedDepartamento)?.municipios || []
        : [];

    return (
        <div className="Father">
            <div className="imagenFondo">
                <img src="src/assets/street-art-7888561_1920.jpg" alt="" />
                <div className="dialogo">
                    <div className="container">
                        {registerErrors.length > 0 && (
                            <div className="error-container">
                                {registerErrors.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}
                            </div>
                        )}
                        <form className="formulario formularioRegister" onSubmit={handleSubmit(handleRegister)}>
                            <div className='camposRegister'>
                                <div className="field campo">
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        type="text"
                                        placeholder='Nombres y Apellidos'
                                        {...register("fullName", {
                                            required: "Nombres y Apellidos son requeridos",
                                            pattern: {
                                                value: /^[a-zA-Z\s]+$/,
                                                message: "Solo se permiten letras y espacios"
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Debe tener al menos 3 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
                                </div>

                                <div className="field campo">
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <input
                                        style={{ marginTop: '0px', marginBottom: '0px', fontSize: '18px' }}
                                        type="date"
                                        {...register("birthDate", {
                                            required: "Fecha de nacimiento es requerida",
                                            validate: {
                                                isAdult: value => {
                                                    const birthDate = new Date(value);
                                                    const today = new Date();
                                                    const age = today.getFullYear() - birthDate.getFullYear();
                                                    return age >= 15 || "Debes ser mayor de 15 años";
                                                }
                                            }
                                        })}
                                        placeholder='Fecha Nacimiento'
                                    />
                                    {errors.birthDate && <span className="error-message">{errors.birthDate.message}</span>}
                                </div>

                                <div className="field campo">
                                    <i className="fa-solid fa-at"></i>
                                    <input
                                        type="text"
                                        {...register("username", {
                                            required: "Nombre de usuario es requerido",
                                            minLength: {
                                                value: 3,
                                                message: "El nombre de usuario debe tener al menos 3 caracteres"
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: "El nombre de usuario no puede exceder los 15 caracteres"
                                            }
                                        })}
                                        placeholder='Nombre de Usuario'
                                    />
                                    {errors.username && <span className="error-message">{errors.username.message}</span>}
                                </div>

                                <div className="field campo">
                                    <i className="fa-solid fa-venus-mars"></i>
                                    <select {...register("gender", { required: "Género es requerido" })} defaultValue="">
                                        <option value="" disabled>Género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Prefiero no decirlo</option>
                                    </select>
                                    {errors.gender && <span className="error-message">{errors.gender.message}</span>}
                                </div>

                                <div className="field campo">
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Correo electrónico es requerido",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@unicesar\.edu\.co$/,
                                                message: "El correo debe ser del dominio @unicesar.edu.co"
                                            }
                                        })}
                                        placeholder="Correo Electrónico"
                                    />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div>

                                <div className="field campo">
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: "Contraseña es requerida",
                                            minLength: {
                                                value: 8,
                                                message: "La contraseña debe tener al menos 8 caracteres"
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
                                            }
                                        })}
                                        placeholder="Contraseña"
                                    />
                                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                                </div>

                                <div className="field campo">
                                    <i className="fa-solid fa-briefcase"></i>
                                    <input
                                        type="text"
                                        {...register("profession")}
                                        placeholder="Profesión (Opcional)"
                                    />
                                </div>

                                <div className="field campo">
                                    {departamentos.length > 0 && (
                                        <>
                                            <i className="fa-solid fa-location-dot"></i>
                                            <select {...register("city.departamento", { required: "El departamento es requerido" })} value={selectedDepartamento} onChange={(e) => setSelectedDepartamento(e.target.value)}>
                                                <option value="" disabled>Departamento</option>
                                                {departamentos.map((ubicacion) => (
                                                    <option key={ubicacion.departamentoId} value={ubicacion.nombre}>
                                                        {ubicacion.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                            <div style={{ height: '5px', width: '430px' }}></div>
                                            <i className="fa-solid fa-city"></i>
                                            <select {...register("city.municipio", { required: "El municipio es requerido" })}>
                                                <option value="" disabled>Municipio</option>
                                                {municipios.map((municipio) => (
                                                    <option key={municipio.id} value={municipio.nombreMunicipio}>
                                                        {municipio.nombreMunicipio}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}
                                    {errors.city?.departamento && <span className="error-message">{errors.city.departamento.message}</span>}

                                    {errors.city?.municipio && <span className="error-message">{errors.city.municipio.message}</span>}
                                </div>
                                <div className="field campo">
                                    <i className="fa-solid fa-info-circle"></i>
                                    <textarea
                                        {...register("description")}
                                        placeholder="Descripción (Opcional)"
                                        onChange={autoResize}
                                    />
                                </div>

                                <div className="field campo">
                                    <i className="fa-solid fa-list"></i>
                                    <textarea
                                        {...register("skills")}
                                        placeholder="Habilidades (Opcional)"
                                        onChange={autoResize}
                                    />
                                </div>
                            </div>
                            <div className="field campo">
                                <button type="submit">Registrarse</button>
                                <button className="sinGoogle">Registrarse con<img src="src/assets/google.png" alt="" /></button>
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

export default Register;