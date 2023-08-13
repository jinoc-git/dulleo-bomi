import create from 'zustand';

type ModalState = {
  isModalVisible: boolean;
  showModal: () => void;
  closeModal: () => void;
  reset: () => void;
};

export const useModal = create<ModalState>((set) => ({
  isModalVisible: false,
  showModal: () => set(() => ({ isModalVisible: true })),
  closeModal: () => set(() => ({ isModalVisible: false })),
  reset: () => set(() => ({ isModalVisible: false })),
}));
