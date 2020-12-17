// 1. Basic Type
//NOTE Boolean
var isDone = true;
console.log(isDone);
//NOTE Number
var decimal = 6; //십진수
var hex = 0xf00d; // 16진수
var binary = 10; // 2진수
var octal = 484; //  8진수
//NOTE String
var color = "blue";
color = "red";
console.log(color);
var fullName = "Kate Nam";
var age = 31;
var sentence = "Hello, my name is " + fullName + ". I'll be " + (age + 1) + " years old next year";
console.log(sentence);
//NOTE Array
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
console.log(list1, list2);
//NOTE Tuple (튜플)
// 요소의 타입과 개수가 고정된 배열을 표현할 수 있다.
var tupleType;
tupleType = ["hello", 10]; // 정상
console.log(tupleType); // 출력 : (2) ["hello", 10]
console.log(tupleType[0].substring(1)); // 출력 : ello
tupleType[3] = "world"; // 에러 : 길이가 '2'인 튜플 형식 [string, number]의 인덱스 [3]에는 요소가 없습니다.
tupleType = [10, "hello"]; // 에러 : string 형식은 number형식에 할당할 수 없습니다.
console.log(tupleType);
console.log(tupleType[1].substring(2)); // 에러 : number 형식에 substring속성이 없습니다.
//NOTE Enum (열거)
// 표준 자료형 집합과 사용하면 도움이 될만한 데이터 형으로 enum은 값의 집합에 더 나은 이름을 붙여줄 수 있다.
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(Color[4]); // 출력 : blue
var colorName = Color[2];
console.log(colorName); // 출력 : Green
//NOTE Any
// 타입 검사를 하지 않고, 그 값들이 컴파일 시간에 검사를 통과하길 원할 때 사용(알지 못하는 타입을 표현해야 할 때 사용)
var notSure = 4;
console.log(notSure);
notSure = "maybe a string instead";
console.log(notSure);
notSure = false;
console.log(notSure);
// 또 any 타입은 타입의 일부만 알고 전체는 알지 못할 때 유용합니다. 예를 들어, 여러 다른 타입이 섞인 배열을 다룰 수 있습니다
var list = [1, true, "free"];
list[1] = 100;
console.log(list); // 출력 : (3) [1, 100, "free"]
//NOTE Void
// void는 어떤 타입도 존재할 수 없음을 나타낸다(any의 반대 타입). void는 보통 함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 쓰이는 것을 볼 수 있습니다:
function warnUser() {
    console.log("this is my warnig message");
}
var unusable = undefined;
unusable = null;
console.log(unusable);
//NOTE Null and Undefined
// TypeScript는 undefined 과 null 둘 다 각각 자신의 타입 이름으로(undefined , null) 사용합니다. void처럼 그 자체로 유용한 경우는 거의 없습니다
//? 가능한 경우 --strictNullChecks를 사용할 것을 권장합니다. 하지만 이 핸드북의 목적에 따라, 사용하지 않는다고 가정합니다.
var u = undefined;
var n = null;
//NOTE Never
// never 타입은 절대 발생할 수 없는 타입을 나타냅니다. 예를 들어, never는 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입으로 쓰입니다. 변수 또한 타입 가드에 의해 아무 타입도 얻지 못하게 좁혀지면 never 타입을 얻게 될 수 있습니다.
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message) {
    throw new Error(message);
}
// 반환 타입이 never로 추론된다.
function fail() {
    return error("Somethig failed");
}
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop() {
    while (true) { }
}
// create({ prop: 0 });
// create(null);
// create(undefined);
// create(42); // 에러
// create(false); // 에러
// create("string"); // 에러
//NOTE Type assertions (타입 단언)
// 타입 단언은 컴파일러에게 "날 믿어, 난 내가 뭘 하고 있는지 알아"라고 말해주는 방법입니다. 타입 스크립트는 개발자가 필요한 어떤 특정 검사를 수행했다고 인지합니다.
// 이는 다른 언어의 타입 변환(형 변환)과 유사하지만, 다른 특별한 검사를 하거나 데이터를 재구성하지는 않습니다.
var someValue = "this is a string";
var strLength = someValue.length;
console.log(strLength, someValue);
