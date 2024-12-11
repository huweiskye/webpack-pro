import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import "./hello/world"
import './i18n'
import './index.less'
import './global.less'

const container = document.getElementById('root')

if(container) {
    const root = createRoot(container)
    root.render(<App />)
}else {
    console.error('Root container element not found!')
}

