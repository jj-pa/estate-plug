import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import withWidth from '@material-ui/core/withWidth';
import styles from './cardStyle-jss';
import messages from './messages';

class PostCard extends React.Component {
  state = { };

  render() {
    const {
      classes,
      name,
      date,
      image,
      title,
      content,
      detailOpen
    } = this.props;
    return (
      <Card className={classes.cardSocmed}>
        { image !== '' && (
          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />
        )}
        <CardContent>
          <Typography variant="subtitle2">
            {title}
          </Typography>
          <Typography variant="body2">
            {content}
          </Typography>
          <Typography variant="caption">
            {date + ', ' + name}
          </Typography>
        </CardContent>
        <CardActions className={classes.rightAction}>
          <Button size="small" variant="outlined" color="secondary" onClick={detailOpen}>
            <FormattedMessage {...messages.see_detail} />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  detailOpen: PropTypes.func
};

PostCard.defaultProps = {
  image: '',
  detailOpen: () => (false)
};

const PostCardResponsive = withWidth()(PostCard);
export default withStyles(styles)(PostCardResponsive);
