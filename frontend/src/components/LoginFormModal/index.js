import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory} from 'react-router-dom';
function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    history.push('/')
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    };

    const autoLogin = e => {
      setCredential('demo@user.io')
      setPassword('password')
      return dispatch(sessionActions.login({ credential, password}))
      .then(closeModal)
    }

  return (
    <>
          {errors.credential && (
            <p>{errors.credential}</p>
          )}
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={!password.length || !credential.length}>Log In</button>
        <button onClick={autoLogin}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;