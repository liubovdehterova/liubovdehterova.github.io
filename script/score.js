export default class Score {
    constructor(scoreBlock, score = 0) {
        this.scoreBlock = document.querySelector(scoreBlock);
        this.score = score;
        this.draw();
    }
    inScore() {
        this.score++;
        this.draw();
    }
    setToZero() {
        this.score = 0;
        this.draw();
    }
    draw() {
        this.scoreBlock.innerHTML = this.score;
    }
}