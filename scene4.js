let ashParticles = [];
let isShaking = false;
let shakeStartFrame = 0;
let shakeDuration = 60; // 약 1초
let check = 0;
let scene4Particles = [];

let houseTm1 = 3000;
let houseTm2 = 8000;
let houseTm3 = 11000;
let scene4ElapsedTime;
let scene4StartTime;

function scene4() {

    let xOffset = 0;

    if (isShaking) {
        elapsed = frameCount - shakeStartFrame;
        if (elapsed < shakeDuration) {
        xOffset = sin(elapsed * 0.5) * 5;
        } else {
        isShaking = false;
        }
    }

    if (check == 0) {
        drawSkyGradient();
        updateAshParticles();
        drawHouse();
    }
    else if (check == 1) {
        scene4ElapsedTime = millis() - scene4StartTime;

        if (scene4ElapsedTime <= houseTm1){
        drawSkyGradient();
        updateAshParticles();

        push();
        translate(xOffset, 0); // 좌우 흔들림
        drawHouse();
        pop();
        }

        else if (scene4ElapsedTime >= houseTm1 && scene4ElapsedTime < houseTm2) {
            drawSkyGradient();
            updateAshParticles();
            middleHouseScene();
            if (scene4ElapsedTime >= houseTm1 + 1000 && scene4ElapsedTime < houseTm2) { 
            drawSkyGradient();
            updateAshParticles();
            drawScene4Fire(width, height);
            middleHouseScene();
            }
        }
        else if (scene4ElapsedTime >= houseTm2 && scene4ElapsedTime < houseTm3) {
            drawSkyGradient();
            updateAshParticles();
            drawDisasterHouseScene();
        }
        else if (scene4ElapsedTime >= houseTm3 && scene4ElapsedTime < houseTm3 + 1000) {
            let pell = map(scene4ElapsedTime, houseTm3, houseTm3 + 1000, 0, 255);
            fill(0, pell);
            noStroke();
            rect(0, 0, width, height);
        }
    }
    return scene4ElapsedTime;
}

function scene4MousePressed() {
    // AI가 작성한 집 클릭 시 흔들림 시작
    let houseLeft = width * 0.225;
    let houseRight = width * 0.875;
    let houseTop = height * 0.2;
    let houseBottom = height;
    //AI가 작성한 집을 클릭하면 그 시점부터 시간이 흘러가도록한 코드임
    if (mouseX >= houseLeft && mouseX <= houseRight && mouseY >= houseTop && mouseY <= houseBottom) {
        isShaking = true;
        shakeStartFrame = frameCount;
        if (check != 1) {
            scene4StartTime = millis();
        }
        check = 1;
    }
}

function drawHouse() {
    push();
    let x = width;
    let y = height;

    //각주가 붙어있는 부분은 마우스가 그려진 집의 위에있을경우 집이 조금 밝아지는 인터렉션을 구현한 AI의 작품이다.
    // 집의 영역 정의
    let houseLeft = x * 0.225;
    let houseRight = x * 0.675; // 본체 오른쪽까지
    let houseTop = y * 0.2;
    let houseBottom = y;

    // 마우스가 집 위에 있는지 확인
    let isMouseOverHouse = mouseX >= houseLeft && mouseX <= houseRight &&
                         mouseY >= houseTop && mouseY <= houseBottom;

    // 색상 설정
    let baseColor = isMouseOverHouse ? 80 : 60;  // 회색으로 변경
    let roofColor = isMouseOverHouse ? 50 : 30;  // 지붕 색도 약간 연하게
    let backColor = isMouseOverHouse ? 70 : 50;

    stroke(50);
    strokeWeight(2);

    //본체
    fill(baseColor);
    rect(x * 0.225, y * 0.548, x * 0.45, y * 0.5);

    //지붕
    fill(roofColor);
    triangle(x * 0.143, y * 0.548, x * 0.45, y * 0.2, x * 0.757, y * 0.548);
    strokeWeight(3);
    line(x * 0.45, y * 0.2, x * 0.45, y * 0.548);

    //뒤에 있는 그거
    fill(backColor);
    rect(x * 0.675, y * 0.625, x * 0.2, y * 0.375);

    
    stroke(20);
    line(x * 0.255, y * 0.548, x * 0.255, y * 1.048);
    line(x * 0.315, y * 0.548, x * 0.315, y * 1.048);
    rect(x * 0.27, y * 0.648, x * 0.045, y * 0.15);

    line(x * 0.355, y * 0.548, x * 0.355, y * 1.048);
    line(x * 0.417, y * 0.548, x * 0.417, y * 1.048);
    rect(x * 0.375, y * 0.673, x * 0.045, y * 0.175);

    line(x * 0.7, y * 0.625, x * 0.7, y);
    line(x * 0.76, y * 0.625, x * 0.76, y);
    rect(x * 0.715, y * 0.7, x * 0.06, y * 0.15);

    noStroke();
    fill(20);
    rect(x * 0.493, y * 0.15, x * 0.02, y * 0.175);

    fill(0);
    rect(x * 0.5, y * 0.714, x * 0.114, y * 0.286);
    pop();
}

// 그라데이션을 표현한 AI의 프로그램이다.
function drawSkyGradient() {
    let topColor = color(255, 120, 30);
    let bottomColor = color(80, 30, 10);

    if (scene4ElapsedTime >= houseTm1 && scene4ElapsedTime < houseTm2) {
        topColor = color(0);
        bottomColor = color(80, 30, 10);
    }
    else if (scene4ElapsedTime >= houseTm2 && scene4ElapsedTime < houseTm3) {
        topColor = color(0);
        bottomColor = color(255);
    }

    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(topColor, bottomColor, inter);
        stroke(c);
        line(0, y, width, y);
    }
}

//재를 표현한 AI의 프로그램이다
function updateAshParticles() {
    if (frameCount % 3 === 0) {
        for (let i = 0; i < 2; i++) {
        ashParticles.push(new AshParticle(random(width), height));
        }
    }

    for (let i = ashParticles.length - 1; i >= 0; i--) {
        let p = ashParticles[i];
        p.update();
        p.show();

        if (p.offscreen()) {
        ashParticles.splice(i, 1);
        }
    }
}

class AshParticle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, random(-1.5, -0.5));
        this.alpha = 255;
        this.size = random(2, 5);
    }

    update() {
        this.pos.add(this.vel);
        this.alpha -= 1.5;
    }

    offscreen() {
        return this.pos.y < 0 || this.alpha <= 0;
    }

    show() {
        fill(200, 200, 200, this.alpha);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

function drawDisasterHouseScene() {
    push();
    let x = width;
    let y = height;
    stroke(0);

    fill(30);
    quad(x*0.6714, y*0.7143, x*0.7429, y*0.7857, x*0.2, y, x*0.0143, y); // 뒷쪽 막대
    line(x*0.4286, y*0.6429, x*0.6, y*0.7857);
    line(x*0.4571, y*0.6429, x*0.7571, y*0.9048);
    line(x*0.7, y*0.8333, x*0.8857, y);

    fill(40);
    quad(x*0.1571, y*0.8333, x*0.2429, y*0.6429, x*0.6714, y, x*0.1286, y); // 본체

    fill(30);
    quad(x*0.4143, y*0.6667, x*0.4286, y*0.5476, x*0.9143, y, x*0.8, y); // 막대
    line(x*0.4286, y*0.6429, x*0.6, y*0.7857);
    line(x*0.4571, y*0.6429, x*0.7571, y*0.9048);
    line(x*0.7, y*0.8333, x*0.8857, y);
    line(x*0.4429, y*0.5952, x*0.5714, y*0.7143);

    fill(40);
    quad(x*0.5714, y*0.8452, x*0.9, y*0.9524, x*0.7857, y, x*0.5, y); // 왼쪽 집

    fill(20);
    quad(x*0.1714, y*0.8690, x*0.2, y*0.8333, x*0.2857, y*0.8810, x*0.2571, y*0.9167); // 창문

    // 지붕
    fill(30);
    triangle(x*0.0429, y, x*0.1286, y*0.5952, x*0.3143, y*0.7143);
    triangle(x*0.2857, y*0.7143, x*0.2429, y*0.5952, x*0.1429, y*0.6071);

    fill(20); // 창문2
    quad(x*0.2857, y*0.7619, x*0.3143, y*0.7619, x*0.3429, y*0.8810, x*0.3286, y*0.8810);

    fill(20); // 창문2
    quad(x*0.6, y*0.9048, x*0.6857, y*0.9286, x*0.6571, y*0.9762, x*0.5571, y*0.9524);

    fill(0);
    quad(x*0.3571, y*0.9048, x*0.4429, y*0.9167, x*0.4571, y, x*0.3571, y);

    fill(20); // 창문2
    quad(x*0.8286, y*0.9048, x*0.9286, y*0.9286, x*0.9429, y, x*0.7571, y);
    pop();
}

function middleHouseScene() {
    let x = width;
    let y = height;
    stroke(0);

    // 본체
    fill(60);
    quad(
        x * 0.171, y * 0.607,     // 120, 255
        x * 0.429, y * 0.583,     // 300, 245
        x * 0.675, y * 1.048,     // 472.5, 440.16
        x * 0.171, y * 1.048      // 120, 440.16
    );

    quad(
        x * 0.557, y * 0.69,      // 390, 290
        x * 0.674, y * 0.631,     // 472, 265
        x * 0.674, y * 1.048,     // 472, 440.16
        x * 0.5,   y * 1.048      // 350, 440.16
    );

    quad(
        x * 0.129, y * 1.0,       // 90, y
        x * 0.2,   y * 1.0,       // 140, y
        x * 0.243, y * 0.714,     // 170, 300
        x * 0.171, y * 0.714      // 120, 300
    );

    quad(
        x * 0.171, y * 0.714,     // 120, 300
        x * 0.243, y * 0.714,     // 170, 300
        x * 0.243, y * 0.595,     // 170, 250
        x * 0.171, y * 0.619      // 120, 260
    );

    // 지붕
    fill(30);
    triangle(
        x * 0.014, y * 0.643,     // 10, 270
        x * 0.286, y * 0.286,     // 200, 120
        x * 0.421, y * 0.583      // 295, 245
    );
    strokeWeight(3);

    // 뒤에 있는 그거
    fill(50);
    quad(
        x * 0.675, y * 0.786,     // 472.5, 330
        x * 0.875, y * 0.667,     // 612.5, 280
        x * 0.875, y * 1.0,       // 612.5, 420
        x * 0.675, y * 1.0        // 472.5, 420
    );

    stroke(20);

    // 왼쪽 창문
    quad(
        x * 0.27, y * 0.714,      // 189, 300
        x * 0.315, y * 0.69,      // 220.5, 290
        x * 0.315, y * 0.857,     // 220.5, 360
        x * 0.27, y * 0.857       // 189, 360
    );

    // 오른쪽 창문
    quad(
        x * 0.375, y * 0.714,     // 262.5, 300
        x * 0.42,  y * 0.69,      // 294, 290
        x * 0.42,  y * 0.857,     // 294, 360
        x * 0.375, y * 0.857      // 262.5, 360
    );

    // 맨 오른쪽 창문
    quad(
        x * 0.714, y * 0.857,     // 500, 360
        x * 0.775, y * 0.81,      // 542.5, 340
        x * 0.775, y * 0.905,     // 542.5, 380
        x * 0.715, y * 0.905      // 500.5, 380
    );

    // 오른 창문 지붕
    stroke(0);
    fill(30);
    triangle(
        x * 0.557, y * 0.69,      // 390, 290
        x * 0.714, y * 0.381,     // 500, 160
        x * 0.743, y * 0.595      // 520, 250
    );
    strokeWeight(3);

    fill(0);
    quad(
        x * 0.5,   y * 0.833,     // 350, 350
        x * 0.614, y * 0.714,     // 429.8, 299.88
        x * 0.614, y * 1.0,       // 429.8, 420
        x * 0.5,   y * 1.0        // 350, 420
    );
}

// -----------------불그림
function drawScene4Fire(x, y) {
    for (let i = 0; i < 5; i++) {
        let p = createScene4Particle(x, y);
        scene4Particles.push(p);
    }

    for (let i = scene4Particles.length - 1; i >= 0; i--) {
        updateScene4Particle(scene4Particles[i]);
        showScene4Particle(scene4Particles[i]);

        if (isScene4ParticleFinished(scene4Particles[i])) {
        scene4Particles.splice(i, 1);
        }
    }
}

function createScene4Particle(x, y) {
    let particle = {
        x: random(x * 0.674 , x * 0.5),
        y: y,
        vy: random(-5, -1),
        vx: random(-1, 1),
        alpha: 255,
        d: 16
    };

    return particle;
}

function updateScene4Particle(particle) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha -= 3;
    particle.d -= random(0.05, 0.1);
}

function showScene4Particle(particle) {
    push();
    noStroke();
    fill(random(200, 230), random(50, 150), 10, particle.alpha);
    ellipse(particle.x, particle.y, particle.d);
    pop();
}

function isScene4ParticleFinished(particle) {
    return particle.alpha < 0;
}