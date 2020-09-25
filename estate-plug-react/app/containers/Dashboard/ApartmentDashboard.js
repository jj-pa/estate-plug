import React, { PureComponent } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './dashboard-jss';

class ApartmentDashboard extends PureComponent {
  state = {
    name: '',

  };

  handleClick() {
    const container = document.getElementById("Mymap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 5
    };
    // 지도를 생성합니다 
    const map = new window.kakao.maps.Map(container, options);    
        
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(this.state.name, (result, status) => {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
  
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  
        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      } 
    });    
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  }

  //마운트 될때 실행
  componentDidMount() { 
    const { fetchData } = this.props;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d9777dc146c48bf1d3a8dc09a248ab5&autoload=false";
    document.head.appendChild(script);
    
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("Mymap");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 5
        };
        // 지도를 생성합니다 
        const map = new window.kakao.maps.Map(container, options);    
            
      });
    };
  }

  render() {
    
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const { name } = this.state;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        {/* map */}
        <div style={{width: '100%', margin: '5px 5px 5px 5px'}}>
          <Input  id="searchAddress" 
                  value={this.state.name} 
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  placeholder="" 
                  className={classes.input} 
                  inputProps={{'aria-label': 'Description', }} 
                  style={{width: '700px' , marginRight: '10px'}}
          />
          <Button variant="outlined" className={classes.button}  onClick={() => this.handleClick()}>검색</Button>
        </div>
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={12} xs={12}>
            
          <MapContents id="Mymap" ></MapContents>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const MapContents = styled.div`
  width: 100%;
  height: 600px;
`;

ApartmentDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};

export default withStyles(styles)(ApartmentDashboard);
