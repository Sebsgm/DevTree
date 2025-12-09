import type {Request, Response} from 'express'
import {validationResult} from 'express-validator'
import slug from 'slug'
import formidable from 'formidable'
import {v4 as uuid} from 'uuid'
import User from "../Models/User"
import { CheckPassword, hashPassword } from '../Utils/auth'
import { generateJWT } from '../Utils/jwt'
import cloudinary from '../Config/cloudinary'

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

    const token = generateJWT({id: user._id})

    res.send(token)
}

// Funcion para traer informacion del usuario
export const getUser = async (req: Request, res: Response) =>{
    res.json(req.user)
}

// Funcion para actulizar el handle y descripcion del usuario
export const updateProfile = async (req: Request, res: Response) =>{
    try {
        const {description, links} = req.body
        const handle = slug(req.body.handle, '')
        const handleExist = await User.findOne({handle})

        if(handleExist && handleExist.email !== req.user.email){
            const error = new Error('Nombre de Usuario no disponible')
            return res.status(409).json({error: error.message})
        }

        //Actualizar el Usuario
        req.user.description = description
        req.user.handle = handle
        req.user.links = links
        await req.user.save()
        res.send('Perfil Actualizado Correctamente')


    } catch (e) {
        const error = new Error('Hubo un error')
        return res.status(500).json({error: error.message})
    }
}

export const uploadImage = async (req: Request, res: Response) =>{
    const form = formidable({multiples: false})
    try {
        form.parse (req, (error, fields, files) =>{

        cloudinary.uploader.upload(files.file[0].filepath,{public_id: uuid()}, async function(error,result){
            if(error){
                const error = new Error('Hubo un error al subir la imagen')
                return res.status(500).json({error: error.message})
            }
            if (result){
                req.user.image = result.secure_url
                await req.user.save()
                res.json({image: result.secure_url})
            }
        })
    })
    } catch (e) {
        const error = new Error('Hubo un error')
        return res.status(500).json({error: error.message})
    }
}