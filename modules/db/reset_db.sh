cd "./migrations/"

sqlite3 ../../../database.db < user.sql
sqlite3 ../../../database.db < address.sql
sqlite3 ../../../database.db < orders.sql
sqlite3 ../../../database.db < quotes.sql

cd "../seeds/"

sqlite3 ../../../database.db < user_seed.sql
sqlite3 ../../../database.db < address_seed.sql
sqlite3 ../../../database.db < orders_seed.sql
sqlite3 ../../../database.db < quotes_seed.sql