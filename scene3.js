let handPose;
let video;
let hands = [];
let sum = 0;

let x;
let y;

let tm1 = 4000;
let tm2 = 8000;
let tm3 = 11000;
let tm4 = 15000;

let scene3Particles = [];
let scene3ElapsedTime;

//scene 3과 scene 4의 그림에서 x와 y좌표는 모두 AI가 기존 배율을 맞춰서 확대한 것이기 때문에 AI썼다고 볼수있다.
function handstrack() {
    sum = 0;
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
        let keypoint = hand.keypoints[j];
        sum += keypoint.x;
        }
    }
}

function scene3(startTime) {
    background(0);
    scene3ElapsedTime = millis() - startTime;
    
    handstrack();
    
    if (scene3ElapsedTime <= tm4) {
        if (scene3ElapsedTime < tm1) {
            background(255);
        }
        else if (scene3ElapsedTime >= tm1 && scene3ElapsedTime < tm2) {
            background(130);
        }
        else if (scene3ElapsedTime >= tm2 && scene3ElapsedTime < tm3) {
            background(100);
        }
        else if (scene3ElapsedTime >= tm3 && scene3ElapsedTime < tm4) {
            background(60);
        }
        drawScene3Mountains(width, height);
        drawScene3Fire(width, height);
    }
    else {
        return 1;
    }
}

function gotHands(results) {
    hands = results;
}

function drawScene3Mountains(x, y) { 
    push();
    noStroke();
    fill(11, 100, 15);
    triangle(x * -0.1, y, x * 0.48, y * 0.2, x * 0.5, y);
    fill(11, 111, 16);
    triangle(x / 10, y, x / 2, y / 10, x - (x / 10), y);
    fill(9, 133, 15);
    triangle(x / 10 - (x / 14), y, x / 3, y / 2.5, x * (5 / 6), y);
    triangle(x / 2, y, x / 1.4, y / 3, x + (x / 10), y);

    strokeWeight(15);
    stroke(138, 106, 65);
    line(x / 2.5, y / 1.1, x / 1.7, y);
    stroke(149, 113, 70);
    line(x / 2.3, y / 1.2, x / 2.5, y / 1.1);
    stroke(156, 116, 72);
    line(x / 2.7, y / 1.4, x / 2.3, y / 1.2);
    line(x / (2.3), y / 1.8, x / 2.7, y / 1.4);
    pop();
}

//원래 class 구조로 적혀있었지만 배우지 않은 내용은 활용하기 어려웠기에 AI에게 함수구조로 바꿔달라고 요청함
function drawScene3Fire(x, y) {
    for (let i = 0; i < 5; i++) {
        let p = createScene3Particle(x, y);
        scene3Particles.push(p);
    }

    for (let i = scene3Particles.length - 1; i >= 0; i--) {
        updateScene3Particle(scene3Particles[i]);
        showScene3Particle(scene3Particles[i]);

        if (isParticleFinished(scene3Particles[i])) {
        scene3Particles.splice(i, 1);
        }
    }
}

function createScene3Particle(x, y) {
    push();
    handstrack();
    let particle = {
        x: random(x / 2.67, x / 2.75),
        y: y / 1.415,
        vy: random(-5, -1),
        alpha: 255,
        d: 16
    };
    if (sum > width / 2) {
        particle.vx = random(-3, 0);
    } 
    else if (sum < width / 2) {
        particle.vx = random(0, 3);
    } 
    else {
        particle.vx = random(-1, 1);
    }

    if (scene3ElapsedTime < tm1) {
        particle.vy = random(-2, -1);
        particle.d = 8;
    } 
    else if (scene3ElapsedTime >= tm1 && scene3ElapsedTime < tm2) {
        particle.vy = random(-2.5, -1);
        particle.d = 10;
    } 
    else if (scene3ElapsedTime >= tm2 && scene3ElapsedTime < tm3) {
        particle.vy = random(-5, -1);
        particle.d = 16;
    }

    if (scene3ElapsedTime >= tm3 && scene3ElapsedTime < tm4) {
        particle.x = random(x / 3.4, x / 2.75);
        particle.y = random(y / 1.415, y / 1.57);
    }
    pop();
    return particle;
}

function updateScene3Particle(particle) {
    push();
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha -= 3;
    particle.d -= random(0.05, 0.1);
    pop();
    }

function showScene3Particle(particle) {
    push();
    noStroke();
    if (scene3ElapsedTime < tm1) {
        fill(random(115, 136), random(126, 130), 118, particle.alpha);
    } 
    else if (scene3ElapsedTime >= tm1 && scene3ElapsedTime < tm2) {
        fill(random(199, 201), random(107, 158), random(55, 80), particle.alpha);
    } 
    else if (scene3ElapsedTime >= tm2 && scene3ElapsedTime < tm4) {
        fill(random(200, 230), random(50, 150), 10, particle.alpha);
    }

    ellipse(particle.x, particle.y, particle.d);
    pop();
}

function isParticleFinished(particle) {
    return particle.alpha < 0;
}