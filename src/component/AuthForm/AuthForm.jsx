import {Form, Link, useSearchParams} from "react-router-dom";

import Card from "../UI/Card/Card.jsx";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    console.log(mode);

    const password = (
        <p>
           <label htmlFor="password">Password</label>
           <input type="password" name="password" required autoComplete='on' placeholder='Password'/>
        </p>);
    const confirmPassword = (
        <p>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input type="password" name="confirmPassword" required placeholder='Confirm your password' />
        </p>
    );
    return (
        <Card>
            <Form className={classes.form}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required placeholder='Enter your email'/>
                </p>
                {mode !== 'reset' && password}
                {mode !== 'reset' && mode === 'signup' && confirmPassword}

                <div className={classes.actions}>
                    <Link to={'?mode=reset'}>Forget password?</Link>
                    <button>Log in</button>
                </div>
            </Form>
        </Card>

    );
};

export default AuthForm;