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
  VerticalBarChart
} from 'enl-components';
import styles from './dashboard-jss';
import axios from 'axios';

class OfficetelTradeDashboard extends PureComponent {
  state = {
    officetelIncreaseData: []
  };

  componentDidMount() {
    const {
      getOfficetelIncreaseData
    } = this;
    getOfficetelIncreaseData();
  }

  getOfficetelIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_guro_indecrease');
      this.setState({ // boards: 'test'
        officetelIncreaseData: response.data
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
      officetelIncreaseData
    } = this.state;
    console.log(officetelIncreaseData);
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
            <VerticalBarChart
              name="verticalBarChart2"
              data={officetelIncreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="오피스텔 매매"
              desc="2015년 월별 오피스텔 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart2"
              data={officetelIncreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="오피스텔 매매"
              desc="2016년 월별 오피스텔 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart2"
              data={officetelIncreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="오피스텔 매매"
              desc="2017년 월별 오피스텔 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart2"
              data={officetelIncreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="오피스텔 매매"
              desc="2018년 월별 오피스텔 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart2"
              data={officetelIncreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="오피스텔 매매"
              desc="2019년 월별 오피스텔 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <VerticalBarChart
              name="verticalBarChart2"
              data={officetelIncreaseData}
              height={300}
              xKey="year_month"
              yKey="indecrease"
              title="오피스텔 매매"
              desc="2020년 월별 오피스텔 매매 증감율"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <MultiLineChart
              name="multiLineChart1"
              data={multiLineData}
              height={300}
              title="아파트 매매"
              desc="2016년 월별 아파트 매매 금액"
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
