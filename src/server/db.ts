import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

export interface DbStatus {
  connected: boolean;
  type: 'mysql' | 'json_fallback';
  host: string;
  port: number;
  database: string;
  user: string;
  latencyMs?: number;
  error?: string | null;
  tables: {
    posts: number;
    knowledge_items: number;
    conversations: number;
    agent_logs: number;
    proposals_config: number;
    site_settings: number;
  };
}

let pool: mysql.Pool | null = null;
let isInitialized = false;
let lastConnectionError: string | null = null;

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Initialize MySQL Connection Pool if environment variables are provided
 */
export function getMySqlPool(): mysql.Pool | null {
  if (pool) return pool;

  const host = process.env.MYSQL_HOST || (process.env.MYSQL_URL ? undefined : undefined);
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE;
  const port = parseInt(process.env.MYSQL_PORT || '3306', 10);
  const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

  if (!connectionUrl && (!host || !user || !database)) {
    // MySQL not configured, graceful fallback to local JSON
    return null;
  }

  try {
    if (connectionUrl && connectionUrl.startsWith('mysql')) {
      pool = mysql.createPool({
        uri: connectionUrl,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      });
    } else {
      pool = mysql.createPool({
        host: host || 'localhost',
        port: port || 3306,
        user: user || 'root',
        password: password || '',
        database: database || 'agencia_oz',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      });
    }
    return pool;
  } catch (err: any) {
    lastConnectionError = err?.message || 'Erro ao instanciar pool MySQL';
    console.warn('[MySQL] Failed to create connection pool:', err);
    return null;
  }
}

/**
 * Automatically create MySQL tables if they do not exist
 */
export async function initializeDatabaseSchema(): Promise<boolean> {
  const currentPool = getMySqlPool();
  if (!currentPool) return false;

  try {
    const connection = await currentPool.getConnection();
    try {
      console.log('[MySQL] Ensuring database schema and tables exist...');

      // 1. Posts table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          slug VARCHAR(255) NOT NULL UNIQUE,
          title VARCHAR(500) NOT NULL,
          excerpt TEXT,
          content LONGTEXT,
          category VARCHAR(100) NOT NULL DEFAULT 'WordPress',
          featured_image VARCHAR(1000),
          author_name VARCHAR(255),
          author_role VARCHAR(255),
          author_avatar VARCHAR(1000),
          read_time VARCHAR(50) DEFAULT '5 min',
          views INT DEFAULT 0,
          likes INT DEFAULT 0,
          status ENUM('published', 'draft') DEFAULT 'published',
          published_at VARCHAR(100),
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_posts_slug (slug),
          INDEX idx_posts_category (category),
          INDEX idx_posts_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 2. Knowledge Base (OZZY) table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS knowledge_items (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(500) NOT NULL,
          category VARCHAR(100) NOT NULL,
          content LONGTEXT NOT NULL,
          tags JSON,
          priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
          active BOOLEAN DEFAULT TRUE,
          suggested_links JSON,
          updated_at VARCHAR(100),
          INDEX idx_kb_category (category),
          INDEX idx_kb_priority (priority)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 3. Conversations / Leads CRM table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS conversations (
          id VARCHAR(100) PRIMARY KEY,
          contact_name VARCHAR(255),
          contact_company VARCHAR(255),
          contact_email VARCHAR(255),
          contact_phone VARCHAR(100),
          contact_social_media VARCHAR(255),
          contact_city VARCHAR(100),
          contact_state VARCHAR(50),
          status ENUM('active', 'archived', 'lead_captured') DEFAULT 'active',
          stage ENUM('novo_lead', 'qualificado', 'diagnostico_agendado', 'proposta_enviada', 'fechado', 'perdido') DEFAULT 'novo_lead',
          assigned_to VARCHAR(100) DEFAULT 'ozzy_ai',
          channel VARCHAR(50) DEFAULT 'web_chat',
          tags JSON,
          deal_value DECIMAL(10, 2) DEFAULT 0.00,
          unread_count INT DEFAULT 0,
          is_starred BOOLEAN DEFAULT FALSE,
          source_page VARCHAR(255),
          last_message TEXT,
          last_message_at VARCHAR(100),
          created_at VARCHAR(100),
          messages JSON,
          INDEX idx_conv_stage (stage),
          INDEX idx_conv_status (status),
          INDEX idx_conv_email (contact_email),
          INDEX idx_conv_phone (contact_phone)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 4. Site Settings (Key-Value) table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(100) PRIMARY KEY,
          setting_value JSON NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 5. Agent Settings table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS agent_settings (
          setting_key VARCHAR(100) PRIMARY KEY,
          setting_value JSON NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 6. Agent Activity Logs table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS agent_logs (
          id VARCHAR(100) PRIMARY KEY,
          tool_name VARCHAR(100) NOT NULL,
          action_label VARCHAR(255) NOT NULL,
          input_params JSON,
          result_summary TEXT,
          client_name VARCHAR(255),
          status VARCHAR(50) DEFAULT 'success',
          executed_at VARCHAR(100),
          INDEX idx_logs_tool (tool_name),
          INDEX idx_logs_executed (executed_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 7. Proposals Config table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS proposals_config (
          id INT PRIMARY KEY DEFAULT 1,
          general_settings JSON NOT NULL,
          packages JSON NOT NULL,
          updated_at VARCHAR(100)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      isInitialized = true;
      lastConnectionError = null;
      console.log('[MySQL] Schema initialization complete.');
      return true;
    } finally {
      connection.release();
    }
  } catch (err: any) {
    lastConnectionError = err?.message || 'Erro ao inicializar tabelas MySQL';
    console.error('[MySQL] Schema initialization error:', err);
    return false;
  }
}

/**
 * Get comprehensive Database Status
 */
export async function getDatabaseStatus(): Promise<DbStatus> {
  const host = process.env.MYSQL_HOST || 'localhost';
  const port = parseInt(process.env.MYSQL_PORT || '3306', 10);
  const database = process.env.MYSQL_DATABASE || 'agencia_oz';
  const user = process.env.MYSQL_USER || 'root';

  const defaultCounts = {
    posts: 0,
    knowledge_items: 0,
    conversations: 0,
    agent_logs: 0,
    proposals_config: 0,
    site_settings: 0
  };

  const poolInstance = getMySqlPool();
  if (!poolInstance) {
    // Read counts from local JSON files
    try {
      if (fs.existsSync(path.join(DATA_DIR, 'posts.json'))) {
        defaultCounts.posts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'posts.json'), 'utf-8')).length;
      }
      if (fs.existsSync(path.join(DATA_DIR, 'knowledge.json'))) {
        defaultCounts.knowledge_items = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'knowledge.json'), 'utf-8')).length;
      }
      if (fs.existsSync(path.join(DATA_DIR, 'conversations.json'))) {
        defaultCounts.conversations = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'conversations.json'), 'utf-8')).length;
      }
      if (fs.existsSync(path.join(DATA_DIR, 'agent_logs.json'))) {
        defaultCounts.agent_logs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'agent_logs.json'), 'utf-8')).length;
      }
    } catch (_) {}

    return {
      connected: false,
      type: 'json_fallback',
      host,
      port,
      database,
      user,
      error: lastConnectionError || 'Credenciais do MySQL não configuradas no arquivo .env. Usando armazenamento JSON local.',
      tables: defaultCounts
    };
  }

  const start = Date.now();
  try {
    const connection = await poolInstance.getConnection();
    const latencyMs = Date.now() - start;

    try {
      if (!isInitialized) {
        await initializeDatabaseSchema();
      }

      const [postsCount]: any = await connection.query('SELECT COUNT(*) as count FROM posts');
      const [kbCount]: any = await connection.query('SELECT COUNT(*) as count FROM knowledge_items');
      const [convCount]: any = await connection.query('SELECT COUNT(*) as count FROM conversations');
      const [logsCount]: any = await connection.query('SELECT COUNT(*) as count FROM agent_logs');
      const [propCount]: any = await connection.query('SELECT COUNT(*) as count FROM proposals_config');
      const [settingsCount]: any = await connection.query('SELECT COUNT(*) as count FROM site_settings');

      return {
        connected: true,
        type: 'mysql',
        host,
        port,
        database,
        user,
        latencyMs,
        error: null,
        tables: {
          posts: postsCount[0]?.count || 0,
          knowledge_items: kbCount[0]?.count || 0,
          conversations: convCount[0]?.count || 0,
          agent_logs: logsCount[0]?.count || 0,
          proposals_config: propCount[0]?.count || 0,
          site_settings: settingsCount[0]?.count || 0
        }
      };
    } finally {
      connection.release();
    }
  } catch (err: any) {
    lastConnectionError = err?.message || 'Falha ao conectar no MySQL';
    return {
      connected: false,
      type: 'json_fallback',
      host,
      port,
      database,
      user,
      error: lastConnectionError,
      tables: defaultCounts
    };
  }
}

/**
 * Migrate all existing JSON data into MySQL tables
 */
export async function migrateJsonToMysql(): Promise<{ success: boolean; message: string; migrated: Record<string, number> }> {
  const poolInstance = getMySqlPool();
  if (!poolInstance) {
    return {
      success: false,
      message: 'Não foi possível conectar ao MySQL. Verifique as configurações no .env',
      migrated: {}
    };
  }

  const migratedCounts = {
    posts: 0,
    knowledge_items: 0,
    conversations: 0,
    agent_logs: 0,
    proposals: 0,
    settings: 0
  };

  try {
    await initializeDatabaseSchema();
    const connection = await poolInstance.getConnection();

    try {
      // 1. Migrate Posts
      const postsFile = path.join(DATA_DIR, 'posts.json');
      if (fs.existsSync(postsFile)) {
        const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
        for (const post of posts) {
          await connection.query(`
            INSERT INTO posts (id, slug, title, excerpt, content, category, featured_image, author_name, author_role, author_avatar, read_time, views, likes, status, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              title = VALUES(title),
              excerpt = VALUES(excerpt),
              content = VALUES(content),
              category = VALUES(category),
              featured_image = VALUES(featured_image),
              status = VALUES(status),
              published_at = VALUES(published_at)
          `, [
            post.id,
            post.slug,
            post.title,
            post.excerpt || '',
            post.content || '',
            post.category || 'WordPress',
            post.featuredImage || '',
            post.author?.name || 'Equipe AGÊNCIA OZ',
            post.author?.role || 'Gestão de Conteúdo',
            post.author?.avatar || '',
            post.readTime || '5 min',
            post.views || 0,
            post.likes || 0,
            post.status || 'published',
            post.publishedAt || new Date().toISOString().split('T')[0]
          ]);
          migratedCounts.posts++;
        }
      }

      // 2. Migrate Knowledge Base
      const knowledgeFile = path.join(DATA_DIR, 'knowledge.json');
      if (fs.existsSync(knowledgeFile)) {
        const items = JSON.parse(fs.readFileSync(knowledgeFile, 'utf-8'));
        for (const item of items) {
          await connection.query(`
            INSERT INTO knowledge_items (id, title, category, content, tags, priority, active, suggested_links, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              title = VALUES(title),
              category = VALUES(category),
              content = VALUES(content),
              tags = VALUES(tags),
              priority = VALUES(priority),
              active = VALUES(active),
              suggested_links = VALUES(suggested_links),
              updated_at = VALUES(updated_at)
          `, [
            item.id,
            item.title,
            item.category,
            item.content,
            JSON.stringify(item.tags || []),
            item.priority || 'medium',
            item.active !== false,
            JSON.stringify(item.suggestedLinks || []),
            item.updatedAt || new Date().toISOString()
          ]);
          migratedCounts.knowledge_items++;
        }
      }

      // 3. Migrate Conversations
      const convsFile = path.join(DATA_DIR, 'conversations.json');
      if (fs.existsSync(convsFile)) {
        const convs = JSON.parse(fs.readFileSync(convsFile, 'utf-8'));
        for (const c of convs) {
          await connection.query(`
            INSERT INTO conversations (id, contact_name, contact_company, contact_email, contact_phone, contact_social_media, contact_city, contact_state, status, stage, assigned_to, channel, tags, deal_value, unread_count, is_starred, source_page, last_message, last_message_at, created_at, messages)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              contact_name = VALUES(contact_name),
              contact_company = VALUES(contact_company),
              contact_email = VALUES(contact_email),
              contact_phone = VALUES(contact_phone),
              status = VALUES(status),
              stage = VALUES(stage),
              tags = VALUES(tags),
              deal_value = VALUES(deal_value),
              last_message = VALUES(last_message),
              last_message_at = VALUES(last_message_at),
              messages = VALUES(messages)
          `, [
            c.id,
            c.contact?.name || 'Visitante Web',
            c.contact?.company || '',
            c.contact?.email || '',
            c.contact?.phone || '',
            c.contact?.socialMedia || '',
            c.contact?.city || '',
            c.contact?.state || '',
            c.status || 'active',
            c.stage || 'novo_lead',
            c.assignedTo || 'ozzy_ai',
            c.channel || 'web_chat',
            JSON.stringify(c.tags || []),
            c.dealValue || 0,
            c.unreadCount || 0,
            c.isStarred || false,
            c.sourcePage || '',
            c.lastMessage || '',
            c.lastMessageAt || c.createdAt || new Date().toISOString(),
            c.createdAt || new Date().toISOString(),
            JSON.stringify(c.messages || [])
          ]);
          migratedCounts.conversations++;
        }
      }

      // 4. Migrate Site Settings
      const settingsFile = path.join(DATA_DIR, 'settings.json');
      if (fs.existsSync(settingsFile)) {
        const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
        await connection.query(`
          INSERT INTO site_settings (setting_key, setting_value)
          VALUES ('promo_settings', ?)
          ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
        `, [JSON.stringify(settings)]);
        migratedCounts.settings++;
      }

      // 5. Migrate Proposals Config
      const proposalsFile = path.join(process.cwd(), 'proposals-config.json');
      if (fs.existsSync(proposalsFile)) {
        const pConfig = JSON.parse(fs.readFileSync(proposalsFile, 'utf-8'));
        await connection.query(`
          INSERT INTO proposals_config (id, general_settings, packages, updated_at)
          VALUES (1, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            general_settings = VALUES(general_settings),
            packages = VALUES(packages),
            updated_at = VALUES(updated_at)
        `, [
          JSON.stringify(pConfig.generalSettings || {}),
          JSON.stringify(pConfig.packages || []),
          pConfig.updatedAt || new Date().toISOString()
        ]);
        migratedCounts.proposals++;
      }

      return {
        success: true,
        message: 'Dados JSON migrados com sucesso para o banco de dados MySQL!',
        migrated: migratedCounts
      };
    } finally {
      connection.release();
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Erro na migração: ${err?.message || 'Falha ao gravar registros'}`,
      migrated: migratedCounts
    };
  }
}
