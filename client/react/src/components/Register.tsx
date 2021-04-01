import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import axios from 'axios'
import 'external/axios_settings'

import 'style/register.css'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const history = useHistory()

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
      <div className="registerMain">
        <h1 className="register">ユーザー登録</h1>
        <form className="registerForm" onSubmit={handleSubmit(onClick)}>
          <input
            type="email"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
            placeholder="メールアドレスを入力"
            ref={register({
              required: 'メールアドレスを入力してください',
            })}
          />
          {errors.email && errors.email.message}

          <input
            type="password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
            placeholder="パスワードを入力"
            ref={register({
              required: 'パスワードを入力してください',
              min: {
                value: 8,
                message: '8文字以上のパスワードを設定してください',
              },
            })}
          />

          <button className="registerSubmit" type="submit">
            登録
          </button>

          <p className="registerMsg">{msg}</p>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Register
