import {z} from 'zod';
import type {IProfileUserLocalStorage} from "@/components";

export const baseProfileEditSchema = z.object({
    name: z.string().min(1, 'Inserisci un nome valido'),
    surname: z.string().min(1, 'Inserisci un cognome valido'),
    email: z.string().email('Inserisci una email valida'),
    oldPassword: z.string().min(8, 'Minimo 8 caratteri').optional().nullable(),
    newPassword: z.string().min(8, 'Minimo 8 caratteri').optional().nullable(),

    artistGenres: z.array(z.string()).optional(),
    artistSocial: z.string().optional(),

    venueName: z.string().optional(),
    venueAddress: z.object({
        latitude: z.number().min(-90, 'Latitudine non valida').max(90, 'Latitudine non valida'),
        longitude: z.number().min(-180, 'Longitudine non valida').max(180, 'Longitudine non valida'),
    }).nullable().optional(),
}).superRefine((data, ctx) => {
    if (data.oldPassword && data.newPassword && data.newPassword === data.oldPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['newPassword'],
            message: 'La nuova password deve essere diversa da quella attuale',
        });
    }
});

export const profileEditSchemaByRole = (role: string) => {
    switch (role) {
        case 'ARTIST':
            return baseProfileEditSchema.superRefine((data, ctx) => {
                if (!data.artistGenres || data.artistGenres.length < 2) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['artistGenres'],
                        message: 'Inserisci almeno due generi musicali',
                    });
                }
            });
        case 'VENUE':
            return baseProfileEditSchema.superRefine((data, ctx) => {
                if (!data.venueName || data.venueName.trim().length < 2) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['venueName'],
                        message: 'Inserisci il nome della tua location',
                    });
                }
                if (!data.venueAddress) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['venueAddress'],
                        message: 'Inserisci l’indirizzo della tua location',
                    });
                }
            });
        default:
            return baseProfileEditSchema;
    }
};

export const buildProfileEditDefaults = (user: IProfileUserLocalStorage | null) => {
    // @ts-ignore
    const isArtist = 'ARTIST' === user?.role;
    // @ts-ignore
    const isVenue  = 'VENUE' === user?.role;

    return {
        name: user?.name ?? '',
        surname: user?.surname ?? '',
        email: user?.email ?? '',
        oldPassword: undefined as string | undefined | null,
        newPassword: undefined as string | undefined | null,
        artistGenres: isArtist ? (user?.artistGenres ?? []) : [],
        artistSocial: isArtist ? (user?.artistSocial ?? '') : '',
        venueName:    isVenue  ? (user?.venueName   ?? '') : '',
        venueAddress: isVenue ? (user?.venueAddress ?? null) : null,
    };
};

export type ProfileEditFormValues = z.infer<ReturnType<typeof profileEditSchemaByRole>>;

export const getProfileEditSchemaAndDefaults = (user: IProfileUserLocalStorage | null) => {
    const role = user?.role ?? 'ROLE_FAN';
    const schema = profileEditSchemaByRole(role);
    const defaultValues = buildProfileEditDefaults(user);
    return { schema, defaultValues };
};
