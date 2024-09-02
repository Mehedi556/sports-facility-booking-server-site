import { z } from "zod";

export const SignupValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.enum([ "admin" , "user" ]),
    address: z.string(),
  })
})


export const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
})

export const refreshTokenValidationSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });