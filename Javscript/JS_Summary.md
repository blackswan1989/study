<br>

## ES5와 ES6의 차이점

<br>

ES6 에서는 ES5 이하 명세에서 문제가 되었던 부분들이 해결되었고 많은 기능들이 추가되었다. 이는 가독성과 유지보수성 향상으로 이어졌고 React, Vue 등 유명 라이브러리들도 이에 맞춰 개발 환경을 ES6로 바꾸게 되었다.

<br>

1. const 변수(상수 변수) : 블록-스코프 변수 지원, 불변 변수(immutable variable)
   
2. let 변수 : 기존의 함수-스코프였던 변수와 다르게 hoisting없는 블록-스코프 변수 지원, 재선언 불가
   
3. Block-Scoped 함수 : 블록-스코프 함수 정의 방식 개선
   
	```
	// ES6
	{
		function foo () { return 1 }
		console.log(foo()) // 1
		{
			function foo() { return 2 }
			console.log(foo()) // 2
		}
		console.log(foo()) // 1
	}

	// ES5
	(function () {
		var foo = function () { return 1;}
		foo() === 1;
		(function () {
				var foo = function () { return 2; }
				foo() === 2;
		})();
		foo() === 1;
	})();
	```

4. Arrow Function : function과 return을 묶어 화살표 함수로 변형 가능.
   
5. 디폴트 파라미터 : 타 언어에서 사용 할 수 있었던 디폴트 파라미터가 지원.

	```
	// ES6
	function foo (x, y=2, z=3) {
		return x + y + z
	}

	foo(1) // 6

	// ES5
	function foo (x, y, z) {
		if(y === undefined)
				y = 2;
		if(z === undefined)
				z = 3;
		return x + y + z;
	};

	foo(1); // 6
	```

6. Rest Parameter : Spread 연산자를 사용하여 함수의 파라미터를 작성한 형태로 함수의 파라미터로 오는 값들을 "배열"로 전달받을 수 있다.

	```
	function foo(...rest) {
		console.log(Array.isArray(rest));         // true
		console.log(rest);                        // [ 1, 2, 3, 4, 5 ]
	}

	foo(1, 2, 3, 4, 5);
	```

7. Spread Operator (전개연산자) : 2개 이상의 인수나 2개이상의 요소 또는 2개이상의 변수가 해당되는 곳에 확장 될 수 있도록 한다.

	```
	function myFunc(x, y, z){}
	// ES6
	let params = [ "Foo", true, 2 ]
	let others = [ 1, 2, ...params ]            // [ 1, 2, "Foo", true, 2 ]
	let str = "Bar"
	let chars = [ ...str ]                      // [ "B", "a", "r"]
	myFunc(1, 2, ...params);

	// ES5
	var params = [ "Foo", true, 2 ];
	var others = [ 1, 2 ].concat(params);       // [ 1, 2, "Foo", true, 2 ]
	var str = "Bar";
	var chars = str.split("");                  // [ "B", "a", "r"]
	myFunc.apply(null, [1, 2].concat(params));
	```

8. Template Literals : 문자열 다중 행 처리와 보간문자 처리를 할 수 있다.

	```
	let user = { name : "Foo" }
	let info = { id: "STAR", email: "Foo@example.com"}
	let userInfo = `Hello ${user.name}. Your ID is ${info.id} and email is ${info.email}.`
	// "Hello Foo. Your ID is STAR and email is Foo@example.com."

9. Enhanced Object Properties : 공통 객체 속성 정의를 간결하게 할 수 있다.

	```
	// ES6
	let x = 0, y = 0
	obj = {x, y}           //{x: 0, y: 0}

	// ES5
	var x = 0, y = 0;
	obj = {x: x , y: y};   //{x: 0, y: 0}
	```

10. Class Definition : 클래스를 지원(이외에도 상속, 오버로딩, 정적 클래스멤버, Getter/Setter를 지원)한다.

	```
	class Car {
    constuctor (id, x ,y) {
      this.id = id
      this.move(x,y)
    }
    move (x, y) {
      this.x = x
      this.y = y
    }
	}

	// ES5
	var Car = function (id, x ,y) {
		this.id = id;
		this.move(x, y);
	};
	Car.prototype.move = function (x, y) {
		this.x = x;
		this.y = y;
	}
	```

11. Promise : 비동기 처리 이후 동작을 순차적 또는 병렬로 진행하기 위해 사용하는 클래스. 가독성이 좋으며 중첩된 콜백의 단점을 완화.

	```
	let _promise = () => {
		return new Promise((resolve,reject) => {
				if(success) {
					resolve(value)       // success
			} else {
				reject(reason)         // fail
			}
		})
	}
	_promise().then((res) => {
		//success일때 처리
		console.log(res)
	},
	(err) => {
		//reject 일때 처리
		console.error(err)
	})
	_promise().then(...).catch((err) => {
		console.error(err)
	})
	```

12. Export & Import : 값을 `export`, `import`로 모듈에 가져오거나 모듈로 내보낼 수 있다.

	```
	// lib/math.js
	export function sum (x ,y) { return x + y }
	export var pi = 3.141592

	// Foo.js
	import * as math from "lib/math"
	console.log("2pi = " + math.sum(math.pi, math.pi))

	// Bar.js
	import { sum, pi } from "lib/math"
	console.log("2pi = " + sum(pi,pi))	
	```

13. Modules : Export, Import 를 이용해 function이나 variables 들을 다른 곳에서 사용할 수 있다.