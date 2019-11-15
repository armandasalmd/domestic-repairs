@echo off
title SQL table seed script

cd "C:\Users\barka\Desktop\5001CEM\modules\db\seeds"

sqlite3 ../../../test.db < user_seed.sql
sqlite3 ../../../test.db < address_seed.sql
sqlite3 ../../../test.db < orders_seed.sql
sqlite3 ../../../test.db < quotes_seed.sql

echo Seeds loaded
pause