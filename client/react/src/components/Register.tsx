import React, { useState } from 'react'

import axios from 'axios'
import 'external/axios_settings'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('msg')

  const onClick = () => {
    axios
      .post('/register', {
        email: email,
        password: password,
      })
      .then(() => {
        // TODO: ログイン画面へリダイレクト
      })
      .catch((err) => {
        if (err.response) {
          setMsg(err.response.data.msg)
        }
      })
  }

  return (
    <React.Fragment>
      <form>
        <p>
          <b>ユーザー登録</b>
        </p>

        <label>メールアドレス: </label>
        <input
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
        />

        <br />

        <label>パスワード: </label>
        <input
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={password}
        />

        <br />

        <button type="button" onClick={onClick}>
          登録
        </button>

        <br />
        <p>{msg}</p>
      </form>
    </React.Fragment>
  )
}

export default Register
