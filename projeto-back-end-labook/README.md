# Projeto Labook

<strong><em>LINK DA DOCUMENTAÇÃO: [Labook](https://documenter.getpostman.com/view/20352445/UzJJuctm)</em></strong>

Essa documentação foi desenvolvida por <em>Karen Naomi Cardoso Kubo </em> se utilizando: typescript, Node, APIs Rest, banco de dados (SQL), Knex, POO, arquitetura em camadas, autenticação e criptografia.

Esse projeto possui o objetivo de promover a conexão e interação entre seus mais diversos usuários. Os usuários podem criar posts de dois tipos ("evento" ou "normal"), comentá-los e curti-los também. 

A documentação é dividida em 5 partes:
<li>Usuários</li>
<li>Posts</li>
<li>Comentários</li>
<li>Likes</li>
<li>Conexões</li>
</br>
Em <strong>Usuários</strong>, é possível fazer o cadastro e o login - em ambas, você consegue recebe um token de autorização que será <strong>NECESSÁRIO</strong> para as demais requisições a seguir.
</br>
Em <strong>Posts</strong>, desde que você esteja logado (ou seja, passou adequadamente seu token), é possível fazer novos posts, selecioná-los (via id ou tipo - "evento" ou "normal") e até mesmo visualizar todos desde que se passe na <em>query</em> o n° da página (<em>page</em>).
</br>
Na parte de <strong>Comentários</strong>, é possível comentar um post (quantas vezes desejar) desde que se passe no body o id do post a ser comentado e o comentário.
</br>
É também possível, em <strong>Likes</strong>, um usuário curtir o post e descurtir desde que se passe no body o id desse post (OBS.: Não é possível curtir ou descurtir mais de uma vez!).
</br>
Por fim, em <strong>Conexões</strong>, o usuário consegue seguir outro usuário e deixar de seguí-lo também desde que se passe no body o id do usuário a ser seguido. Depois de seguí-los, você consegue visualizar as publicações de cada um através do endpoint de visualizar os feeds deles.

