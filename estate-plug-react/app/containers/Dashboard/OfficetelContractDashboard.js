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
  SingleLineChart,
} from 'enl-components';
import styles from './dashboard-jss';
import axios from 'axios';

class OfficetelContractDashboard extends PureComponent {

  state = {
    officetelYearlyIncreaseData: [],
  }

  componentDidMount() {
    const {
      getOfficetelYearlyIncreaseData,
    } = this;
    getOfficetelYearlyIncreaseData();
  }

  getOfficetelYearlyIncreaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/officetel_contract_yearly_increase');
      this.setState({ // boards: 'test'
        officetelYearlyIncreaseData: response.data
      });
    } catch (e) {
      console.log('officetel_contract_yearly_increase', e);
    }
  };

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      officetelYearlyIncreaseData,
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
            <SingleLineChart
              name="yearlyIncreaseData"
              data={officetelYearlyIncreaseData}
              height={300}
              xKey="year"
              yKey="value"
              title="2015 ~ 2020년 오피스텔 계약 거래 증감율"
              desc="2015 ~ 2020년 월별 전체 오피스텔 계약 거래 증감율"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
OfficetelContractDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OfficetelContractDashboard);
