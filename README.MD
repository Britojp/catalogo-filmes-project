# Vue.js Movie Finder

Este é um exemplo de aplicação em **Vue.js** que utiliza **Axios** para realizar requisições HTTP e **Pinia** para gerenciar o estado global da aplicação. O objetivo da aplicação é buscar filmes da API do TMDB (The Movie Database) e exibir as informações dos filmes na interface.

## Tecnologias Utilizadas

- **Vue.js**: Para construção da interface.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **Pinia**: Gerenciamento de estado global na aplicação.
  **Router** : Gerenciar as rotas da aplicação
- **TMDB API**: API que fornece informações sobre filmes, séries e outros dados relacionados ao cinema.

## Funcionalidades

- Mostra os filmes e séries mais vistos;
- Exibição de resultados: Mostra uma lista de filmes com informações como título, imagem e descrição.
- Gerenciamento de estado global: Usa o Pinia para armazenar os dados da pesquisa e o estado de carregamento.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter as seguintes ferramentas instaladas:

- **Node.js**

## Como Rodar a Aplicação

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/vue-movie-finder.git
```

## Configure a chave API do TMDB

Para interagir com a API do TMDB, você precisa de uma chave de API. Siga os passos abaixo:

Crie uma conta no TMDB: https://www.themoviedb.org/

Crie uma chave de API: https://www.themoviedb.org/settings/api

Depois de obter sua chave de API, crie um arquivo .env na raiz do projeto e adicione a chave da seguinte forma:

```bash
VUE_APP_TMDB_API_KEY=sua-chave-da-api
```
  