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

  // public async fetchWithTheFoundUid(uid: number, command: string) {
  //   try {
  //     await fetch(
  //       `http://${this.fetchHost}:${this.fetchPort}/api?region=${this.fetchRegion}&ticket=GM&cmd=1116&uid=${uid}&msg=${command}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public getUidByUsername(query: string, command: string) {
  //   try {
  //     this.getConnection();
  //     this.connection.query(
  //       query,
  //       (err: MysqlError, response: IDbUsers[] | null) => {
  //         if (err) throw err;
  //         if (!response) throw err;
  //         if (response && !response.length) throw new Error('User not Found');
  //         if (response.length) {
  //           const [user] = response;
  //           if (!user) throw new Error('User not found');
  //           this.closeConnection();
  //           this.fetchWithTheFoundUid(user.uid, command);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
