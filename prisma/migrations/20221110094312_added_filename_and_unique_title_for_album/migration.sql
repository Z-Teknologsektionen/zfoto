/*
  Warnings:

  - A unique constraint covering the columns `[tilte]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "photographer" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("albumId", "createdAt", "date", "id", "photographer") SELECT "albumId", "createdAt", "date", "id", "photographer" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_filename_key" ON "Image"("filename");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Album_tilte_key" ON "Album"("tilte");
