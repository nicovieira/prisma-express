import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export type tUser = z.infer<typeof userSchema>;

export const userRegisterBodySchema = userSchema.omit({ id: true });
export type tUserRegisterBody = z.infer<typeof userRegisterBodySchema>;

export const userLoginBodySchema = userRegisterBodySchema.omit({ name: true });
export type tUserLoginBody = z.infer<typeof userLoginBodySchema>;

export const userReturnSchema = userSchema.omit({ password: true });
export type tUserReturn = z.infer<typeof userReturnSchema>;

export type tUserLoginReturn = {
  accessToken: string;
  user: tUserReturn;
};
