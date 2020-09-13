import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form/immutable';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Help from '@material-ui/icons/Help';
import Avatar from '@material-ui/core/Avatar';
import dummy from 'enl-api/dummy/dummyContents';
import avatarApi from 'enl-api/images/avatars';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { TextFieldRedux } from './ReduxFormMUI';
import messages from './messages';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? <FormattedMessage {...messages.requiredForm} /> : undefined);

class LockForm extends React.Component {
  state = {
    anchorEl: null,
  };

  handleShowHint = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      intl
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={classes.lockWrap}>
            <Avatar alt="Jeongjin Park" src={avatarApi[6]} className={classes.avatar} />
            <div>
              <Typography className={classes.userName} variant="h5">{dummy.user.name}</Typography>
              <div className={classes.lockForm}>
                <FormControl className={classes.lockField}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="password"
                    label={intl.formatMessage(messages.loginFieldPassword)}
                    required
                    validate={required}
                    className={classes.field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Helper Hint"
                            onClick={this.handleShowHint}
                          >
                            <Help />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
                <Fab size="small" color="secondary" type="submit" disabled={submitting || pristine}>
                  <ArrowForward className={classes.signArrow} />
                </Fab>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography className={classes.hint}>
                    <FormattedMessage {...messages.lockHint} />
                  </Typography>
                </Popover>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}

LockForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
};

const LockFormReduxed = reduxForm({
  form: 'immutableELockFrm',
  enableReinitialize: true,
})(LockForm);

export default withStyles(styles)(injectIntl(LockFormReduxed));
