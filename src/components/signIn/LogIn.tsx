import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const signUp = (event: any) => {
    event.preventDefault();
  };
  const signIn = async (event: any) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = (event: any) => {
    event.preventDefault();
  };
  return (
    <div>
      <form>
        <div>
          <label>이메일 : </label>
          <input type="email" value={email} name="email" onChange={onChange} required></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>
    </div>
  );
}

export default SignIn;
