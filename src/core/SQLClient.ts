import sqlite3 from "sqlite3";

type CallbackThis = {
  lastID?: number;
};

export class SQLClient {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(process.env.DATABASE_URL || "");
  }

  async insert(sql: string, ...placeholders: any[]) {
    return new Promise((resolve, reject) => {
      this.db.run(
        sql,
        ...placeholders,
        function (this: CallbackThis, err: any, row: any) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  async get(sql: string, ...placeholders: any[]) {
    return new Promise((resolve, reject) => {
      this.db.get(
        sql,
        ...placeholders,
        function (this: CallbackThis, err: any, row: any) {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }
}
