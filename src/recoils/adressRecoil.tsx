import { ReactNode } from 'react';
import { atom } from 'recoil'
import { addressType } from '../types/map';

const AddressRecoil = atom<string>({
    key: 'AddressRecoil',
    default: "",
});

export default AddressRecoil;