//let cardNum = 8;

const imgBacks = '../img/backs/red.svg';
const clubs = ['clubs_2.svg', 'clubs_3.svg', 'clubs_4.svg', 'clubs_5.svg','clubs_6.svg', 'clubs_7.svg', 'clubs_8.svg', 'clubs_9.svg', 'clubs_10.svg', 'clubs_ace.svg', 'clubs_jack.svg', 'clubs_king.svg', 'clubs_queen.svg'];
const diamonds = ['diamonds_2.svg', 'diamonds_3.svg', 'diamonds_4.svg', 'diamonds_5.svg','diamonds_6.svg', 'diamonds_7.svg', 'diamonds_8.svg', 'diamonds_9.svg', 'diamonds_10.svg', 'diamonds_ace.svg', 'diamonds_jack.svg', 'diamonds_king.svg', 'diamonds_queen.svg'];
const hearts = ['hearts_2.svg', 'hearts_3.svg', 'hearts_4.svg', 'hearts_5.svg','hearts_6.svg', 'hearts_7.svg', 'hearts_8.svg', 'hearts_9.svg', 'hearts_10.svg', 'hearts_ace.svg', 'hearts_jack.svg', 'hearts_king.svg', 'hearts_queen.svg'];
const spades = ['spades_2.svg', 'spades_3.svg', 'spades_4.svg', 'spades_5.svg','spades_6.svg', 'spades_7.svg', 'spades_8.svg', 'spades_9.svg', 'spades_10.svg', 'spades_ace.svg', 'spades_jack.svg', 'spades_king.svg', 'spades_queen.svg'];

const createCardArr = (arr) => {
    const newArr = [];
    for(let i=0; i<arr.length; i++ ){
        newArr.push({value:i, img:arr[i]});
    }
    console.log(newArr)
    return newArr;
};

const concatArrs = (arr1, arr2, arr3, arr4) => {
    const group1 = createCardArr(arr1);
    const group2 = createCardArr(arr2);
    const group3 = createCardArr(arr3);
    const group4 = createCardArr(arr4);

    return group1.concat(group2, group3, group4);
}

const generateNumberArray = (arr) => {
    for (i = arr.length - 1; i > -1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
  
    return arr;
};

const renderCards = () => {
    const concatArr = concatArrs(clubs, diamonds, hearts, spades);
    const imgArray = generateNumberArray(concatArr);
    const cardWrap = document.getElementById('items-wrap');

    for (let idx = 0; idx < imgArray.length; idx++) {
        //const div = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('src', imgBacks)
        img.setAttribute('class', 'item');
        img.setAttribute('id', idx);
        img.setAttribute('data-state', 'faceDown');
        img.setAttribute('data-number', imgArray[idx].value);
        img.setAttribute('data-img', imgArray[idx].img )
        cardWrap.appendChild(img);
    }
};

const faceUp = (el) => {
    const cardImg = `../img/fronts/${el.target.dataset.img}`;
    el.target.setAttribute('data-state', 'faceUp');
    el.target.setAttribute('src', cardImg);
    
};

const faceDown = (el) => {
    el.setAttribute('data-state', 'faceDown');
    el.src = imgBacks;
   
};

const onCardClick = (e) => {
    e.preventDefault;
    const card = e.target;
    

    if(card.dataset.state !== 'faceUp'&& card.dataset.state !== 'inactive' ){
        clickedCards.push(card);

        if(clickedCards.length < 2){
            faceUp(e);
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

