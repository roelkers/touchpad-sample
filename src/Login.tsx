import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "./App";
import * as firebase from 'firebase'

const Login = () => {

    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = React.useState('')

    const handleChange = (name: string) => (event: any) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const Auth = useContext(AuthContext);
    const handleForm = (e:any) => {
        if(Auth === null) return 
        e.preventDefault();
        firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(res => {
          if (res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
          setErrors(e.message);
        });
    };

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleForm(e)}>
                <TextField
                    id="email"
                    label="E-Mail"
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange('password')}
                    margin="normal"
                />
                <Button type='submit'>Login</Button>
                <span>{errors}</span>
            </form>
        </div>)

}

export default Login