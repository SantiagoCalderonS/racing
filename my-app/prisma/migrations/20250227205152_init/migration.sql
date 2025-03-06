/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Servidor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "pista" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "victorias" INTEGER NOT NULL DEFAULT 0,
    "serverId" INTEGER NOT NULL,
    CONSTRAINT "Player_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Servidor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Servidor_name_key" ON "Servidor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Servidor_clave_key" ON "Servidor"("clave");

-- CreateIndex
CREATE UNIQUE INDEX "Servidor_contraseña_key" ON "Servidor"("contraseña");
