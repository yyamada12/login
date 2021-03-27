import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from 'axios'
import 'external/axios_settings'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('msg')

  const { register, handleSubmit, errors } = useForm()

  const onClick = () => {
    axios
      .post('/login', {
        email: email,
        password: password,
      })
      .then(() => {
        // TODO: トップ画面へリダイレクト
      })
      .catch((err) => {
        if (err.response) {
          setMsg(err.response.data.msg)
        }
      })
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onClick)}>
        <p>
          <b>ログイン</b>
        </p>

        <label>メールアドレス: </label>
        <input
          type="email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
          ref={register({
            required: 'メールアドレスを入力してください',
          })}
        />
        {errors.email && errors.email.message}

        <br />

        <label>パスワード: </label>
        <input
          type="password"
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={password}
          ref={register({
            required: 'パスワードを入力してください',
          })}
        />

        <br />

        <button type="submit">ログイン</button>

        <br />
        <p>{msg}</p>
      </form>
    </React.Fragment>
  )
}

export default Login
