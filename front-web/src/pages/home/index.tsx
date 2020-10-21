import React from 'react';
import { ReactComponent as MainImage } from '../../core/assets/imagens/main.svg';
import ButtonIcon from '../../core/components/buttonIcon';
import { Link } from 'react-router-dom';
import './styles.scss';

const Home = () => (
    <div className="home-container">
        <div className="row home-content card-base border-radius-20">
            <div className="col-6 home-text">
                <h1 className="titulo-texto">
                    Conheça o melhor catálogo de produtos
                </h1>
                <p className="subtitulo-texto">
                    Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.
                </p>
                <Link to="/catalogo">
                    <ButtonIcon text="inicie agora a sua busca" />
                </Link>    
            </div>
            <div className="col-6">
                <MainImage className="imagem-principal"/>
            </div>
        </div>
    </div>
);

export default Home;