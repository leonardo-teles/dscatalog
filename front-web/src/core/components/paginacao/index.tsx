import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/imagens/arrow.svg'
import ReactPaginate from 'react-paginate';

import './styles.scss';

type Props = {
    totalPaginas: number;
    onChange: (item: number) => void;
}

const Paginacao = ({ totalPaginas, onChange }: Props) => {

    const renderizarIcone = (type: 'anterior' | 'proximo') => (
        <ArrowIcon 
            className={`paginacao-${type}`}            
            data-testid={`arrow-icon-${type}`}
        />
    );

    return (
        <div className="container-paginacao">
            <ReactPaginate 
                pageCount={totalPaginas}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={selectedItem => onChange(selectedItem.selected)}
                previousLabel={renderizarIcone('anterior')}
                nextLabel={renderizarIcone('proximo')}
                containerClassName="pagination"
                pageLinkClassName="item-paginacao"
                breakClassName="item-paginacao"
                activeLinkClassName="active"
                previousClassName="pagina-ativa"
                nextClassName="pagina-ativa"
                disabledClassName="pagina-inativa"
            />
        </div>
        
    );
}

export default Paginacao;