import sqlite3 from "sqlite3";

import Queries from "./Queries";

export class Database {
    private _initialized: boolean = false;
    private _db: sqlite3.Database = new sqlite3.Database(":memory:");

    private prepareStatement(
        sql: string,
        params?: any[]
    ): Promise<sqlite3.Statement> {
        return new Promise((resolve, reject) => {
            const result: sqlite3.Statement = this._db.prepare(
                sql,
                params,
                (err?: Error) => {
                    if (err) return reject(err);
                    return resolve(result);
                }
            );
        });
    }

    public initialize(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const TableQueries = await Queries.readAllFromFile(
                    "InitializeTables"
                );
                const ViewQueries = await Queries.readAllFromFile(
                    "InitializeViews"
                );

                this._db.serialize(() => {
                    TableQueries.forEach((q) => this._db.run(q));
                    ViewQueries.forEach((q) => this._db.run(q));

                    this._initialized = true;
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}
