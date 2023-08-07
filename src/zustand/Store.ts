import { create } from 'zustand';

type Modal = {
  isOpen: boolean;
  text: string;
  openModal: () => void
  closeModal: () => void
  setText: (text: string) => void;
};

const useModal = create<Modal>((set) => ({
  isOpen: false,
  text: '',
  openModal() {

  },
  closeModal() {

  },
  setText(text: string) {
    
  },
}));
