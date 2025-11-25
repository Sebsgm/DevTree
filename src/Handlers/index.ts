import type {Request, Response} from 'express'
import User from "../Models/User"
import { hashPassword } from '../Utils/auth'

// Este archivo se encarga de mandar las request y respons al server en forma de funciones, que manda las las peticiones. Para tener el codigo mucho mas organizado.
export const createAccount = async (req: Request,res: Response) =>{

    const {email,password} = req.body
    const userExist = await User.findOne({email})

    if(userExist){
        const error = new Error('El usuario ya esta registrado')
        return res.status(409).json({error: error.message})
    }



    const user = new User(req.body)
    user.password = await hashPassword(password)
    await user.save()
    res.status(201).send('Registro Creado Correctamente') 
}