# Lembry - TODO

## Funcionalidades Principais

### Autenticação
- [x] Sistema de login com email e senha (via Manus OAuth)
- [x] Integração com Google OAuth (via Manus OAuth)
- [x] Página de registro de usuário (via Manus OAuth)
- [ ] Recuperação de senha

### Interface Principal
- [x] Dashboard com área de trabalho para stickers
- [x] Logo com mascote tipo Clippy no canto superior esquerdo
- [x] Ícone de lixeira no canto superior direito

### Funcionalidade de Stickers
- [x] Criar novo sticker (bloco de lembrete)
- [x] Editar texto do sticker (clique abre quadrado de edição)
- [x] Botão OK para fixar texto após edição
- [x] Arrastar stickers pela página
- [x] Fixar stickers em qualquer posição
- [x] Sobreposição de stickers (z-index)
- [x] Descartar stickers (enviar para lixeira)

### Persistência de Dados
- [x] Salvar stickers no banco de dados
- [x] Carregar stickers do usuário ao fazer login
- [x] Sincronizar posição e conteúdo dos stickers

### Design e UX
- [x] Paleta de cores atraente com perfil de escritório
- [ ] Interface responsiva (melhorias futuras)
- [ ] Animações suaves para arrastar e soltar (melhorias futuras)
- [x] Feedback visual para interações

### Testes
- [x] Testes unitários para procedimentos tRPC (13 testes passando)
- [ ] Testes de integração para fluxo de autenticação
- [x] Testes de funcionalidade de stickers


## Melhorias Solicitadas

- [x] Redesenhar stickers com aparência de post-it real
- [x] Adicionar placeholder "Escreva aqui..." nos stickers
- [x] Substituir logo por imagem fornecida e criar animação GIF
- [x] Remover fundo branco do GIF da logo e deixar transparente
- [x] Mover botão de criar novo sticker para canto superior direito ao lado da lixeira
- [x] Alterar background do site com imagem de textura de pedra
