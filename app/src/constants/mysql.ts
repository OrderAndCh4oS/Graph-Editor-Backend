export const DATABASE = process.env.MYSQL_DATABASE || 'graphene_js_node_db';
export const USER = process.env.MYSQL_USER || 'admin';
export const PASSWORD = process.env.MYSQL_PASSWORD || 'too_secret';
export const HOST = process.env.MYSQL_HOST || 'model';
export const PORT = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306;