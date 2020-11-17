import React, {useContext, useState} from "react";
import UserContext from "../contexts/UserContext";
import { useHistory } from 'react-router-dom';
import styled from "styled-components/";

const initialState = {
    email: "",
    password: "",
};

export default function LoginPage() {
    const { loginWithUserCredentials } = useContext(UserContext);
    const [loginData, setLoginData] = useState(initialState);
    const [error, setError] = useState("");
    const history = useHistory();

    return (
        <StyledLoginPage>
            <StyledSplashSection>
                <img src="./images/spotown_logo_splash.jpg" alt="Spotown logo splash"/>
            </StyledSplashSection>
            <StyledForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    <input
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <label>
                    <input
                        name="password"
                        placeholder="password"
                        value={loginData.password}
                        onChange={handleChange}
                        type="password"
                    />
                </label>
                {error && <p>{error}</p>}
                <button>Login</button>
            </StyledForm>
        </StyledLoginPage>
    );

function handleChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
}

function handleSubmit(event) {
    event.preventDefault();
    loginWithUserCredentials(loginData)
        .then(() => history.push("/"))
        .catch(() => setError("Unknown email or password."));
}

}

const StyledLoginPage = styled.div`
display: grid;
column-gap: 5px;
row-gap: 23px;
grid-template-columns: 23px auto 23px;
grid-template-rows: fit-content() auto;

`
const StyledForm = styled.form`
grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 3;
  
  button{
  display: block;
  color: white;
  background-color: var(--accent-red);
  border-radius: 100px;
  padding: var(--size-l);
  width: 100%;
  border: none;
  font-weight: bold;
  font-size: var(--size-l); 
  }
  
  input{
  margin: 10px 0;
  display: block;
  background-color: var(--light-grey);
  border-radius: 100px;
  padding: var(--size-l);
  width: 100%;
  border: none;
  color: var(--dark-grey);
 
  }
  
  
`
const StyledSplashSection = styled.div`
grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
  
  img {
  border-radius: 10px;
  max-width: 100%;
  max-height: content-box;
  }
`
