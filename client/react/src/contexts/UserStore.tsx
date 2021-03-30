import { useState, useContext, createContext } from 'react'

type TState = {
  userId: string
  email: string
}

type TSetState = {
  setUserId: Function
  setEmail: Function
}

const defaultState: TState = {
  userId: '',
  email: '',
}

const defaultSetState: TSetState = {
  setUserId: () => {},
  setEmail: () => {},
}

const UserStateContext = createContext<TState>(defaultState)
const UserSetContext = createContext<TSetState>(defaultSetState)

export const UserStore: React.FC = ({ children }): JSX.Element => {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')

  return (
    <UserSetContext.Provider value={{ setUserId, setEmail }}>
      <UserStateContext.Provider value={{ userId, email }}>
        {children}
      </UserStateContext.Provider>
    </UserSetContext.Provider>
  )
}

export const useUserContext = () => useContext(UserStateContext)
export const useSetUserContext = () => useContext(UserSetContext)
