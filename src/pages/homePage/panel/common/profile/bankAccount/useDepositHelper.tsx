const MAX_DEPOSIT_AMOUNT = 2000;

export default function useDepositHelper(amount: string) {
  let helperText = '';
  let errors = false;
  if (amount === '') return {errors, helperText};

  const parsed = Number(amount);

  if (Number.isNaN(parsed)) {
    helperText = 'Inserisci un importo valido';
    errors = true;
    return {errors, helperText};
  }

  if (parsed <= 0) {
    helperText = 'Inserisci un importo positivo';
    errors = true;
    return {errors, helperText};
  }

  if (parsed > MAX_DEPOSIT_AMOUNT) {
    helperText = `L'importo non può superare i ${MAX_DEPOSIT_AMOUNT} €`;
    errors = true;
    return {errors, helperText};
  }

  return {errors, helperText};
}
