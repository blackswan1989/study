# 8. 웹 문서를 다루는 방법, 문서 객체 모델 (DOM)

## 08-1 문서 객체 모델이란?

### 1) 문서 객체 모델의 정의

문서 객체 모델은 Document Object Model을 줄여 DOM으로 표기한다.  
DOM은 웹 문서의 모든 요소를 자바스크립트를 이용하여 조작할 수 있도록 객체를 사용해 문서를 해석하는 방법이다.

```
document.querySelector("#detail h3").style.visibility = "hidden"
document.querySelector("#detail p").style.visibility = "hidden"
```

위처럼 콘솔에 작성하면 h3와 p의 내용이 사라지는것을 확인할 수 있다.  
html이나 css로 일일히 수정하고 제어하는 것보다 Javascript의 DOM을 이용해 제어하면 간편하다.

<br>

### 2) DOM트리 - 나무처럼 생긴 DOM구조

아래 그림에서 HTML노드는 Element Node이면서 다른 Element Node가 뻗어 나가기 시작하는 노드이기도 하다.  
이를 루트 노드(Root Node)라고 부른다. 그리고 특정 노드를 기준으로 위에 붙어 있는 노드를 부모노드,  
아래에 있는 노드는 자식 노드라고 부른다. 예를 들어 head 노드의 부모는 html노드이고 자식노드는 title노드 이다.

![html-dom-tree](https://user-images.githubusercontent.com/67410919/100819176-f5df8900-348e-11eb-86f8-dc3a46a15bbf.png)

DOM은 웹 문서의 요소를 부모 요소와 자식 요소로 구분한다.  
이 구조가 마치 나무를 거꾸로 뒤집어 놓은 것 같기 때문에 이것을 DOM트리(Tree)라고 부른다.  
DOM Tree는 가지와 노드(Node)로 표현한다. 노드는 네모박스의 웹 문서에 있는 요소나 속성을 나타내고,  
가지는 위 그림처럼 얇은 선을 가리키는 것으로 노드와 노드 사이의 연결 관계를 나타낸다.
DOM트리는 웹 문서의 HTML요소만 표현하지 않고 HTML의 요소가 품고있는 텍스트, 이미지도 자식으로 간주하여 DOM Tree에 표현한다.

- 웹 문서의 태그는 요소(Element) 노드로 표현한다.
- 태그가 품고 있는 텍스트는 해당 Element의 노드(태그) 자식 노드인 Text노드로 표현한다.
- 태그의 속성은 모두 해당 Element 노드(태그)의 자식 노드인 속성(Attribute)노드로 표현한다.
- 주석은 Comment(주석)노드로 표현한다.

<br>
<br>

## 08-2 DOM Element에 접근하기

### 1. DOM Element에 접근하는 여러가지 방법

- #### 1) DOM Element를 ID 선택자로 접근하는 합수 - getElementById()

  ID값은 하나만 존재할 수 있으므로 해당 ID값이 지정된 Element에 접근한다.

  ```
  > document.getElementById("heading")
  < <h1 id="heading">에디오피아 게뎁</h1>

  document.getElementById("heading").onclick = function() {
    this.style.fontSize = "5rem"
  }

  // 작성시 클릭하면 h1의 글자 크기가 5rem으로 커지는 것을 확인할 수 있다.
  ```

  <br>

- #### 2) DOM Element를 class 값으로 찾아내는 함수 - getElementsByClassName()

  getElementsByClassName()는 복수형인 함수명으로 알 수 있듯 2개 이상의 웹 Element에 접근한다.

  ```
  > document.getElementsByClassName("accent")
  < HTMLCollection(2) [span.accent, span.accent]

  // HTMLCollection을 펼쳐보면 인덱스 번호를 확인할 수 있다.
  < 0: span.accent
    1: span.accent
    length: 2
    __proto__: HTMLCollection


  // 접근한 DOM Element중 1개의 Element에만 접근하고 싶다면 아래처럼 배열 인덱스를 사용한다.
  > document.getElementsByClassName("accent")[0]
  < <span class="accent">게뎁농장</span>

  // 콘솔에 아래 코드 입력시 0번째 요소에 밑줄을 표시된 것을 확인할 수 있다.
  > document.getElementsByClassName("accent")[0].style.textDecoration = "underline"
  < "underline"
  ```

  <br>

- #### 3) DOM Element를 Tag이름으로 찾아내는 함수 - getElementsByTagName()

  id나 class 선택자가 없는 DOM Element에 접근할 때 사용한다. 이 함수의 이름도 복수형인 것처럼 여러 DOM Element를 모두 찾아 접근한다.

  ```
  > document.getElementsByTagName("h2")
  < HTMLCollection(2) [h2.bright, h2]

  // HTMLCollection을 펼쳐서 인덱스 번호 확인
  < 0: h2.bright
    1: h2
    length: 2
    __proto__: HTMLCollection


  // 콘솔에 아래 코드 입력시 0번째 요소의 배경색이 변경된 것을 확인할 수 있다.
  > document.getElementsByTagName("h2")[0].style.backgroundColor = "#eee"
  <  "#eee"
  ```

    <br>

- #### 4) DOM Element를 다양한 방법으로 찾아주는 함수 - querySelector(), querySelectorAll()

  두 함수는 id, class 값을 사용해도 되고 태그 이름을 사용해도 된다.  
  id 값 앞에는 #을 붙이고, class 값 앞에는 마침표(.)를 붙인다. 태그 이름은 기호 없이 태그 이름만 사용하면 된다.

  ```
  > document.querySelector("#heading") // ID Element 접근
  > document.querySelectorAll(".accent") // 같은 class이름을 가진 모든 Element 접근

  // 차이점은 HTMLCollection이 아닌 NodeList로 표기 된다.
  // NodeList는 여러 개의 노드를 모아 놓은 것으로 배열과 비슷하다고 생각하면 된다.
  < NodeList(2) [span.accent, span.accent]
  < 0: span.accent
  < 1: span.accent
  < length: 2
  < __proto__: NodeList

  ```

  <br>

### 2. getElementById()함수와 querySelector()의 차이점

getElementById() 함수들의 이름에서 Element가 들어가있는 것에서도 알 수 있듯이  
 이들 함수는 DOM의 노드 중에서 Element Node까지만 접근할 수 있다.  
 반면 querySelector() 함수들은 Element Node 뿐만 아니라 Text Node와 Attribute Node(속성노드)까지 접근 가능하다.  
 자바스크립트 프로그램에서 웹 요소 정도만 변경한다면 getElementById()함수들을 사용하면 되고,  
 웹 요소 뿐만 아니라 텍스트나 속성을 변경하거나 새로운 노드를 추가하고 싶으면 querySelector() 함수들을 사용하면 된다.

<br>
<br>

## 08-3 웹 Element의 태그 속성 가져와서 수정하기 p.241

### 1) HTML 태그 속성을 가져오거나 수정하는 함수 - getAttribute(), setAttribute()

선택한 상품 이미지를 특정 위치에 표시하는 프로그램 기능을 만들고자한다.  
다르게 말해 선택한 상품 이미지에 맞게 특정 위치의 이미지를 변경하기 위해 아래와 같은 순서로 진행한다.

- 첫번째로 작은 이미지의 src속성에 접근해서 값을 알아낸다.
- 두번째로 큰 이미지의 src속성에 접근해서 작은 이미지의 src 값으로 변경한다.
- 이미지 요소에 접근하는 것은 querySelector() 함수를 사용한다.
- 위 속성에 접근하려면 getAttribute() 함수를 사용하고, 접근한 속성의 값을 바꾸려면 setAttribute() 함수를 사용한다.

```
> document.querySelector("#prod-img > img").getAttribute("src")
< "images/coffee-pink.jpg" // 해당 이미지의 경로가 표시된다.

> document.querySelector("#prod-img > img").setAttribute("src", "images/coffee-blue.jpg")
< undefined // 해당 이미지가 coffee-pink.jpg 에서 coffee-blue.jpg 이미지로 변경되었다.

```

<br>

### 2) 선택한 이미지 표시하기 - 태그 속성을 사용해 상품 이미지 변경하기

```
* html *
<div id="prod-pic">
  <img
    src="images/coffee-pink.jpg"
    alt="에디오피아 게뎁"
    id="cup"
    width="200"
    height="200"
  />
  <div id="small-pic">
    <img src="images/coffee-pink.jpg" class="small" />
    <img src="images/coffee-blue.jpg" class="small" />
    <img src="images/coffee-gray.jpg" class="small" />
  </div>
</div>


* js *

const bigImg = document.querySelector("#cup");
const smallImg = document.querySelectorAll(".small");

smallImg[0].onclick = showBig;
smallImg[1].onclick = showBig;
smallImg[2].onclick = showBig;

function showBig() {
  let newImg = this.src; // click 이벤트가 발생한 대상의 src 속성 값 가져옴
  bigImg.setAttribute("src", newImg); // newImg 값을 큰 이미지의 src 속성에 할당
}


setAttribute()함수를 사용하지 않고도 아래처럼 작성하여 속성 사용이 가능하다.

for(i=0; i<smallImg.length; i++) {
  smallImg[i].onclick = function(event) {
    bigImg.src = this.src;
  }
}

```

<br>
<br>

## 08-4 DOM에서 이벤트 처리하기 p.248

### 1) addEventListener() 함수 사용하기

```
* html *

<div id="container">
  <img id="pic" src="images/girl.png" alt="">
</div>


* js*

let pic = document.querySelector("#pic");

function changePic() {
  pic.src = "images/boy.png";
}

function originPic() {
  pic.src = "images/girl.png";
}

function drawBorder() {
  pic.style.border = "2px dotted #666";
}

pic.addEventListener("mouseover", changePic);
pic.addEventListener("mouseout", originPic);
pic.addEventListener("click", drawBorder);

// 웹 문서 어디를 누르던지 "안녕?"이라는 알림창이 뜨도록 소스 추가
document.addEventListener("click", function () {
  alert("안녕?");
});

```

<br>
<br>

## 08-5 웹 요소의 스타일 가져와서 수정하기 p.252

### 1) DOM으로 CSS 속성에 접근하고 수정하기

```
* html & css *

<!DOCTYPE html>
<head>
  <style>
  #container {
    width:600px;
    margin:50px auto;
    text-align: center;
  }
  #rect {
    width:100px;
    height:100px;
    border:1px solid #222;
    margin:30px auto;
    transition: 1s;
  }
  </style>
</head>
  <body>
    <div id="container">
      <p>도형 위로 마우스 포인터를 올려놓으세요.</p>
      <div id="rect"></div>
    </div>
  </body>
</html>


*js*

var myRect = document.querySelector("#rect");

myRect.addEventListener("mouseover", function () {
  // mouseover 이벤트 처리
  myRect.style.backgroundColor = "green"; // myRect 요소의 배경색
  myRect.style.borderRadius = "50%"; // myRect 요소의 테두리 둥글게 처리
});

myRect.addEventListener("mouseout", function () {
  // mouseout 이벤트 처리
  myRect.style.backgroundColor = ""; // myRect 요소의 배경색 지우기
  myRect.style.borderRadius = ""; // myRect 요소의 테두리 둥글게 처리 안 함
});

```

<br>

### 2) Click Event로 상세 설명 보기/닫기 설명 링크 만들기

```
* html *

<div id="detail">
  <h2>상품 상세 정보</h2>
  <ul>
    <li>원산지 : 에디오피아</li>
    <li>지 역 : 이르가체프 코체레</li>
    <li>농 장 : 게뎁</li>
    <li>고 도 : 1,950 ~ 2,000 m</li>
    <li>품 종 : 지역 토착종</li>
    <li>가공법 : 워시드</li>
  </ul>
  <h3>Information</h3>
  <p>
    2차 세계대전 이후 설립된 게뎁 농장은 유기농 인증 농장으로 여성의 고용
    창출과 지역사회 발전에 기여하며 3대째 이어져 내려오는 오랜 역사를 가진
    농장입니다. 게뎁 농장은 SCAA 인증을 받은 커피 품질관리 실험실을 갖추고
    있어 철처한 관리를 통해 스페셜티 커피를 생산합니다.
  </p>
  <h3>Flavor Note</h3>
  <p>은은하고 다채로운 꽃향, 망고, 다크 체리, 달달함이 입안 가득.</p>
</div>


* js *

  const viewBtn = document.querySelector("#view");
  const showDetail = document.querySelector("#detail");
  let isOpen = false;

  viewBtn.addEventListener("click", function () {
    if (isOpen == false) {
      // 상세 정보가 감춰져 있을 때 실행할 소스
      viewBtn.innerText = "상세 설명 닫기";
      showDetail.style.display = "block";
      isOpen = true;
    } else {
      // 상세 정보가 표시되어 있을 때 실행할 소스
      viewBtn.innerText = "상세 설명 보기";
      showDetail.style.display = "none";
      isOpen = false;
    }
  });

```

- #detail 요소가 현재 화면에 표시된 상태인지 아니면 감춰진 상태인지를 저장할 새로운 변수 isOpen을 선언한다.
- 이 변수값은 '표시 상태'이거나 '감춰진 상태' 두가지 값만 존재하므로 논리형으로 만들어준다.
- #detail 엘리먼트는 감춰진 상태임으로 초기값을 false로 지정하여 변수를 선언하였다.
- #view 엘리먼트를 클릭했을때 isOpen 변수값을 체크하도록 if문으로 작성한다.
- 그리고 ifOpen == false값 안에 isOpen = true;을 마지막으로 작성해주어 else{...}부분을 실행하도록 해준다.
- else{...}값에서는 마지막에 isOpen = false;를 추가하여 다시 ifOpen == false 값의 내용이 실행되도록 해준다.
- 그리하여 클릭할때마다 상세설명을 보고 닫을 수 있는 동작이 가능해진다.

<br>
<br>

## 08-6 DOM에 요소 추가하기 p.262

### 1) DOM에 새로운 노드를 추가하는 방법

새로운 노드를 만들거나 부모 노드에 연결할 때는 다음 함수들을 사용한다.

- createElement() : 새로운 Element Node를 만든다.
- createTextNode() : 텍스트 내용이 있는 경우 텍스트 Node를 만든다.
- appendChild() : 텍스트 노드를 Element Node의 자식 노드로 추가한다.
- createAttribute() : Element에 속성이 있을 경우 속성 노드를 만든다.
- setAttributeNode() : 속성 노드를 Element Node에 연결한다.
- appendChild() : 새로 만든 Element Node를 부모 노드에 추가한다.

<br>

### 2) 웹 문서에 새로운 노드 추가하기

1.  Element Node 만들기 - createElement()

    - createElement()의 괄호 안에 요소에 해당하는 Element Node를 적는다.
    - <p>태그에 해당하는 Element Node를 만든다면 새로운 p 엘리멘트를 만들고 newP변수에 저장해준다.
    - const newP = document.createElement('p')
      <br>
      <br>

2.  Text node 만들기 - createTextNode()

    - 새로운 엘리먼트 노드를 만들었다면 그 엘리먼트에서 표시할 내용을 텍스트 노드로 만든다.
    - const newText = document.createTextNode('주문이 완료되었습니다.')
      <br>
      <br>

3.  자식 노드로 추가하기 - appendChild() 함수

    - 위의 상태는 노드가 만들어지기만 하고 아직 부모노드와 자식노드로 연결되지 않은 상태이다.
    - 따라서 appendChild()함수를 사용하여 서로 연결해준다.
    - 자식 노드가 여럿일 경우 appendChild()함수를 사용해서 연결하는 노드는 자식 노드 중 맨 끝에 추가된다.
    - newText노드를 newP노드의 자식 노드로 추가
    - newP.appendChild(newText)
    - 새로 만든 newP노드를 body태그 안에 추가해야하므로 body노드의 자식 노드로 추가
    - document.body.appendChild(newP)<br><br>

    ```
    > const newP = document.createElement('p')
    > const newText = document.createTextNode('주문이 완료되었습니다.')
    > newP.appendChild(newText)
    > document.body.appendChild(newP)

    < Elements의 body태그 안에 추가한 p태그가 삽입되고 화면에 "주문이 완료되었습니다."라는 문구가 보여지게 된다.
    ```

    <br>

4.  속성 노드 만들기 - createAttribute() 함수

    위 과정에서 추가한 p태그에 class="accent" 속성을 추가하고자 createAttribute() 함수를 사용하여 괄호 안에 추가할 속성 이름을 지정한다.

    ```
    > let attribute = document.createAttribute("class")
    > attribute.value = "accent"
    < "accent"
    ```

5.  속성 노드 연결하기 - setAttributeNode() 함수

    위 과정에서 선언한 attribute 변수명을 가진 속성 노드를 p노드에 연결하려면 setAttributeNode() 함수를 사용한다.

    ```
    > newP.setAttributeNode(attribute)
    < null // Elements를 확인해보면 p태그에 "accent"라는 클래스명이 추가되었다.
    ```

    <br>

    > 위 방법 이외에도 setAttribute() 함수를 사용할 수 있다.
    >
    > 앞에서는 먼저 createAttribute() 함수로 속성 노드를 만들고 "accent"값을 넣은 뒤 setAttribute()함수를 사용해 p노드에 연결했다. 하지만 이렇게 텍스트 노드를 만들어 웹 문서에 추가해 놓은 경우 아래 소스처럼 setAttribute() 함수를 사용해서 더 간단히 속성을 추가할 수 있다.
    >
    > ```
    > const newP = document.createElement('p')
    > const newText = document.createTextNode('주문이 완료되었습니다.')
    > newP.appendChild(newText)
    > "주문이 완료되었습니다."
    >
    > document.body.appendChild(newP)
    > <p>주문이 완료되었습니다.</p>
    >
    > newP.setAttribute("class", "accent")
    > <p class="accent">주문이 완료되었습니다.</p>
    >
    > // 연습) 추가로 id속성(#doit_js)도 p노드에 추가
    > const addId = document.createAttribute("id")
    > addId.value = "doit_js"
    > "doit_js"
    >
    > newP.setAttributeNode(addId)
    > <p class="accent" id="doit_js">주문이 완료되었습니다.</p>
    > ```

<br>
<br>

## 08-6 추가한 노드 순서 바꾸거나 삭제하기(p. 275 )

### 1) 여러 노드를 한 번에 저장하는 NodeList

```
*html 예제*

<div id="container">
    <h1>참석자 명단</h1>
    <div id="nameList">
      <p>홍길동 <span class="del">X</span></p>
      <p>백두산 <span class="del">X</span></p>
      <p>도레미 <span class="del">X</span></p>
    </div>
</div>


* console box *

> document.querySelectorAll("p")
< NodeList(3) [p, p, p]
  0: p
  1: p
  2: p
  length: 3
  __proto__: NodeList

> document.querySelectorAll("p")[0]
< <p>
    "홍길동"
    <span class="del">X</span>
  </p>
```

querySelectorAll() 함수를 사용해서 여러 개의 노드를 한 번에 가져오면 3개의 p노드가 한꺼번에 저장되는데,  
이것을 'NodeList'라고 한다. 배열 형식에 여러 값을 저장하듯 여러 노드가 하나의 변수에 저장된 것을 가리킨다.

콘솔 박스에서 해당 html을 확인해보면 3개의 p노드가 배열 형식처럼 들어가있디.  
그리고 인덱스와 함께 값이 저장되고 length 속성을 사용해 몇 개의 노드가 저장되었는지 표시된다.  
배열은 아니지만 배열과 아주 비슷한 형태임을 알 수 있다.

NodeList에서 특정 위치의 노드에 접근할 때는 인덱스를 사용한다.  
예를 들어 p노드를 저장한 NodeList중에 첫번째 노드를 가져오고 싶다면 위의 소스처럼  
document.querySelectorAll("p")[0]에서 "[0]"을 추가로 입력하면 첫번째 노드가 출력된다.

<br>

### 2) DOM TREE를 활용해 원하는 노드 다루기

- 자식노드 확인하기 - hasChildNodes()함수

  hasChildNodes()함수는 특정 노드에 자식 노드가 있는지를 확인한다.  
  자식노드가 있다면 true를 반환하고, 그렇지 않다면 false를 반환한다.

  ```
  > document.querySelectorAll("p")[0].hasChildNodes()
  < true
  ```

  결과가 true로 출력되었다는 것은 첫 번째 p노드에는 자식 노드가 있다는 것을 의미한다.

<br>

- 자식노드에 접근하기 - childNodes 속성

  자식노드가 존재하면 childNodes 속성을 사용해 현재 노드의 자식 노드에 접근할 수 있다.  
  이때 element node 뿐만 아니라 태그와 태그 사이의 줄 바꿈도 빈 텍스트 노드인 자식 노드로 인식한다.

  ```
  *html 예제*

  <div id="container">
      <h1>참석자 명단</h1>
      <div id="nameList">
        <p>홍길동 <span class="del">X</span></p>
        <p>백두산 <span class="del">X</span></p>
        <p>도레미 <span class="del">X</span></p>
      </div>
  </div>

  > document.querySelector("#nameList").childNodes
  < NodeList(7) [text, p, text, p, text, p, text]
    0: text
    1: p
    2: text
    3: p
    4: text
    5: p
    6: text
    length: 7
    __proto__: NodeList
  ```

  #nameList element의 자식 노드가 표시되는데 모두 7개의 노드가 있다. 이것은 div태그 다음의 줄 바꿈,  
  p 태그 사이의 줄 바꿈, 그리고 </div>태그 앞의 줄 바꿈을 빈 텍스트 노드로 인식하기 때문이다.

<br>

- element에만 접근하려면 - children 속성을 사용

  만약 자식 노드 중에서 텍스트 노드와 주석 노드는 필요하지 않고 element노드에만 접근한다면 children속성을 사용하면 된다.

  ```
  > document.querySelector("#nameList").children
  < HTMLCollection(3) [p, p, p]
    0: p
    1: p
    2: p
    length: 3
    __proto__: HTMLCollection
  ```

<br>

- 원하는 위치에 노드 삽입하기 - insertBefore() 함수

  자식 노드를 추가하는 appendChild() 함수는 부모 노드에 자식 노드가 있을 경우 마지막 자식 노드로 추가된다.  
  하지만 insertBefore() 함수를 사용하면 부모 노드에 자식 노드를 추가할 때 기준이 되는 노드를 지정하고 그 앞에 자식 노드를 추가할 수 있다.

  insertBefore() 함수에서는 2개의 인수를 사용하는데  
  첫 번째 인수는 추가하는 노드, 두 번째 인수는 기준이 되는 노드이다.

  ```
  > nameList.insertBefore(nameList.children[2], nameList.children[0])
  < <p>도레미 <span class="del">X</span></p>

  // 출력화면과 Elements에서 확인해보면 0번째 노드'홍길동'과 2번째 노드인 '도레미'의 위치가 바뀐것을 확인할 수 있다.
  < <p>도레미 <span class="del">X</span></p>
    <p>백두산 <span class="del">X</span></p>
    <p>홍길동 <span class="del">X</span></p>
  ```

<br>

- 특정 노드 삭제하기 - removeChild()함수와 parentNode 속성

  DOM TREE에 있는 노드를 삭제할 때 removeChild()함수를 사용한다.  
  함수 이름에서 알 수 있듯이 부모 노드에서 자식 노드를 삭제하는 함수이고, 괄호 안에는 삭제하려는 자식 노드가 들어간다.

  노드는 스스로 자식을 삭제할 수 없기 때문에 부모 노드에 접근한 후 부모 노드에서 삭제해야 한다.  
  그래서 특정 노드를 삭제하려면 그 노드의 부모 노드를 먼저 찾아야 한다.  
  그 정보를 가지고 있는 속성이 parentNode 속성이다. parentNode 속성은 현재 노드의 부모 element노드를 반환한다.

  ```
  *html 예제*

  <div id="container">
    <h1>참석자 명단</h1>
    <div id="nameList">
      <p>홍길동 <span class="del">X</span></p>
      <p>백두산 <span class="del">X</span></p>
      <p>도레미 <span class="del">X</span></p>
    </div>
  </div>


  // del클래스를 가진 첫번째 노드의 부모노드는 p태그 홍길동임을 알 수 있다.
  > document.querySelectorAll(".del")[0].parentNode
  < <p>홍길동 <span class="del">X</span></p>

  // 첫번째 p태그 홍길동의 부모노드는 #nameList임을 알 수 있다.
  > document.querySelectorAll("p")[0].parentNode
  <  <div id="nameList">...</div>

  // 따라서 del클래스를 가진 첫 번째 element를 삭제하려면 첫 번째의 p element에서 removeChild()함수를 실행해야한다.
  > const firstDel = document.querySelectorAll(".del")[0] // 첫 번째 del클래스를 가진 span 선언
  > const firstP = document.querySelectorAll("p")[0] // 첫 번째 p element 선언
  > firstP.removeChild(firstDel) // firstP에 있는 firstDel 삭제
  < <span class="del">X</span> // 삭제된 노드 반환
  ```
