import { atom } from 'recoil'

const RouteRecoil = atom<boolean>({
    key: 'AddressRecoil',
    default: false,
});

export default RouteRecoil;