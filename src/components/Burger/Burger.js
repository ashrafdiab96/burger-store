import React from 'react';
// import {withRouter} from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

/**
 * @method burger @version 1.0
 * @param {*} props
 * Get the ingredients object from BurgerBuilder class
 * Convert this object to array via Object.keys @function
 * Map into this array and create copy of it
 * Map into copied array
 * @returns <BurgerIngredient> with the choosen ingredient type and the quantity
 * @returns every array element in single value via reduce -built in- js @function
 * Check if there is no ingredients, show paragraph
 * @returns JSX
 */
const burger = (props) => {
    let myIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (myIngredients.length === 0) {
        myIngredients = <p>Please, start to add ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {myIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

// export default withRouter(burger);  // give us access to component props when using routing
export default burger;