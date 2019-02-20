/**
 * Copied from https://material-ui.com/demos/progress/#circular-indeterminate for CircularProgress
 * Installation requires: npm install @material-ui/core
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function CircularIndeterminate(props) {
    const { classes, color } = props;
    let style = { color: color };
    return (
        <div style={{ textAlign: 'center' }}>
            <CircularProgress className={classes.progress} style={style} />
        </div>
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
