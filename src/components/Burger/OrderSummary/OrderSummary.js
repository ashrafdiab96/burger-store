import React, {Component} from 'react';
import Aux from '../../../hoc/Auxe/Auxe';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

/**
 * @class OrderSummary
 * Handel order summary
 */
class OrderSummary extends Component {
    /**
     * @function componentDidUpdate
     * Component lifecycle function
     * Get the updated component
     * Just for test
     */

    /**
     * @function render
     * Component built-in function
     * Map on ingredients object and show its items order summary
     * @returns JSX
     */
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <tr key={igKey}>
                    <td>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>
                    </td>
                    <td>
                        {this.props.ingredients[igKey]}
                    </td>
                </tr>
            );
        });

        return (
            <Aux>
                <h3 className={classes.center}>Your Order</h3>
                <p className={classes.center}>A delicious burger with the following ingredients:</p>
                <table className={classes.customers}>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            {/* <td>Price</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientSummary}
                        <tr>
                            <td className={classes.tableBottom}>Total Price</td>
                            <td className={classes.tableBottom}>$ {this.props.price.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <p className={classes.center}>Continue to checkout?</p>
                <div className={classes.center}>
                    <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                    <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
                </div>
            </Aux>
        );
    }
};

export default OrderSummary;