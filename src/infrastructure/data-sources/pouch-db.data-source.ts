import PouchDb from "pouchdb";

export type PouchDBDocument<T> = T & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export interface PouchDatasourceParams {
  dbName: string;
  dbUrl?: string;
  cb?: Function;
}

export class PouchDatasource {
  static DocumentTypes = {
    Item: "item",
    Category: "category",
  };
  static dbName = "groceries";

  private constructor(readonly db: PouchDB.Database) {}

  static createPouchDbBrowser(params: PouchDatasourceParams): PouchDatasource {
    return PouchDatasource.createPouchDatasource(PouchDb, { ...params });
  }

  static isPouchDbError(error: unknown): error is PouchDB.Core.Error {
    return "status" in (error as any);
  }

  static createPouchDatasource(
    Pouch: PouchDB.Static,
    {
      dbName,
      dbUrl,
      cb,
      options,
    }: PouchDatasourceParams & {
      options?: PouchDB.Configuration.DatabaseConfiguration;
    }
  ): PouchDatasource {
    const remoteDb = `${dbUrl}/${dbName}`;
    if (dbUrl && cb) {
      Pouch.sync(dbName, remoteDb, {
        live: true,
        retry: true,
      })
        .on("error", (error) => {
          console.error("[SYNC ERROR]", error.toString());
        })
        .on("active", () => {
          console.debug("[SYNC ACTIVE]");
        })
        .on("change", (info) => {
          console.debug("[SYNC CHANGES]", info.direction);
          cb();
        })
        .on("complete", (info) => {
          console.debug("[SYNC COMPLETE]");
          cb();
        });
    }
    return options
      ? new PouchDatasource(new Pouch(dbName, options))
      : new PouchDatasource(new Pouch(dbName));
  }
}
