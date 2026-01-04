import {type UseMutationResult, type UseQueryResult} from '@tanstack/react-query';
import type {AxiosError} from "axios";
import {
    getArtistList,
    getBankAccount,
    getFansList,
    getVenuesList,
    updateProfileRequest
} from "@pages/homePage/api/profile.ts";
import type {
    Account, AccountResponseDTO,
    ArtistListResponseDTO, ArtistProfileDTO,
    FanListResponseDTO,
    UpdateProfileDTO,
    VenueListResponseDTO, VenueProfileDTO
} from "@pages/homePage/api/types.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@components";
import {AppRoutes, UserTypeEnum, type UserTypeKey} from "@utils";
import {useHookMutation, useHookQuery} from "@api/hooks/hooksQuery.ts";
import {useAppDispatch} from "@store/hook.ts";
import {registerRequest} from "@pages/registerPage/api/register.ts";
import {setSnackbarSuccess} from "@store/snackbar/slice.ts";
import type {RegisterDTORequestByType} from "@pages/registerPage/api/types.ts";
import type {JwtSessionResponseDTO} from "@pages/loginPage/api/types.ts";

type RegisterPayload<T extends UserTypeKey> = RegisterDTORequestByType[T];

export function useGetFans(): UseQueryResult<FanListResponseDTO, AxiosError> {
    return useHookQuery<FanListResponseDTO>({
        queryKey: ['fans'],
        queryFn: getFansList,
        errorMessage: "Errore durante la richiesta della lista dei fans!"
    });
}

export function useDomainGetArtists(){
    return useHookQuery<ArtistListResponseDTO, ArtistProfileDTO[]>({
        queryKey: ['domain','artists'],
        queryFn: getArtistList,
        select: (res) => res.artists ?? [],
        errorMessage: "Errore durante la richiesta della lista di artisti!"
    });
}

export function useDomainGetVenues() {
    return useHookQuery<VenueListResponseDTO, VenueProfileDTO[]>({
        queryKey: ['domain','venues'],
        queryFn: getVenuesList,
        select: (res) => res.venues ?? [],
        errorMessage: "Errore durante la richiesta della lista dei locali!"
    });
}

export function useRegisterUser<T extends UserTypeKey>(
    userType: T
): UseMutationResult<JwtSessionResponseDTO, AxiosError, RegisterPayload<T>, unknown> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useHookMutation<RegisterPayload<T>, JwtSessionResponseDTO>({
        mutationFn: async (payload) => {
            const res = await registerRequest(userType, payload);
            return res.data;
        },
        errorMessage: "Errore durante la registrazione!",
        successMessage: getRegisterSuccessMessage(userType),
        onSuccess: () => {
            dispatch(setSnackbarSuccess(getRegisterSuccessMessage(userType)));
            navigate(AppRoutes.LOGIN, { replace: true });
        },
    });
}

export function useProfileEdit(): UseMutationResult<unknown, AxiosError, UpdateProfileDTO, unknown> {
    const navigate = useNavigate();
    const {logout} = useAuth();

    return useHookMutation<UpdateProfileDTO>({
        mutationFn: (payload) => updateProfileRequest(payload),
        errorMessage: "Errore durante la modifica del profilo!",
        successMessage: "Profilo modificato con successo! Effettua nuovamente il login",
        onSuccess: () => {
            logout();
            navigate(AppRoutes.LOGIN, {replace: true});
        },
    });
}

export function useGetBankAccount() {
    return useHookQuery<AccountResponseDTO, Account>({
        queryKey: ['account'],
        queryFn: getBankAccount,
        select: (res) => res?.accounts[0] || [],
        errorMessage: "Errore durante la richiesta della conto!"
    });
}

function getRegisterSuccessMessage(userType: UserTypeKey): string {
    return userType === UserTypeEnum.ARTIST
        ? "Registrazione effettuata!\n Attendi la verifica del tuo account da parte di un amministratore prima di effettuare il login"
        : "Registrazione effettuata!\n Effettua il login";
}
