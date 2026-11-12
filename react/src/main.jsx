
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Provider as JotaiProvider } from 'jotai'
import { reduxStore } from './store/counter'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <JotaiProvider>
        <App />
      </JotaiProvider>
    </Provider>
  </React.StrictMode>
)
