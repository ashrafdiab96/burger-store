import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

/**
 * @var {*} controls
 * This variable is an array of objects
 * @key label -> ingredient name which will appear in the view
 * @key type -> ingredient type which wil use in handel the application
 */
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Mushroom', type: 'mushroom'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

/**
 * @function buildControls
 * @param {*} props
 * Functional based component
 * Map int controls array and pass label and type to buildControl component
 * @returns nothing
 */
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered} >ORDER NOW</button>
    </div>
);

export default buildControls;