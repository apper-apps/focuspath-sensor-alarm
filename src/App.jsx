import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Dashboard from '@/components/pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-body">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="mt-16"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App