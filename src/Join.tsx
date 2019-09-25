import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "./App";
import * as firebase from 'firebase'

const Join = () => {

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = React.useState('')
    const handleChange = (name: string) => (event: any) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const Auth = useContext(AuthContext);
    const handleForm = (e: any) => {
        if(Auth === null) return 
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(res => {
          if (res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
          setErrors(e.message);
        });
    };

    return(
        <div>
            <h1>Join</h1>
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
                <TextField
                    id="email"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange('confirmpassword')}
                    margin="normal"
                />
                <Button type='submit'>Join</Button>
                <span>{errors}</span>
            </form>
        </div>)

}

export default Join