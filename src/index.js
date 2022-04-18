import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import AccountConfirmed from './components/AccountConfirmed'

import './index.css'

const rootElement = document.getElementById('root')
render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/api/users/:confirmationCode' element={<AccountConfirmed/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)
