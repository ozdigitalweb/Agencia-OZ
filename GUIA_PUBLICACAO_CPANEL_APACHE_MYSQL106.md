# 🚀 Guia Oficial de Publicação: cPanel + Apache + MySQL® Versão 106

Este documento contém o procedimento passo a passo, detalhado e definitivo, para publicar a plataforma **OZ Digital** em ambientes de hospedagem **cPanel** com servidor web **Apache** e banco de dados **MySQL® versão 106 (MariaDB 10.6)**.

---

## 📌 1. Visão Geral do Ambiente de Produção

| Componente | Especificação no cPanel | Função no Projeto |
| :--- | :--- | :--- |
| **Painel de Controle** | cPanel (versão atualizada com CloudLinux) | Gestão de arquivos, banco de dados, SSL e aplicativos |
| **Servidor Web** | **Apache** (com Phusion Passenger e mod_proxy / mod_rewrite) | Recepção de tráfego HTTP/S e roteamento para o Node.js |
| **Banco de Dados** | **MySQL® Databases versão 106** (*MariaDB 10.6 LTS*) | Armazenamento relacional de posts, conversas, OZZY e configurações |
| **Runtime Node.js** | **Node.js 20.x ou 22.x** (LTS) | Execução do servidor Express e APIs (`dist/server.cjs`) |
| **Frontend** | React 19 SPA (compilado pelo Vite em `dist/`) | Interface de alta performance entregue pelo servidor Express |

---

## 🔑 2. Entendendo o "MySQL® Versão 106" no cPanel

No cPanel, a nomenclatura **"MySQL® versão 106"** refere-se ao branch estável **MariaDB 10.6**. 
- Ele é **100% compatível** com o conector `mysql2/promise` utilizado pela aplicação.
- Possui suporte nativo a colunas de dados no formato `JSON`.
- Utiliza a codificação de caracteres `utf8mb4` com collation `utf8mb4_unicode_ci` (compatibilidade total com acentos e emojis).
- **Importante:** Em hospedagens compartilhadas, o cPanel exige que o nome da base e o usuário tenham o prefixo da sua conta cPanel (exemplo: `usuario_banco`).

---

## 📋 3. Checklist Pré-Publicação

Antes de começar, certifique-se de ter em mãos:
- [ ] Login e senha do cPanel.
- [ ] Domínio apontado para a hospedagem e com **Certificado SSL ativo** (AutoSSL / Let's Encrypt).
- [ ] Chave de API do **Google Gemini** (`GEMINI_API_KEY`) para o assistente virtual OZZY e o gerador de artigos com IA.
- [ ] Arquivos do projeto enviados para o servidor (via Gerenciador de Arquivos, FTP ou Git).

---

## 🛠️ 4. Procedimento Passo a Passo de Instalação

### Passo 1: Enviar os Arquivos para o Servidor

1. No cPanel, abra o **Gerenciador de Arquivos** (*File Manager*).
2. Recomendamos criar uma pasta dedicada fora da `public_html` para segurança dos códigos-fonte (ex: `/home/seuusuario/app_oz`).
   *(Se preferir colocar direto em uma pasta ou subdomínio, pode usar o diretório desejado).*
3. Faça o upload do arquivo `.zip` do projeto e clique em **Extrair** (*Extract*).
4. Certifique-se de que os arquivos ocultos estão visíveis (engrenagem no canto superior direito do Gerenciador de Arquivos > marcar *Show Hidden Files*).

---

### Passo 2: Criar o Banco de Dados MySQL 106 e Usuário

1. No cPanel, na seção **Bancos de Dados**, clique em **Bancos de Dados MySQL®** (ou *Assistente de Banco de Dados MySQL*).
2. **Criar Banco de Dados:**
   - No campo *Novo Banco de Dados*, digite: `agenciaoz`.
   - O nome final será composto com seu usuário cPanel: `seuusuario_agenciaoz`.
   - Clique em **Criar banco de dados**.
3. **Criar Usuário do Banco:**
   - Na seção *Adicionar novo usuário*, defina o nome: `ozadmin` (nome final: `seuusuario_ozadmin`).
   - Gere uma senha forte no *Gerador de Senhas* e **guarde essa senha**.
   - Clique em **Criar usuário**.
4. **Conceder Privilégios:**
   - Na seção *Adicionar usuário ao banco de dados*:
     - Selecione o usuário: `seuusuario_ozadmin`.
     - Selecione o banco: `seuusuario_agenciaoz`.
     - Clique em **Adicionar**.
   - Marque a opção **TODOS OS PRIVILÉGIOS** (*ALL PRIVILEGES*).
   - Clique em **Fazer alterações**.

---

### Passo 3: Importar a Estrutura de Tabelas (SQL)

1. No cPanel, na seção **Bancos de Dados**, abra o **phpMyAdmin**.
2. Na coluna lateral esquerda, clique sobre o banco de dados que acabou de criar (`seuusuario_agenciaoz`).
3. Clique na aba superior **Importar**.
4. Clique em **Escolher arquivo** e selecione o arquivo `data/schema.sql` do seu projeto.
5. Deixe as opções padrão e clique em **Executar** no final da página.

> 💡 **Dica de compatibilidade no phpMyAdmin:**
> O arquivo `data/schema.sql` cria automaticamente as 7 tabelas do sistema:
> `posts`, `knowledge_items`, `conversations`, `site_settings`, `agent_settings`, `agent_logs`, `proposals_config`.
> Como você já selecionou o seu banco específico no phpMyAdmin, o script criará as tabelas com integridade referencial e índices sem qualquer conflito.

---

### Passo 4: Configurar o Aplicativo Node.js no cPanel

1. No painel inicial do cPanel, procure pelo ícone **Setup Node.js App** (na categoria *Software*).
2. Clique no botão azul **Create Application** (*Criar Aplicativo*).
3. Preencha os campos com atenção:
   - **Node.js Version:** Escolha **20.x** ou **22.x** (LTS).
   - **Application Mode:** Selecione **Production**.
   - **Application Root:** Digite o caminho da pasta onde estão os arquivos (ex: `app_oz`).
   - **Application URL:** Selecione o seu domínio principal ou subdomínio (ex: `seudominio.com.br`).
   - **Application Startup File:** Digite obrigatoriamente:
     ```text
     dist/server.cjs
     ```
4. Clique no botão **Create** (no topo à direita) para salvar a configuração.

---

### Passo 5: Configurar o Arquivo `.env` (Variáveis de Ambiente)

No cPanel, dentro da pasta da sua aplicação, crie ou edite o arquivo `.env`:

```env
# AMBIENTE DE PRODUÇÃO
NODE_ENV=production
PORT=3000

# CHAVE DA IA GOOGLE GEMINI
GEMINI_API_KEY="AIzaSy..."

# DOMÍNIO OFICIAL COM HTTPS
APP_URL="https://seudominio.com.br"

# BANCO DE DADOS MYSQL 10.6 DO CPANEL
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="seuusuario_ozadmin"
MYSQL_PASSWORD="sua_senha_do_banco_aqui"
MYSQL_DATABASE="seuusuario_agenciaoz"
```

*(Substitua `seuusuario_` pelo prefixo real da sua conta cPanel).*

---

### Passo 6: Compilar e Gerar o Build de Produção

1. Na tela do aplicativo no **Setup Node.js App**, você verá uma caixa com um comando em destaque no topo, parecido com:
   ```bash
   source /home/seuusuario/nodevenv/app_oz/20/bin/activate && cd /home/seuusuario/app_oz
   ```
2. Clique no ícone de copiar desse comando.
3. No cPanel, abra o **Terminal** (seção *Avançado* ou conecte via SSH).
4. Cole o comando e pressione `Enter` para ativar o ambiente Node.js.
5. Execute os dois comandos abaixo em sequência:
   ```bash
   # 1. Instalação das dependências
   npm install

   # 2. Compilação do frontend (Vite) e do servidor único (esbuild)
   npm run build
   ```

> ⚡ **O que acontece no `npm run build`:**
> - O **Vite** compila todos os componentes React, Tailwind CSS e ativos para a pasta `dist/`.
> - O **esbuild** empacota o backend TypeScript em um único arquivo de inicialização de altíssima performance: `dist/server.cjs`.

---

### Passo 7: Integração com o Apache (.htaccess)

O projeto já inclui um arquivo `.htaccess` otimizado na raiz. Ele garante duas funções cruciais no Apache:
1. **Redirecionamento Automático para HTTPS (SSL)**: Todas as requisições HTTP são redirecionadas para conexão segura.
2. **Reverse Proxy / Passenger Fallback**: Permite que o Apache repasse requisições e APIs sem travar as rotas de Single Page Application (SPA).

Se o cPanel criar linhas automáticas do Phusion Passenger no `.htaccess`, mantenha-as intactas.

---

### Passo 8: Iniciar o Site e Validar Conexão

1. Retorne ao **Setup Node.js App** no cPanel.
2. Clique no botão **Restart** (*Reiniciar Aplicativo*).
3. Abra o navegador e acesse o seu site:
   - `https://seudominio.com.br`
4. Acesse o painel de controle administrativo:
   - `https://seudominio.com.br/admin`
5. No menu do **OZGESTOR**, clique na aba **Banco MySQL**:
   - Clique em **Testar Conexão**: o sistema fará um ping em tempo real informando a latência em milissegundos e confirmará a conexão ativa com o MySQL 10.6.
   - Clique em **Sincronizar JSON → MySQL**: todos os artigos iniciais, leads e base de conhecimento serão populados automaticamente no banco relacional.

---

## 🔍 5. Resolução de Dúvidas e Problemas Frequentes (Troubleshooting)

### 🔴 1. Erro 503 "Service Unavailable"
- **Causa:** O servidor Node.js não encontrou o arquivo de startup ou ele não foi compilado.
- **Solução:** Certifique-se de que rodou `npm run build` e que o campo *Application Startup File* no cPanel está preenchido com `dist/server.cjs`.

### 🔴 2. Erro de Conexão com o MySQL (`ER_DBACCESS_DENIED_ERROR` ou `ECONNREFUSED`)
- **Causa:** Nome de usuário ou banco sem o prefixo da conta cPanel, ou senha incorreta.
- **Solução:** No cPanel compartilhado, o host quase sempre é `localhost`. Confirme no arquivo `.env` se o usuário está com o prefixo (ex: `usuario_ozadmin`) e se os privilégios totais foram concedidos em *Bancos de Dados MySQL*.

### 🔴 3. Recarregar uma página interna (ex: `/blog` ou `/servicos/sites`) dá erro 404
- **Causa:** O Apache tentou procurar um arquivo físico em vez de repassar para o Node.js.
- **Solução:** Nosso arquivo `dist/server.cjs` já possui o handler curinga `app.get('*')` que serve o `index.html` para todas as rotas. Verifique se o aplicativo foi reiniciado no cPanel.

### 🔴 4. O assistente OZZY não responde no chat
- **Causa:** Variável `GEMINI_API_KEY` ausente ou inválida.
- **Solução:** Adicione sua chave de API válida no arquivo `.env` e clique em **Restart** no Setup Node.js App.

---

© **OZ Digital** — Todos os direitos reservados. Guia Técnico de Operações e Infraestrutura.
