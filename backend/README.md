# ➤ DSCatalog

Sistema de cadastro de usuários, categorias e produtos.<br/>
Irá incluir login e senha para acesso e recurso de recuperação de senha.

### ➤ Status do Projeto

<img src="https://img.shields.io/badge/Em%20Constru%C3%A7%C3%A3o-50%25-yellow"/>

### ➤ Features

<img src="https://img.shields.io/badge/CRUD%20de%20Categorias-100%25-success"/>
<img src="https://img.shields.io/badge/CRUD%20de%20Produtos-100%25-success"/>
<img src="https://img.shields.io/badge/CRUD%20de%20Usu%C3%A1rios-0%25-red"/>
<img src="https://img.shields.io/badge/Seguran%C3%A7a-0%25-red"/>

### ➤ Tecnologias

<p align="left">
<img src="https://img.shields.io/static/v1?label=spring&message=framework&color=green&style=for-the-badge&logo=SPRING"/>&nbsp
<img src="https://img.shields.io/static/v1?label=react&message=js&color=blue&style=for-the-badge&logo=REACT"/>
</p>

### ➤ Competências:

- Criação do Projeto com Spring Boot
- Criação de um Mono Repositório Git
- Organização do Projeto em Camadas 
    - Controlador REST
    - Serviço
    - Acesso a Dados(Repository)
- Configurar Perfil de Teste do Projeto
- Seeding da Base de Dados 
- Criar Web Services REST
    - Parâmetros de Rota @PathVariable
    - Parâmetros de Requisição @RequestParam
    - Corpo de Requisição @RequestBody
    - Resposta de Requisição ResponseEntity<T>
- Padrão DTO
- Tratamento de Exceções
- Dados de Auditoria
- Paginação de Dados
- Associações entre Entidades (N-N)

### ➤ Como rodar a aplicação

1. No terminal, clone o projeto:
    
```
git clone https://github.com/leonardo-teles/dscatalog
```
2. Importe para dentro do seu Eclipse/STS e/ou IDE favorita
3. Execute a classe principal. O banco de dados H2 será criado automaticamente
4. Teste alguns endpoints JSON:<br/>
	- http://localhost:8080/categorias - GET (Buscar Todas)<br/>
	- http://localhost:8080/categorias/page?linhasPorPagina=5&pagina=0&direcaoOrdenacao=ASC - GET (Buscar Todas Paginado)<br/>
	- http://localhost:8080/categorias/1 - GET (Buscar por Id)<br/>
	- http://localhost:8080/produtos - GET (Buscar Todos)<br/>
	- http://localhost:8080/produtos/page?linhasPorPagina=5&pagina=0&direcaoOrdenacao=ASC - GET (Buscar Todos Paginado)<br/>
	- http://localhost:8080/produtos/1 - GET (Buscar por Id)
	
### ➤ Onde Testar

<a href="https://github.com/leonardo-teles/dscatalog">
	<img src="https://img.shields.io/badge/Backend-Github-blue"/>
</a>
&nbsp
<a href="#">
	<img src="https://img.shields.io/badge/Frontend%20--%20Em%20Breve-Heroku-blueviolet"/>
</a>
