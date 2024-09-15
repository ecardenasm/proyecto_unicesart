import { createContext, useContext, useState } from "react";
import { registerRequest } from "../API/auth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('El usuario debe ser usado con authProvider');
    }
    return context;
};

export const AuthProvider =  ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

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

    return (
        <AuthContext.Provider value={{
            singUp,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    );
}