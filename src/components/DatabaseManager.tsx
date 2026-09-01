import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Server, 
  Cpu, 
  Layers, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Terminal,
  Clock,
  HardDrive,
  Table,
  HelpCircle,
  Play
} from 'lucide-react';
import { databaseApi, DbStatusResponse } from '../services/api';

export default function DatabaseManager() {
  const [status, setStatus] = useState<DbStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState<{ success: boolean; message: string; migrated?: Record<string, number> } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  // Custom connection test inputs
  const [customHost, setCustomHost] = useState('');
  const [customPort, setCustomPort] = useState('3306');
  const [customUser, setCustomUser] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [customDatabase, setCustomDatabase] = useState('');
  const [showCustomTest, setShowCustomTest] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await databaseApi.getStatus();
      setStatus(data);
      if (data.host) setCustomHost(data.host);
      if (data.port) setCustomPort(data.port.toString());
      if (data.database) setCustomDatabase(data.database);
      if (data.user) setCustomUser(data.user);
    } catch (err: any) {
      console.error('Erro ao buscar status do banco:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleTestConnection = async (useCustom: boolean = false) => {
    setTestingConnection(true);
    setTestResult(null);
    try {
      const payload = useCustom ? {
        host: customHost.trim(),
        port: parseInt(customPort || '3306', 10),
        user: customUser.trim(),
        password: customPassword,
        database: customDatabase.trim()
      } : undefined;

      const res = await databaseApi.testConnection(payload);
      setTestResult(res);
      if (res.success) {
        await fetchStatus();
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Erro inesperado ao testar conexão'
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleMigrate = async () => {
    if (!confirm('Deseja iniciar a sincronização de todos os registros JSON para o banco de dados MySQL?')) {
      return;
    }
    setIsMigrating(true);
    setMigrationResult(null);
    try {
      const res = await databaseApi.migrateJsonToMysql();
      setMigrationResult(res);
      await fetchStatus();
    } catch (err: any) {
      setMigrationResult({
        success: false,
        message: err.message || 'Erro ao sincronizar dados'
      });
    } finally {
      setIsMigrating(false);
    }
  };

  const sqlSchemaCode = `-- ==============================================================================
-- AGÊNCIA OZ - ESTRUTURA DO BANCO DE DADOS MYSQL (schema.sql)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`agencia_oz\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`agencia_oz\`;

-- 1. Artigos do Blog
CREATE TABLE IF NOT EXISTS \`posts\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`title\` VARCHAR(500) NOT NULL,
  \`excerpt\` TEXT,
  \`content\` LONGTEXT,
  \`category\` VARCHAR(100) NOT NULL DEFAULT 'WordPress',
  \`featured_image\` VARCHAR(1000),
  \`author_name\` VARCHAR(255) DEFAULT 'Equipe AGÊNCIA OZ',
  \`author_role\` VARCHAR(255) DEFAULT 'Gestão de Conteúdo',
  \`author_avatar\` VARCHAR(1000),
  \`read_time\` VARCHAR(50) DEFAULT '5 min',
  \`views\` INT DEFAULT 0,
  \`likes\` INT DEFAULT 0,
  \`status\` ENUM('published', 'draft') DEFAULT 'published',
  \`published_at\` VARCHAR(100),
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_posts_slug\` (\`slug\`),
  INDEX \`idx_posts_category\` (\`category\`),
  INDEX \`idx_posts_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Base de Conhecimento OZZY IA
CREATE TABLE IF NOT EXISTS \`knowledge_items\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`title\` VARCHAR(500) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`content\` LONGTEXT NOT NULL,
  \`tags\` JSON,
  \`priority\` ENUM('high', 'medium', 'low') DEFAULT 'medium',
  \`active\` BOOLEAN DEFAULT TRUE,
  \`suggested_links\` JSON,
  \`updated_at\` VARCHAR(100),
  INDEX \`idx_kb_category\` (\`category\`),
  INDEX \`idx_kb_priority\` (\`priority\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Atendimento e Leads CRM
CREATE TABLE IF NOT EXISTS \`conversations\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`contact_name\` VARCHAR(255),
  \`contact_company\` VARCHAR(255),
  \`contact_email\` VARCHAR(255),
  \`contact_phone\` VARCHAR(100),
  \`contact_social_media\` VARCHAR(255),
  \`contact_city\` VARCHAR(100),
  \`contact_state\` VARCHAR(50),
  \`status\` ENUM('active', 'archived', 'lead_captured') DEFAULT 'active',
  \`stage\` ENUM('novo_lead', 'qualificado', 'diagnostico_agendado', 'proposta_enviada', 'fechado', 'perdido') DEFAULT 'novo_lead',
  \`assigned_to\` VARCHAR(100) DEFAULT 'ozzy_ai',
  \`channel\` VARCHAR(50) DEFAULT 'web_chat',
  \`tags\` JSON,
  \`deal_value\` DECIMAL(10, 2) DEFAULT 0.00,
  \`unread_count\` INT DEFAULT 0,
  \`is_starred\` BOOLEAN DEFAULT FALSE,
  \`source_page\` VARCHAR(255),
  \`last_message\` TEXT,
  \`last_message_at\` VARCHAR(100),
  \`created_at\` VARCHAR(100),
  \`messages\` JSON,
  INDEX \`idx_conv_stage\` (\`stage\`),
  INDEX \`idx_conv_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Configurações de Promoção e Site
CREATE TABLE IF NOT EXISTS \`site_settings\` (
  \`setting_key\` VARCHAR(100) PRIMARY KEY,
  \`setting_value\` JSON NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Logs do Agente Autônomo
CREATE TABLE IF NOT EXISTS \`agent_logs\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`tool_name\` VARCHAR(100) NOT NULL,
  \`action_label\` VARCHAR(255) NOT NULL,
  \`input_params\` JSON,
  \`result_summary\` TEXT,
  \`client_name\` VARCHAR(255),
  \`status\` VARCHAR(50) DEFAULT 'success',
  \`executed_at\` VARCHAR(100),
  INDEX \`idx_logs_tool\` (\`tool_name\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Pacotes de Propostas Comerciais
CREATE TABLE IF NOT EXISTS \`proposals_config\` (
  \`id\` INT PRIMARY KEY DEFAULT 1,
  \`general_settings\` JSON NOT NULL,
  \`packages\` JSON NOT NULL,
  \`updated_at\` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

  const envSample = `# CONFIGURAÇÃO DO MYSQL NO .ENV
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=usuario_cpanel
MYSQL_PASSWORD=sua_senha_segura
MYSQL_DATABASE=agencia_oz

# OU VIA URL DIRETA:
# MYSQL_URL=mysql://usuario:senha@localhost:3306/agencia_oz`;

  const copyToClipboard = (text: string, type: 'sql' | 'env') => {
    navigator.clipboard.writeText(text);
    if (type === 'sql') {
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    } else {
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2000);
    }
  };

  const handleDownloadSql = () => {
    const blob = new Blob([sqlSchemaCode], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8" id="database-manager-root">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Database className="w-80 h-80 text-blue-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-500/30">
              <Database className="w-3.5 h-3.5" />
              Arquitetura de Dados MySQL v8.0 / MariaDB
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Gerenciamento de Banco de Dados MySQL
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Integração nativa com MySQL com <span className="text-blue-300 font-semibold">Pool de Conexões assíncrono</span>, tolerância a falhas e sincronização com JSON local.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleTestConnection(false)}
              disabled={testingConnection || loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
              id="btn-test-mysql-conn"
            >
              <RefreshCw className={`w-4 h-4 ${testingConnection ? 'animate-spin' : ''}`} />
              {testingConnection ? 'Testando Conexão...' : 'Testar Conexão'}
            </button>

            <button
              onClick={handleMigrate}
              disabled={isMigrating || loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
              id="btn-migrate-json-mysql"
            >
              <Zap className={`w-4 h-4 ${isMigrating ? 'animate-pulse' : ''}`} />
              {isMigrating ? 'Sincronizando...' : 'Sincronizar JSON → MySQL'}
            </button>
          </div>
        </div>
      </div>

      {/* Realtime Status Bar Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card 1 */}
        <div className={`p-6 rounded-2xl border transition-all ${
          status?.connected 
            ? 'bg-emerald-50/50 border-emerald-200' 
            : 'bg-amber-50/50 border-amber-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Status da Conexão
            </span>
            {status?.connected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                MySQL Conectado
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Modo Fallback JSON
              </span>
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold text-slate-900">
              {status?.connected ? 'Ativo & Operacional' : 'Armazenamento Local'}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            {status?.connected 
              ? `Conexão estabelecida com latência de ${status.latencyMs || 2}ms.` 
              : 'O sistema está salvando dados com segurança em arquivos JSON locais na pasta /data/.'}
          </p>
        </div>

        {/* Status Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Parâmetros do Servidor
            </span>
            <Server className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-slate-900 flex justify-between">
              <span className="text-slate-500">Host:</span>
              <span className="font-mono">{status?.host || 'localhost'}</span>
            </div>
            <div className="text-sm font-semibold text-slate-900 flex justify-between">
              <span className="text-slate-500">Porta:</span>
              <span className="font-mono">{status?.port || 3306}</span>
            </div>
            <div className="text-sm font-semibold text-slate-900 flex justify-between">
              <span className="text-slate-500">Database:</span>
              <span className="font-mono text-blue-600">{status?.database || 'agencia_oz'}</span>
            </div>
          </div>
        </div>

        {/* Status Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Segurança & Driver
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prepared Statements (Anti SQL-Injection)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pool de 10 conexões concorrentes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>UTF-8 Multibyte (utf8mb4) completo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test / Migration alerts if triggered */}
      {testResult && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          testResult.success 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          {testResult.success ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-bold text-sm">
              {testResult.success ? 'Conexão com MySQL efetuada com sucesso!' : 'Falha ao conectar no MySQL:'}
            </p>
            <p className="text-xs mt-0.5">{testResult.message}</p>
            {testResult.latencyMs !== undefined && (
              <p className="text-xs mt-1 font-mono text-emerald-700">Tempo de resposta: {testResult.latencyMs}ms</p>
            )}
          </div>
        </div>
      )}

      {migrationResult && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          migrationResult.success 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          {migrationResult.success ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-bold text-sm">{migrationResult.message}</p>
            {migrationResult.migrated && (
              <div className="flex flex-wrap gap-3 mt-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-100 font-semibold">Artigos: {migrationResult.migrated.posts || 0}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 font-semibold">Base OZZY: {migrationResult.migrated.knowledge_items || 0}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 font-semibold">Conversas CRM: {migrationResult.migrated.conversations || 0}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 font-semibold">Propostas: {migrationResult.migrated.proposals || 0}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tables Explorer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Table className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Tabelas Estruturadas da AGÊNCIA OZ</h3>
              <p className="text-xs text-slate-500">Mapeamento de entidades de dados e contadores de registros</p>
            </div>
          </div>
          <button 
            onClick={fetchStatus}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-5 hover:bg-slate-50/80 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">posts</span>
              <span className="text-lg font-bold text-slate-900 font-mono">{status?.tables.posts ?? 0}</span>
            </div>
            <p className="text-xs text-slate-600">Artigos, notícias, visualizações e metadados SEO do Blog</p>
          </div>

          <div className="p-5 hover:bg-slate-50/80 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">knowledge_items</span>
              <span className="text-lg font-bold text-slate-900 font-mono">{status?.tables.knowledge_items ?? 0}</span>
            </div>
            <p className="text-xs text-slate-600">Base de conhecimento do assistente virtual OZZY IA</p>
          </div>

          <div className="p-5 hover:bg-slate-50/80 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">conversations</span>
              <span className="text-lg font-bold text-slate-900 font-mono">{status?.tables.conversations ?? 0}</span>
            </div>
            <p className="text-xs text-slate-600">Leads capturados, pipeline de vendas e histórico de chat</p>
          </div>

          <div className="p-5 hover:bg-slate-50/80 transition-colors border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">agent_logs</span>
              <span className="text-lg font-bold text-slate-900 font-mono">{status?.tables.agent_logs ?? 0}</span>
            </div>
            <p className="text-xs text-slate-600">Histórico de ações autônomas, consultas e diagnósticos</p>
          </div>

          <div className="p-5 hover:bg-slate-50/80 transition-colors border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">proposals_config</span>
              <span className="text-lg font-bold text-slate-900 font-mono">1</span>
            </div>
            <p className="text-xs text-slate-600">Tabela de preços, pacotes comerciais e prazos</p>
          </div>

          <div className="p-5 hover:bg-slate-50/80 transition-colors border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">site_settings</span>
              <span className="text-lg font-bold text-slate-900 font-mono">1</span>
            </div>
            <p className="text-xs text-slate-600">Parâmetros de pop-ups, promoções e automações</p>
          </div>
        </div>
      </div>

      {/* SQL Script & Environment Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: schema.sql viewer */}
        <div className="bg-slate-950 text-slate-200 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-white text-sm">Script de Criação (schema.sql)</h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(sqlSchemaCode, 'sql')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSql ? 'Copiado!' : 'Copiar SQL'}
                </button>
                <button
                  onClick={handleDownloadSql}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar .sql
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Você pode importar este script diretamente no <strong>phpMyAdmin</strong>, <strong>cPanel</strong> ou MySQL Workbench para criar a base e todas as tabelas.
            </p>
            <pre className="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-72 leading-relaxed border border-slate-800">
              {sqlSchemaCode}
            </pre>
          </div>
        </div>

        {/* Right: Setup Guide & .env helper */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">Como Configurar o MySQL</h4>
              </div>
              <button
                onClick={() => copyToClipboard(envSample, 'env')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedEnv ? 'Copiado!' : 'Copiar .env'}
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <div>
                  <strong className="text-slate-900">No cPanel ou Servidor VPS:</strong> Crie um banco de dados MySQL chamado <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono">agencia_oz</code> e adicione um usuário com permissão total.
                </div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <div>
                  <strong className="text-slate-900">Importe o Schema:</strong> Abra o phpMyAdmin e execute o script SQL ao lado ou use o botão <code className="bg-indigo-100 px-1 py-0.5 rounded text-indigo-900 font-mono">Sincronizar JSON → MySQL</code> para criar e popular as tabelas automaticamente.
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <div>
                  <strong className="text-slate-900">Preencha as variáveis de ambiente:</strong> Configure o arquivo <code className="bg-emerald-100 px-1 py-0.5 rounded text-emerald-900 font-mono">.env</code> com seus acessos:
                </div>
              </div>
            </div>

            <pre className="bg-slate-900 p-3.5 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800">
              {envSample}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sincronização bidirecional & Tolerância a quedas
            </span>
            <span className="font-semibold text-slate-700">AGÊNCIA OZ v3.5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
