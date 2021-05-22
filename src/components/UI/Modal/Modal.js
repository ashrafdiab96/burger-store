import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxe/Auxe';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    /**
     * @method shouldComponentUpdate
     * Improve application responsive throw update model only when order now button clicked
     * This will make via return if the next prop or children are changed
     * If order summary clicked that is mean the order noe button has clicked
     * @param {*} nextProp 
     * @param {*} nextState 
     * @returns {*} boolean
     */
    shouldComponentUpdate (nextProp, nextState) {
        return nextProp.show !== this.props.show || nextProp.children !== this.props.children;
    }

    /**
     * @method componentDidUpdate
     * Fire only when component updating
     * Just for test
     */

    render () {
        return ( 
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} >
                    {this.props.children}
                </div>
            </Aux>
        );
    };
}

export default Modal;