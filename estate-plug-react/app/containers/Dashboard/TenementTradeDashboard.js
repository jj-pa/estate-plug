import React, { PureComponent } from 'react';
import multiLineData from 'enl-api/dummy/multiLineData';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  SingleLineChart,
  VerticalBarChart,
  PieChart
} from 'enl-components';
import styles from './dashboard-jss';
import axios from 'axios';

class TenementTradeDashboard extends PureComponent {

  state = {
    tenementMonthlyIncreaseData: [],
    tenementMonthlyPriceData: [],
    tenementYearlyIncreaseData: [],
    tenementYearlyPercentageData: [],
  }

  componentDidMount() {
    const {
      getTenementMonthlyIncreaseData,
      getTenementMonthlyPriceData,
      getTenementYearlyIncreaseData,
      getTenementYearlyPercentageData,
    } = this;
    getTenementMonthlyIncreaseData();
    getTenementMonthlyPriceData();
    getTenementYearlyIncreaseData();
    getTenementYearlyPercentageData();
  }
  getTenementMonthlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/multi_housing_trade_monthly_increase');
      this.setState({ // boards: 'test'
        tenementMonthlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('tenement_trade_monthly_increase', e);
    }
  };

  getTenementMonthlyPriceData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/multi_housing_trade_monthly_price');
      this.setState({ // boards: 'test'
        tenementMonthlyPriceData: response.data
      });
    } catch (e) {
      console.log('tenement_trade_monthly_price', e);
    }
  };

  getTenementYearlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/multi_housing_trade_yearly_increase');
      this.setState({ // boards: 'test'
        tenementYearlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('tenement_trade_yearly_increase', e);
    }
  };

  getTenementYearlyPercentageData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/multi_housing_trade_yearly_percentage');
      this.setState({ // boards: 'test'
        tenementYearlyPercentageData: response.data
      });
    } catch (e) {
      console.log('tenement_trade_yearly_percentage', e);
    }
  }

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      tenementMonthlyIncreaseData,
      tenementMonthlyPriceData,
      tenementYearlyIncreaseData,
      tenementYearlyPercentageData,
    } = this.state;

    const monthlyIncreaseData2015 = [];
    const monthlyIncreaseData2016 = [];
    const monthlyIncreaseData2017 = [];
    const monthlyIncreaseData2018 = [];
    const monthlyIncreaseData2019 = [];
    tenementMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2015'
      ? monthlyIncreaseData2015.push(monthlyData)
      : null));
    tenementMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2016'
      ? monthlyIncreaseData2016.push(monthlyData)
      : null));
    tenementMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2017'
      ? monthlyIncreaseData2017.push(monthlyData)
      : null));
    tenementMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2018'
      ? monthlyIncreaseData2018.push(monthlyData)
      : null));
    tenementMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2019'
      ? monthlyIncreaseData2019.push(monthlyData)
      : null));

    const monthlyPriceData2015 = [];
    const monthlyPriceData2016 = [];
    const monthlyPriceData2017 = [];
    const monthlyPriceData2018 = [];
    const monthlyPriceData2019 = [];
    tenementMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2015'
      ? monthlyPriceData2015.push(monthlyData)
      : null));
    tenementMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2016'
      ? monthlyPriceData2016.push(monthlyData)
      : null));
    tenementMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2017'
      ? monthlyPriceData2017.push(monthlyData)
      : null));
    tenementMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2018'
      ? monthlyPriceData2018.push(monthlyData)
      : null));
    tenementMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2019'
      ? monthlyPriceData2019.push(monthlyData)
      : null));


    const monthlyPercentageData2015 = [];
    const monthlyPercentageData2016 = [];
    const monthlyPercentageData2017 = [];
    const monthlyPercentageData2018 = [];
    const monthlyPercentageData2019 = [];
    tenementYearlyPercentageData.map(monthlyData => (monthlyData.year === '2015'
      ? monthlyPercentageData2015.push(monthlyData)
      : null));
    tenementYearlyPercentageData.map(monthlyData => (monthlyData.year === '2016'
      ? monthlyPercentageData2016.push(monthlyData)
      : null));
    tenementYearlyPercentageData.map(monthlyData => (monthlyData.year === '2017'
      ? monthlyPercentageData2017.push(monthlyData)
      : null));
    tenementYearlyPercentageData.map(monthlyData => (monthlyData.year === '2018'
      ? monthlyPercentageData2018.push(monthlyData)
      : null));
    tenementYearlyPercentageData.map(monthlyData => (monthlyData.year === '2019'
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
              title="2015년 연립다세대 매매"
              desc="2015년 연립다세대 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2016"
              data={monthlyPercentageData2016}
              height={300}
              title="2016년 연립다세대 매매"
              desc="2016년 연립다세대 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2017"
              data={monthlyPercentageData2017}
              height={300}
              title="2017년 연립다세대 매매"
              desc="2017년 연립다세대 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2018"
              data={monthlyPercentageData2018}
              height={300}
              title="2018년 연립다세대 매매"
              desc="2018년 연립다세대 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="yearlyPercentageData2019"
              data={monthlyPercentageData2019}
              height={300}
              title="2019년 연립다세대 매매"
              desc="2019년 연립다세대 매매 거래 비중"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="yearlyIncreaseData"
              data={tenementYearlyIncreaseData}
              height={300}
              xKey="year"
              yKey="value"
              title="2015 ~ 2020년 연립다세대 매매 거래 증감율"
              desc="2015 ~ 2020년 월별 전체 연립다세대 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2015"
              data={monthlyIncreaseData2015}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2015년 연립다세대 매매"
              desc="2015년 월별 전체 연립다세대 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2016"
              data={monthlyIncreaseData2016}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2016년 연립다세대 매매"
              desc="2016년 월별 전체 연립다세대 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2017"
              data={monthlyIncreaseData2017}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2017년 연립다세대 매매"
              desc="2017년 월별 전체 연립다세대 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2018"
              data={monthlyIncreaseData2018}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2018년 연립다세대 매매"
              desc="2018년 월별 전체 연립다세대 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2019"
              data={monthlyIncreaseData2019}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2019년 연립다세대 매매"
              desc="2019년 월별 전체 연립다세대 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2015"
              data={monthlyPriceData2015}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2015년 연립다세대 매매"
              desc="2015년 월별 전체 연립다세대 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2016"
              data={monthlyPriceData2016}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2016년 연립다세대 매매"
              desc="2016년 월별 전체 연립다세대 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2017"
              data={monthlyPriceData2017}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2017년 연립다세대 매매"
              desc="2017년 월별 전체 연립다세대 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2018"
              data={monthlyPriceData2018}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2018년 연립다세대 매매"
              desc="2018년 월별 전체 연립다세대 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2019"
              data={monthlyPriceData2019}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2019년 연립다세대 매매"
              desc="2019년 월별 전체 연립다세대 매매 거래금액"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
TenementTradeDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TenementTradeDashboard);
