import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { SignUpFormData } from '../components/signUp/SignUpForm';
import { UserInfo } from '../zustand/UserStore';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

// sign in
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

// sign up
type SignUpFormParams<T> = {
  [P in keyof Omit<T, 'confirmPassword' | 'profileImage'>]: T[P];
};

export const signUpWithFB = async (
  formData: SignUpFormParams<SignUpFormData>,
  profileImage: File,
) => {
  const { email, password, nickname } = formData;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    await setUserProfileImageAndDisplayName(user, profileImage, nickname);

    const userInfo: UserInfo = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    };
    await addDoc(collection(db, 'users'), userInfo);

    return userInfo;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-exists':
          error['message'] = '사용중인 이메일입니다.';
          return Promise.reject(error);
        case 'auth/email-already-in-use':
          error['message'] = '사용중인 이메일입니다.';
          return Promise.reject(error);
        default:
          error['message'] = '알 수 없는 오류가 발생했습니다.';
          return Promise.reject(error);
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
      // return Promise.reject(error); 위랑 차이가 있는지 질문
    }
  }
};

// update profile
const setUserProfileImageAndDisplayName = async (
  user: User,
  selectedFile: File,
  displayName: string,
) => {
  try {
    const filePath = `profiles/${user.uid}/profile_picture`;
    const imageRef = ref(storage, filePath);

    await uploadBytes(imageRef, selectedFile);
    const photoURL = await getDownloadURL(imageRef);

    await updateProfile(user, {
      displayName,
      photoURL,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      error['message'] = '알 수 없는 오류가 발생했습니다.';
      return Promise.reject(error);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

// check nickname duplocation
export const checkNicknameDuplication = async (nickname: string): Promise<boolean> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'users'), where('displayName', '==', nickname)),
  );
  return !querySnapshot.empty;
};