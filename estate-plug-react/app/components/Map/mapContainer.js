import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {

  useEffect(() => {
    
    const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
    const map = new kakao.maps.Map(container, options);
  
    const ps = new kakao.maps.services.Places(); 
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
  
      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
  
      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, 'click', function() {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div id='myMap' style={{
      width: '100%', 
      height: '600px'
    }}></div>
  );
}

export default MapContainer; 