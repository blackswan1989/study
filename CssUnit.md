# CSS의 상대 단위

### 1. % (Percent)

부모 요소를 기준으로 할 때의 비율 단위로 부모 요소의 너비가 600px이고, 자식 요소에 50%를 지정했다면 자식요소의 너비는 300px이 된다. 폰트 크기에 지정하면 부모 요소의 폰트 크기가 16px일때 16px = 100%가 된다.

<br>

### 2. em

부모 요소의 크기를 기준으로 하는 단위로 부모요소의 폰트 크기가 16px이라면 16px = 1em이 된다. (2em = 32px)

<br>

### 3. rem

html 태그(루트 요소)의 크기를 기준으로 하는 단위로 html 요소의 폰트 크기가 16px이라면 16px = 1rem이 된다.

<br>

### 4. vw

"viewport width"의 약자로 뷰포트의 너비를 기준으로 하는 비율 단위이다. 뷰포트는 브라우저를 볼 때의 출력 영역을 의미하는데 뷰포트의 너비가 1200px이라면 50vw는 1200px의 절반인 600px이 된다. 출력 영역의 너비에 따라 변하므로 여러 가지 크기의 장치에 크기를 적절하게 대응할 때 좋다.

<br>

### 5. vh

"viewport height"의 약자로 뷰포트의 높이를 기준으로 하는 비율 단위이다. 뷰포트의 높이가 800px이라면 50vh는 800px의 절반인 400px가 된다.

<br>

# List(ul, ol) 장식

### 1. list-style-type 속성

```
ul {
	list-style-type: square; // 검은색 사각형으로 지정
}

ol{
	list-style-type: hangul; // 한글로 지정
}
```

### 2. list-style-position 속성

```
ul {
	list-style-position: outside; // 박스 바깥쪽에 마커 위치
}

ol{
	list-style-position: inside; //  박스 안쪽에 마커 위치
}
```

### 3. list-style-image 속성

```
ul {
	list-style-image: url(images/star.png); // 이미지파일로 마커 디자인
}

```
