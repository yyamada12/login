import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import axios from 'axios'
import 'external/axios_settings'

import 'style/login.css'

import { useSetUserContext } from 'contexts/UserStore'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('パスワードは必須です')

  const history = useHistory()

  const { register, handleSubmit, errors } = useForm()

  const { setUserId } = useSetUserContext()

  const onClick = () => {
    axios
      .post('/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        setMsg(res.data.userId)
        setUserId(res.data.userId)
        history.push('/top')
      })
      .catch((err) => {
        if (err.response) {
          setMsg(err.response.data.msg)
        }
      })
  }

  return (
    <React.Fragment>
      <div className="loginMain">
        <h1 className="login">ログイン</h1>

        <form className="loginForm" onSubmit={handleSubmit(onClick)}>
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
            })}
          />

          <button className="loginSubmit" type="submit">
            ログイン
          </button>

          <p className="loginMsg">{msg}</p>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Login
