import { Router } from 'express'
import User from './Models/User'
import { createAccount } from './Handlers'
const router = Router()

/** Autenticacion y registro */

router.post('/auth/register', createAccount)

export default router