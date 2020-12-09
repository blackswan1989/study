# Form Tag

## 1. form tag의 주요 속성

1. action : 데이터의 전송 대상 페이지 지정
2. method : 데이터의전송 방법을 지정 (get or post)
3. name : 입력 양식의 이름 지정

<br>

## 2. 종류

### &nbsp; 1. Input Tag

- text : 기본값 (텍스트)
- search : 검색 전용 텍스트
- email : 메일주소
- tel : 전화번호
- url : 웹사이트 url 주소

<br>

### &nbsp; 2. Input type="radio"

- 여러 선택지 중 한가지만 선택하게 만들고자할 때 사용.
- name : 라디오 버튼의 이름
- value : 전송될 선택지의 값
- checked : 처음부터 선택0되어있도록 지정

```
  <form action="example.php" method="post" name="contact-form">
    Radio : <input type="radio" name="gender" value="Man" checked />
    Radio : <input type="radio" name="gender" value="Woman" />
    Radio : <input type="radio" name="gender" value="Etc" />
  </form>
```

여러 개의 선택지가 있는 라디오 버튼은 항목들의 name 속성을 일치시켜 하나의 그룹으로 만들 수 있다. 이렇게 그룹으로 만들면 그 중에서 1개만 선택할 수 있게 된다. checked 속성은 많이 사용되는 항목 또는 선택했으면 하는 항목에 넣어두면 좋다.

<br>

### &nbsp; 3. Input type="checkbox"

- 체크박스는 라디오버튼과는 다르게 여러개의 항목을 선택하도록 하는 용도로 사용된다.
- 라디오 버튼과 마찬가지로 name 속성을 일치시켜 그룹으로 만들 수 있다.
- name : 체크박스의 이름
- value : 전송될 선택지의 값
- checked : 처음부터 선택되어있도록 지정

<br>

### &nbsp; 4. Input type="submit"

- 입력 양식에 입력한 내용을 전송하는 요소
- name : 버튼의 이름
- value : 버튼에 출력되는 글자
- 전송버튼에 이미지를 사용하고 싶다면 type 속성을 image로 적용하고, 이미지 파일을 지정해준다. (input type="image" src="images/button.png" alt="전송")

<br>

### &nbsp; 5. 선택 박스를 만드는 select Tag, option Tag

- 선택 박스를 클릭하면 선택지가 출력되는 요소.
- select 태그의 주요 속성
  - name : 버튼의 이름
  - multiple : shift 또는 ctrl 키로 여러 항목을 선택할 수 있게 된다.
- option 태그의 주요 속성
  - value : 전송될 선택지의 값
  - selected : 처음부터 항목이 선택되어 있도록 지정

```
    <select name="bloodtype">
      <option value="A">A</option>
      <option value="B" selected>B</option>
      <option value="O">O</option>
      <option value="AB">AB</option>
    </select>
```

<br>

### &nbsp; 6. 여러 줄의 텍스트 입력란을 만드는 textarea Tag

- 여러 줄의 텍스트를 입력할 수 있는 요소를 만들 수 있다. 주로 문의 내용이나 메세지 등을 입력할 때 많이 사용된다.
- placeholder 속성을 지정할 수 있다.
- ex) <br><textarea name="massage" placeholder="메세지를 입력하세요"></textarea>

<br>

### &nbsp; 7. 사용하기 쉬운 입력 양식의 레이블을 만드는 label Tag

> label 태그를 사용하면 입력 양식 부분과 레이블이 연결되어 레이블을 선택했을 때 입력 양식 부분에 초점이 맞춰진다. 사용자에 따라서 작은 라디오 버튼이나 체크박스를 클릭하는 것이 힘들 수 있으므로 보다 사용하기 쉬운 입력 양식을 만들려면 label 태그를 사용하는 것이 좋다. <br><br>
> 사용법은 label 태그로 레이블 텍스트 부분을 감싸고 for 속성을 지정한다. 이때 연결하고 싶은 입력 양식에 id 속성을 줘야 한다.

```
    <input type="checkbox" name="travel" value="국내" id="korea" />
    <label for="korea">국내</label>
    <input type="checkbox" name="travel" value="유럽" id="eu" />
    <label for="eu">유럽</label>
    <input type="checkbox" name="travel" value="미국" id="us" />
    <label for="us">미국</label>
    <input type="checkbox" name="travel" value="동남아시아" id="asia" />
    <label for="asia">동남아시아</label>
```

> 아무것도 설정하지 않으면 체크 박스만 클릭할 수 있지만, 위 처럼 레이블 태그를 사용해서 연결하면 텍스트 부분을 클릭해서 체크 박스를 선택할 수 있어 사용자에게 편리해진다.
