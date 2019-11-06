import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "../App";
import * as firebase from 'firebase'
import FormGroup from '@material-ui/core/FormGroup'
import { RouteComponentProps, withRouter } from "react-router-dom";

const Login = (props: RouteComponentProps) => {

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
            <h1>Login</h1>
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
                <Button color='primary' size='large' type='submit'>Login</Button>
                <span>{errors}</span>
                </ FormGroup>
            </form>
        </Container>)

}

export default withRouter(Login)