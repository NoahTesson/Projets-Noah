import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';

import { CardListe } from '../Components/CardListe';

export const Home = () => {
    const [cards, setCards] = useState([]);
    const [updLocalStorage, setUpdLocalStorage] = useState(false);

    useEffect(() => {
        const fetchdata = () => {
            setCards([]);
            const key = localStorage.getItem('key');
            for (let i = 1; i <= key; i++) {
                const liste = localStorage.getItem(i.toString());
                const split_liste = liste.split(';');
                const nameListe = split_liste[0].split(':')[0];
                const newCard = { i, nameListe, split_liste }
                setCards((previous) => [...previous, newCard]);
            } 
        }
        fetchdata();
    }, [updLocalStorage])

    return (
        <div className='container-home'>
            <div className='container-cards'>
                {
                    cards.length === 0 ? (
                        <p>Aucune Liste</p>
                    ) : null    
                }
                {
                    cards.map((card, index) => {
                        return (
                            <CardListe key={index} card={card} setUpdLocalStorage={setUpdLocalStorage}/>
                        )
                    })
                }
            </div>
        </div>
    )
}