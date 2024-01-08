import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Listes.css';

import { Cards } from '../Components/Cards';
import PlusSVG from '../Assets/svg/plus.svg'
import { createListe } from '../Functions/createListe';

export const cardsEmpty = { textAnswer: '',  textResponse: ''};

export const Listes = ({ tabcard, name }) => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([tabcard]);
    const [nameListe, setNameListe] = useState(name)

    const addCard = () => {
        const newCard = { textAnswer: '',  textResponse: '' };
        setCards([...cards, newCard]);
    };
    
    const updateCardText = (id, newText, field) => {
        const updatedCards = cards.map((card, index) =>
        index === id ? { ...card, [field]: newText } : card
        );
        setCards(updatedCards);
    };

    const deleteCard = (index) => {
        const newCards = [...cards];
        newCards.splice(index, 1);
        setCards(newCards);
        toast.success('Carte supprimé avec succès!', {
            position: "top-right",
            autoClose: 1000,
        });
    };

    return (
        <div className='container-listes'>
            <ToastContainer />
            <img className='img-charlotte' src={require('../Assets/charlotte_au_fraise.png')} alt='charlotte au fraise'/>
            <div className='name-liste'>
                <input
                    type="text"
                    className="text-input"
                    placeholder='Nom de la liste'
                    value={nameListe}
                    onChange={(event) => { setNameListe(event.target.value)}}
                />
            </div>
            {
                cards.map((card, index) => (
                    <Cards 
                        key={index}
                        id={index}
                        textAnswer={card.textAnswer}
                        textResponse={card.textResponse}
                        setTextAnswer={(text) => updateCardText(index, text, 'textAnswer')}
                        setTextResponse={(text) => updateCardText(index, text, 'textResponse')}
                        deletecard={() => deleteCard(index)}

                    />
                ))
            }
            <button className='btn_add_card' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={addCard}>
                <img className='img-plus' src={PlusSVG} alt='img-plus'/>
            </button>
            <button 
                className='add-liste' 
                onClick={() => {
                    createListe(nameListe, cards)
                    setCards([cardsEmpty]);
                    navigate('/')
                }}>
                <p className='text'>Valider</p>
            </button>
        </div>
    )
}