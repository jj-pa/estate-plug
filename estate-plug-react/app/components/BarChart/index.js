import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import PapperBlock from '../PapperBlock/PapperBlock';
import draw from './vis';
import styles from './widget-jss';

class BarChart extends Component {

    componentDidMount() {
        draw(this.props);
    }

    componentDidUpdate(preProps) {
        draw(this.props);
    }

    render() {
        const { classes, intl } = this.props;
        return (
            <PapperBlock
                title={intl.formatMessage(messages.barchart_title)}
                icon="playlist_add_check"
                noMargin
                whiteBg
                colorMode="dark"
                desc={intl.formatMessage(messages.barchart_desc)}
                className={classes.root}
            >
                <div className='vis-barchart'/>
            </PapperBlock>
            
        )
    }
}

export default withStyles(styles)(injectIntl(BarChart));