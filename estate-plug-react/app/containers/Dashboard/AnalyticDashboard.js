import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'enl-api/dummy/brand';
import chartData from 'enl-api/dummy/chartData';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  CounterIconsWidget,
  PerformanceChartWidget,
  TaskWidget,
  VerticalBarChart,
  HorizontalBarChart,
  PieChart
} from 'enl-components';
import styles from './dashboard-jss';
import axios from 'axios';


class AnalyticDashboard extends PureComponent {
  state = {
    data: [],
    data2: []
  };

  monthlyPriceData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_monthly_price');
      this.setState({ // boards: 'test'
        data: response.data
      });
    } catch (e) {
      console.log(e);
    } 
  };

  monthlyPriceData2 = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_monthly_price');
      this.setState({ // boards: 'test'
        data2: response.data
      });
    } catch (e) {
      console.log(e);
    } 
  };

  //마운트 될때 실행
  componentDidMount() {
    const { monthlyPriceData, monthlyPriceData2 } = this;
    monthlyPriceData();
    monthlyPriceData2();
  }

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const { data, data2 } = this.state;
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
          <Grid item xl={3} lg={6} md={12} xs={12}>
            <VerticalBarChart name="barChart1" data={data} height={400} title="아파트 매매" desc="2015년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={6} md={12} xs={12}>
            <VerticalBarChart name="barChart2" data={data} height={400} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={6} md={12} xs={12}>
            <VerticalBarChart name="barChart3" data={data} height={400} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={6} md={12} xs={12}>
            <HorizontalBarChart name="barChart4" data={data} height={400} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={6} md={12} xs={12}>
            <HorizontalBarChart name="barChart5" data={data} height={400} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={6} md={12} xs={12}>
            <HorizontalBarChart name="barChart6" data={data} height={400} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
          </Grid>
          <Grid item xl={3} lg={6} md={12} xs={12}>
            <PieChart name="pieChart1" data={data} height={400} title="아파트 매매" desc="2016년 월별 아파트 매매 금액" />
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
