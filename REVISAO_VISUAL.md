# 🔍 Roteiro de Revisão Visual — Rede Social Pet

Guia para você testar tudo na tela e conferir se cada funcionalidade do desafio está funcionando.

## ▶️ Como subir o projeto

Abra **dois terminais**:

```bash
# Terminal 1 — backend (porta 3000)
cd backend
npm run dev

# Terminal 2 — frontend (porta 5173)
cd frontend
npm run dev
```

Depois abra no navegador: **http://localhost:5173**

> 💡 Dica: para testar interações sociais (curtir, seguir, chat), crie **2 contas** em navegadores/abas anônimas diferentes, ou faça logout/login alternando entre elas. O banco já tem alguns usuários de teste criados durante o desenvolvimento.

---

## ✅ Checklist de revisão por funcionalidade

### 1. Cadastro e Login
- [ ] Criar conta em **/sign-up**
- [ ] Fazer login em **/login**
- [ ] Ao logar, a navbar mostra **Feed, Buscar, Notificações, Mensagens, Perfil**

### 2. Perfil (foto, bio, contato) — *Fase 1*
- [ ] Ir em **Perfil** (/user)
- [ ] Clicar em **Editar Perfil**
- [ ] Preencher **Foto (URL)**, **Bio** e **Contato** e salvar
- [ ] Conferir que o avatar, a bio e o contato aparecem no card do perfil
  - Dica de URL de foto para teste: `https://placedog.net/200/200`

### 3. Posts e Feed — *Fase 1*
- [ ] Ir em **Feed** (/feed)
- [ ] Escrever um post na caixa "No que você está pensando..." e **Publicar**
- [ ] O post aparece no topo do feed com seu nome, foto e data
- [ ] (Opcional) colar uma URL de imagem/vídeo no campo de mídia e publicar
- [ ] Apagar um post seu pelo **×** (só aparece nos seus posts)

### 4. Curtidas e Comentários — *Fase 2*
- [ ] Clicar no **coração** de um post — o número sobe e o coração fica vermelho
- [ ] Clicar de novo para descurtir — o número desce
- [ ] Clicar no **💬** para abrir os comentários
- [ ] Escrever um comentário e **Enviar** — ele aparece na hora
- [ ] Apagar um comentário seu pelo **×**

### 5. Seguir usuários — *Fase 3*
- [ ] No feed, em um post de **outra pessoa**, clicar em **Seguir** (vira "Seguindo")
- [ ] Alternar as abas do feed entre **Todos** e **Seguindo**
- [ ] Na aba **Seguindo**, só aparecem posts de quem você segue
- [ ] Clicar em **Seguindo** para deixar de seguir

### 6. Busca — *Fase 4*
- [ ] Ir em **Buscar** (/busca)
- [ ] Buscar por um **nome** de usuário → aparece na seção "Pessoas"
- [ ] Buscar por uma **palavra** de um post → aparece na seção "Publicações"
- [ ] Buscar por **#hashtag** (ex: se você postou "#cachorro", busque `#cachorro`)

### 7. Notificações — *Fase 5*
- [ ] Com a conta A, **curtir/comentar/seguir** algo da conta B
- [ ] Logar como conta B → a navbar mostra um **badge vermelho** em "Notificações"
- [ ] Abrir **Notificações** (/notificacoes) → ver a lista ("fulano curtiu seu post", etc.)
- [ ] Ao abrir a página, o badge zera (marca como lidas)
- [ ] Conferir que curtir o **próprio** post NÃO gera notificação

### 8. Chat privado — *Fase 6*
- [ ] Ir em **Buscar**, achar um usuário e clicar em **Conversar**
- [ ] Escrever e enviar mensagens — aparecem em balões (as suas à direita, azuis)
- [ ] Ir em **Mensagens** (/chat) → a conversa aparece na lista lateral
- [ ] Com a outra conta, responder → a resposta aparece **sozinha em até 3s** (polling)

---

## 🎯 Cobertura do desafio (Atlântico — Desafio 1)

| Funcionalidade pedida no desafio | Onde revisar |
|---|---|
| Cadastro de usuários e login | seção 1 |
| Perfil com foto, nome, descrição e contato | seção 2 |
| Postagens com texto, imagens e vídeos | seção 3 |
| Comentários e curtidas | seção 4 |
| Feed de amigos/seguidos | seção 5 (aba "Seguindo") |
| Busca por usuários e posts / hashtag | seção 6 |
| Notificações de atividades | seção 7 |
| Chat privado entre usuários | seção 8 |

Todos os 8 itens do desafio estão implementados. ✅

---

## 🐛 Se algo não funcionar

- **Feed/perfil vazios ou erro de conexão:** confirme que o **backend está rodando** na porta 3000 e que o `.env` do backend tem a `DATABASE_URL` correta.
- **Nada carrega no frontend:** confirme o `.env` do frontend com `VITE_API_URL=http://localhost:3000`.
- **Erro ao logar/publicar:** o token expira em 1h — basta logar de novo.
- Anote o que achou estranho e me passe que eu ajusto.
