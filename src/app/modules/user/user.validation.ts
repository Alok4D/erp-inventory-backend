import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const userValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: 'Password cannot be more than 20 characters' })
      .optional(),
    user: z.object({
      name: z.string(),
      email: z.string().email(),
      role: z.enum([USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.employee]),
    }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
