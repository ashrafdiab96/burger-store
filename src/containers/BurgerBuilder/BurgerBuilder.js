import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxe/Auxe';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

/**
 * @class BurgerBuilder
 * This class to build the structure of burger sandwich
 * @param {*} ingredients -> state param includes the burger sandwich ingredients and them order
 * @method updatePurchaseState -> method to update the order button status
 * @method addIngredient -> method to add ingredient
 * @method removeIngredient -> method to remove ingredient
 */
class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    /**
     * @method componentDidMount
     * get the ingredients dynamically from our firebase db
     */
    componentDidMount() {
        this.props.onInitIngredients();
    }

    /**
     * @method updatePurchaseState() @version 1.0
     * Update the order button status, to disable or enable it
     * @param {*} ingredients
     * Get the ingredients object
     * @return the object enumerable properties as an array
     * update the state by set purchasable by true if the array length > zero
     * @returns summation of ingredients
     */
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    };

    /**
     * @method purchaseHandler @version 1.0
     * Set purchasing equal true
     * Using to show order summary after click on order now button
     */
    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    /**
     * @method purchaseCancel @version 1.0
     * Set purchasing equal false
     * Using to hide order summary after click on the backdrop
     */
    purchaseCancel = () => {
        this.setState({purchasing: false});
    };

    /**
     * @method purchaseContinue @version 1.0
     * Handel continue state
     * Pass order data to our firebase when click on continue button in order summary
     */
    purchaseContinue = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    /**
     * @method render @version 1.0 
     * Built-in react @method
     * Check if there isn't ingredients, to disable less button
     * @returns JSX
     */
    render () {
        /**
         * Handeling disable attribute
         * Fire it when ingredients are less than 1
         */
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        /* Show spinner until the ingredients are load */
        let burger = this.props.error ? <p style={{color:'red'}}>Ingredients can't be loaded!</p> : <Spinner />;
        /**  
         * Check if ingredients are exist
         * Show burger, build controls, and order summary components
         */
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientesAdded}
                        ingredientRemoved = {this.props.onIngredientesRemoveed}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancel}
                purchaseContinue={this.purchaseContinue}
                price={this.props.price}
            />;
        }

        /**
         * Show order summary after clicking on order now button
         * Show burger and build control components
         */
        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancel} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientesAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientesRemoveed: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));