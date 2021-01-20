import React from 'react';
import AuthCard from '../card';

import './styles.scss';

const Login = () => {
    return (
        <AuthCard titulo="login">
            <form className="login-form">
                <h3>Formulário de login</h3>
            </form>
        </AuthCard>
    );
}

export default Login;