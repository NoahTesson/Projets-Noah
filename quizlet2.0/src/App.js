import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Styles/App.css';

import { Header } from './Components/Header'
import { Home } from './Pages/Home'
import { Listes } from './Pages/Listes'
import { ListesUpd } from './Pages/ListesUpd';
import { Play } from './Pages/Play';

export const cardsEmpty = { textAnswer: '',  textResponse: ''};

function App() {
    return (
        <Router>     
            <div className="App">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Listes" element={<Listes tabcard={cardsEmpty} name=''/>} />
                        <Route path="/ListesUpd" element={<ListesUpd />}/>
                        <Route path='/Play' element={<Play />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
