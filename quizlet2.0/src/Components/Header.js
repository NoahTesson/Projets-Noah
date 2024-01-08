import React from 'react'

import '../Styles/Header.css'

export const Header = () => {
    return (
        <header className="header">
            <h1>Flashstoche</h1>
            <nav>
                <ul className='nav-list'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/Listes">Listes</a></li>
                </ul>
            </nav>
        </header>
    )
}
