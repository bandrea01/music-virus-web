import {z} from 'zod';

export const userTypeEnum = z.enum(["fan", "artist", "venue"]);
export type UserType = z.infer<typeof userTypeEnum>

export const initialValuesByType: {
    fan: FanValues;
    artist: ArtistValues;
    venue: VenueValues;
} = {
    fan: {
        userType: "fan",
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
    artist: {
        userType: "artist",
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        artistGenres: [],
        artistSocial: "",
    },
    venue: {
        userType: "venue",
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
    userType: userTypeEnum,
    name: z.string().min(1, "Inserisci il nome"),
    surname: z.string().min(1, "Inserisci il cognome"),
    email: z.string().email("Inserisci una email valida"),
    password: z.string().min(8, "Minimo 8 caratteri"),
    confirmPassword: z.string().min(8, "Minimo 8 caratteri"),
});

const fanSchema = baseCommonSchema.extend({
    userType: z.literal("fan"),
});

const artistSchema = baseCommonSchema.extend({
    userType: z.literal("artist"),
    artistGenres: z.array(z.string()).min(2, "Inserisci almeno due generi musicali"),
    artistSocial: z.string().min(1, "Inserisci un social"),
});

const venueSchema = baseCommonSchema.extend({
    userType: z.literal("venue"),
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
    });

export function getUserRegisterSchema() {
    return userRegisterSchema
}

export type FanValues = z.infer<typeof fanSchema>;
export type ArtistValues = z.infer<typeof artistSchema>;
export type VenueValues = z.infer<typeof venueSchema>;

export type UserRegisterRequest = z.infer<ReturnType<typeof getUserRegisterSchema>>;
export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
