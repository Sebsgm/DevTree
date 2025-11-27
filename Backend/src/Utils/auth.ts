// Metodos para hashear las constraseñas
import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const CheckPassword = async (enterPassword: string, hash: string) =>{
    return await bcrypt.compare(enterPassword,hash)
}