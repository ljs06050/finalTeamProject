function finalscene(startTime) {
    let alpha;
    let finalsceneElapsedTime = millis() - startTime;

    drawSky();
    drawScene3Mountains(width, height);

    if (finalsceneElapsedTime < 2000) {
        push();
        alpha = map(finalsceneElapsedTime, 0, 2000, 255, 0);
        noStroke();
        fill(0, alpha);
        rect(0, 0, width, height);
        pop();
    }
    else if (finalsceneElapsedTime > 4000) {
        push();
        alpha = map(finalsceneElapsedTime, 4000, 6000, 0, 255);
        noStroke();
        fill(0, alpha);
        rect(0, 0, width, height);
        pop();
    }
    return finalsceneElapsedTime;
}

function drawSky() { //AI의 도움을 받아 하늘 그리는 부분 생성
    push();
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(color(135, 206, 250), color(0, 191, 255), inter); // 위→아래
        stroke(c);
        line(0, y, width, y);
    }
    pop();
}