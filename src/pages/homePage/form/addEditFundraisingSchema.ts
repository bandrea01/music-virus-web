import {z} from 'zod';
import type {Fundraising} from "@/pages";

export const addEditFundraisingSchema = z.object({
    fundraisingName: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
    venueId: z.string().min(1, 'Seleziona una location'),
    eventDate: z.coerce.date().min(new Date(), 'La data deve essere nel futuro'),
    targetAmount: z.coerce.number()
        .min(1, "L'importo deve essere almeno 1 euro")
        .max(3000, "L'importo non può superare 3000 euro"),
});

export const getDefaultValues = (fundraising: Fundraising | null | undefined) => {
    return {
        fundraisingName: fundraising?.fundraisingName ?? '',
        venueId: fundraising?.venueId ?? '',
        eventDate: fundraising ? new Date(fundraising.eventDate) : new Date(),
        targetAmount: fundraising?.targetAmount ?? 1,
    };
};

export type AddEditFundraisingFormValues = z.infer<typeof addEditFundraisingSchema>;

export const getAddEditFundriasingSchemaAndDefaults = (fundraising: Fundraising | null | undefined) => {
    const schema = addEditFundraisingSchema;
    const defaultValues = getDefaultValues(fundraising);
    return { schema, defaultValues };
};
