import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import axios from 'axios'
import 'external/axios_settings'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('msg')

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm()

  const onClick = () => {
    axios
      .post('/register', {
        email: email,
        password: password,
      })
      .then(() => {
        history.push('/login')
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
          <b>ユーザー登録</b>
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
            min: {
              value: 8,
              message: '8文字以上のパスワードを設定してください',
            },
          })}
        />

        <br />

        <button type="submit">登録</button>

        <br />
        <p>{msg}</p>
      </form>
    </React.Fragment>
  )
}

export default Register
