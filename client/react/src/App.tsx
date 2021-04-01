import Auth from 'components/Auth'
import Register from 'components/Register'
import Login from 'components/Login'
import Top from 'components/Top'

import { UserStore } from 'contexts/UserStore'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <UserStore>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Auth>
            <Switch>
              <Route path="/top" component={Top} />
            </Switch>
          </Auth>
        </Switch>
      </Router>
    </UserStore>
  )
}

export default App
