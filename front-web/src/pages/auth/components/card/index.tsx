import React from 'react';

import './styles.scss';

type Props = {
    titulo: string;
    children: React.ReactNode;
}

const AuthCard = ({ titulo, children }: Props) => {
    return (
        <div className="card-base border-radius-20 auth-card">
            <h1 className="titulo-auth-card">
                {titulo}
            </h1>
            {children}
        </div>
    );
}

export default AuthCard;