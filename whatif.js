let textArray = ["ㅁ", "마", "만", "만ㅇ", "만야", "만약", "만약.", "만약..", "만약...", "만약..."];

function whatIf(startTime) {
    let whatIfElapsedTime = millis() - startTime;
    background(0);
    textAlign(CENTER, CENTER);
    textSize(100);
    fill(255);
    text(textArray[parseInt(whatIfElapsedTime / 300)], width / 2, height / 2);
    return whatIfElapsedTime;
}