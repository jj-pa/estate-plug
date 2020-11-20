import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  VerticalBarChart,
  HorizontalBarChart,
  SingleLineChart,
  PieChart,
} from 'enl-components';
import axios from 'axios';
import styles from './dashboard-jss';

class ApartTradeDashboard extends PureComponent {
  state = {
    apartGuroIndecreaseData: [],
    apartGwanakIndecreaseData: [],
    apartJongnoIndecreaseData: [],
    apartKangdongIndecreaseData: [],
    apartKangnamIndecreaseData: [],
    apartTargetAreaIncreaseData: [],
    apartMonthlyIncreaseData: [],
    apartMonthlyPriceData: [],
    apartYearlyIncreaseData: [],
    apartYearlyPercentageData: [],
  };

  componentDidMount() {
    const {
      getApartGuroIndecreaseData,
      getApartGwanakIndecreaseData,
      getApartJongnoIndecreaseData,
      getApartKangnamIndecreaseData,
      getApartKangdongIndecreaseData,
      getApartTargetAreaIncreaseData,
      getApartMonthlyIncreaseData,
      getApartMonthlyPriceData,
      getApartYearlyIncreaseData,
      getApartYearlyPercentageData,
    } = this;
    // getApartMonthlyPriceData();
    getApartGuroIndecreaseData();
    getApartGwanakIndecreaseData();
    getApartJongnoIndecreaseData();
    getApartKangnamIndecreaseData();
    getApartKangdongIndecreaseData();
    getApartTargetAreaIncreaseData();
    getApartMonthlyIncreaseData();
    getApartMonthlyPriceData();
    getApartYearlyIncreaseData();
    getApartYearlyPercentageData();
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

  getApartMonthlyPriceData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_monthly_price');
      this.setState({ // boards: 'test'
        apartMonthlyPriceData: response.data
      });
    } catch (e) {
      console.log('apart_trade_monthly_price', e);
    }
  };

  getApartYearlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_yearly_increase');
      this.setState({ // boards: 'test'
        apartYearlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('apart_trade_monthly_price', e);
    }
  };

  getApartYearlyPercentageData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_yearly_percentage');
      this.setState({ // boards: 'test'
        apartYearlyPercentageData: response.data
      });
    } catch (e) {
      console.log('apart_trade_yearly_percentage', e);
    }
  }

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
      apartMonthlyPriceData,
      apartYearlyIncreaseData,
      apartGuroIndecreaseData,
      apartGwanakIndecreaseData,
      apartJongnoIndecreaseData,
      apartKangdongIndecreaseData,
      apartKangnamIndecreaseData,
      apartTargetAreaIncreaseData,
      apartYearlyPercentageData,
    } = this.state;

    const monthlyIncreaseData2015 = [];
    const monthlyIncreaseData2016 = [];
    const monthlyIncreaseData2017 = [];
    const monthlyIncreaseData2018 = [];
    const monthlyIncreaseData2019 = [];
    apartMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2015'
      ? monthlyIncreaseData2015.push(monthlyData)
      : null));
    apartMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2016'
      ? monthlyIncreaseData2016.push(monthlyData)
      : null));
    apartMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2017'
      ? monthlyIncreaseData2017.push(monthlyData)
      : null));
    apartMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2018'
      ? monthlyIncreaseData2018.push(monthlyData)
      : null));
    apartMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2019'
      ? monthlyIncreaseData2019.push(monthlyData)
      : null));

    const monthlyPriceData2015 = [];
    const monthlyPriceData2016 = [];
    const monthlyPriceData2017 = [];
    const monthlyPriceData2018 = [];
    const monthlyPriceData2019 = [];
    apartMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2015'
      ? monthlyPriceData2015.push(monthlyData)
      : null));
    apartMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2016'
      ? monthlyPriceData2016.push(monthlyData)
      : null));
    apartMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2017'
      ? monthlyPriceData2017.push(monthlyData)
      : null));
    apartMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2018'
      ? monthlyPriceData2018.push(monthlyData)
      : null));
    apartMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2019'
      ? monthlyPriceData2019.push(monthlyData)
      : null));

    const monthlyPercentageData2015 = [];
    const monthlyPercentageData2016 = [];
    const monthlyPercentageData2017 = [];
    const monthlyPercentageData2018 = [];
    const monthlyPercentageData2019 = [];
    apartYearlyPercentageData.map(monthlyData => (monthlyData.year === '2015'
      ? monthlyPercentageData2015.push(monthlyData)
      : null));
    apartYearlyPercentageData.map(monthlyData => (monthlyData.year === '2016'
      ? monthlyPercentageData2016.push(monthlyData)
      : null));
    apartYearlyPercentageData.map(monthlyData => (monthlyData.year === '2017'
      ? monthlyPercentageData2017.push(monthlyData)
      : null));
    apartYearlyPercentageData.map(monthlyData => (monthlyData.year === '2018'
      ? monthlyPercentageData2018.push(monthlyData)
      : null));
    apartYearlyPercentageData.map(monthlyData => (monthlyData.year === '2019'
      ? monthlyPercentageData2019.push(monthlyData)
      : null));

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
            <PieChart
              name="yearlyPercentageData2015"
              data={monthlyPercentageData2015}
              height={300}
              title="2015년 아파트 매매"
              desc="2015년 아파트 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2016"
              data={monthlyPercentageData2016}
              height={300}
              title="2016년 아파트 매매"
              desc="2016년 아파트 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2017"
              data={monthlyPercentageData2017}
              height={300}
              title="2017년 아파트 매매"
              desc="2017년 아파트 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2018"
              data={monthlyPercentageData2018}
              height={300}
              title="2018년 아파트 매매"
              desc="2018년 아파트 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2019"
              data={monthlyPercentageData2019}
              height={300}
              title="2019년 아파트 매매"
              desc="2019년 아파트 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="yearlyIncreaseData"
              data={apartYearlyIncreaseData}
              height={300}
              xKey="year"
              yKey="value"
              title="2015 ~ 2020년 아파트 매매 거래 증감율"
              desc="2015 ~ 2020년 월별 전체 아파트 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2015"
              data={monthlyIncreaseData2015}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2015년 아파트 매매"
              desc="2015년 월별 전체 아파트 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2016"
              data={monthlyIncreaseData2016}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2016년 아파트 매매"
              desc="2016년 월별 전체 아파트 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2017"
              data={monthlyIncreaseData2017}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2017년 아파트 매매"
              desc="2017년 월별 전체 아파트 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2018"
              data={monthlyIncreaseData2018}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2018년 아파트 매매"
              desc="2018년 월별 전체 아파트 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2019"
              data={monthlyIncreaseData2019}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2019년 아파트 매매"
              desc="2019년 월별 전체 아파트 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2015"
              data={monthlyPriceData2015}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2015년 아파트 매매"
              desc="2015년 월별 전체 아파트 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2016"
              data={monthlyPriceData2016}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2016년 아파트 매매"
              desc="2016년 월별 전체 아파트 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2017"
              data={monthlyPriceData2017}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2017년 아파트 매매"
              desc="2017년 월별 전체 아파트 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2018"
              data={monthlyPriceData2018}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2018년 아파트 매매"
              desc="2018년 월별 전체 아파트 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2019"
              data={monthlyPriceData2019}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2019년 아파트 매매"
              desc="2019년 월별 전체 아파트 매매 거래금액"
            />
          </Grid>
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
