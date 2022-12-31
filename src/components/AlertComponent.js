import { ToastContainer, toast } from 'react-toastify';

import React from 'react'

export default function AlertComponent() {
  return (
    <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  )
}



