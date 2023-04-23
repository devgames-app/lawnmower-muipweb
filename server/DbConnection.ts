import { config } from '@/src/config';
var mysql = require('mysql');

export class Db {
  protected fetchHost: string;
  protected fetchPort: string;
  protected fetchRegion: string;
  private host: string;
  private user: string;
  private password: string;
  private database: string;
  protected connection: any;

  protected constructor() {
    const {
      host: fetchHost,
      port: fetchPort,
      region: fetchRegion,
      db_host: host,
      db_user: user,
      db_password: password,
      db_database: database,
    } = config;
    this.fetchHost = fetchHost;
    this.fetchPort = fetchPort;
    this.fetchRegion = fetchRegion;
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
  }

  protected getConnection() {
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });

    return this.connection.connect();
  }

  protected closeConnection() {
    this.connection.end();
  }
}
