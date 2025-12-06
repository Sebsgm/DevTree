import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../Models/User'

declare global {
    namespace Express{
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request,res: Response,next: NextFunction) =>{
    const beared = req.headers.authorization

    if(!beared){
        const error = new Error('No Autorizado')
        return res.status(401).json({error: error.message})
    }

    const [, token] = beared.split(' ')
    
    if(!token){
        const error = new Error('No Autorizado')
        return res.status(401).json({error: error.message})
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof result == 'object' && result.id){
            const user = await (await User.findById(result.id).select('-password'))
            if (!user){
                const error = new Error('El Usuario no existe')
                return res.status(404).json({error: error.message})
            }
            req.user = user
            next()
        }
    } catch (error) {
        res.status(500).json({error: 'Token No Valido'})
    }

}