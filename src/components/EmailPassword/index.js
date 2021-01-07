import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './styles.scss';
import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import {auth} from "../../firebase/utils";

const initialState = {
    email: '',
    errors: []
}

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const {email} = this.state;

            const config = {
                url: 'https://react-syndicate-boutique.netlify.app/'
            }

            await auth.sendPasswordResetEmail(email, config).then(() => {
                this.props.history.push('/login')
            }).catch(() => {
                const err = ['E-mail not found. Please try again'];
                this.setState({
                    errors: err
                })
            })

        } catch (err) {
            //console.log(err);
        }
    }

    render() {
        const {email, errors} = this.state;

        const configAuthWrapper = {
            headline: 'RESET PASSWORD'
        }

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="E-mail"
                            onChange={this.handleChange}/>
                        <Button type="submit">
                            Send password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
}

export default withRouter(EmailPassword);