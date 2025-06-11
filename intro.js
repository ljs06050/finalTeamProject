function intro() {    
    background(30);
    fill(255);
    textSize(70);
    textAlign(CENTER, TOP);
    text("작은 불씨", width / 2, 40);

    textSize(20);
    textAlign(RIGHT, TOP);
    text("12조\n이준서(소스 코드 통합, 씬 5, 6 개발 및 디자인)\n이예찬(씬 3, 4 개발 및 디자인)\n쑤슌레이나인(씬 1, 2 개발 및 디자인)", width - 30, 120);

    textSize(22);
    textAlign(LEFT, TOP);
    text("▶ 엔터 키를 눌러서 다음 장면으로 넘어감\n\n" +
        "사용법\n\n" +
        "장면 1 - 스페이스바를 눌러보세요\n\n" +
        "장면 2 - \n\n" +
        "장면 3 - 손을 좌우로 움직여 보세요\n\n" +
        "장면 4 - 마우스를 눌러보세요\n\n" +
        "장면 5 - \n\n" +
        "장면 6 - 마우스 클릭 후 드래그로 올바른 일을 해보세요", 30, 180);

    if (keyIsPressed && keyCode === ENTER) {
        return 1;
    }

    return 0;
}
