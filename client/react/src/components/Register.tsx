import React, { useState } from 'react';

const Register: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
      <React.Fragment>
          <form>
            <p>
              <b>ユーザー登録</b>
            </p>

              <label>メールアドレス: </label>
              <input
                type="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                value={email}
              />

              <br/>

              <label>パスワード: </label>
              <input
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                value={password}
              />

              <br/>

            <button type="button">
              ログイン
            </button>
          </form>
        </React.Fragment>
    );
}

export default Register
