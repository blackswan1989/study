var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


// 지도를 표시하는 div 크기를 변경하는 함수입니다
function resizeMap() {
	var mapContainer = document.getElementById('map');
	mapContainer.style.width = '100%';
	mapContainer.style.height = '1080px'; 
}

function relayout() {    
    
	// 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
	// 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
	// window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
	map.relayout();
}