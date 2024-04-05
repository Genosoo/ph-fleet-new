import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css';
import './css/login.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/authContext/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
                <App />
        </BrowserRouter>
    </AuthProvider>
,
)
