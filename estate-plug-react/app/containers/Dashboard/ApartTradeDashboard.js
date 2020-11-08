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
import {
  MapContainer,
  SearchPlace,
  TaskWidget,
  VerticalBarChart,
  HorizontalBarChart,
  PieChart,
  MultiLineChart
} from 'enl-components';

class ApartTradeDashboard extends PureComponent {
  state = {
    name: '',
    place: '논현동'
  };

  //마운트 될때 실행
  componentDidMount() {
    const { fetchData } = this.props;
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});
  }
  render() {

    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const { name } = this.state;
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});
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
        <div style={{width: '100%', margin: '15px 0px 15px 0px'}}>
          <SearchPlace></SearchPlace>
        </div>
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={12} xs={12}>
          <MapContainer searchPlace={this.state.place}></MapContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}
ApartTradeDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApartTradeDashboard);
