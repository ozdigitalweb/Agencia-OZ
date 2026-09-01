-- ==============================================================================
-- AGÊNCIA OZ - ESTRUTURA DO BANCO DE DADOS MYSQL (schema.sql)
-- Compatível com: MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+, cPanel, AWS RDS, GCP Cloud SQL
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`agencia_oz\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`agencia_oz\`;

-- ------------------------------------------------------------------------------
-- 1. TABELA DE ARTIGOS DO BLOG (posts)
-- ------------------------------------------------------------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Artigos e notícias do blog';

-- ------------------------------------------------------------------------------
-- 2. TABELA DA BASE DE CONHECIMENTO DO ASSISTENTE OZZY IA (knowledge_items)
-- ------------------------------------------------------------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Base de conhecimento para respostas do OZZY IA';

-- ------------------------------------------------------------------------------
-- 3. TABELA DE ATENDIMENTO, CHAT & LEADS CRM (conversations)
-- ------------------------------------------------------------------------------
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
  INDEX \`idx_conv_status\` (\`status\`),
  INDEX \`idx_conv_email\` (\`contact_email\`),
  INDEX \`idx_conv_phone\` (\`contact_phone\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Conversas do widget e pipeline CRM de leads';

-- ------------------------------------------------------------------------------
-- 4. TABELA DE CONFIGURAÇÕES GERAIS DO SITE E PROMOÇÕES (site_settings)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`site_settings\` (
  \`setting_key\` VARCHAR(100) PRIMARY KEY,
  \`setting_value\` JSON NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Configurações de pop-ups, botões promocionais e site';

-- ------------------------------------------------------------------------------
-- 5. TABELA DE CONFIGURAÇÕES DE AUTONOMIA DO AGENTE IA (agent_settings)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`agent_settings\` (
  \`setting_key\` VARCHAR(100) PRIMARY KEY,
  \`setting_value\` JSON NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Configurações do agente autônomo OZZY';

-- ------------------------------------------------------------------------------
-- 6. TABELA DE LOGS DE ATIVIDADES E EXECUÇÃO DE TOOLS (agent_logs)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`agent_logs\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`tool_name\` VARCHAR(100) NOT NULL,
  \`action_label\` VARCHAR(255) NOT NULL,
  \`input_params\` JSON,
  \`result_summary\` TEXT,
  \`client_name\` VARCHAR(255),
  \`status\` VARCHAR(50) DEFAULT 'success',
  \`executed_at\` VARCHAR(100),
  INDEX \`idx_logs_tool\` (\`tool_name\`),
  INDEX \`idx_logs_executed\` (\`executed_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Histórico de ações autônomas executadas pelo OZZY';

-- ------------------------------------------------------------------------------
-- 7. TABELA DE PACOTES DE PROPOSTAS E ORÇAMENTOS (proposals_config)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`proposals_config\` (
  \`id\` INT PRIMARY KEY DEFAULT 1,
  \`general_settings\` JSON NOT NULL,
  \`packages\` JSON NOT NULL,
  \`updated_at\` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabela de preços e pacotes comerciais gerados pelo agente';
