import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount () {
        // props.location.search is a literal query string, convert ro URLSEarchParas
        const query = new URLSearchParams(this.props.location.search);
        console.log(query)
        console.log(query.entries());
        let ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // each param is like [param[0], param[1]]
            //+ sign in front of a string converts it into a number
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice:price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>

                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} 
                        price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;

//Note: ContactData required the history prop from here and also the items from state
// Ideal solution is to use the render method, when we use render method, we can pass props and history 
// param as prop too
// if we use component for contactdata in route then we cannot send props

//alternate way, use withRouter wrapper around Contact data, but cant send inggredients props