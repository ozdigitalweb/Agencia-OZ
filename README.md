# 🚀 OZ Digital - Plataforma Web & Sistema de Gestão (OZGESTOR)

Plataforma digital completa da **OZ Digital**, especializada em criação de Landing Pages de alta conversão, Sites Institucionais, Hospedagem Premium de Alta Velocidade e Atendimento Inteligente com Inteligência Artificial (**OZZY 24/7**).

O projeto conta com arquitetura full-stack moderna (React 19 + TypeScript + Express + Tailwind CSS), suporte híbrido a banco de dados (**MySQL** com fallback resiliente para **JSON Storage**) e integração nativa com o modelo **Gemini 2.5 Flash** do Google GenAI.

---

## 📋 Sumário

- [Visão Geral dos Recursos](#-visão-geral-dos-recursos)
- [Tecnologias & Bibliotecas](#-tecnologias--bibliotecas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração de Ambiente (.env)](#-configuração-de-ambiente-env)
- [Banco de Dados (MySQL + Fallback JSON)](#-banco-de-dados-mysql--fallback-json)
- [Painel Administrativo (OZGESTOR)](#-painel-administrativo-ozgestor)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Como Executar Localmente](#-como-executar-localmente)
- [Deploy & Produção](#-deploy--produção)

---

## 🌟 Visão Geral dos Recursos

### 🌐 Frontend & Experiência do Usuário
- **Página Inicial & Serviços Estratégicos**:
  - **Landing Pages**: Foco em alta conversão, velocidade (< 1s), copywriting persuasivo, criativos de anúncios (Meta Ads) e explicação prática do funil de vendas.
  - **Sites Institucionais**: Desenvolvimento sob medida, SEO técnico, arquitetura limpa e integração comercial.
  - **Hospedagem & Infraestrutura**: Servidores de ultra performance com cache NVMe, SSL e isolamento de recursos.
  - **Mídia & Criativos**: Soluções completas de identidade visual, redação persuasiva e lançamento de produtos.
- **Blog Dinâmico**: Artigos categorizados com leitura em Markdown (`react-markdown`, `remark-gfm`), busca e paginação.
- **Calculadora de Orçamento Interativa**: Seleção de serviços com cálculo dinâmico de investimento e transbordo direto para WhatsApp.
- **Assistente Virtual OZZY (IA 24/7)**:
  - Chat flutuante alimentado pela API do **Google Gemini**.
  - Base de conhecimento personalizável com informações da empresa, serviços e diferenciais.
  - Qualificação de leads em tempo real e transbordo inteligente para o WhatsApp dos vendedores.

### ⚙️ Backend & API RESTful (`server.ts`)
- **API do Blog**: CRUD completo de postagens, geração automática de conteúdo via IA com tags, categorias e imagens otimizadas.
- **CRM & Gestão de Conversas**: Histórico de atendimentos do OZZY, coleta de contatos e status de qualificação.
- **Base de Conhecimento do OZZY**: Treinamento dinâmico do assistente virtual via interface administrativa.
- **Controle de Pop-ups & Promoções**: Liga/desliga e customização de ofertas promocionais por tempo limitado.
- **Tabela de Preços & Propostas**: Gestão de pacotes e valores comerciais.
- **Gestão de Infraestrutura & Banco MySQL**: Rotas dedicadas para verificação de status, teste de conexão por credenciais/URI, sincronização (`JSON → MySQL`) e visualização do schema SQL.

---

## 🛠️ Tecnologias & Bibliotecas

| Camada | Tecnologia / Biblioteca | Função |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | Interface de usuário componentizada e com tipagem estática rigorosa |
| **Estilização** | Tailwind CSS v4 + Lucide React | Design responsivo, ícones vetoriais modernos e microinterações |
| **Animações** | Motion (`motion/react`) | Transições fluidas de telas, menus e componentes |
| **Roteamento** | React Router Dom v7 | Navegação Single Page Application (SPA) |
| **Backend** | Node.js + Express | Servidor HTTP, rotas de API REST e middlewares |
| **Inteligência Artificial** | `@google/genai` (Gemini API) | Assistente Ozzy e gerador de artigos inteligentes |
| **Banco de Dados** | `mysql2/promise` + JSON local | Armazenamento relacional com pool de conexões e fallback automático |
| **Build & Bundling** | Vite + esbuild | Compilação ultrarrápida do frontend e backend |

---

## 📂 Estrutura do Projeto

```text
├── .env.example                # Modelo de variáveis de ambiente
├── metadata.json               # Metadados e capacidades do projeto
├── package.json                # Dependências e scripts npm
├── server.ts                   # Servidor Express, rotas da API e middleware Vite
├── src/
│   ├── main.tsx                # Ponto de entrada do React
│   ├── App.tsx                 # Configuração de rotas e layout raiz
│   ├── index.css               # Estilos globais Tailwind CSS
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Header.tsx          # Cabeçalho com navegação e status
│   │   ├── Footer.tsx          # Rodapé institucional
│   │   ├── OzzyChat.tsx        # Widget flutuante do assistente OZZY
│   │   ├── OzzyChatManager.tsx # Gestor de conversas e leads (CRM)
│   │   ├── DatabaseManager.tsx # Painel de status e migração do MySQL
│   │   ├── ProposalsManager.tsx# Gestão de propostas e preços
│   │   ├── PromoSettingsManager.tsx # Configuração do pop-up promocional
│   │   └── ConversionFunnelSection.tsx # Seção explicativa do Funil de Vendas
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Home.tsx            # Página inicial
│   │   ├── ServicosLandingPages.tsx # Página de Landing Pages & Criativos
│   │   ├── ServicosSites.tsx   # Página de Sites Institucionais
│   │   ├── ServicosHospedagem.tsx # Página de Hospedagem
│   │   ├── ServicosMidia.tsx   # Página de Mídia & Inteligência Artificial
│   │   ├── Blog.tsx            # Listagem de artigos
│   │   ├── BlogPost.tsx        # Visualização de artigo individual
│   │   ├── Orcamento.tsx       # Orçamento interativo
│   │   └── AdminBlog.tsx       # Painel OZGESTOR
│   ├── server/                 # Módulos de servidor
│   │   └── db.ts               # Camada de abstração do Banco de Dados (MySQL & JSON)
│   ├── services/
│   │   └── api.ts              # Cliente HTTP e chamadas às APIs internas
│   └── data/                   # Arquivos de dados padrão e mocks
│       ├── mockPosts.ts        # Artigos iniciais
│       └── mockConversations.ts# Estrutura base de conversas do OZZY
```

---

## 🔐 Configuração de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
# Chave da API do Google Gemini (obrigatória para o assistente OZZY e gerador de posts)
GEMINI_API_KEY="sua_chave_gemini_aqui"

# URL da aplicação (injetada automaticamente em produção)
APP_URL="http://localhost:3000"

# CONFIGURAÇÃO DO BANCO DE DADOS MYSQL (Opcional)
# Caso não configurado, o sistema operará perfeitamente utilizando arquivos JSON locais
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="root"
MYSQL_PASSWORD="sua_senha"
MYSQL_DATABASE="agencia_oz"

# Ou via String de Conexão Completa:
# MYSQL_URL="mysql://usuario:senha@localhost:3306/agencia_oz"
```

---

## 🗄️ Banco de Dados (MySQL + Fallback JSON)

O sistema conta com uma camada inteligente em `src/server/db.ts`:

1. **Modo MySQL**: Quando as variáveis `MYSQL_HOST` ou `MYSQL_URL` são preenchidas e o servidor MySQL está ativo, o sistema inicializa automaticamente o pool de conexões e cria as tabelas necessárias:
   - `posts` (Artigos do blog)
   - `knowledge_base` (Base de conhecimento do OZZY)
   - `conversations` (Leads e conversas do chat)
   - `site_settings` (Configurações de promoções)
   - `proposals` (Planos e tabelas de preços)
   - `agent_logs` (Logs de execuções e auditoria)

2. **Modo Fallback JSON**: Caso o MySQL não esteja configurado ou fique inacessível, o sistema opera de forma transparente utilizando arquivos JSON em memória/disco sem gerar erros para os usuários.

3. **Migração com 1 Clique**: No painel administrativo (**OZGESTOR > Banco MySQL**), é possível testar credenciais, visualizar o status da conexão, copiar o script SQL completo (`schema.sql`) e migrar os dados do JSON para o MySQL com um clique.

---

## 🛡️ Painel Administrativo (OZGESTOR)

Acesse a rota `/admin` para entrar no painel de gestão centralizado da OZ Digital:

- 💬 **Ozzy CRM & Conversas**: Visualize leads capturados, números de WhatsApp, histórico completo de mensagens e status de qualificação.
- 🧠 **Base de Conhecimento**: Adicione instruções, respostas padrão, produtos e políticas para refinar a inteligência do OZZY.
- ✍️ **Blog & Criador IA**: Crie, edite e publique artigos. Utilize o assistente de IA integrado para redigir rascunhos completos com imagens temáticas.
- 🏷️ **Propostas & Preços**: Atualize os valores de pacotes, planos de hospedagem e escopos de projetos.
- 🎁 **Promoção & Pop-up**: Configure e ative avisos promocionais em toda a plataforma.
- 🗄️ **Banco MySQL**: Monitore latência de ping, registros por tabela e execute testes de conexão em tempo real.

---

## ⚡ Scripts Disponíveis

No terminal, você pode executar os seguintes comandos:

```bash
# Iniciar o servidor em modo de desenvolvimento (Porta 3000)
npm run dev

# Fazer a checagem de tipos com TypeScript (Linter)
npm run lint

# Gerar o bundle de produção (Vite para frontend + esbuild para backend)
npm run build

# Iniciar o servidor compilado em modo produção
npm run start

# Limpar artefatos de compilação
npm run clean
```

---

## 💻 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd react-example
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Preencha sua GEMINI_API_KEY e, opcionalmente, as credenciais do MySQL
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   - Site Principal: [http://localhost:3000](http://localhost:3000)
   - Painel OZGESTOR: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🚢 Deploy & Produção

O projeto foi estruturado para atender aos padrões modernos de conteinerização (Cloud Run, Docker, VPS, cPanel ou servidores dedicados Node.js):

- O comando `npm run build` executa o Vite para gerar a pasta `dist/` estática e utiliza o `esbuild` para empacotar o `server.ts` em um único arquivo CJS otimizado (`dist/server.cjs`).
- O servidor Express atua tanto como API REST (`/api/*`) quanto como servidor de arquivos estáticos para o SPA, com fallback para `index.html`.
- O servidor escuta obrigatoriamente na porta `3000` e no host `0.0.0.0`.

---

© **OZ Digital** — Todos os direitos reservados.
