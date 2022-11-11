-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tilte" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Album" ("createdAt", "date", "id", "tilte", "updatedAt") SELECT "createdAt", "date", "id", "tilte", "updatedAt" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
CREATE UNIQUE INDEX "Album_tilte_key" ON "Album"("tilte");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
