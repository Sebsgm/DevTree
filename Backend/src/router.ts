import { Router } from 'express'
import {body} from 'express-validator'
import { createAccount, Login } from './Handlers'
import { handleInputErrors } from './Middleware/validation'
const router = Router()

/** Autenticacion y registro */

router.post('/auth/register', 
    body('handle').notEmpty().withMessage("El handle no puede ir vacio"),
    body('name').notEmpty().withMessage("El nombre no puede ir vacio"),
    body('email').isEmail().withMessage("Email no valido"),
    body('password').isLength({min:8}).withMessage("El password debe tener minimo 8 caracteres"),
    handleInputErrors,
    createAccount)


router.post('/auth/login',
    body('email').isEmail().withMessage("Email no valido"),
    body('password').notEmpty().withMessage("El password es obligatorio"),
    handleInputErrors,
    Login
)

export default router