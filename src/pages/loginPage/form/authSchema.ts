import {z} from "zod";

export const initalValuesloginSchema = {
    email: '',
    password: '',
};

export const loginSchema = z.object({
    email: z.string().email('Inserisci una email valida'),
    password: z.string().min(8, 'Minimo 8 caratteri'),
});
export type LoginFormValues = z.infer<typeof loginSchema>;