import { writable } from 'svelte/store';

export interface IStore {
  state: boolean;
  inputName: string;
  names: string[];
  error: string;
  showError: boolean;
  result: string;
}

const initValues = {
  state: true,
  inputName: '',
  names: [],
  error: '',
  showError: false,
  result: '',
};

export const store = writable<IStore>(
  structuredClone(initValues),
);

export const resetStore = () => {
  store.set(structuredClone(initValues));
};
