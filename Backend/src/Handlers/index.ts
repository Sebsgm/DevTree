import type {Request, Response} from 'express'
import {validationResult} from 'express-validator'
import slug from 'slug'
import User from "../Models/User"
import { CheckPassword, hashPassword } from '../Utils/auth'

// Este archivo se encarga de mandar las request y respons al server en forma de funciones, que manda las las peticiones. Para tener el codigo mucho mas organizado.
export const createAccount = async (req: Request,res: Response) =>{

    const {email,password} = req.body
    const userExist = await User.findOne({email})

    if(userExist){
        const error = new Error('El correo ya esta registrado')
        return res.status(409).json({error: error.message})
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({handle})

    if(handleExist){
        const error = new Error('Nombre de Usuario no disponible')
        return res.status(409).json({error: error.message})
    }
    

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle
    await user.save()
    res.status(201).send('Registro Creado Correctamente') 
}


// Funcion para validar si el usuario existe y puede ingresar
export const Login = async (req: Request, res: Response) =>{
    
    const {email,password} = req.body

    // Revisar si el usuario ya este registrado
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(404).json({error: error.message})
    }

    // Comprobar password
    const isPasswordCorrect = await CheckPassword(password, user.password)

    if(!isPasswordCorrect){
        const error = new Error('Password Incorrecto')
        return res.status(401).json({error: error.message})
    }

    res.send('Autenticado...')
}