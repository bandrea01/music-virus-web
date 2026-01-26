import {z} from 'zod';
import {UserTypeEnum} from "@utils";

export const initialValuesByType: {
    FAN: FanValues;
    ARTIST: ArtistValues;
    VENUE: VenueValues;
} = {
    FAN: {
        userType: UserTypeEnum.FAN,
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
    ARTIST: {
        userType: UserTypeEnum.ARTIST,
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        artistGenres: [],
        artistSocial: "",
    },
    VENUE: {
        userType: UserTypeEnum.VENUE,
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        venueName: "",
        venueAddress: null,
    },
};

const baseCommonSchema = z.object({
    userType: z.nativeEnum(UserTypeEnum),
    name: z.string().min(1, "Inserisci il nome"),
    surname: z.string().min(1, "Inserisci il cognome"),
    email: z.string().email("Inserisci una email valida"),
    password: z.string().min(8, "Minimo 8 caratteri"),
    confirmPassword: z.string().min(8, "Minimo 8 caratteri"),
});

const fanSchema = baseCommonSchema.extend({
    userType: z.literal(UserTypeEnum.FAN),
});

const artistSchema = baseCommonSchema.extend({
    userType: z.literal(UserTypeEnum.ARTIST),
    artistGenres: z.array(z.string()).min(2, "Inserisci almeno due generi musicali"),
    artistSocial: z.string().min(1, "Inserisci un social"),
});

const venueSchema = baseCommonSchema.extend({
    userType: z.literal(UserTypeEnum.VENUE),
    venueName: z.string().min(2, "Inserisci il nome della tua location"),
    venueAddress: z
        .object({
            lat: z.number().min(-90, "Latitudine non valida").max(90, "Latitudine non valida"),
            lng: z.number().min(-180, "Longitudine non valida").max(180, "Longitudine non valida"),
        })
        .nullable(),
});

const userRegisterSchema = z
    .discriminatedUnion("userType", [fanSchema, artistSchema, venueSchema])
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
                message: "Le password non coincidono",
            });
        }
        if (/\s/.test(data.password) || /[^A-Za-z0-9]/.test(data.password)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['password'],
                message: 'La password non può contenere spazi o caratteri speciali',
            });
        }
    });

export function getUserRegisterSchema() {
    return userRegisterSchema
}

export type FanValues = z.infer<typeof fanSchema>;
export type ArtistValues = z.infer<typeof artistSchema>;
export type VenueValues = z.infer<typeof venueSchema>;

export type UserRegisterRequest = z.infer<ReturnType<typeof getUserRegisterSchema>>;
export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
