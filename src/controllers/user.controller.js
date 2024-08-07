import { createAccessToken } from "../libs/jwt.js";
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRETO } from '../config.js'

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const usuarioEncontrado = await User.findOne({email})
        if(usuarioEncontrado)
            return res.status(400).json("Email already exists")
        const passwordHash = await bcrypt.hash(password, 8)

        const nuevoUsuario = new User({
            username, email, password: passwordHash
        })
        const usuarioGuardado = await nuevoUsuario.save();
        const token = await createAccessToken({id:usuarioGuardado._id})
        res.cookie("token", token)
        res.json({
            email: usuarioGuardado.email,
            usuername: usuarioGuardado.username,
            id: usuarioGuardado.id
        })
    } catch (error) {
        res.status(500).json([error.message])
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json(["User not found"])
        
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json(["Incorrect password"])
        
        const token = await createAccessToken({id: userFound._id})

        res.cookie("token", token)

        res.json({
            email: userFound.email,
            username: userFound.username,
            id: userFound.id,
            createdAt: userFound.createdAt
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const logout = (req, res) => {
    res.cookie(token, "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    if(!usuarioEncontrado) return res.status(400).json(["User not found"]);
    return res.json({
        id: usuarioEncontrado._id,
        usuername: usuarioEncontrado.username,
        email: usuarioEncontrado.email,
    })
}