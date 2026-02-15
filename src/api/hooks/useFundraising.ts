import type {
  FundraisingListResponseDTO,
  FundraisingRequestDTO,
  VenuePromotionRequestDTO
} from "@pages/homePage/api/types.ts";
import {
  addPromotion,
  cancelFundraising,
  confirmFundraising,
  createFundraising,
  editFundraising,
  getOthersFundraisingList,
  getPersonalFundraisingList
} from "@pages";
import {useHookMutation, useHookQuery} from "@api/hooks/hooksQuery.ts";
import {useQueryClient} from "@tanstack/react-query";

export function useGetFundraising() {
  return useHookQuery<FundraisingListResponseDTO>({
    queryKey: ['fundraising'],
    queryFn: () => getOthersFundraisingList(),
    staleTime: 5 * 1000,
  });
}

export function useGetPersonalFundraisingList() {
  return useHookQuery<FundraisingListResponseDTO>({
    queryKey: ['personal-fundraising'],
    queryFn: () => getPersonalFundraisingList(),
    staleTime: 5 * 1000,
  });
}

export function useCreateFundraising() {
  const queryClient = useQueryClient();
  return useHookMutation<FundraisingRequestDTO>({
    mutationFn: (payload) => createFundraising(payload),
    successMessage: "Raccolta fondi creata con successo!",
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
      });
      queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
      });
    },
  });
}

export function useCancelFundraising() {
  const queryClient = useQueryClient();
  return useHookMutation<string>({
    mutationFn: (fundraisingId) => cancelFundraising(fundraisingId),
    successMessage: "Raccolta fondi annullata con successo!",
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
      });
      queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
      });
    },
  });
}

export function useEditFundraising() {
  const queryClient = useQueryClient();
  return useHookMutation<{
    fundraisingId: string;
    payload: FundraisingRequestDTO;
  }>({
    mutationFn: ({fundraisingId, payload}) =>
      editFundraising(fundraisingId, payload),
    successMessage: "Raccolta fondi modificata con successo!",
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
      });
      queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
      });
    },
  });
}

export function confirmFundraisingAndCreateEvent() {
  const queryClient = useQueryClient();
  return useHookMutation<string>({
    mutationFn: (fundraisingId) => confirmFundraising(fundraisingId),
    successMessage: "Raccolta fondi confermata con successo.\nEvento creato!",
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
      });
      queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
      });
    },
  });
}

export function useAddPromotion() {
  const queryClient = useQueryClient();
  return useHookMutation<{
    fundraisingId: string;
    payload: VenuePromotionRequestDTO
  }>({
    mutationFn: ({fundraisingId, payload}) => addPromotion(fundraisingId, payload),
    successMessage: "Promozione aggiunta con successo!",
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
      });
      queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
      });
    },
  });
}
