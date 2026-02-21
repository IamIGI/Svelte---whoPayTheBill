import { writable } from 'svelte/store';

interface IStore {
  state: boolean;
  inputName: string;
  names: string[];
  error: string;
  showError: boolean;
  result: string;
}

export const store = writable<IStore>({
  state: true,
  inputName: '',
  names: [],
  error: '',
  showError: false,
  result: '',
});
