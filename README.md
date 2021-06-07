# test-news-portal
star front yarn start
start beck yarn start:dev


pm2 deploy ecosystem.config.js production

npx sequelize-cli db:seed:all
npx sequelize-cli db:migrate
