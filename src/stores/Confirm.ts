// confirmation.ts
import { defineStore } from 'pinia';
import { boolean } from 'yup';

interface ConfirmationState {
  message: string;
  data: any | null;
  dialog: boolean;
}

export const useConfirmationStore = defineStore('confirmation', {
  state: (): ConfirmationState => ({
    message: '',
    data: null,
    dialog: false,
  }),
  getters:{
    getdialog: (state)=>state.dialog
  },
  actions: {
    openConfirmation({ message, data }: { message: string; data: any }) {
        this.dialog = true;
        this.message = message;
        this.data = data;
    },
    closeConfirmation() {
        this.data = null;
        this.dialog = false;
        this.message = '';
    },
  },
});