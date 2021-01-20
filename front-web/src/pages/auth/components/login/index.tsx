import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../card';
import ButtonIcon from 'core/components/buttonIcon';
import { makeLogin } from 'core/utils/request';

import './styles.scss';
import { saveSessionData } from 'core/utils/auth';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.push('/admin');
            })
            .catch(() => {
                setHasError(true);
            })
    }

    return (
        <AuthCard titulo="login">

            {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário o senha inválidos!
                </div>
            )}    

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="email" 
                    className="form-control input-base margin-bottom-30" 
                    placeholder="e-Mail" 
                    name="username" 
                    ref={register({required: true})}
                />
                
                <input 
                    type="password" 
                    className="form-control input-base" 
                    placeholder="senha" 
                    name="password" 
                    ref={register({required: true})}
                />
                
                <Link to="/admin/auth/recuperar" className="login-link-recuperar">
                    Esqueceu a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="logar" />
                </div>
                <div className="text-center">
                    <span className="nao-registrado">
                        Não tem cadastro?
                    </span>
                    <Link to="/admin/auth/cadastro" className="login-link-cadastrar">
                        cadastrar
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}

export default Login;