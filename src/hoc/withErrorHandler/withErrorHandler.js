import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

/**
 * this is a function that rceives wrappedCompnenet as the parameter
 * and returns a frunction that takes props as argument
 */
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {error: null}

        // find this out why we changed from componenet did mount to will mount
        // did mount loads after the wrapped componenet is rendered hence 
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // chapter:178:
        // the interceptors are set up and never removed, hence when we wrap mulitple components around 
        // wrappedComponent, the other axios interceptors are aslo run (existing in memory)
        // which cause memory leak. Hence they must be closed.
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        // wrappedcomponent for burgerBuilder has no props
        render () {
            return (
                <Aux>
                    <Modal 
                      show={this.state.error}
                      modalClosed={this.errorConfirmedHandler}>
                        {!this.state.error ? null: this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
};

export default withErrorHandler;