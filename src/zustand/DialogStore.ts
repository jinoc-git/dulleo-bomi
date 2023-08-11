import create from 'zustand';

type DialogState = {
  alertVisible: boolean;
  alertContent: string;
  showAlert: (content: string) => void;
  hideAlert: () => void;

  confirmVisible: boolean;
  confirmContent: string;
  confirmCallback: () => void;
  showConfirm: (content: string, callback: () => void) => void;
  hideConfirm: () => void;
};

export const useDialogStore = create<DialogState>((set) => ({
  alertVisible: false,
  alertContent: '',

  showAlert: (content) =>
    set(() => ({
      alertVisible: true,
      alertContent: content,
    })),

  hideAlert: () =>
    set(() => ({
      alertVisible: false,
      alertContent: '',
    })),

  confirmVisible: false,
  confirmContent: '',
  confirmCallback: () => {},

  showConfirm: (content, callback) =>
    set(() => ({
      confirmVisible: true,
      confirmContent: content,
      confirmCallback: callback,
    })),

  hideConfirm: () =>
    set(() => ({
      confirmVisible: false,
      confirmContent: '',
      confirmCallback: () => {},
    })),
}));
