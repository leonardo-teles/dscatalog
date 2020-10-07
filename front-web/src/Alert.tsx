import { type } from 'os';
import React from 'react';

type Props = {
    text?: string;
}

const Alert = ({ text }: Props) => (
    <div className="alert alert-primary">
        Olá, {text}!
    </div>
);

export default Alert;