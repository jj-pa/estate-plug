import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import brand from 'enl-api/dummy/brand';
import pieChartData from 'enl-api/dummy/pieChartData';
import multiLineData from 'enl-api/dummy/multiLineData';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  VerticalBarChart,
  HorizontalBarChart,
  PieChart,
  MultiLineChart,
  SingleLineChart,
  MapContainer,
  SearchPlace
} from 'enl-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import styles from './dashboard-jss';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
    },
    '& .MuiInput-underline:after': {
    },
    '& .MuiInputLabel-formControl': {
      top: 5
    },
    '& .MuiOutlinedInput-root': {
      '& input': {
        padding: '12px 8px 0',
      },
      '& fieldset': {
      },
      '&:hover fieldset': {
      },
      '&.Mui-focused fieldset': {
      },
    },
  },
})(TextField);

class AnalyticDashboard extends PureComponent {
  state = {
    // apartMonthlyPriceData: [],
    apartGuroIndecreaseData: [],
    apartGwanakIndecreaseData: [],
    apartJongnoIndecreaseData: [],
    apartKangdongIndecreaseData: [],
    apartKangnamIndecreaseData: [],
    apartTargetAreaIncreaseData: [],
    place: '논현동'
  };

  /* getApartMonthlyPriceData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/apart_trade_monthly_price');
      this.setState({ // boards: 'test'
        apartMonthlyPriceData: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }; */

  // 마운트 될때 실행
  componentDidMount() {
    const {
      getApartGuroIndecreaseData,
      getApartGwanakIndecreaseData,
      getApartJongnoIndecreaseData,
      getApartKangnamIndecreaseData,
      getApartKangdongIndecreaseData,
      getApartTargetAreaIncreaseData,
    } = this;
    // getApartMonthlyPriceData();
    getApartGuroIndecreaseData();
    getApartGwanakIndecreaseData();
    getApartJongnoIndecreaseData();
    getApartKangnamIndecreaseData();
    getApartKangdongIndecreaseData();
    getApartTargetAreaIncreaseData();
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      apartGuroIndecreaseData,
      apartGwanakIndecreaseData,
      apartJongnoIndecreaseData,
      apartKangdongIndecreaseData,
      apartKangnamIndecreaseData,
      apartTargetAreaIncreaseData,
      place
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
          <Grid container alignItems="center">
            <CssTextField
              id="outlined-uncontrolled"
              label="건물 명"
              defaultValue=""
              className={classNames(classes.textField)}
              margin="normal"
              variant="outlined"
            />
            <Button variant="outlined" className={classes.button}>
              검색
            </Button>
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
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <PieChart
              name="pieChart1"
              data={pieChartData}
              height={300}
              title="아파트 매매"
              desc="2016년 월별 아파트 매매 금액"
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
          <Grid item md={12} xs={12}>
            <div style={{ width: '100%', margin: '15px 0px 15px 0px' }}>
              <SearchPlace></SearchPlace>
            </div>
            <MapContainer searchPlace={place} />
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
