# Projeto Cookenu

<strong><em>LINK DA DOCUMENTAÇÃO: [Labook](https://documenter.getpostman.com/view/20352445/UzBvFNpQ)</em></strong>

Essa documentação foi desenvolvida por <em>Karen Naomi Cardoso Kubo </em> se utilizando: typescript, Node, APIs Rest, banco de dados (SQL), Knex, POO, arquitetura em camadas, autenticação e criptografia.

Esse projeto nada mais é do que uma rede social, na qual os usuários podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. Ela possui todas as funcionalidades mais comuns em redes sociais:

1. **Cadastro**
    
   O usuário precisa informar: o e-mail, nome, role e sua senha para realizar o cadastro. A senha tem uma regra: ela deve conter, no mínimo, 6 caracteres. No role (tipo) do usuário, só pode ser aceito ADMIN ou NORMAL. O usuário administrador (ADMIN) tem mais possibilidades de executar ações.
    
2. **Login**
    
    Basta informar o email e a senha corretamente que o usuário poderá se logar na aplicação. Os endpoints de login e cadastro devem retornar **um** **token.**
    
3. **Informações do próprio perfil**
    
    A partir do token de autenticação fornecido no login, o usuário deve ser capaz de ver as suas informações não sensíveis salvas no banco (id e email)
    
4. **Criar receitas**
    
    O usuário pode criar uma receita. A receita deve ter os seguintes atributos: título, descrição/modo de preparo e data de criação
    
5. **Seguir/deixar de seguir usuário**
    
    Um usuário pode seguir outros usuários. Para isso, ele deve fornecer o id do usuário que deseja seguir. Essa funcionalidade se assemelha ao do instagram: um usuário seguir outro, não significa que "esse outro" está seguindo o primeiro. O contrário também é possível, um usuário pode deixar de seguir um outro usuário utilizando o endpoint de deixar de seguir.
    
6. **Feed**
    
    Um usuário pode visualizar as receitas criadas pelos usuários que ele segue. As receitas estão ordenadas pela data de criação.

7. **Editar receita**

    Um usuário "normal" deve ser capaz de editar uma receita própria dele, mas se ele tentar editar o post de outra pessoa, o endpoint retorna um erro.
    
- **Deletar receita**
    O usuário normal consegue deletar apenas os próprios posts/receitas, porém, o administrador consegue deletar qualquer receita que ele desejar.
