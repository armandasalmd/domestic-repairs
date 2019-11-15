@echo off
title SQL run migrations and seeds

cd "C:\Users\barka\Desktop\5001CEM\modules\db\migrations"

sqlite3 ../../../test.db < user.sql
sqlite3 ../../../test.db < address.sql
sqlite3 ../../../test.db < orders.sql
sqlite3 ../../../test.db < quotes.sql

cd "C:\Users\barka\Desktop\5001CEM\modules\db\seeds"

sqlite3 ../../../test.db < user_seed.sql
sqlite3 ../../../test.db < address_seed.sql
sqlite3 ../../../test.db < orders_seed.sql
sqlite3 ../../../test.db < quotes_seed.sql

echo Reset complete
pause