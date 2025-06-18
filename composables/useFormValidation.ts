import { z } from 'zod';
import type { FormError } from '#ui/types';

// Validatsiya schemalari
export const useSchemas = () => {
  const { t } = useI18n();

  const phoneSchema = z.string()
    .min(1, t('validation.phoneRequired'))
    .regex(/^[0-9]{9}$/, t('validation.phoneInvalid'));

  return {
    // Registratsiya: ism va telefon
    register: z.object({
      name: z.string().min(1, t('validation.nameRequired')),
      phone: phoneSchema,
    }),
    
    // Login: faqat telefon
    login: z.object({
      phone: phoneSchema,
    }),
  };
};

// Zod xatolarini UForm xatolariga o'girish
const zodErrorsToFormErrors = (error: z.ZodError): FormError[] => {
  return error.errors.map(err => ({
    path: err.path.join('.'),
    message: err.message,
  }));
};

// Validatsiya funksiyasi
const validate = <T extends z.ZodType>(schema: T) => {
  return (state: z.infer<T>): FormError[] => {
    const result = schema.safeParse(state);
    return result.success ? [] : zodErrorsToFormErrors(result.error);
  };
};

// Validatsiya hook'lari
export const useRegisterValidation = () => {
  const schemas = useSchemas();
  return validate(schemas.register);
};

export const useLoginValidation = () => {
  const schemas = useSchemas();
  return validate(schemas.login);
};

// Backend xatolarini qayta ishlash
export const extractErrorMessage = (error: unknown): string => {
  const { t } = useI18n();
  
  if (error instanceof z.ZodError) {
    return error.errors[0].message;
  }
  
  if (error && typeof error === 'object') {
    const err = error as any;
    return err.response?.data?.message || t('error.unknown');
  }
  
  return t('error.unknown');
};