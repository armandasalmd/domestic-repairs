@echo off
title SQL run migrations and seeds

cd "C:\Users\barka\Desktop\barkausa\modules\db\migrations"

sqlite3 ../../../database.db < user.sql
sqlite3 ../../../database.db < address.sql
sqlite3 ../../../database.db < orders.sql
sqlite3 ../../../database.db < quotes.sql

cd "C:\Users\barka\Desktop\barkausa\modules\db\seeds"

sqlite3 ../../../database.db < user_seed.sql
sqlite3 ../../../database.db < address_seed.sql
sqlite3 ../../../database.db < orders_seed.sql
sqlite3 ../../../database.db < quotes_seed.sql

echo Reset complete
pause