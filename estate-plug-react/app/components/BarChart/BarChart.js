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
        const { name, title, desc } = this.props;
        return (
            <PapperBlock
                title={title}
                icon="playlist_add_check"
                noMargin
                whiteBg
                colorMode="dark"
                desc={desc}
                className={classes.root}
            >
                <div className={name}/>
            </PapperBlock>
            
        )
    }
}

export default withStyles(styles)(injectIntl(BarChart));