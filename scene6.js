let scene6CigX, scene6CigY;
let offsetX = 0;
let offsetY = 0;
let scene6FadeStartTime = null;
let isScene6FadingOut = false;
let trashW;
let trashH;
let trashX;
let trashY;

function scene6() {
    image(grassBg, 0, 0);
    Cigarette6(scene6CigX, scene6CigY);
    drawTrashCan();
    if (isDragging) {
        scene6CigX = mouseX - offsetX;
        scene6CigY = mouseY - offsetY;
        if (mouseX > trashX && mouseX < trashX + trashW && mouseY > trashY - 20 && mouseY < trashY) { // 쓰레기통에 담배 넣었을 때
            scene6FadeStartTime = millis();
            isScene6FadingOut = true;
            isDragging = false;
        }
    }
    if (isScene6FadingOut) {
        let elapsed = millis() - scene6FadeStartTime;
        let alpha = map(elapsed, 0, 2000, 0, 255);

        push();
        noStroke();
        fill(0, alpha);
        rect(0, 0, width, height);
        pop();

        if (elapsed >= 2000) {
            return true; // 다음 씬으로 넘어가도록
        }
    }
}

function scene6MousePressed() {
    let w = width / 20;
    let h = height / 60;

    // 마우스가 담배 안에 있는지 확인
    if (mouseX > scene6CigX && mouseX < scene6CigX + w &&
        mouseY > scene6CigY && mouseY < scene6CigY + h) {
        isDragging = true;
        offsetX = mouseX - scene6CigX;
        offsetY = mouseY - scene6CigY;
    }
}

function Cigarette6(x, y) {
    push();
    translate(x, y);
    noStroke();
    fill(255);
    rect(0, 0, width / 30, height / 60, 2);
    fill(255, 50, 0);
    rect(width / 30, 0, width / 120, height / 60, 1);
    pop();
}

function mouseReleased() {
    isDragging = false;
}

function drawTrashCan() { //AI의 도움을 받아 쓰레기통 생성
    push();
    // 3D 효과를 위한 상수
    let rimheight = 6; // 상단 테두리 높이
    let shadowOpacity = 80; // 그림자 투명도
    
    // 그림자 그리기
    noStroke();
    fill(0, 0, 0, shadowOpacity);
    ellipse(trashX + trashW/2, trashY + trashH + 5, trashW * 0.8, trashH * 0.15);
    
    // 몸체 그리기
    fill(180);
    stroke(100);
    strokeWeight(1.5);
    rect(trashX, trashY, trashW, trashH, 10); // 전면
        
    // 상단 테두리 추가 (깊이감)
    fill(150);
    rect(trashX - rimheight/2, trashY - rimheight/2, trashW + rimheight, rimheight, 5);
    
    // 메인 뚜껑 그리기
    fill(150);
    arc(trashX + trashW / 2, trashY, trashW, 40, PI, 0, CHORD);
    
    // 3D 효과를 위한 뚜껑 하이라이트 추가
    noFill();
    stroke(220, 220, 220, 150);
    strokeWeight(2);
    arc(trashX + trashW / 2, trashY, trashW * 0.8, 30, PI+0.3, TWO_PI-0.3);
    
    // 뚜껑에 손잡이 추가
    fill(100);
    noStroke();
    rect(trashX + trashW/2 - 15, trashY - 5, 30, 3, 2);
    pop();
}