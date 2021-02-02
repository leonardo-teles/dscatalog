import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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

type LocationState = {
    from: string;
}

const Login = () => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/admin" } };

    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.replace(from);
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
                <div className="margin-bottom-30">
                    <input 
                        type="email" 
                        className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`} 
                        placeholder="e-Mail" 
                        name="username" 
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email inválido"
                            }
                          })}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username.message}    
                        </div>                    
                    )}
                </div>
                <div className="margin-bottom-30">
                    <input 
                        type="password" 
                        className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`} 
                        placeholder="senha" 
                        name="password" 
                        ref={register({required: "Campo obrigatório"})}
                    />
                    {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password.message} 
                        </div>                    
                    )}
                </div>                
                
                <Link to="/auth/recuperar" className="login-link-recuperar">
                    Esqueceu a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="logar" />
                </div>
                <div className="text-center">
                    <span className="nao-registrado">
                        Não tem cadastro?
                    </span>
                    <Link to="/auth/cadastro" className="login-link-cadastrar">
                        cadastrar
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}

export default Login;