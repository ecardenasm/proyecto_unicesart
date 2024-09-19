import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, logoutRequest, updateRequest, profileRequest } from "../API/auth";
import { getUbicacionesRequest } from "../API/recursos";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('El usuario debe ser usado con authProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ubicaciones, setUbicaciones] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchUbicaciones = async () => {
            try {
                const response = await getUbicacionesRequest();
                setUbicaciones(response.data);
            } catch (error) {
                console.error('Error al obtener las ubicaciones', error);
            }
        };
        fetchUbicaciones();
    }, []);

    const singUp = async (user) => {
        try {

            console.log(user);

            // Realizar la solicitud de registro
            const res = await registerRequest(user);

            // Verificar si la respuesta es exitosa
            if (res.status === 200) {
                withReactContent(Swal).fire({
                    title: "Usuario Registrado",
                    text: "¡Usuario Registrado con Éxito!",
                    icon: "success"
                });
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                // Mostrar mensaje de advertencia si la respuesta no es exitosa
                withReactContent(Swal).fire({
                    title: "Advertencia",
                    text: "Hubo un problema al registrar el usuario. Por favor, intente de nuevo.",
                    icon: "warning"
                });
            }

        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error en caso de excepción
            withReactContent(Swal).fire({
                title: "Error",
                text: error.response?.data?.message || "Error al registrar el usuario.",
                icon: "error"
            });
            setUser(null);
            setIsAuthenticated(false);
            setErrors(error.response.data);
        }
    };

    const singIn = async (user) => {
        try {
            console.log(user);

            // Realizar la solicitud de registro
            const res = await loginRequest(user);

            // Verificar si la respuesta es exitosa
            if (res.status === 200) {
                withReactContent(Swal).fire({
                    title: "Credenciales Correctas",
                    text: "¡Bienvenido de Nuevo!",
                    icon: "success"
                });
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                // Mostrar mensaje de advertencia si la respuesta no es exitosa
                withReactContent(Swal).fire({
                    title: "Advertencia",
                    text: "No se han encontrado los datos: Usuario o contraseña incorrectos",
                    icon: "warning"
                });
            }

        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error en caso de excepción
            withReactContent(Swal).fire({
                title: "Error",
                text: error.response?.data?.message || "Error al registrar el usuario.",
                icon: "error"
            });
            setUser(null);
            setIsAuthenticated(false);
            setErrors(error.response.data);
        }
    }

    const logOut = async (user) => {
        try {

            // Realizar la solicitud de registro
            const res = await logoutRequest(user);

            // Verificar si la respuesta es exitosa
            if (res.status === 200) {
                setIsAuthenticated(false);
            }

        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error en caso de excepción
            withReactContent(Swal).fire({
                title: "Error",
                text: error.response?.data?.message || "Error al registrar el usuario.",
                icon: "error"
            });
            setUser(null);
            setIsAuthenticated(false);
            setErrors(error.response.data);
        }
    }

    const updateUser = async (user) => {
        try {

            // Realizar la solicitud de registro
            const res = await updateRequest(user);

            // Verificar si la respuesta es exitosa
            if (res.status === 200) {
                withReactContent(Swal).fire({
                    title: "Actualizacion",
                    text: "¡Se han actualizado los datos Correctamente!",
                    icon: "success"
                });
                setUser(res.data);
            }

        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error en caso de excepción
            withReactContent(Swal).fire({
                title: "Error",
                text: error.response?.data?.message || "Error al actualizar los datos de usuario.",
                icon: "error"
            });
            setErrors(error.response.data);
        }
    }

    const getUserProfile = async (username) => {
        try {
            // Realizar la solicitud de registro
            const res = await profileRequest(username);

            // Verificar si la respuesta es exitosa
            if (res.status === 200) {
                return res.data;
            } else {
                // Mostrar mensaje de advertencia si la respuesta no es exitosa
                withReactContent(Swal).fire({
                    title: "Advertencia",
                    text: "Error al consultar el perfil del usuario",
                    icon: "warning"
                });
            }

        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error en caso de excepción
            withReactContent(Swal).fire({
                title: "Error",
                text: error.response?.data?.message || "Error al buscar el usuario.",
                icon: "error"
            });
            setUser(null);
            setIsAuthenticated(false);
            setErrors(error.response.data);
        }
    }

    const getUbicaciones = async () => {
        try {

            // Realizar la solicitud de registro
            const res = await getUbicacionesRequest();

            // Verificar si la respuesta es exitosa
            if (res.status === 200) {
                setUbicaciones(res.data);
            }

        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error en caso de excepción
            withReactContent(Swal).fire({
                title: "Error",
                text: error.response?.data?.message || "Error al Consultar base de datos.",
                icon: "error"
            });
            setUser(null);
            setIsAuthenticated(false);
            setErrors(error.response.data);
        }
    }


    return (
        <AuthContext.Provider value={{
            singUp,
            singIn,
            logOut,
            getUbicaciones,
            updateUser,
            getUserProfile,
            ubicaciones,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    );
}