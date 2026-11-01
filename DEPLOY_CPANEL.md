# 📖 Guia Completo de Deploy no cPanel com Node.js e MySQL

Este documento contém o passo a passo detalhado para colocar a plataforma **OZ Digital** no ar em qualquer hospedagem cPanel com suporte a **Node.js** (CloudLinux / Phusion Passenger) e banco de dados **MySQL**.

---

## 📑 Sumário

1. [Pré-requisitos](#1-pré-requisitos)
2. [Criação do Banco de Dados MySQL](#2-criação-do-banco-de-dados-mysql)
3. [Importação do Schema SQL](#3-importação-do-schema-sql)
4. [Configuração do Node.js no cPanel](#4-configuração-do-nodejs-no-cpanel)
5. [Configuração das Variáveis de Ambiente (.env)](#5-configuração-das-variáveis-de-ambiente-env)
6. [Instalação de Dependências e Build](#6-instalação-de-dependências-e-build)
7. [Inicialização e Validação do Sistema](#7-inicialização-e-validação-do-sistema)
8. [Resolução de Problemas Comuns (Troubleshooting)](#8-resolução-de-problemas-comuns-troubleshooting)

---

## 1. Pré-requisitos

Antes de iniciar, certifique-se de que você possui:
- Acesso ao painel administrativo **cPanel** do seu domínio.
- Recurso **Setup Node.js App** (disponível na maioria das hospedagens cPanel modernas).
- Acesso ao **Terminal** do cPanel ou acesso SSH (opcional, mas recomendado).
- Certificado **SSL** emitido para o domínio (gratuito via cPanel AutoSSL / Let's Encrypt).
- Chave de API do **Google Gemini** (`GEMINI_API_KEY`) para o assistente virtual Ozzy e geração de posts por IA.

---

## 2. Criação do Banco de Dados MySQL

1. Faça login no seu **cPanel**.
2. Na seção **Bancos de Dados**, clique em **Assistente de Banco de Dados MySQL** (ou *Bancos de Dados MySQL*).
3. **Passo 1 - Criar o Banco:**
   - Defina um nome para a base de dados (Ex: `usuario_agenciaoz`).
   - Clique em **Próxima Etapa**.
4. **Passo 2 - Criar o Usuário:**
   - Defina um nome de usuário (Ex: `usuario_ozadmin`).
   - Crie uma senha forte e anote-a com segurança.
   - Clique em **Criar Usuário**.
5. **Passo 3 - Conceder Privilégios:**
   - Marque a caixa de seleção **TODOS OS PRIVILÉGIOS** (*ALL PRIVILEGES*).
   - Clique em **Fazer Alterações**.

---

## 3. Importação do Schema SQL

1. No cPanel, vá até a seção **Bancos de Dados** e clique em **phpMyAdmin**.
2. No menu da barra lateral esquerda, clique sobre o banco de dados recém-criado (`usuario_agenciaoz`).
3. Clique na aba superior **Importar** (ou **SQL**).
4. Localize e selecione o arquivo `data/schema.sql` presente na raiz do seu projeto.
5. Clique em **Executar** (ou *Go* no canto inferior).

> 💡 **Tabelas criadas com sucesso:**
> - `posts` (Artigos do Blog e SEO)
> - `knowledge_items` (Base de Conhecimento e Treinamento do Ozzy IA)
> - `conversations` (Leads e Histórico do CRM)
> - `site_settings` (Configurações do Site e Pop-up Promocional)
> - `agent_settings` (Configurações do Agente)
> - `agent_logs` (Histórico de Auditoria e Ações Autônomas)
> - `proposals_config` (Tabelas de Preços e Pacotes de Serviços)

---

## 4. Configuração do Node.js no cPanel

1. No painel inicial do cPanel, vá até a seção **Software** e clique em **Setup Node.js App** (ou *Configurar Aplicativo Node.js*).
2. Clique no botão azul **Create Application** (Criar Aplicativo).
3. Preencha os campos de configuração:
   - **Node.js Version:** Selecione **20.x** ou **22.x** (Versões LTS estáveis).
   - **Application Mode:** Selecione **Production**.
   - **Application Root:** O caminho do diretório onde os arquivos do projeto foram enviados (Ex: `site` ou `app`).
   - **Application URL:** Selecione o seu domínio principal ou subdomínio (Ex: `seusite.com.br`).
   - **Application Startup File:** Digite exatamente:
     ```text
     dist/server.cjs
     ```
4. Clique no botão **Create** no canto superior direito para salvar a aplicação.

---

## 5. Configuração das Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do diretório do seu aplicativo (via Gerenciador de Arquivos do cPanel) ou configure as variáveis diretamente na seção **Environment Variables** dentro do *Setup Node.js App*:

```env
# MODO DE EXECUÇÃO
NODE_ENV=production
PORT=3000

# GOOGLE GEMINI API (Obrigatória para IA e Chat Ozzy)
GEMINI_API_KEY="sua_chave_gemini_aqui"

# URL DO SEU DOMÍNIO EM PRODUÇÃO
APP_URL="https://seusite.com.br"

# BANCO DE DADOS MYSQL
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="usuario_ozadmin"
MYSQL_PASSWORD="sua_senha_do_banco_aqui"
MYSQL_DATABASE="usuario_agenciaoz"
```

---

## 6. Instalação de Dependências e Build

1. Na tela da sua aplicação no **Setup Node.js App**, copie o comando de ativação do ambiente virtual exibido no topo (Ex: `source /home/usuario/nodevenv/...`).
2. Abra o **Terminal** do cPanel (ou conecte via SSH no seu servidor).
3. Cole o comando copiado e pressione `Enter` para carregar o Node.js e o npm.
4. Navegue até a pasta da aplicação:
   ```bash
   cd ~/caminho_da_sua_pasta
   ```
5. Execute a instalação dos pacotes e o build de produção:
   ```bash
   # 1. Instalar todas as dependências do projeto
   npm install

   # 2. Compilar o frontend (Vite) e o backend empacotado (esbuild)
   npm run build
   ```

> ⚙️ **O que o comando `npm run build` faz:**
> - Gera os arquivos estáticos ultraotimizados do React na pasta `dist/`.
> - Empacota o servidor Node.js/Express em um único arquivo de inicialização de alta performance: `dist/server.cjs`.

---

## 7. Inicialização e Validação do Sistema

1. Retorne à interface do **Setup Node.js App** no cPanel.
2. Clique no botão **Restart** (Reiniciar Aplicativo).
3. Abra seu navegador e acesse:
   - **Site Público:** `https://seusite.com.br`
   - **Painel Administrativo:** `https://seusite.com.br/admin`
4. No menu lateral do painel **OZGESTOR**, acesse a aba **Banco MySQL**:
   - Clique no botão **Testar Conexão** para validar a comunicação e latência com o banco.
   - Clique em **Sincronizar JSON → MySQL** caso queira carregar os dados iniciais do JSON para o banco com 1 clique.

---

## 8. Resolução de Problemas Comuns (Troubleshooting)

### 🔴 Erro 503 / "Service Unavailable"
- Verifique se o arquivo de inicialização no cPanel está configurado exatamente como `dist/server.cjs`.
- Certifique-se de que o comando `npm run build` foi executado com sucesso e que a pasta `dist/` existe.

### 🔴 Erro de Conexão com o MySQL (Access Denied / ER_DBACCESS_DENIED_ERROR)
- Verifique se o usuário do banco tem permissão total (*ALL PRIVILEGES*) concedida no cPanel.
- Confirme se o prefixo do usuário e banco (ex: `usuario_`) foi incluído no arquivo `.env`.
- Use `localhost` como `MYSQL_HOST` na maioria das hospedagens cPanel compartilhadas.

### 🔴 Rotas internas dando 404 ao recarregar a página
- O servidor `dist/server.cjs` já possui tratamento automático de fallback SPA (`app.get('*')`) para redirecionar todas as rotas para o `index.html`. Certifique-se de reiniciar o aplicativo no painel Node.js após qualquer alteração.

---

© **OZ Digital** — Documentação Técnica de Implantação.
