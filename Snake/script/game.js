import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Barry from "./barry.js";

class Game {
    constructor(container) {
        this.canvas = new Canvas( container );
        this.snake = new Snake();
        this.barry = new Barry( this.canvas );
        this.score = new Score( ".game-score .score-count", 0 );
        new GameLoop( this.update.bind(this), this.draw.bind(this) );
    }
    update() {
        this.snake.update(this.barry, this.score, this.canvas);
    }
    draw() {
        this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
        this.snake.draw(this.canvas.context);
        this.barry.draw(this.canvas.context);
    }
}
new Game(document.querySelector('.canvas-wrapper'));