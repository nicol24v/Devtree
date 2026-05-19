import {Router} from 'express';
import {body} from 'express-validator'
import User from './models/User';
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from './handlers';
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';
const router = Router();
// Routing
//Autenticacion y Registro
router.post('/auth/register', 
    body('handle').notEmpty().withMessage('Handle is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is no valid'),
    body('password').notEmpty().withMessage('Password cannot be empty').isLength({ min: 9, max: 20 }).withMessage('Password must be at least 9 characters long'),
    handleInputErrors,
    createAccount )

router.post('/auth/login', 
    body('email')
    .isEmail()
    .withMessage('Email is no valid'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
    handleInputErrors,
    login)


router.get('/user', authenticate, getUser)

router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    authenticate,
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    searchByHandle
)


export default router;





//root
//sdJpVu6TlmSAaSUd