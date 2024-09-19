import { Router } from "express";
import { login, register, logout, profile, updateUser } from "../controllers/auth.controller.js";
import { getCategorias, getUbicaciones } from "../controllers/recursos.controller.js";
import { createPost, getPost, reactions } from "../controllers/post.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/updateuser', updateUser)
router.get('/profile', profile);

router.post('/createPost', createPost);
router.get('/getPost', getPost);
router.put('/reaction', reactions);

router.get('/ubicaciones', getUbicaciones);
router.get('/categorias', getCategorias);

export default router;