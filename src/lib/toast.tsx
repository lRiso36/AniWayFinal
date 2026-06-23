// lib/toast.ts
import toast from 'react-hot-toast'
import { CustomToast } from '../components/CustomToast'

export const toastError = (message: string) => {
    toast.custom(<CustomToast message={message} type="error" />, {
        position: 'top-center',
        duration: 3000,
    })
}

export const toastSuccess = (message: string) => {
    toast.custom(<CustomToast message={message} type="success" />, {
        position: 'bottom-center',
        duration: 2500,
    })
}