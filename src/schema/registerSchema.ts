import {z} from 'zod';

export type UserType = 'fan' | 'artist' | 'venue';

export const initialValuesRegisterSchema = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    artistGenres: [],
    artistSocials: [],
    venueName: '',
    venueAddress: null,
}

const
    baseObject = z.object({
        email: z.string().email('Inserisci una email valida'),
        password: z.string().min(8, 'Minimo 8 caratteri'),
        confirmPassword: z.string().min(8, 'Minimo 8 caratteri'),
    });

const artistExtraSchema = z.object({
    artistGenres: z.string().min(2, 'Inserisci almeno due generi musicali'),
    socialMedias: z.string().min(1, 'Inserisci almeno un link ai tuoi social'),
});
const venueExtraSchema = z.object({
    venueName: z.string().min(2, 'Inserisci il nome della tua location'),
    venueAddress: z.object({
        lat: z.number().min(-90, 'Latitudine non valida').max(90, 'Latitudine non valida'),
        lng: z.number().min(-180, 'Longitudine non valida').max(180, 'Longitudine non valida')
    })
});

const withPasswordMatch = <T extends z.ZodTypeAny>(schema: T) =>
    schema.refine(
        (data: any) => data.password === data.confirmPassword,
        {message: 'Le password non coincidono', path: ['confirmPassword']}
    );

export const registerSchemaByType: Record<UserType, z.ZodTypeAny> = {
    fan: withPasswordMatch(baseObject),
    artist: withPasswordMatch(baseObject.merge(artistExtraSchema)),
    venue: withPasswordMatch(baseObject.merge(venueExtraSchema)),
};

export type FanFormValues = z.infer<typeof registerSchemaByType.fan>;
export type ArtistFormValues = z.infer<typeof registerSchemaByType.artist>;
export type VenueFormValues = z.infer<typeof registerSchemaByType.venue>;
export type RegisterFormValues = z.infer<typeof registerSchemaByType[UserType]>;
