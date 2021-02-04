import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {emailSignInStart, googleSignInStart} from "../../redux/User/user.actions";

import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser} = useSelector(mapState)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/')
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
        dispatch(googleSignInStart());
    }

    const configAuthWrapper = {
        headline: 'Login Form'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div>
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

                    <div className="forgot-pass">
                        <Link to="recovery">
                            Forgot password?
                        </Link>
                    </div>
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
                    <div className="signup">
                        <span>Not a member? </span>
                        <Link to="registration">
                            sign up now
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default SignIn;
