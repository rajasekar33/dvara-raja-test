import React, { Component } from 'react';
import axios from 'axios';

import classes from './UserForm.css';
import Form from '../formGenerator/Form';
import Button from './Button';
import ResultPage from './resultPage/ResultPage';

class UserForm extends Component {
    state = {
        results: [],
        orderForm: {
            name: {
                elementType: 'input',
                label: '',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                css: "border-bottom"
            },
            number: {
                label: '',
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter Mobile Number',
                    maxLength: 10
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                css: "border-bottom"
            },

            file: {
                elementType: 'file',
                label: '',
                elementConfig: {
                    type: 'file',
                    placeholder: 'Upload Picture'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: true,
            },


            spam: {
                elementType: 'hidden',
                isHidden: true,
                value: '1535793450750',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    componentDidMount() {
        axios.get("/api/users").then(res => {

            console.log(res, "sssssssssss")

            this.setState({results: res.data})
        })
    }

    createUser = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        let photo = document.getElementById("fileUpload").files[0];
        const formObj = new FormData();
        const reader = new FileReader();

        if (photo) {
            reader.readAsDataURL(photo);
        }
        reader.onload = (readerEvent) => {
            formObj.append("file", readerEvent.target.result);

            formObj.append('name', formData.name)
            formObj.append('number', formData.number)
            axios.post('/api/users', formObj)
            .then(res => {
                let records = {...this.state}
                records = [...records.results]

                console.log(records, res, "SSSSSSSSSSSSSSSSSS")
                records = [...res.data, ...records]
                this.setState({results: records})
                this.resetForm("User created successfully", 'success')
            }).catch(err => {
                console.log(err)
                this.resetForm("Something went wrong", 'danger')
            })
        };

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    resetForm = (message, type) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        for (let inputIdentifier in updatedOrderForm) {
            updatedOrderForm[inputIdentifier].value = ''
            updatedOrderForm[inputIdentifier].touched = false;
            if(inputIdentifier !== 'file' && inputIdentifier !== 'spam')
                updatedOrderForm[inputIdentifier].valid = false
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: false, alert: message, alertType: type });

        setTimeout(() => {
            this.setState({ alert: null, alertType: null})
        }, 3000);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.createUser}>
                {formElementsArray.map(formElement => {
                    if (formElement.config.isHidden) {
                        return null;
                    }

                    return <Form
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        css={formElement.config.css}
                    />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );

        return (
            <div className={classes.ContactData}>
                <h4>ADD USER DETAILS</h4>
                {this.state.alert && <div className={`alert ${this.state.alertType}`}>{this.state.alert}</div>}
                {form}

                <div>
                    <ResultPage results={this.state.results} />
                </div>
            </div>
        );
    }
}

export default UserForm;