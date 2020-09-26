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
      let imageSrc = '/images/marker/apt.png'; 
      let imageSize = new kakao.maps.Size(30, 30);
      let imageOption = {offset: new kakao.maps.Point(27, 69)}; 
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      
      let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x), 
          image: markerImage 
      });
      
      let iwContent = '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>';
      let iwPosition = new kakao.maps.LatLng(33.450701, 126.570667);

      let infowindow = new kakao.maps.InfoWindow({
        position : iwPosition, 
        content : iwContent 
      });

     // infowindow.open(map, marker); 
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