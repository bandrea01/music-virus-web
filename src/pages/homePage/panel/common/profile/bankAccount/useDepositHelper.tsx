const MAX_DEPOSIT_AMOUNT = 2000

export default function useDepositHelper(amount: number) {
    let helperText = '';
    let errors = false;

    if (amount == null || isNaN(amount)) {
        helperText = 'Inserisci un importo';
        errors = true;
    } else if (amount <= 0) {
        helperText = 'Inserisci un importo positivo';
        errors = true;
    } else if (amount > MAX_DEPOSIT_AMOUNT) {
        helperText = 'L\'importo non può superare i ' + MAX_DEPOSIT_AMOUNT + ' €';
        errors = true;
    }

    return { errors, helperText };
}