class Bubble {
    constructor(xPos, speed, element) {
        this.xPos = xPos;
        this.yPos = 0;
        this.speed = speed
        this.element = element

        console.log(xPos, speed)

        this.element.style.left = xPos+speed+'px';
    }

    move() {
        this.yPos += this.speed
        this.element.style.bottom = this.yPos+'px';

        if (this.element.getBoundingClientRect().bottom < 0) {
            // Remove the bubble from the bubbles array
            const index = bubbles.indexOf(this);
            if (index !== -1) {
                bubbles.splice(index, 1);
                // Remove the bubble element from the DOM
                this.element.remove();
            }
        }
    }
}

let bubblesDiv = document.querySelector(".bubbles")
let bubbles = []
let bubblesColors = ["#93dbe9","#689cc5","#5e6fa3","#3b4368","#191d3a","#d9dbee","#b3b7e2"]

function createBubble() {
    let div = document.createElement("div")
    div.classList.add("bubble")
    bubblesDiv.appendChild(div)
    div.style.width = Math.floor(Math.random()*20+10)+"px"
    
    div.style.backgroundColor = bubblesColors[Math.floor(Math.random()*bubblesColors.length)]+Math.floor(Math.random()*33+20)
    
    div.style.bottom = "0";
    return div
}

function createBubbles() {
    let bubble = new Bubble(Math.floor(Math.random() * window.innerWidth), Math.random()+.5, createBubble())
    bubbles.push(bubble)

    setTimeout(createBubbles, Math.random()*1000)
}

function updateBubbles() {
    bubbles.forEach((bubble) => {
        bubble.move()
    })
}

createBubbles()
setInterval(updateBubbles, 10)