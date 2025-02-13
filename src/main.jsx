import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {store} from "./Redux/store.js"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
)
