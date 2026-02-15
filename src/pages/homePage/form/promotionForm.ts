import {useForm, type UseFormReturn} from "react-hook-form";
import {useEffect, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import {PromotionType, type PromotionTypeKey} from "@pages";

export const promotionSchema = z.object({
  venuePromotion: z.enum(
    Object.keys(PromotionType) as [
      PromotionTypeKey,
      ...PromotionTypeKey[]
    ]
  ).nullable(),
});

export const getPromotionDefaultValues = () => {
  return {
    venuePromotion: PromotionType.NONE as PromotionTypeKey,
  };
};

export type PromotionFormValues = z.infer<typeof promotionSchema>;

export const getPromotionSchemaAndDefaults = () => {
  const schema = promotionSchema;
  const defaultValues = getPromotionDefaultValues();
  return {schema, defaultValues};
};

export interface UsePromotionFormReturn {
  form: UseFormReturn<PromotionFormValues>
}

export function usePromotionForm(): UsePromotionFormReturn {
  const {schema, defaultValues} = useMemo(() => getPromotionSchemaAndDefaults(), []);
  const form =
    useForm<PromotionFormValues>({
      defaultValues: defaultValues,
      resolver: zodResolver(schema),
      mode: 'onChange',
    });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return {form};
}