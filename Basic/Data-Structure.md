# Data Structure - What is data structure?

structure는 '구조물'이라는 뜻으로 데이터 스트럭쳐는 데이터를 효율적으로 저장하고 꺼내기 쉽게 만드는 것을 의미한다. 

즉, data가 물건이라면 structure는 수납정리함과 같은 역할로 물건을 쉽게 찾아 사용할 수 있도록 정리정돈 하는 것이라고 할 수 있다.

<br>
<br>

## 1. Array

<br>

거의 모든 언어에 있는 '배열(Array)'은 대표적인 data structure라고 할 수 있다. 

배열은 여러 데이터를 하나의 이름으로 그룹핑해서 관리하기 위한 data structure이다.

<br>

```
student = []            // 배열 생성;
student[0] = 'Kate';    // 0: "Kate"
student[1] = 'Jane';    // 1: "Jane"
student[2] = 'Eva';     // 2: "Eva"
student[3] = 'Amy';     // 3: "Amy"

// value = Kate
// index = 0
// element = 0: "Kate"
```

<br>
<br>

## 2. Array List 

<br>

Array List는 배열을 이용해서 리스트를 구현한 것을 의미하는데, 

내부적으로 배열을 이용하기 때문에 인덱스를 이용해서 접근이 빠르게 이루어진다는 장점을 가지고 있다.

<br>

하지만 단점으로는 데이터의 추가와 삭제가 느리다. 그 이유는 Array 배열의 특성상 데이터를 리스트의 처음이나 중간에 저장하면 이후의 데이터들이 한칸씩 뒤로 물러나는 성질을 가지고 있기 때문이다. 

    ![2886](https://user-images.githubusercontent.com/67410919/113581465-22d0c200-9662-11eb-915d-527a62f783b1.png)

<br>
<br>

삭제도 마찬가지로 데이터가 삭제되어 빈자리가 생기면 그 빈자리를 채우기 위해 순차적으로 한칸씩 데이터들을 당겨서 채워주어야 하기 때문에 느려지게 된다.

    ![2887](https://user-images.githubusercontent.com/67410919/113581466-2401ef00-9662-11eb-8e76-c91582254c8c.png)