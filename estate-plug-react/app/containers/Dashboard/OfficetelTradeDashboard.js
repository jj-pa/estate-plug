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
  VerticalBarChart
} from 'enl-components';
import styles from './dashboard-jss';
import axios from 'axios';

class OfficetelTradeDashboard extends PureComponent {

  state = {
    officetelMonthlyIncreaseData: [],
    officetelMonthlyPriceData: [],
    officetelYearlyIncreaseData: [],
  }

  componentDidMount() {
    const {
      getOfficetelMonthlyIncreaseData,
      getOfficetelMonthlyPriceData,
      getOfficetelYearlyIncreaseData,
    } = this;
    getOfficetelMonthlyIncreaseData();
    getOfficetelMonthlyPriceData();
    getOfficetelYearlyIncreaseData();
  }
  getOfficetelMonthlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/officetel_trade_monthly_increase');
      this.setState({ // boards: 'test'
        officetelMonthlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('officetel_trade_monthly_increase', e);
    }
  };

  getOfficetelMonthlyPriceData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/officetel_trade_monthly_price');
      this.setState({ // boards: 'test'
        officetelMonthlyPriceData: response.data
      });
    } catch (e) {
      console.log('officetel_trade_monthly_price', e);
    }
  };

  getOfficetelYearlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/officetel_trade_yearly_increase');
      this.setState({ // boards: 'test'
        officetelYearlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('officetel_trade_yearly_increase', e);
    }
  };

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      officetelMonthlyIncreaseData,
      officetelMonthlyPriceData,
      officetelYearlyIncreaseData,
    } = this.state;

    const monthlyIncreaseData2015 = [];
    const monthlyIncreaseData2016 = [];
    const monthlyIncreaseData2017 = [];
    const monthlyIncreaseData2018 = [];
    const monthlyIncreaseData2019 = [];
    officetelMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2015'
      ? monthlyIncreaseData2015.push(monthlyData)
      : null));
    officetelMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2016'
      ? monthlyIncreaseData2016.push(monthlyData)
      : null));
    officetelMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2017'
      ? monthlyIncreaseData2017.push(monthlyData)
      : null));
    officetelMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2018'
      ? monthlyIncreaseData2018.push(monthlyData)
      : null));
    officetelMonthlyIncreaseData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2019'
      ? monthlyIncreaseData2019.push(monthlyData)
      : null));

    const monthlyPriceData2015 = [];
    const monthlyPriceData2016 = [];
    const monthlyPriceData2017 = [];
    const monthlyPriceData2018 = [];
    const monthlyPriceData2019 = [];
    officetelMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2015'
      ? monthlyPriceData2015.push(monthlyData)
      : null));
    officetelMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2016'
      ? monthlyPriceData2016.push(monthlyData)
      : null));
    officetelMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2017'
      ? monthlyPriceData2017.push(monthlyData)
      : null));
    officetelMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2018'
      ? monthlyPriceData2018.push(monthlyData)
      : null));
    officetelMonthlyPriceData.map(monthlyData => (monthlyData.year_month.substr(0, 4) === '2019'
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
              data={officetelYearlyIncreaseData}
              height={300}
              xKey="year"
              yKey="value"
              title="2015 ~ 2020년 오피스텔 매매 거래 증감율"
              desc="2015 ~ 2020년 월별 전체 오피스텔 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2015"
              data={monthlyIncreaseData2015}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2015년 오피스텔 매매"
              desc="2015년 월별 전체 오피스텔 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2016"
              data={monthlyIncreaseData2016}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2016년 오피스텔 매매"
              desc="2016년 월별 전체 오피스텔 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2017"
              data={monthlyIncreaseData2017}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2017년 오피스텔 매매"
              desc="2017년 월별 전체 오피스텔 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2018"
              data={monthlyIncreaseData2018}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2018년 오피스텔 매매"
              desc="2018년 월별 전체 오피스텔 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <SingleLineChart
              name="monthlyIncreaseData2019"
              data={monthlyIncreaseData2019}
              height={300}
              xKey="year_month"
              yKey="value"
              title="2019년 오피스텔 매매"
              desc="2019년 월별 전체 오피스텔 매매 거래 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2015"
              data={monthlyPriceData2015}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2015년 오피스텔 매매"
              desc="2015년 월별 전체 오피스텔 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2016"
              data={monthlyPriceData2016}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2016년 오피스텔 매매"
              desc="2016년 월별 전체 오피스텔 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2017"
              data={monthlyPriceData2017}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2017년 오피스텔 매매"
              desc="2017년 월별 전체 오피스텔 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2018"
              data={monthlyPriceData2018}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2018년 오피스텔 매매"
              desc="2018년 월별 전체 오피스텔 매매 거래금액"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="monthlyPriceData2019"
              data={monthlyPriceData2019}
              height={300}
              xKey="year_month"
              yKey="price"
              title="2019년 오피스텔 매매"
              desc="2019년 월별 전체 오피스텔 매매 거래금액"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
OfficetelTradeDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OfficetelTradeDashboard);
