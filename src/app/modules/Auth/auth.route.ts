
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LoginValidationSchema, refreshTokenValidationSchema, SignupValidationSchema } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

// this route is created for create user
router.post(
  '/signup',
  validateRequest(SignupValidationSchema),
  AuthControllers.createUser,
);

router.get(
  '/:id',
  AuthControllers.getUser,
);

// this route is created for login user
router.post(
  '/login',
  validateRequest(LoginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;