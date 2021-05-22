import React from 'react';
import classes from './BuildControl.css';

/**
 * @function buildControl
 * @param {*} props
 * Functional based component
 * Show controls button to add or remove ingredients
 * @returns JSX
 */
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled} > Less
        </button>
        <button
            className={classes.More}
            onClick={props.added} > More
        </button>
    </div>
);

export default buildControl;