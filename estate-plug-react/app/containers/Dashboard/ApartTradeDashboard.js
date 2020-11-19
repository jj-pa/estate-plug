import React, { PureComponent } from 'react';
import multiLineData from 'enl-api/dummy/multiLineData';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  VerticalBarChart,
  HorizontalBarChart,
  SingleLineChart
} from 'enl-components';
import axios from 'axios';
import styles from './dashboard-jss';

class ApartTradeDashboard extends PureComponent {
  state = {
    // apartMonthlyPriceData: [],
    apartGuroIndecreaseData: [],
    apartGwanakIndecreaseData: [],
    apartJongnoIndecreaseData: [],
    apartKangdongIndecreaseData: [],
    apartKangnamIndecreaseData: [],
    apartTargetAreaIncreaseData: [],
    apartMonthlyIncreaseData: [],
  };

  componentDidMount() {
    const {
      getApartGuroIndecreaseData,
      getApartGwanakIndecreaseData,
      getApartJongnoIndecreaseData,
      getApartKangnamIndecreaseData,
      getApartKangdongIndecreaseData,
      getApartTargetAreaIncreaseData,
      getApartMonthlyIncreaseData
    } = this;
    // getApartMonthlyPriceData();
    getApartGuroIndecreaseData();
    getApartGwanakIndecreaseData();
    getApartJongnoIndecreaseData();
    getApartKangnamIndecreaseData();
    getApartKangdongIndecreaseData();
    getApartTargetAreaIncreaseData();
    getApartMonthlyIncreaseData();
  }

  getApartMonthlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_monthly_increase');
      this.setState({ // boards: 'test'
        apartMonthlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('apart_trade_monthly_increase', e);
    }
  };

  getApartGuroIndecreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_guro_indecrease');
      this.setState({ // boards: 'test'
        apartGuroIndecreaseData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  getApartGwanakIndecreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_gwanak_indecrease');
      this.setState({ // boards: 'test'
        apartGwanakIndecreaseData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  getApartJongnoIndecreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_jongno_indecrease');
      this.setState({ // boards: 'test'
        apartJongnoIndecreaseData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  getApartKangdongIndecreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_kangdong_indecrease');
      this.setState({ // boards: 'test'
        apartKangdongIndecreaseData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  getApartKangnamIndecreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_kangnam_indecrease');
      this.setState({ // boards: 'test'
        apartKangnamIndecreaseData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  getApartTargetAreaIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_targetarea_increase');
      this.setState({ // boards: 'test'
        apartTargetAreaIncreaseData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      apartMonthlyIncreaseData,
      apartGuroIndecreaseData,
      apartGwanakIndecreaseData,
      apartJongnoIndecreaseData,
      apartKangdongIndecreaseData,
      apartKangnamIndecreaseData,
      apartTargetAreaIncreaseData
    } = this.state;

    console.log(apartMonthlyIncreaseData);

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

        <Divider className={classes.divider} />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="singleLineChart1"
              data={apartTargetAreaIncreaseData}
              height={300}
              xKey="year_month"
              yKey="increase"
              title="아파트 매매 (종로구 전체)"
              desc="2015년 종로구 전체 지역 거래 증감률"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart1"
              data={apartGuroIndecreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="아파트 매매 (구로구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart2"
              data={apartGwanakIndecreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="아파트 매매 (관악구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart3"
              data={apartJongnoIndecreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="아파트 매매 (종로구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart4"
              data={apartKangdongIndecreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="아파트 매매 (강동구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart5"
              data={apartKangnamIndecreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="아파트 매매 (강남구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart
              name="horizontalBarChart1"
              data={apartGuroIndecreaseData}
              height={300}
              xKey="indecrease"
              yKey="year_month"
              title="아파트 매매 (구로구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart
              name="horizontalBarChart2"
              data={apartGwanakIndecreaseData}
              height={300}
              xKey="indecrease"
              yKey="year_month"
              title="아파트 매매 (관악구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart
              name="horizontalBarChart3"
              data={apartJongnoIndecreaseData}
              height={300}
              xKey="indecrease"
              yKey="year_month"
              title="아파트 매매 (종로구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart
              name="horizontalBarChart4"
              data={apartKangdongIndecreaseData}
              height={300}
              xKey="indecrease"
              yKey="year_month"
              title="아파트 매매 (강동구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart
              name="horizontalBarChart5"
              data={apartKangnamIndecreaseData}
              height={300}
              xKey="indecrease"
              yKey="year_month"
              title="아파트 매매 (강남구)"
              desc="2015년 월별 아파트 매매 증감율"
            />
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
