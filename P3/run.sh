# Run server

cd ../P2

fuser -k 8000/tcp
./manage.py runserver &

cd ../P3/restify-front

npm install

npm start
