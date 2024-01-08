import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';

import '../Styles/CardListe.css'

export const CardListe = ({ card, setUpdLocalStorage }) => {
    const navigate = useNavigate();
    const deleteListe = () => {
        console.log('delete number: ', card.i);
        const key = localStorage.getItem('key');
        for (let i = 1; i < key; i++) {
            console.log('i: ', i);
            if (i >= card.i) {
                if (i === card.i)
                    localStorage.removeItem(i.toString());
                const valuePlusOne = localStorage.getItem((i + 1).toString());
                localStorage.setItem(i.toString(), valuePlusOne);
            }
        }
        localStorage.removeItem(key);
        let tempKey = parseInt(key) - 1;
        localStorage.setItem('key', tempKey.toString())
        toast.success('Liste supprimé avec succès!', {
            position: "top-right",
            autoClose: 1000,
        });
        setUpdLocalStorage((preview) => !preview);
    };

    return (
        <button 
            className='cardListe'
            onClick={() => {
                navigate(`/Play?tabcard=${encodeURIComponent(JSON.stringify(card))}`);
            }}
        >
            <ToastContainer />
            <div className='container-up'>
                <h2>{card.nameListe}</h2>
                <button 
                    className='trash-liste'
                    onClick={deleteListe}
                >
                    <i className="fi fi-br-trash"></i>
                </button>
            </div>
            <div className='container-down'>
                <p>{card.split_liste.length} termes</p>
            </div>
        </button>
    )
}
