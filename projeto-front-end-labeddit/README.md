# LABEDDIT - Rede Social
(com React.js - custom hooks, styled-components, react-router e axios)

# Link: [Labeddit](https://labeddit-karen-kubo.surge.sh/)

Abaixo estão as páginas existentes no projeto com suas respectivas funções.
## Página de Login:
A página de login possui dois campos de texto: email e senha. Ao fazer o login, o usuário deverá ser redirecionado para a página de feed.

A página possui também um botão "Criar conta", que leva o usuário para a página de cadastro.

## Página de Cadastro:
A página de cadastro possui 3 campos: nome de usuário, email e senha. O endpoint de cadastro retornará as mesmas informações do endpoint de login. Portanto, após cadastrar, o usuário deverá ser redirecionado para a página de feed, já estando logado (ou seja, com o token salvo no LocalStorage).

## Página de Feed (lista de Posts):
A página de feed deverá mostrar todos os posts, além de um formulário para a criação de post. 

Essa página só pode ser acessada por um usuário logado. Caso o usuário não esteja logado, deverá ser redirecionado para a página de login.

O formulário possui apenas o campo de texto. Cada post mostrará o nome de usuário que postou, o texto do post, o número de votos (positivo ou negativo) e o número de comentários. Caso o usuário tenha votado positiva ou negativamente, isso estará indicado.

Quando o usuário clicar em um post, ele deverá ser redirecionado para a página do respectivo post. 

Quando um usuário clicar em votar (positiva ou negativamente), uma requisição deverá ser feita indicando a "direção" do voto.

## Página do Post:
A página de um post mostrará o mesmo card de post da página de feed, com o usuário, texto, curtidas e número de comentários. 

Essa página só pode ser acessada por um usuário logado. Caso o usuário não esteja logado, deverá ser redirecionado para a página de login.

Abaixo, terá um formulário para criação de comentários e os cards de comentários. A estrutura é muito similar à do post, mas comentários não possuem outros comentários dentro deles. A lógica de votos é a mesma do post.