import { createRoot } from 'react-dom/client'
import App from './app/App'
import './app/styles/index.scss'

const domNode = document.getElementById('root')
const root = createRoot(domNode!)
root.render(<App />)