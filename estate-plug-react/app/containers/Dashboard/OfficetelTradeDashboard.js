import React, { PureComponent } from 'react';
import multiLineData from 'enl-api/dummy/multiLineData';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  MultiLineChart
} from 'enl-components';
import styles from './dashboard-jss';

class OfficetelTradeDashboard extends PureComponent {
  componentDidMount() {
  }

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
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
