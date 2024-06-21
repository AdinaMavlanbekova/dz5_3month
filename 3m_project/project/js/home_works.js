///////////////check email
const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button")
const result = document.querySelector("#gmail_result")

const regExp = /\w@gmail.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)){
        result.innerHTML = 'ok'
        result.style.color = 'green'
    } else {
        result.innerHTML = 'not ok'
        result.style.color = 'red'
    }
}

///////////////////////move block//////////
const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')
const maxOffsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const maxOffsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight

let positionX = 0
let positionY = 0
const moveBlock = () => {
    if (positionX < maxOffsetWidth && positionY === 0){
        positionX++
        childBlock.style.left = `${positionX}px`
        setTimeout(moveBlock, 1)
    }else if (positionX >= maxOffsetWidth && positionY < maxOffsetHeight) {
        positionY++
        childBlock.style.top = `${positionY}px`
        setTimeout(moveBlock, 1)
    }else if (positionX >= 0 && positionY <= maxOffsetHeight) {
        positionX--
        childBlock.style.left = `${positionX}px`
        setTimeout(moveBlock, 1)
    }else if (positionX <= 0 && positionY > 0) {
        positionY--
        childBlock.style.top = `${positionY}px`
        setTimeout(moveBlock, 1)
    }
}
moveBlock()

///////// counter ////////////////
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let seconds = document.getElementById("seconds");
let count = 0;
let intervalId;


start.onclick = () => {
    if (!intervalId){
        intervalId = setInterval(() => {
            count++
            seconds.innerHTML = count
        },1000)
    }
}

stop.onclick = () => {
    clearInterval(intervalId)
    intervalId = null
}

reset.onclick = () => {
    clearInterval(intervalId)
    intervalId = null
    count = 0
    seconds.innerHTML = count
}

/////////// PERSONS

const button = document.querySelector('.btn-ninjas')
const cardsContainer = document.querySelector('.cardsContainer')
const defaultPhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s";
let visible = false

button.onclick = () => {
    if (visible) {
        cardsContainer.innerHTML = ''
        visible = false
    } else {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/persons.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response)

            data.forEach(ninja => {
                const personCard = document.createElement('div');
                personCard.classList.add('personCard');
                personCard.innerHTML = `
                    <div class="personImage">
                        <img src="${ninja.photo || defaultPhoto}" alt="${ninja.name}">
                    </div>             
                        <h2>Name: ${ninja.name}</h2>
                        <h3>Age: ${ninja.age}</h3>                                       
                `
                cardsContainer.append(personCard)
            })
        }

        visible = true
    }
}


const button2 = document.querySelector('.btn-hokages')

button2.onclick = () => {
    if (visible) {
        cardsContainer.innerHTML = ''
        visible = false
    } else {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/hokages.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            const data = JSON.parse(request.response)

            data.forEach(hokage => {
                const personCard = document.createElement('div');
                personCard.classList.add('personCard');
                personCard.innerHTML = `
                    <div class="personImage">
                        <img src="${hokage.photo || defaultPhoto}" alt="${hokage.name}">
                    </div>
                    <h2>${hokage.name}</h2>
                    <h3>Age: ${hokage.age}</h3>
                    <h4>${hokage.village}</h4>
                    <h5>${hokage.isnumber}</h5>
                    <h6>is alive: ${hokage.isAlive}</h6>
                `;
                cardsContainer.append(personCard)
            })
        }
        visible = true
    }
}


