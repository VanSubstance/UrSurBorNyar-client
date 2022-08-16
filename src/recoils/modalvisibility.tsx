import { ReactNode } from 'react';
import { atom } from 'recoil'

interface ModalProps {
    type: ModalType;
    children: ReactNode;
}

type ModalType = "link" | "start" | "none";

const ModalVisibility = atom<ModalProps>({
    key: 'ModalVisibility',
    default: {
        type: "none",
        children: null,
    },
});

export default ModalVisibility;