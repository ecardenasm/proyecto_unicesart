import User from '../models/user.model.js';
import Persona from '../models/persona.models.js'
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { email, password, fullName, description, skills, profession, birthDate, city, phone, gender } = req.body;

    try {

        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json(['La dirección de correo electronico ya esta siendo usada']);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newPersona = new Persona({
            fullName,
            birthDate,
            gender,
        });

        const savedPersona = await newPersona.save();

        const newUser = new User({
            email,
            password: passwordHash,
            persona: savedPersona._id,
            username: req.body.username,
            status: 'active',
            role: 2,
        });

        const savedUser = await newUser.save();

        if (savedUser) {
            const token = await createAccesToken({ id: savedUser._id });
            res.cookie('token', token);
            return res.json({
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
                persona: {
                    fullName: savedPersona.fullName,
                }
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
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
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

export const profile = (req, res) => {
    console.log(req.user);
    res.send('profile');
};