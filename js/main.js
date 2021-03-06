//let cardNum = 8;

const imgBacks = '../img/backs/red.svg';
const clubs = ['clubs_2.svg', 'clubs_3.svg', 'clubs_4.svg', 'clubs_5.svg','clubs_6.svg', 'clubs_7.svg', 'clubs_8.svg', 'clubs_9.svg', 'clubs_10.svg', 'clubs_ace.svg', 'clubs_jack.svg', 'clubs_king.svg', 'clubs_queen.svg'];
const diamonds = ['diamonds_2.svg', 'diamonds_3.svg', 'diamonds_4.svg', 'diamonds_5.svg','diamonds_6.svg', 'diamonds_7.svg', 'diamonds_8.svg', 'diamonds_9.svg', 'diamonds_10.svg', 'diamonds_ace.svg', 'diamonds_jack.svg', 'diamonds_king.svg', 'diamonds_queen.svg'];
const hearts = ['hearts_2.svg', 'hearts_3.svg', 'hearts_4.svg', 'hearts_5.svg','hearts_6.svg', 'hearts_7.svg', 'hearts_8.svg', 'hearts_9.svg', 'hearts_10.svg', 'hearts_ace.svg', 'hearts_jack.svg', 'hearts_king.svg', 'hearts_queen.svg'];
const spades = ['spades_2.svg', 'spades_3.svg', 'spades_4.svg', 'spades_5.svg','spades_6.svg', 'spades_7.svg', 'spades_8.svg', 'spades_9.svg', 'spades_10.svg', 'spades_ace.svg', 'spades_jack.svg', 'spades_king.svg', 'spades_queen.svg'];

let clicked = [];
let isClicked = false;
let matched = [];
const btn = document.querySelector('.btn');

const createCardArr = (arr) => {
    const newArr = [];
    for(let i=0; i<arr.length; i++ ){
        newArr.push({value:i, img:arr[i]});
    }
    
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
       
        const cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'cardDiv ');
        cardWrap.appendChild(cardDiv);

        const cardBack = document.createElement('div');
        cardBack.setAttribute('class', 'face card-back');
        cardDiv.appendChild(cardBack);

        const imgBack = document.createElement('img');
        imgBack.setAttribute('src', imgBacks);
        imgBack.setAttribute('data-number', imgArray[idx].value);
        imgBack.setAttribute('class', 'card-face-down');
        imgBack.setAttribute('id', idx);
        cardBack.appendChild(imgBack);

        const cardFront = document.createElement('div');
        cardFront.setAttribute('class', 'face card-front ');
        cardDiv.appendChild(cardFront);

        const imgFront = document.createElement('img');
        const cardImg = `../img/fronts/${imgArray[idx].img}`;
        imgFront.setAttribute('src', cardImg);
        imgFront.setAttribute('data-number', imgArray[idx].value);
        imgFront.setAttribute('class', 'card-face-up');
        imgFront.setAttribute('id', idx);
     
        cardFront.appendChild(imgFront);

    }
};


// function clickEvent() {
// if(!clicked)
// {
//     clicked = true;
//     console.log('clicked!!');
//     setTimeout(function(){
//         clicked = false;
//     }, 3000);
// }
// }

const onCardClick = (e) => {
    const card = e.target;
     
    if( !card.closest('.cardDiv').classList.contains('active') && !isClicked ){
        clicked.push(card);
        isClicked = true;

        if( clicked.length < 2){
            card.closest('.cardDiv').classList.add('active');
            
        }

        if( clicked.length === 2){
            card.closest('.cardDiv').classList.add('active');
           
            if(clicked[0].dataset.number === clicked[1].dataset.number){
                const card1 = clicked[0].closest('.cardDiv');
                const card2 = clicked[1].closest('.cardDiv')
                
                card1.classList.add('matched');
                card2.classList.add('matched');
                matched.push(card1, card2);
            } 
        }

        if(clicked.length > 2){
            const activeCards = document.querySelectorAll('.active');
                        
            activeCards.forEach((card)=>{
                if( !card.closest('.cardDiv').classList.contains('matched')){
                    card.closest('.cardDiv').classList.remove('active');
                }
            });
            
            clicked = [];
            
        }
        //preventing clicking many clicks
        setTimeout(function(){
            isClicked = false;
        }, 500);
    }
    if( matched && matched.length === 52){
        btn.innerHTML = "Congratulations! Play again?";
    }
};

const playGame = () => {
    renderCards();
    btn.innerHTML = "Let's make pairs!"
    const cards = document.querySelectorAll('.cardDiv');
    cards.forEach((card) => {
        card.addEventListener('click', onCardClick);
    });

};


playGame();

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

