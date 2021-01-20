import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../card';
import ButtonIcon from 'core/components/buttonIcon';

import './styles.scss';

type FormData = {
    email: string;
    senha: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <AuthCard titulo="login">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="email" className="form-control input-base margin-bottom-30" placeholder="e-Mail" name="email" ref={register}/>
                <input type="password" className="form-control input-base" placeholder="senha" name="senha" ref={register}/>
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