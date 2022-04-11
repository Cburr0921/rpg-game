/* 
four player options 
each player has set properties 
    -name
    -img
    -health
    -attack power

things to keep track of
    -current players


create a card for each charachter and the card should have an image 
and their name and their health and add the cards to the all player wrap
   
on click of a charachter card check if current players array is less than 2 and if it is 0 than 
the current char clicked on will become users fighter
the second click will become the users oponent 
on click the charachter is removed form the all players wrap 
once there are two players in the current player array display the fight button 
both players should also be redisplayed in their corosponding divs

when a user clicks fight btn we are going to take the fighters ap value and suptract it 
from the oponents hp value
after this is done we are going to take the oponents ap and suptract it from the fighters hp
going to continue doing this every time the user clicks until the fighter or 
the oponents health is 0 or less than 0

if the oponents health is 0 or less than the fighter wins that round and they will receive 55 hp points
    -user selects new oponent and game continues on until all oponents have been played against or fighter 
    has lost 
if the fighters health is 0 or less the game is over 
*/
// dictionary of charachters which are options for playing 
// each has set health points and attack points
var charachters = {
    finn: {
        hp:100,
        ap:15
    },
    iceking:{
        hp:85,
        ap:5
        
    },
    jake:{
        hp:150,
        ap:10
        
    },
    lemongrab:{
        hp:70,
        ap:10
        
    }

}
// how to keep track of who is currently fighting 
// the array will only ever have two values 
// the first value will always be users current fighter
// the second value will always be users current opponent 
var currentPlayers = []

// creates html that will be displayed on the page representing each charachter from our charachters object
// these charachters can be clicked on to be selected to be used in the game 
function createAllPlayers(){
    /* 
    create divs and each one will have char img name and healthpoints
    this is the HTML format to be created for each charachter 
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</h5>
           <button type="button" class="btn btn-primary btn-lg">Large button</button>
        </div>
    </div>
    */
    
    // loop through each property in the charachter object 
    for (const property in charachters) {
        var card = createPlayerHTML(property)

        // where we add the card div and all of its children to the players wrap in HTML
        var allPlayersWrap = document.getElementById("all-players-wrap")
        allPlayersWrap.appendChild(card)
       // console.log(charachters[property].hp)
        
    }
      
}
function createPlayerHTML(property){
    var card = document.createElement("div")
    card.setAttribute("class", "card char-card")
    card.setAttribute("id", `${property}-wrap`)
    
   // charachter card image that lives inside of the parent card div
    var img = document.createElement("img")
    img.setAttribute("class", "card-img-top")
    img.setAttribute("src", `./assets/imgs/${property}.png`)
    img.setAttribute("alt", `${property}`)
    card.appendChild(img)

   // charachter card body that holds info about the charachter sits below the image inside of parent card
   // div
    var cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    card.appendChild(cardBody)

    // this is an h5 element holding info about the charachters health points and lives inside 
    // the card body its parent, the h5 is a grandchild of the card div
    var charHp = document.createElement("h5")
    charHp.textContent = `HP: ${charachters[property].hp}`
    charHp.setAttribute("id", `${property}-hp`)
    cardBody.appendChild(charHp)

    // this is a button that allows user to select a certain charachter and lives inside of the card body 
    //which is its parent and it is a grand child of card div
    var charBtn = document.createElement("button")
    charBtn.setAttribute("type", "button")
    charBtn.setAttribute("class","btn btn-primary btn-lg")
    charBtn.textContent =  `${property}`
    charBtn.setAttribute("id", `${property}`)
    cardBody.appendChild(charBtn)

    return card
}
// calling the function for testing purposes
// document.onclick = function(){}
// generic click event for dynamically created elemenets 
document.addEventListener("click", function(event){
console.log("click")

    //on click of a dynamically created charachter card button 
    if(charachters[`${event.target.id}`] !== undefined) {
        //console.log(event.target.id);
        //console.log(currentPlayers.length)
        if(currentPlayers.length<2){
            fightSetUp(event)
        }
        
        else{
           // console.log("no")
            //console.log(currentPlayers)
        }
    }

    if(event.target.id === "attack"){
        fight()
    }
   
    if(event.target.id === "reset"){
        resetGame()
    }


});

function renderFightBtn(){
    var attackBtn = document.createElement("button")
    attackBtn.setAttribute("type", "button")
    attackBtn.setAttribute("class","btn btn-danger btn-lg")
    attackBtn.textContent = "ATTACK!"
    attackBtn.setAttribute("id", "attack")
    var attackWrap = document.getElementById("attack-btn-wrap")
    attackWrap.appendChild(attackBtn)
}

function fightSetUp(event){
            //console.log("yes")
            // pushes whatever the clicked id to the currentPlayers array
            if (currentPlayers.indexOf(event.target.id) === -1){
                currentPlayers.push(event.target.id)

            }
            // creatign a variable to go to the document to grab the card for each charachter
            var char = document.getElementById(`${event.target.id}-wrap`)
            // removing the card form the all players wrap
            char.remove()
            
            // running a if statement that if current player legnth is equal to 1 it is your current fighter 
            if (currentPlayers.length === 1){
               // create and return fighters char card html
                var fighter = createPlayerHTML(currentPlayers[0])
                var fighterWrap = document.getElementById("fighter-wrap")
                fighterWrap.appendChild(fighter)
                var fighterBtn = document.getElementById(currentPlayers[0])
               // making the fighter button un clickable 
                fighterBtn.setAttribute("disabled", true)
                
            }
            else if (currentPlayers.length === 2){
                var opponent = createPlayerHTML(currentPlayers[1])
                var opponentWrap = document.getElementById("opponent-wrap")
                opponentWrap.appendChild(opponent)
                var opponentBtn = document.getElementById(currentPlayers[1])
                opponentBtn.setAttribute("disabled", true)

            }

            
            if (currentPlayers.length === 2){
              renderFightBtn()
            }

}

function fight(){
    var fHpWrap = document.getElementById(`${currentPlayers[0]}-hp`)
    var oHpWrap = document.getElementById(`${currentPlayers[1]}-hp`)
    var fightBtn = document.getElementById("attack")
    var messageWrap = document.getElementById("message-wrap")

    var resetBtn = document.createElement("button")
    resetBtn.setAttribute("id", "reset")
    resetBtn.setAttribute("class", "btn btn-warning btn-lg")
    resetBtn.setAttribute("type", "button")
    resetBtn.textContent = "Reset"

    
    messageWrap.textContent = ""

    if(charachters[currentPlayers[0]].hp > 0 && charachters[currentPlayers[1]].hp > 0){
        //subtract fighter ap from opponents hp
        charachters[currentPlayers[1]].hp = charachters[currentPlayers[1]].hp - charachters[currentPlayers[0]].ap
        oHpWrap.textContent = `HP: ${charachters[currentPlayers[1]].hp}`


        charachters[currentPlayers[0]].hp = charachters[currentPlayers[0]].hp - charachters[currentPlayers[1]].ap
        fHpWrap.textContent = `HP: ${charachters[currentPlayers[0]].hp}`
        
        if(charachters[currentPlayers[0]].hp < 0 || charachters[currentPlayers[0]].hp === 0){
            var fCard = document.getElementById(`${currentPlayers[0]}-wrap`)
            fCard.remove()
            fightBtn.remove()
            messageWrap.textContent = "You lost! Press reset to play again."
            messageWrap.appendChild(resetBtn)
        }
        else if(charachters[currentPlayers[1]].hp < 0 || charachters[currentPlayers[1]].hp === 0 ){
            var opCard = document.getElementById(`${currentPlayers[1]}-wrap`)
            opCard.remove()
            fightBtn.remove()
            currentPlayers.pop()
            charachters[currentPlayers[0]].hp = charachters[currentPlayers[0]].hp + 55
            fHpWrap.textContent = `HP: ${charachters[currentPlayers[0]].hp}`
            messageWrap.textContent = "You won! Select another oponent or press reset to play again."
            messageWrap.appendChild(resetBtn)


        }
    }
    else{
        if(charachters[currentPlayers[0]].hp < 0 || charachters[currentPlayers[0]].hp === 0){
            var fCard = document.getElementById(`${currentPlayers[0]}-wrap`)
            fCard.remove()
            fightBtn.remove()
            messageWrap.textContent = "You lost! Press reset to play again."
            messageWrap.appendChild(resetBtn)


        }
        else if(charachters[currentPlayers[1]].hp < 0 || charachters[currentPlayers[1]].hp === 0 ){
            var opCard = document.getElementById(`${currentPlayers[1]}-wrap`)
            opCard.remove()
            fightBtn.remove()
            currentPlayers.pop()
            charachters[currentPlayers[0]].hp = charachters[currentPlayers[0]].hp + 55
            fHpWrap.textContent = `HP: ${charachters[currentPlayers[0]].hp}`
            messageWrap.textContent = "You won! Select another oponent or press reset to play again."
            messageWrap.appendChild(resetBtn)


        }
    }
}

function resetGame(){
     charachters = {
        finn: {
            hp:100,
            ap:15
        },
        iceking:{
            hp:85,
            ap:5
            
        },
        jake:{
            hp:150,
            ap:10
            
        },
        lemongrab:{
            hp:70,
            ap:10
            
        }
    
    }
    var allPlayersWrap = document.getElementById("all-players-wrap")
    allPlayersWrap.innerHTML = ""
    
    var messageWrap = document.getElementById("message-wrap")
    messageWrap.innerHTML = ""

    var fighterWrap = document.getElementById("fighter-wrap")
    fighterWrap.innerHTML = ""

    var attackWrap = document.getElementById("attack-btn-wrap")
    attackWrap.innerHTML = ""

    var opponentWrap = document.getElementById("opponent-wrap")
    opponentWrap.innerHTML = ""

    currentPlayers = []


    playGame()
 
}

function playGame(){
    createAllPlayers()

}
playGame()