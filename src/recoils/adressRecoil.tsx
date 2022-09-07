import { atom } from 'recoil'

const AddressRecoil = atom<string>({
    key: 'AddressRecoil',
    default: "",
});

export default AddressRecoil;