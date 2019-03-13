import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Fastest', displayValue: 'fastest'},
                        {value: 'Cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        // form by default runs this and reloads the page, prevent this default behaviour using 
        // event object
        event.preventDefault();

        this.setState({loading: true});

        const formData = {};

        for (let formElIdentifier in this.state.orderForm) {
            formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        //firebase needs you to append the .json for its readability
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({
                loading: false,
            });
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({
                loading: false
            });
        });
    };

    checkValidity (value, rules) {
        let isValid =  true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormEl = {...updatedOrderForm[inputIdentifier]};
        updatedFormEl.value = event.target.value;
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
        updatedFormEl.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormEl;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const fromElementsArray = [];
        for (let key in this.state.orderForm) {
            fromElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
                <form className={classes.ContactData} onSubmit={this.orderHandler}>
                    <h4>Enter your contact information:</h4>
                    {fromElementsArray.map(fromElement => (
                        <Input key={fromElement.id}
                            elementType={fromElement.config.elementType} 
                            elementConfig={fromElement.config.elementConfig}
                            value={fromElement.config.value}
                            invalid={!fromElement.config.valid}
                            shouldValidate={fromElement.config.validation}
                            touched={fromElement.config.touched}
                            onChangeHandler={(event) => {
                                return this.inputChangeHandler(event, fromElement.id);
                            }}/>
                    ))}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div>
                {form}
            </div>
        );
    }
};

export default ContactData;