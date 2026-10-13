import { useState } from 'react'
import viteLogo from '/vite.svg'
import {useRoutes } from 'react-router-dom'
import routes from './routes'

function App() {
  const content = useRoutes(routes)
  return content
}

export default App
