import { message } from 'antd';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import create from 'zustand';
import { auth } from '../firebase/firebaseConfig';

export type UserInfo = {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
};

type UserState = {
  user: UserInfo | null;
  isLoggedIn: boolean;
  setupAuthObserver: () => () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => {
  const setupAuthObserver = () => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const userInfo: UserInfo = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        };
        set({ user: userInfo, isLoggedIn: true });
      } else {
        set({ user: null, isLoggedIn: false });
      }
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      message.success('로그아웃되었습니다');
    } catch (error) {
      message.error('로그아웃 중 오류가 발생했습니다');
    }
  };

  return {
    user: null,
    isLoggedIn: false,
    setupAuthObserver,
    login,
    logout,
  };
});
