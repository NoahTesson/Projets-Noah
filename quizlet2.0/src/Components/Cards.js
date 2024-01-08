import React, { useState } from 'react'

import '../Styles/Cards.css'

export const Cards = ({ id, textAnswer, textResponse, setTextAnswer, setTextResponse, deletecard}) => {
    const [updateHeightCard, setUpdateHeightCard] = useState(0)

    return (
        <div style={{ height: (150 + updateHeightCard) }} className='container-card'>
            <div className='container-header'>
                <p>{id}</p>
                <button className='btn_trash' onClick={deletecard}>
                    <i class="fi fi-br-trash"></i>
                </button>
            </div>
            <hr />
            <div className='container-input'>
                <div className='container-input-text'>
                    <textarea
                        rows={1}
                        value={textAnswer}
                        onChange={(event) => setTextAnswer(event.target.value)}
                        className="text-input"
                        maxLength={200}
                        style={{
                            resize: 'none',
                            overflow: 'hidden',
                            height: '20px',
                        }}
                        onInput={(e) => {
                            if (updateHeightCard < e.target.scrollHeight)
                            setUpdateHeightCard(e.target.scrollHeight);
                        e.target.style.height = '20px';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />
                    <p >Question</p>
                </div>
                <div>
                    <textarea
                        value={textResponse}
                        onChange={(event) => setTextResponse(event.target.value)}
                        className="text-input"
                        rows={4}
                        style={{
                            resize: 'none',
                            overflow: 'hidden',
                            height: '20px',
                        }}
                        onInput={(e) => {
                            if (updateHeightCard < e.target.scrollHeight)
                                setUpdateHeightCard(e.target.scrollHeight);
                            e.target.style.height = '20px';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />
                    <p>Reponse</p>
                </div>
            </div>
        </div>
    )
}
