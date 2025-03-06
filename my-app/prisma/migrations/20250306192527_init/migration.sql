/*
  Warnings:

  - You are about to drop the column `clave` on the `Servidor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "victorias" INTEGER NOT NULL DEFAULT 0,
    "serverId" INTEGER NOT NULL,
    CONSTRAINT "Player_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Servidor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("id", "name", "serverId", "victorias") SELECT "id", "name", "serverId", "victorias" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_Servidor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "pista" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Servidor" ("active", "contraseña", "id", "name", "pista") SELECT "active", "contraseña", "id", "name", "pista" FROM "Servidor";
DROP TABLE "Servidor";
ALTER TABLE "new_Servidor" RENAME TO "Servidor";
CREATE UNIQUE INDEX "Servidor_name_key" ON "Servidor"("name");
CREATE UNIQUE INDEX "Servidor_contraseña_key" ON "Servidor"("contraseña");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
