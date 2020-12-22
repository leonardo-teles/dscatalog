export type ProdutosResponse = {
    content: Produto[];
    totalPages: number;
}

export type Produto = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imgUrl: string;
    data: string;
    categorias: Categoria[];
}

export type Categoria = {
    id: number;
    nome: string;
}