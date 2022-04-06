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
    
*/
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
var currentPlayer = []

function createAllPlayers(){
    /* 
    create divs and each one will have char img name and healthpoints
    <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    </div>
    <button type="button" class="btn btn-primary btn-lg">Large button</button>
    */
    for (const property in charachters) {
        var card = document.createElement("div")
        card.setAttribute("class", "card char-card")
        card.setAttribute("id", `${property}-wrap`)
        
        var img = document.createElement("img")
        img.setAttribute("class", "card-img-top")
        img.setAttribute("src", `./assets/imgs/${property}.png`)
        img.setAttribute("alt", `${property}`)
        card.appendChild(img)

        var cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        card.appendChild(cardBody)

        var charHp = document.createElement("h5")
        charHp.textContent = `HP: ${charachters[property].hp}`
        cardBody.appendChild(charHp)

        var charBtn = document.createElement("button")
        charBtn.setAttribute("type", "button")
        charBtn.setAttribute("class","btn btn-primary btn-lg")
        charBtn.textContent =  `${property}`
        charBtn.setAttribute("id", `${property}`)
        cardBody.appendChild(charBtn)

        var allPlayersWrap = document.getElementById("all-players-wrap")
        allPlayersWrap.appendChild(card)
       // console.log(charachters[property].hp)
        
    }
      
}
createAllPlayers()

document.addEventListener("click", function(event){
    console.log(`${event.target.id}` )
    if(charachters[`${event.target.id}`] !== undefined) alert("dynamic button clicked");
  });