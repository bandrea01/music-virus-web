import React, {createContext, useCallback, useContext, useMemo, useState} from "react";

export type TPopupOptions = {
    title: string;
    message: string;
    onConfirmFn: (() => void) | null;
    onCancelFn: (() => void) | null;
    showClose: boolean;
    confirmLabel: string;
    confirmButtonVariant: string;
    confirmButtonDisabled: boolean;
    cancelLabel: string;
    cancelButtonVariant: string;
    children?: React.ReactNode;
};

export type TPopupContext = TPopupOptions & {
    isPopupOpen: boolean;
    openPopup: (newOptions: Partial<TPopupOptions>) => void;
    closePopup: () => void;
};

type propsChildren = {
    children: React.ReactNode;
}

const initialPopupOptions: TPopupOptions = {
    children: null,
    message: "",
    onCancelFn: null,
    onConfirmFn: null,
    showClose: true,
    title: "",
    confirmLabel: "",
    confirmButtonVariant: "",
    confirmButtonDisabled: false,
    cancelLabel: "",
    cancelButtonVariant: "",
}

const initialState: TPopupContext = {
    ...initialPopupOptions,
    isPopupOpen: false,
    closePopup: () => {
    },
    openPopup: () => {
    },
}

export const PopupContext = createContext<TPopupContext>(initialState);

export const usePopup = () => useContext(PopupContext);

// @ts-ignore
export default function PopupContextProvider({children}: propsChildren): ReactElement {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(initialState.isPopupOpen);
    const [popupOptions, setPopupOptions] = useState<TPopupOptions>(initialPopupOptions);

    const openPopup = useCallback(
        (newOptions: Partial<TPopupOptions>) => {
            setPopupOptions(() => {
                return {...initialPopupOptions, ...newOptions};
            });
            setIsPopupOpen(true);
        }, []
    );

    const closePopup = useCallback(() => {
        setIsPopupOpen(false);
        setPopupOptions(initialPopupOptions);
    }, []);

    const contextValue = useMemo(() => {
        return {
            ...popupOptions,
            isPopupOpen,
            openPopup,
            closePopup,
        };
    }, [
        isPopupOpen,
        openPopup,
        closePopup,
        popupOptions,
    ])

    return <PopupContext.Provider value={contextValue}>{children}</PopupContext.Provider>;
}