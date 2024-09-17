import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';

const calcularEdad = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    // Si el mes actual es anterior al mes de nacimiento, o si estamos en el mes de nacimiento pero el día aún no ha llegado, restamos 1 a la edad
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
};

const formatFecha = (fechaISO) => {
    const dateObj = new Date(fechaISO);
    const day = String(dateObj.getDate()).padStart(2, '0'); // Asegura que tenga 2 dígitos
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11, por eso sumamos 1
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
};

export const register = async (req, res) => {
    const { email, password, fullName, description, skills, profession, birthDate, city, phone, gender } = req.body;

    try {

        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json(['La dirección de correo electronico ya esta siendo usada']);
        }

        const passwordHash = await bcrypt.hash(password, 10);


        const newUser = new User({
            email,
            password: passwordHash,
            username: req.body.username,
            fullName: fullName,
            description: description,
            skills: skills,
            profession: profession,
            lugarOrigen: {
                nombreDepartamento: city.departamento,
                nombreMunicipio: city.municipio
            },
            birthDate: birthDate,
            phone: phone,
            gender: gender,
            status: 'active',
        });

        const savedUser = await newUser.save();

        if (savedUser) {
            const token = await createAccesToken({ id: savedUser._id });
            res.cookie('token', token);
            return res.json({
                id: savedUser._id,
                email: savedUser.email,
                username: savedUser.username,
                fullName: savedUser.fullName,
                description: savedUser.description,
                skills: savedUser.skills,
                profession: savedUser.profession,
                lugarOrigen: {
                    nombreDepartamento: savedUser.lugarOrigen.nombreDepartamento,
                    nombreMunicipio: savedUser.lugarOrigen.nombreMunicipio
                },
                birthDate: formatFecha(savedUser.birthDate),
                phone: savedUser.phone,
                gender: savedUser.gender,
                status: savedUser.status,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
                edad: calcularEdad(savedUser.birthDate)
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({
            message: "Usuario no Encontrado"
        })

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({
            message: "Contraseña incorrecta"
        });

        const token = await createAccesToken({ id: userFound._id });

        res.cookie('token', token);
        console.log(userFound);
        res.json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            fullName: userFound.fullName,
            description: userFound.description,
            skills: userFound.skills,
            profession: userFound.profession,
            lugarOrigen: {
                nombreDepartamento: userFound.lugarOrigen.nombreDepartamento,
                nombreMunicipio: userFound.lugarOrigen.nombreMunicipio
            },
            birthDate: formatFecha(userFound.birthDate),
            phone: userFound.phone,
            gender: userFound.gender,
            status: userFound.status,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            edad: calcularEdad(userFound.birthDate)
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const updateUser = async (req, res) => {
    const { email, fullName, description, skills, profession, birthDate, city, phone, gender } = req.body;
    console.log(email);
    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        userFound.fullName = fullName || userFound.fullName;
        userFound.description = description || userFound.description;
        userFound.skills = skills || userFound.skills;
        userFound.profession = profession || userFound.profession;
        userFound.lugarOrigen = {
            nombreDepartamento: city?.departamento || userFound.lugarOrigen.nombreDepartamento,
            nombreMunicipio: city?.municipio || userFound.lugarOrigen.nombreMunicipio,
        };
        userFound.birthDate = birthDate || userFound.birthDate;
        userFound.phone = phone || userFound.phone;
        userFound.gender = gender || userFound.gender;

        const updatedUser = await userFound.save();

        return res.json({
            id: updatedUser._id,
            email: updatedUser.email,
            username: updatedUser.username,
            fullName: updatedUser.fullName,
            description: updatedUser.description,
            skills: updatedUser.skills,
            profession: updatedUser.profession,
            lugarOrigen: {
                nombreDepartamento: updatedUser.lugarOrigen.nombreDepartamento,
                nombreMunicipio: updatedUser.lugarOrigen.nombreMunicipio,
            },
            birthDate: formatFecha(updatedUser.birthDate),
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            status: updatedUser.status,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            edad: calcularEdad(updatedUser.birthDate),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const profile = async (req, res) => {
    try {
        console.log(req.query);
        const { username } = req.query;
        console.log(username);
        const userFound = await User.findOne({ username });

        if (!userFound) return res.status(400).json({
            message: "Usuario no Encontrado"
        })

        res.json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            fullName: userFound.fullName,
            description: userFound.description,
            skills: userFound.skills,
            profession: userFound.profession,
            lugarOrigen: {
                nombreDepartamento: userFound.lugarOrigen.nombreDepartamento,
                nombreMunicipio: userFound.lugarOrigen.nombreMunicipio
            },
            birthDate: formatFecha(userFound.birthDate),
            phone: userFound.phone,
            gender: userFound.gender,
            status: userFound.status,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            edad: calcularEdad(userFound.birthDate)
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};