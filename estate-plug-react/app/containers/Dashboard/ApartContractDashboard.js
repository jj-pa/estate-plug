import React, { PureComponent } from 'react';
import multiLineData from 'enl-api/dummy/multiLineData';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  MultiLineChart,
  VerticalBarChart,
  SingleLineChart
} from 'enl-components';
import styles from './dashboard-jss';
import axios from 'axios';

class ApartContractDashboard extends PureComponent {

  state = {
    apartMonthlyIncreaseData: [],
    apartMonthlyPriceData: [],
    apartYearlyIncreaseData: [],
  }

  componentDidMount() {
    const {
      getApartMonthlyIncreaseData,
      getApartMonthlyPriceData,
      getApartYearlyIncreaseData,
    } = this;
    getApartMonthlyIncreaseData();
    getApartMonthlyPriceData();
    getApartYearlyIncreaseData();
  }
  getApartMonthlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_contract_monthly_increase');
      this.setState({ // boards: 'test'
        apartMonthlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('apart_contract_monthly_increase', e);
    }
  };

  getApartMonthlyPriceData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_contract_monthly_price');
      this.setState({ // boards: 'test'
        apartMonthlyPriceData: response.data
      });
    } catch (e) {
      console.log('apart_contract_monthly_price', e);
    }
  };

  getApartYearlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_contract_yearly_increase');
      this.setState({ // boards: 'test'
        apartYearlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('apart_contract_yearly_increase', e);
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
              name="yearlyIncreaseData"
              data={apartYearlyIncreaseData}
              height={300}
              xKey="year"
              yKey="value"
              title="2015 ~ 2020년 아파트 계약 거래 증감율"
              desc="2015 ~ 2020년 월별 전체 아파트 계약 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2015"
              data={monthlyIncreaseData2015}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2015년 아파트 계약"
              desc="2015년 월별 전체 아파트 계약 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2016"
              data={monthlyIncreaseData2016}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2016년 아파트 계약"
              desc="2016년 월별 전체 아파트 계약 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2017"
              data={monthlyIncreaseData2017}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2017년 아파트 계약"
              desc="2017년 월별 전체 아파트 계약 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2018"
              data={monthlyIncreaseData2018}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2018년 아파트 계약"
              desc="2018년 월별 전체 아파트 계약 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2019"
              data={monthlyIncreaseData2019}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2019년 아파트 계약"
              desc="2019년 월별 전체 아파트 계약 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2015"
              data={monthlyPriceData2015}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2015년 아파트 계약"
              desc="2015년 월별 전체 아파트 계약 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2016"
              data={monthlyPriceData2016}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2016년 아파트 계약"
              desc="2016년 월별 전체 아파트 계약 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2017"
              data={monthlyPriceData2017}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2017년 아파트 계약"
              desc="2017년 월별 전체 아파트 계약 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2018"
              data={monthlyPriceData2018}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2018년 아파트 계약"
              desc="2018년 월별 전체 아파트 계약 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2019"
              data={monthlyPriceData2019}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2019년 아파트 계약"
              desc="2019년 월별 전체 아파트 계약 거래금액"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
ApartContractDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApartContractDashboard);
