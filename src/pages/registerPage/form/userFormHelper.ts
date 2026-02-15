import {z} from "zod";
import type {LatLngLiteral} from "leaflet";
import {UserTypeEnum, type UserTypeKey} from "@utils";
import type {Artist, UserProfile, Venue} from "@pages";

// INITIAL VALUES
export const initialUsersCreateValues = {
  [UserTypeEnum.FAN]: {
    userType: UserTypeEnum.FAN,
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  [UserTypeEnum.ARTIST]: {
    userType: UserTypeEnum.ARTIST,
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    artistGenres: [],
    artistSocial: "",
  },
  [UserTypeEnum.VENUE]: {
    userType: UserTypeEnum.VENUE,
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    venueName: "",
    venueAddress: null,
  },
} as const;


// SCHEMA
export const latLngLiteralSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
}) satisfies z.ZodType<LatLngLiteral>;

const baseCommonSchema = z.object({
  userType: z.nativeEnum(UserTypeEnum),
  name: z.string().min(1, "Inserisci il nome"),
  surname: z.string().min(1, "Inserisci il cognome"),
  email: z.string().refine((s) => s === "" || z.string().email().safeParse(s).success, { message: "Inserisci una email valida" }),
});


const baseCreateSchema = baseCommonSchema.extend({
  password: z.string().min(8, "Minimo 8 caratteri"),
  confirmPassword: z.string().min(8, "Minimo 8 caratteri"),
});

const fanCreateSchema = baseCreateSchema.extend({
  userType: z.literal(UserTypeEnum.FAN),
});

const artistCreateSchema = baseCreateSchema.extend({
  userType: z.literal(UserTypeEnum.ARTIST),
  artistGenres: z.array(z.string()).min(2, "Inserisci almeno due generi"),
  artistSocial: z.string().min(1, "Inserisci un social"),
});

const venueCreateSchema = baseCreateSchema.extend({
  userType: z.literal(UserTypeEnum.VENUE),
  venueName: z.string().min(2, "Inserisci il nome della location"),
  venueAddress: latLngLiteralSchema.nullable(),
});

export const userCreateSchema = z
  .discriminatedUnion("userType", [
    fanCreateSchema,
    artistCreateSchema,
    venueCreateSchema,
  ])
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Le password non coincidono",
        code: z.ZodIssueCode.custom,
      });
    }
  });


const baseEditSchema = baseCommonSchema.extend({
  password: z.string().optional().or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal("")),
});

const fanEditSchema = baseEditSchema.extend({
  userType: z.literal(UserTypeEnum.FAN),
});

const artistEditSchema = baseEditSchema.extend({
  userType: z.literal(UserTypeEnum.ARTIST),
  artistGenres: z.array(z.string()).min(2),
  artistSocial: z.string().min(1),
});

const venueEditSchema = baseEditSchema.extend({
  userType: z.literal(UserTypeEnum.VENUE),
  venueName: z.string().min(2),
  venueAddress: latLngLiteralSchema.nullable(),
});

export const userEditSchema = z
  .discriminatedUnion("userType", [
    fanEditSchema,
    artistEditSchema,
    venueEditSchema,
  ])
  .superRefine((data, ctx) => {
    const password = data.password ?? "";
    const confirmPassword = data.confirmPassword ?? "";

    if (password || confirmPassword) {
      if (password.length < 8) {
        ctx.addIssue({path: ["password"], message: "Minimo 8 caratteri", code: "custom"});
      }
      if (password !== confirmPassword) {
        ctx.addIssue({path: ["confirmPassword"], message: "Le password non coincidono", code: "custom"});
      }
    }
  });

export type UserCreateFormValues = z.infer<typeof userCreateSchema>;
export type UserEditFormValues = z.infer<typeof userEditSchema>;
export type UserFormValues = UserCreateFormValues | UserEditFormValues;

export type AddEditUserMode = "create" | "edit";


function inferUserType(user: UserProfile): UserTypeKey {
  if ("artistGenres" in user) return UserTypeEnum.ARTIST;
  if ("venueName" in user) return UserTypeEnum.VENUE;
  return UserTypeEnum.FAN;
}

export function getUserDefaultValues(
  mode: AddEditUserMode,
  user?: UserProfile | null
) {
  if (!user) {
    return initialUsersCreateValues[UserTypeEnum.FAN];
  }

  const userType = inferUserType(user);

  const common = {
    userType,
    name: user.name,
    surname: user.surname,
    email: user.email,
  };

  const passwordFields =
    mode === "create"
      ? { password: "", confirmPassword: "" }
      : { password: "", confirmPassword: "" };

  if (userType === UserTypeEnum.ARTIST) {
    const u = user as Artist;
    return {
      ...common,
      ...passwordFields,
      artistGenres: u.artistGenres,
      artistSocial: u.artistSocial,
    };
  }

  if (userType === UserTypeEnum.VENUE) {
    const u = user as Venue;
    return {
      ...common,
      ...passwordFields,
      venueName: u.venueName,
      venueAddress: u.venueAddress
        ? { lat: u.venueAddress.latitude, lng: u.venueAddress.longitude }
        : null,
    };
  }

  return {
    ...common,
    ...passwordFields,
  };
}


export function getAddEditUserSchemaAndDefaults(
  mode: AddEditUserMode,
  user?: UserProfile | null
) {
  return {
    schema: mode === "create" ? userCreateSchema : userEditSchema,
    defaultValues: getUserDefaultValues(mode, user),
  };
}
