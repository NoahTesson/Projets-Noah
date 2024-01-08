import { increaseKey } from "./IncreaseKey";

import { toasts } from '../Functions/toast';

export function createListe(nameListe, cards) {
    let value = '';
    if (nameListe === '' || cards.length === 0)
        return toasts('warning', 'Liste vide.');
    if (cardsEmpty(cards))
        return toasts('warning', 'Remplissez tous les champs.');
    increaseKey();
    const key = localStorage.getItem('key');
    cards.forEach((card, index) => {
        let tmp = '';
        if (index === (cards.length - 1))
            tmp = nameListe + ':' + card.textAnswer + ':' + card.textResponse;
        else
            tmp = nameListe + ':' + card.textAnswer + ':' + card.textResponse + ';';
        value = value + tmp;
    });
    localStorage.setItem(key, value);
}

function cardsEmpty(cards) {
    let isEmpty = 0;
    cards.forEach((card) => {
        if (card.textAnswer === '' || card.textResponse === '')
            isEmpty = isEmpty + 1;
    })
    if (isEmpty === 0)
        return false;
    else
        return true;
}