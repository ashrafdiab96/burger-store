import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxe/Auxe';

/**
 * @method withErrorHandler
 * Render and handel errors via global interceptors
 * @param {*} WrappedComponent -> component has the error
 * @param {*} axios -> render error via the global interceptors
 * @returns @class
 */
const withErrorHandler = (WrappedComponent, axios) => {

    /**
     * @class
     * We will use this class here, because we want to use componentDidMount
     */
    return class extends Component {
        state = {
            error: null
        }

        /**
         * @method componentWillMount
         * We using componentWillMount instead of componentDidMount
         * Becuase componentDidMount is called after the child component rendered
         * Use global interceptor to handel request and response errors
         * In request we will set error to null
         * In response we will set error with the show error
         * @returns request and response
         */
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        /**
         * @method componentWillUnmount
         * Remove inceptors when component destroy, to avoid memory leak and other errors
         */
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        /**
         * @method errorConfirmedHandler
         * Set error with null after clicking on the backdrop, to remove the modal
         */
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        /**
         * @method render
         * We will show model, when error is exists
         * Close the modal after click on the backdrop
         * Check if there is an error, show this error message
         * Return the wrapped component with it's props
         * We returned props, because we didn't know it and want not to lose it
         * @returns JSX
         */
        render () {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;