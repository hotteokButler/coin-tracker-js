import { atom, selector } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

export const toggleDarkAtom = selector({
  key: 'toggleDark',
  get: ({ get }) => get(isDarkAtom),
  set: ({ set }, newValue) => set(isDarkAtom, !newValue),
});
