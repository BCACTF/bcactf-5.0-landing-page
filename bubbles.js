class Bubble {
    constructor(xPos, speed, element) {
        this.xPos = xPos;
        this.yPos = 0;
        this.speed = speed
        this.element = element

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

const bubblesDiv = document.querySelector(".bubbles")
const bubblesColors = ["#93dbe9","#689cc5","#5e6fa3","#3b4368","#191d3a","#d9dbee","#b3b7e2"]
let bubbles = []
let bubbleLoop;

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

    if (!document.hidden)
        setTimeout(createBubbles, Math.random()*800)
}

function updateBubbles() {
    bubbles.forEach((bubble) => {
        bubble.move()
    })
}

createBubbles()
bubbleLoop = setInterval(updateBubbles, 10);

document.addEventListener('visibilitychange', ()=>{
    if (document.hidden) {
        clearInterval(bubbleLoop);
    } else {
        setTimeout(createBubbles, Math.random() * 1000)
        bubbleLoop = setInterval(updateBubbles, 10);
    }
});

