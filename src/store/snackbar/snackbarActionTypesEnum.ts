// @ts-ignore
const enum SnackbarActionTypesEnum {
    SUCCESS='success',
    ERROR='error',
    RESET='reset',
}

export type TSnackbarActionType = (typeof SnackbarActionTypesEnum)[keyof typeof SnackbarActionTypesEnum];

export default SnackbarActionTypesEnum;