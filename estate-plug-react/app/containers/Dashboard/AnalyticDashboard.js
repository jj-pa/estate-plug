import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'enl-api/dummy/brand';
import chartData from 'enl-api/dummy/chartData';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import dummy from 'enl-api/dummy/multiLineChartData';
import {
  CounterIconsWidget,
  PerformanceChartWidget,
  TaskWidget,
  VerticalBarChart,
  HorizontalBarChart,
  PieChart,
  MultiLineChart,
  SingleLineChart
} from 'enl-components';
import styles from './dashboard-jss';
import axios from 'axios';


class AnalyticDashboard extends PureComponent {
  state = {
    // apartMonthlyPriceData: [],
    apartCompareCountData: [],
    apartGuroIndecreaseData: [],
    apartGwanakIndecreaseData: [],
    apartJongnoIndecreaseData: [],
    apartKangdongIndecreaseData: [],
    apartKangnamIndecreaseData: [],
    apartTargetAreaIncreaseData: [],
  };

  /*getApartMonthlyPriceData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_monthly_price');
      this.setState({ // boards: 'test'
        apartMonthlyPriceData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };*/

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

  //마운트 될때 실행
  componentDidMount() {
    const {
      getApartGuroIndecreaseData,
      getApartGwanakIndecreaseData,
      getApartJongnoIndecreaseData,
      getApartKangnamIndecreaseData,
      getApartKangdongIndecreaseData,
    } = this;
    // getApartMonthlyPriceData();
    getApartGuroIndecreaseData();
    getApartGwanakIndecreaseData();
    getApartJongnoIndecreaseData();
    getApartKangnamIndecreaseData();
    getApartKangdongIndecreaseData();
  }

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const { 
      apartGuroIndecreaseData, 
      apartGwanakIndecreaseData,  
      apartJongnoIndecreaseData,
      apartKangdongIndecreaseData,
      apartKangnamIndecreaseData
    } = this.state;
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
            <SingleLineChart name="singleLineChart1"
              data={apartGuroIndecreaseData}
              height={300} 
              xKey = 'year_month'
              yKey = 'indecrease'
              title="아파트 매매" 
              desc="2016년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart name="verticalBarChart1" 
              data={apartGuroIndecreaseData}
              height={300} 
              xKey = 'year_month'
              yKey = 'indecrease'
              title="아파트 매매 (구로구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart name="verticalBarChart2" 
              data={apartGwanakIndecreaseData} 
              height={300} 
              xKey = 'year_month'
              yKey = 'indecrease'
              title="아파트 매매 (관악구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart name="verticalBarChart3" 
              data={apartJongnoIndecreaseData} 
              height={300} 
              xKey = 'year_month'
              yKey = 'indecrease'
              title="아파트 매매 (종로구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart name="verticalBarChart4" 
              data={apartKangdongIndecreaseData} 
              height={300} 
              xKey = 'year_month'
              yKey = 'indecrease'
              title="아파트 매매 (강동구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart name="verticalBarChart5" 
              data={apartKangnamIndecreaseData} 
              height={300} 
              xKey = 'year_month'
              yKey = 'indecrease'
              title="아파트 매매 (강남구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart name="horizontalBarChart1" 
              data={apartGuroIndecreaseData} 
              height={300} 
              xKey = 'indecrease'
              yKey = 'year_month'
              title="아파트 매매 (구로구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart name="horizontalBarChart2" 
              data={apartGwanakIndecreaseData} 
              height={300} 
              xKey = 'indecrease'
              yKey = 'year_month'
              title="아파트 매매 (관악구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart name="horizontalBarChart3" 
              data={apartJongnoIndecreaseData} 
              height={300} 
              xKey = 'indecrease'
              yKey = 'year_month'
              title="아파트 매매 (종로구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart name="horizontalBarChart4" 
              data={apartKangdongIndecreaseData} 
              height={300} 
              xKey = 'indecrease'
              yKey = 'year_month'
              title="아파트 매매 (강동구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HorizontalBarChart name="horizontalBarChart5" 
              data={apartKangnamIndecreaseData} 
              height={300} 
              xKey = 'indecrease'
              yKey = 'year_month'
              title="아파트 매매 (강남구)" 
              desc="2015년 월별 아파트 매매 증감율" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart name="pieChart1" data={apartGuroIndecreaseData} height={300} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <MultiLineChart name="multiLineChart1" data={dummy} height={300} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </div>
    );
  }
}

AnalyticDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnalyticDashboard);
