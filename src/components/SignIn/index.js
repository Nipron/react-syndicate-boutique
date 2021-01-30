import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {emailSignInStart, signInWithGoogle, resetAllAuthForms} from "../../redux/User/user.actions";

import './styles.scss';
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    const {currentUser} = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            resetForm();
           // dispatch(resetAllAuthForms());
            props.history.push('/')
        }
    }, [currentUser]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));
    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    }

    const configAuthWrapper = {
        headline: 'Log In'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="E-mail"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <Button type="submit">
                        Log In
                    </Button>

                    <div className="socialSignin">
                        <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to="recovery">
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default withRouter(SignIn);
