# Changelog

Todas as mudanças para este projeto serão documentadas neste arquivo.

O formato é baseado no [Mantenha um Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/spec/v2.0.0.html).

**As únicas diferenças serão:**

* O documento deverá ser mantido em *pt-BR*;
* As datas deverão obedecer ao formato brasileiro *DD/MM/YYYY*.


## [Não publicado]
### Corrigido
- Corrigimos as mensagens de validação na página Mi Cuenta.
- Corrigimos os selects da página Mi Cuenta para iniciarem vazios.
- Corrigimos a cor do ícone do item de menu Mi Cuenta.

### Adicionado
- Adicionamos o pacote do usuário na página Mi Cuenta.

### Modificado
- Alteramos o tamanho do avatar no menu do usuário.
- Alteramos a página Mi Cuenta para redirecionar o usuário para Home ao salvar os dados.

## [0.2.1] - 20/01/2020
### Adicionado
- Adicionamos o login via Facebook na Modal de Login.


## [0.2.0] - 15/01/2020
### Adicionado
- Adicionamos e iniciamos um changelog.
- Adicionamos as dependencias para Material-UI, Formik e Yup.
- Adicionamos uma verificação automática em cada requisição a API para verificar se o usuário continua com autorização para se comunicar - ou seja, está logado - que em caso não estiver, desloga o usuário da plataforma tanto nas requisições no lado cliente como no servidor.

### Modificado
- Modificamos a margem superior do conteúdo pra espelhar a altura do cabeçalho que foi modificada.
- Atualizamos o leia-me.
- O link descargas (downloads) do menu do rodapé no mobile foi substituído por um link para Mi Lista.
- Modificamos a página da conta do usuário.
- Modificado o formulário da conta de usuário para utilizar o Formik.
- Alteramos a forma como salvamos o usuário para poder verificar se ele está logado antes mesmo da página exibir.
- Alteramos a página de erro para a cor preta com branco, adicionamos o logo e fizemos mostrar uma mensagem 503 caso a API esteja indisponível.
- Modificamos os campos de cartão de crédito para fazer a encriptação dos dados de acordo com a PayU e enviar para nossa API.

### Corrigido
- Corrigimos a margem inferior dos cards em listas fora dos carroséis.
- Corrigimos a centralização do modal de login pra mobile.
- Corrigimos o botão Mi-lista do rodapé para mostrar a modal de login quando o usuário não estiver logado.


## [0.1.0] - 18/12/2019

### Corrigido
- Corrigimos a responsividade do player de vídeo para os links de YouTube que estão sendo usados por enquanto.

### Modificado
- Passamos o cover do Napoléon que estava estático para um conteúdo dinâmico do admin (o que corrige o botão de Mi Lista). Também refatoramos todos os estilos desse mesmo cover pra mostrar mais certinho em mobile / tablet e desktop e ficar mais fácil de dar manutenção.
- Banners da home passaram a linkar para os sites dos patrocionadores.

### Removido
- Retirado os links de menu Configurações e Ajustes que estavam nos dropdowns de usuário logado e deslogado.
- Foram retirados os botões que constavam em cima dos banners da home quando o usuário está deslogado.
- O botão de ver mais saiu do cover da Home quando deslogado.
