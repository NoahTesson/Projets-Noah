import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation  } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Listes.css';

import { Cards } from '../Components/Cards';
import PlusSVG from '../Assets/svg/plus.svg';
import { updateListe } from '../Functions/updateListe';

const EmptyCard = { textAnswer: '', textResponse: '' };

export const ListesUpd = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const tabcard = JSON.parse(params.get('tabcard'));
    const [cards, setCards] = useState([]);
    const [nameListe, setNameListe] = useState(tabcard.nameListe)

    useEffect(() => {
        tabcard.split_liste.forEach((item) => {
            const data  = item.split(':');
            const newCard = { textAnswer: data[1], textResponse: data[2] }
            setCards((c) => [...c, newCard]);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    updateListe(tabcard.i, nameListe, cards)
                    setCards([EmptyCard]);
                    navigate('/')
                }}>
                <p className='text'>Modifier la liste</p>
            </button>
        </div>
    )
}