let cardNum = 8;

const generateNumberArray = (number) => {
   
    const numArray = [];
    for (let i = 1; i < number + 1; i++) {
        numArray.push(i);
        numArray.push(i);
    }

    for (i = numArray.length - 1; i > -1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = numArray[i];
        numArray[i] = numArray[j];
        numArray[j] = temp;
    }

    return numArray;

};

const renderCards = () => {
    const numbersArray = generateNumberArray(cardNum);
    const cardWrap = document.getElementById('items-wrap');

    for (let idx = 0; idx < numbersArray.length; idx++) {
        const div = document.createElement('div');
        div.setAttribute('class', 'item');
        div.setAttribute('data-state', 'faceDown');
        div.setAttribute('data-number', numbersArray[idx]);
        cardWrap.appendChild(div);
    }
};

const faceUp = (el) => {
    el.target.setAttribute('data-state', 'faceUp');
    el.target.style.backgroundColor = 'skyblue';
    el.target.innerHTML = el.target.dataset.number;

};

const faceDown = (el) => {
    el.setAttribute('data-state', 'faceDown');
    el.style.backgroundColor = 'rgb(201, 135, 190)';
    el.innerHTML = '';
};

const onCardClick = (e) => {
    e.preventDefault;
    const card = e.target;
    if(card.dataset.state !== 'faceUp'&& card.dataset.state !== 'inactive' ){
        clickedCards.push(card);

        if(clickedCards.length < 2){
            faceUp(e)
        };

        if(clickedCards.length === 2){
            faceUp(e);

            if(clickedCards[0].dataset.number === clickedCards[1].dataset.number){
                    clickedCards.forEach((card)=>{
                    card.dataset.state = 'inactive';
                });

                clickedCards = [];
            }; 
        };

        if(clickedCards.length > 2){
            
            clickedCards.forEach((card)=>{
                if( card.dataset.state !== 'inactive'){
                    faceDown(card);
                };
                
            });
            clickedCards = [];
        };
    };
};

let clickedCards = [];

const playGame = () => {
    renderCards();
    const cards = document.querySelectorAll('.item');
    cards.forEach((card) => {
        card.addEventListener('click', onCardClick);
    }); 
}

playGame();

const btn = document.querySelector('.btn');
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

btn.addEventListener('click', function(){
    const cardWrap = document.getElementById('items-wrap');
    removeAllChildNodes(cardWrap);
    playGame();
    
});

