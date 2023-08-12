import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';

// signin
export const signInWithFB = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
          error['message'] = '이메일이 일치하지 않습니다.';
          return Promise.reject(error);
        case 'auth/invalid-email':
          error['message'] = '이메일이 일치하지 않습니다.';
          return Promise.reject(error);
        case 'auth/wrong-password':
          error['message'] = '비밀번호가 일치하지 않습니다.';
          return Promise.reject(error);
        case 'auth/weak-password':
          error['message'] = '비밀번호가 일치하지 않습니다.';
          return Promise.reject(error);
        case 'auth/network-request-failed':
          error['message'] = '네트워크 연결에 실패하였습니다.';
          return Promise.reject(error);
        default:
          error['message'] = '이메일 또는 비밀번호를 확인하세요';
          return Promise.reject(error);
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
