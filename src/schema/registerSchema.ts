import {z} from 'zod';

export type UserType = 'fan' | 'artist' | 'venue';

export const defaultRegisterFormValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    genres: [],
    socials: '',
    venueName: '',
    address: '',
}

/** Oggetto base senza refine */
const
    baseObject = z.object({
        email: z.string().email('Inserisci una email valida'),
        password: z.string().min(8, 'Minimo 8 caratteri'),
        confirmPassword: z.string().min(8, 'Minimo 8 caratteri'),
    });

const artistExtraSchema = z.object({
    preferredGenres: z.string().min(2, 'Inserisci uno stage name'),
    socialMedias: z.string().min(2, 'Inserisci almeno un link ai tuoi social'),
});
const venueExtraSchema = z.object({
    venueName: z.string().min(2, 'Inserisci nome venue'),
    location: z.string().min(2, 'Inserisci una location'),
});

/** Post-refine */
const withPasswordMatch = <T extends z.ZodTypeAny>(schema: T) =>
    schema.refine(
        (data: any) => data.password === data.confirmPassword,
        {message: 'Le password non coincidono', path: ['confirmPassword']}
    );

/** 4) Schema per tipo: (baseObject MERGE extra) poi REFINE */
export const registerSchemaByType: Record<UserType, z.ZodTypeAny> = {
    fan: withPasswordMatch(baseObject),
    artist: withPasswordMatch(baseObject.merge(artistExtraSchema)),
    venue: withPasswordMatch(baseObject.merge(venueExtraSchema)),
};

export type FanFormValues = z.infer<typeof registerSchemaByType.fan>;
export type ArtistFormValues = z.infer<typeof registerSchemaByType.artist>;
export type VenueFormValues = z.infer<typeof registerSchemaByType.venue>;
export type RegisterFormValues = z.infer<typeof registerSchemaByType[UserType]>;
