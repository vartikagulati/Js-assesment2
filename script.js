const alphabetContainer = document.getElementById('alphabet');
const emptybox = document.getElementById('display');
const winModal = document.getElementById('win-modal');
const lossModal = document.getElementById('loss-modal');
const pauseModal = document.getElementById('pause-modal');
const text = document.getElementsByClassName('text')[0]
const img = document.getElementsByClassName('img')[0]
const playagain= document.querySelectorAll('.play-again')
const newCategory= document.querySelectorAll('.new-category')
const qiutGame= document.querySelectorAll('.quit-game')
const continuegame= document.querySelectorAll('.continue')

img.addEventListener('click',()=>{
showpauseModal()
})

continuegame.forEach((btn) => {
    btn.addEventListener('click', () => {
  
        pauseModal.style.display = "none";
    });
});
let turns = 0
let wordlength=0
  
const urlParams = new URLSearchParams(window.location.search);

const requesteddata = urlParams.get('data');
text.textContent=requesteddata
let obj={}

const fetchdata= async()=>{
    const res= await fetch('data.json')
    const data = await res.json()   
    if(requesteddata && data.categories[requesteddata] ){
        const specificdata= data.categories[requesteddata]
        console.log(specificdata);
        const length= specificdata.length
        let num = Math.floor(Math.random()*length)
        let arr= specificdata[num]
        let alphabet= arr.name
        turns=alphabet.length+5
        wordlength=alphabet.length
        arr.selected=true
        for (let i = 0; i < alphabet.length; i++) {
            const letter = alphabet[i].toLocaleUpperCase();
            if (obj[letter]) {
                obj[letter].push(i); 
            } else {
                obj[letter] = [i]; 
            }
        }
        console.log(obj);
        for(let i=0;i<alphabet.length;i++){
            let singlealphabet = document.createElement('div')
            singlealphabet.classList='singleaphbet'
             emptybox.appendChild(singlealphabet)
        }
    
    }
}
fetchdata()

for (let i = 65; i <= 90; i++) { 
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = letter.toLocaleUpperCase();
    alphabetContainer.appendChild(button);
    
    button.addEventListener('click', () => {
        if (button.disabled) return;
        button.style.backgroundColor = "black"; 
        button.disabled = true;
        turns=turns-1
    
        if (obj[letter]) { 
            const positions = obj[letter]; 
            let alphbets= positions.length
            wordlength=wordlength-alphbets
            positions.forEach((position) => {
                const displayletter = emptybox.children[position];  
                displayletter.textContent = letter; 
                displayletter.style.backgroundColor = "lightblue";  
            });
        }
        if (checkwin(turns, wordlength)) {
          showWinModal()
        } else if (turns === 0 && wordlength > 0) {
            showlossModal()
        }
    });
}

function showWinModal() {
    winModal.style.display = "flex";
}
function showlossModal() {
    lossModal.style.display = "flex";
}
function showpauseModal() {
    pauseModal.style.display = "flex";
}

let checkwin=function(turns,wordlength){
     if(turns!=0 && wordlength!=0){
    
     }
     else if(turns==0 && wordlength !=0){
        return false
     }
     else if(turns!=0 && wordlength ==0){
        return true
     }

}

playagain.forEach((btn) => {
    btn.addEventListener('click', () => {
     
        turns = 0;
        wordlength = 0;
        obj = {}; 
        emptybox.innerHTML = ''; 

        winModal.style.display = "none";
        lossModal.style.display = "none";
        const alphabetButtons = alphabetContainer.querySelectorAll('button');
        alphabetButtons.forEach((button) => {
            button.disabled = false;  
            button.style.backgroundColor = "";  
        });
        fetchdata();
    });
});
newCategory.forEach((btn)=>{
    btn.addEventListener('click',()=>{
       window.location.href='category.html'
    })
})

qiutGame.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        window.location.href='index.html'
    })
})