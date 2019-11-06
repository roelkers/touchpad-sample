import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "../App";
import * as firebase from 'firebase'
import FormGroup from '@material-ui/core/FormGroup'
import { RouteComponentProps, withRouter } from "react-router-dom";

const Join = (props: RouteComponentProps) => {

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
        if (values.password !== values.confirmPassword) return setErrors('password and confirm-password should be the same.')
        firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(res => {
            if (res.user) {
                Auth.setLoggedIn(true);
                props.history.push('/play')
            }
        })
        .catch(e => {
          setErrors(e.message);
        });
    };

    return(
        <Container maxWidth='xs'>
            <h1>Join</h1>
            <form onSubmit={e => handleForm(e)}>
                <FormGroup>
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
                    onChange={handleChange('confirmPassword')}
                    margin="normal"
                />
                <Button color='primary' size='large' type='submit'>Join</Button>
                <span>{errors}</span>
                </FormGroup>
            </form>
        </Container>)

}

export default withRouter(Join)