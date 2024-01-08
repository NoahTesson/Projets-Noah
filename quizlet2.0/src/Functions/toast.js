import { toast } from 'react-toastify';

export function toasts(type, text) {
    switch(type) {
        case 'warning':
            return (
                toast.warning(text, {
                position: "top-right",
                autoClose: 1000,
            }))
        case 'success':
            return (
                toast.success(text, {
                position: "top-right",
                autoClose: 1000,
            }))
        default:
            return (
                toast.success('defautl', {
                position: "top-right",
                autoClose: 1000,
            }))
    }
}