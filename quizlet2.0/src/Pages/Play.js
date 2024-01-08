import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation  } from 'react-router-dom';

import '../Styles/Play.css'

import { QCM } from '../Components/QCM';
import { Ecrire } from '../Components/Ecrire';

const Plays = {
    QCM: 'qcm',
    ECRIRE: 'ecrire'
};

export const Play = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const tabcard = JSON.parse(params.get('tabcard'));

    const [cards, setCards] = useState([]);
    const [nameListe, setNameListe] = useState(tabcard.nameListe)
    const [playChosen, setPlayChosen] = useState(Plays.QCM);

    useEffect(() => {
        tabcard.split_liste.forEach((item) => {
            const data  = item.split(':');
            const newCard = { textAnswer: data[1], textResponse: data[2] }
            setCards((c) => [...c, newCard]);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='play'>
            <div>
                <h1>{nameListe}</h1>
                <div className='container-box'>
                    <button className='box-choose-play' onClick={() => setPlayChosen(Plays.QCM)}>
                        <p>QCM</p>
                    </button>
                    <button className='box-choose-play' onClick={() => setPlayChosen(Plays.ECRIRE)}>
                        <p>Ecrire</p>
                    </button>
                </div>
                <div className='card-playing'>
                    {
                        playChosen === Plays.QCM ? (
                            <QCM />
                        ) : (
                            <Ecrire />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
