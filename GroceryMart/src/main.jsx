import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { CartStore } from './Store-For-Redux/Store'
import ContextProvider from './Components/Context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={CartStore}>
      <ContextProvider>
      <App />
      </ContextProvider>
    </Provider>

  </React.StrictMode>,
)
