import create from 'zustand';

type ModalState = {
  isModalVisible: boolean;
  showModal: () => void;
  closeModal: () => void;
};

export const useModal = create<ModalState>((set) => ({
  isModalVisible: false,
  showModal: () => set(() => ({ isModalVisible: true })),
  closeModal: () => set(() => ({ isModalVisible: false })),
}));
