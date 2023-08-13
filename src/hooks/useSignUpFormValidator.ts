import { FormInstance } from 'antd';
import { RuleObject } from 'antd/es/form';
import { checkNicknameDuplication } from '../api/firebaseAuth';

const useSignUpFormValidator = (formInstance: FormInstance) => {
  const passwordValidator = {
    validator: (_: RuleObject, value: string) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!value || passwordRegex.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('비밀번호는 6자 이상 숫자+영문 조합으로 작성해주세요.'));
    },
  };

  const confirmPasswordValidator = {
    validator: (_: RuleObject, value: string) => {
      if (!value || formInstance.getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
    },
  };

  const nickNameValidator = {
    validator: async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.resolve();
      }
      const isDuplicated = await checkNicknameDuplication(value);
      if (isDuplicated) {
        return Promise.reject(new Error('이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.'));
      }
      return Promise.resolve();
    },
  };

  return {
    passwordValidator,
    confirmPasswordValidator,
    nickNameValidator: nickNameValidator,
  };
};

export default useSignUpFormValidator;
