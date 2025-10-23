import React, {useEffect, useMemo, useRef} from "react";
import {Box, Chip} from "@mui/material";
import {getSelectOptions, type IUserProfile, SelectFormField, TextFormField, useAuth} from "../../../components";
import DialogComponent from "../../../components/DialogComponent.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getProfileEditSchemaAndDefaults} from "../form/profileEditSchema.ts";
import {useProfileEdit} from "../api/useProfileEdit.ts";
import {MapDialog} from "../../registerPage/section/MapDialog.tsx";
import {mapProfileEditFormValuesToDTO} from "../api/profile.ts";
import {z} from "zod";
import {genres} from "../../registerPage/section/ArtistSection.tsx";

type PersonalProfileEditDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    profile: IUserProfile;
};

const PersonalProfileEditDialog: React.FC<PersonalProfileEditDialogProps> = ({
                                                                                 isOpen,
                                                                                 onClose,
                                                                             }) => {

    const {profileUser} = useAuth();
    //Form
    const {schema, defaultValues} = useMemo(
        () => getProfileEditSchemaAndDefaults(profileUser),
        [profileUser]
    );
    const {
        control,
        handleSubmit,
        formState,
        watch,
        reset,
        getValues,
        setValue
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: defaultValues,
    });
    useEffect(() => {
        reset(defaultValues);
        initialGenresRef.current = defaultValues.artistGenres ?? [];
    }, [defaultValues, reset]);
    const [venueAddress] = watch(["venueAddress"]);
    const initialGenresRef = useRef<string[]>(getValues('artistGenres') ?? []);

    //API call
    const {mutate: profileEdit, isPending} = useProfileEdit();
    const onSubmit = handleSubmit((values) => {
        profileEdit(mapProfileEditFormValuesToDTO(values));
    });

    const coordsDisplay = useMemo(() => {
        if (!venueAddress) return "";
        const {latitude, longitude} = venueAddress;
        return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }, [venueAddress]);

    return (
        <DialogComponent
            isOpen={isOpen}
            onClose={onClose}
            title="Modifica il tuo profilo"
            actions={[
                {
                    label: "Chiudi",
                    onClick: () => {
                        onClose();
                        reset()
                    },
                    variant: "contained",
                    disabled: isPending,
                    sx: {
                        bgcolor: '#5a2732',
                        color: '#fff',
                        '&:hover': {bgcolor: '#591422'},
                    },
                },
                {
                    label: "Salva",
                    onClick: onSubmit,
                    variant: "contained",
                    disabled: isPending || !formState.isValid || !formState.isDirty,
                    sx: {
                        bgcolor: '#3868b8',
                        color: '#fff',
                        '&:hover': {bgcolor: 'rgba(18,35,66,0.9)'},
                    },
                }
            ]}
        >
            <Box display="flex" flexDirection="column" className="auth-form" gap={2}>
                <TextFormField
                    control={control}
                    name="name"
                    label="Nome"
                />
                <TextFormField
                    control={control}
                    name="surname"
                    label="Cognome"
                />
                <TextFormField
                    control={control}
                    name="email"
                    label="Email"
                />
                <TextFormField
                    control={control}
                    name="oldPassword"
                    type="password"
                    label="Vecchia password"
                />
                <TextFormField
                    control={control}
                    name="newPassword"
                    type="password"
                    label="Nuova password"
                />
                {profileUser?.role?.substring(0) === 'ARTIST' && (
                    <>
                        <SelectFormField
                            control={control}
                            name="artistGenres"
                            label="I tuoi generi musicali"
                            menuItems={getSelectOptions(genres)}
                            renderValue={(selected) => {
                                const arr = Array.isArray(selected) ? selected : [];
                                if (arr.length === 0) return <em>Seleziona generi…</em>;
                                return (
                                    <Box sx={{display: 'flex', overflow: 'clip', gap: 0.5, maxWidth: '100%'}}>
                                        {arr.map((v) => (
                                            <Chip
                                                key={v}
                                                label={v}
                                                size="small"
                                                onMouseDown={(e) => e.stopPropagation()}
                                                onDelete={() => {
                                                    const current = getValues('artistGenres') ?? [];
                                                    const next = Array.isArray(current) ? current.filter(x => x !== v) : [];
                                                    setValue('artistGenres', next, {
                                                        shouldValidate: true,
                                                        shouldDirty: true
                                                    });
                                                }}
                                            />
                                        ))}
                                    </Box>
                                );
                            }}
                            multiple
                        />
                        <TextFormField
                            control={control}
                            name="artistSocial"
                            label="Social media"
                            fullWidth
                        />
                    </>
                )}
                {profileUser?.role?.substring(0) === 'VENUE' && (
                    <>
                        <TextFormField
                            control={control}
                            name="venueName"
                            label="Indirizzo"
                        />
                        <span>{coordsDisplay}</span>
                        <MapDialog
                            control={control}
                            open={isOpen}
                            onClose={() => {
                                onClose();
                                reset();
                            }}
                        />
                    </>
                )}
            </Box>
        </DialogComponent>
    )
        ;
}

export default PersonalProfileEditDialog;