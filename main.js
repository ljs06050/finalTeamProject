// 씬 넘기기 위한 상수
const INTRO = 0;
const SCENE1 = 1;
const SCENE2 = 2;
const SCENE3 = 3;
const SCENE4 = 4;
const SCENE5 = 5;
const SCENE6 = 6;
const WHATIF = 7;
const FINALSCENE = 8;
const ENDINGCREDIT = 9;

let sceneNum = INTRO; // 씬 번호 변수
let sceneStartTime; // 씬 시작 시간 변수
let isDragging = false; // 씬 6의 담배 드래그하는 중인지
let grassBg; // 씬 1, 2, 6의 잔디 배경

function preload() { // ml5.js handPose 불러오기
    handPose = ml5.handPose();
}

function setup() {
    createCanvas(windowWidth, windowHeight); // 창 크기로 캔버스 생성
    grassBg = createGraphics(width, height); // 잔디 배경 쓸 변수
    Grass(grassBg); // 잔디 배경 만들기

    //scene1, 2에 나오는 담배 위치 변수
    cigX = width / 2;
    cigY = 0;

    //웹캠 관련
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.hide();
    handPose.detectStart(video, gotHands);

    //쓰레기통 관련 변수
    trashW = width / 10;
    trashH = height / 3;
    trashX = 3 * width / 4;
    trashY = height / 2;

    //scene6 담배 관련 변수
    scene6CigX = width / 2;
    scene6CigY = height / 2;

    //씬 시작 시간 초기화
    sceneStartTime = millis();
}

function draw() {
    switch (sceneNum) {
        case INTRO:
            if (intro()) {
                sceneNum = SCENE1;
            }
            break;
        case SCENE1:
            if (scene1() > 2000) {
                sceneStartTime = millis();
                sceneNum = SCENE2;
            }
            break;
        case SCENE2:
            if (scene2(sceneStartTime) > 5000) {
                sceneStartTime = millis();
                sceneNum = SCENE3;
            }
            break;
        case SCENE3:
            if (scene3(sceneStartTime)) {
                sceneNum = SCENE4;
            }
            break;
        case SCENE4:
            if (scene4() > 12000) {
                sceneStartTime = millis();
                sceneNum = SCENE5;
            }
            break;
        case SCENE5:
            if (scene5(sceneStartTime) > 10000) {
                sceneStartTime = millis();
                sceneNum = WHATIF;
            }
            break;
        case WHATIF:
            if (whatIf(sceneStartTime) > 3000) {
                sceneNum = SCENE6;
            }
            break;
        case SCENE6:
            if (scene6()) {
                sceneStartTime = millis();
                sceneNum = FINALSCENE;
            }
            break;
        case FINALSCENE:
            if(finalscene(sceneStartTime) > 6000) {
                sceneNum = ENDINGCREDIT;
            }
            break;
        case ENDINGCREDIT:
            endingCredit();
            break;
    }
}

// 마우스 클릭 이벤트 처리
function mousePressed() {
    if (sceneNum == SCENE4) {
        scene4MousePressed();
    }
    else if (sceneNum == SCENE6) {
        scene6MousePressed();
    }
}