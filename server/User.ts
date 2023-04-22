import { MysqlError } from 'mysql';
import { Db } from './DbConnection';
import { IDbUsers } from '@/types/dbUsers';

export class User extends Db {
  public constructor() {
    super();
  }

  public async fetchWithTheFoundUid(uid: number, command: string) {
    try {
      await fetch(
        `http://${this.fetchHost}:${this.fetchPort}/api?region=${this.fetchRegion}&ticket=GM&cmd=1116&uid=${uid}&msg=${command}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  public getUidByUsername(query: string, command: string) {
    try {
      this.getConnection();
      this.connection.query(
        query,
        (err: MysqlError, response: IDbUsers[] | null) => {
          if (err) throw err;
          if (!response) throw err;
          if (response && !response.length) throw new Error('User not Found');
          if (response.length) {
            const [user] = response;
            if (!user) throw new Error('User not found');
            this.closeConnection();
            this.fetchWithTheFoundUid(user.uid, command);
          }
        }
      );
    } catch (error) {
      this.closeConnection();
      console.log(error);
    }
  }
}
