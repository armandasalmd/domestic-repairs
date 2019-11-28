@echo off
title SQL table migration script

cd "C:\Users\barka\Desktop\5001CEM\modules\db\migrations"

sqlite3 ../../../test.db < user.sql
sqlite3 ../../../test.db < address.sql
sqlite3 ../../../test.db < orders.sql
sqlite3 ../../../test.db < quotes.sql

echo Migrations completed
pause