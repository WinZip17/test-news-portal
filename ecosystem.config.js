module.exports = {
  apps: [
    {
      name: 'news',
      // script: 'server/dist/main.js',
      script: 'NODE_ENV=production && cd server && yarn start',
    },
    //   {
    //   script: './service-worker/',
    //   watch: ['./service-worker']
    // }
  ],

  deploy: {
    production: {
      user: 'reactness',
      host: '6rs.ru',
      ref: 'origin/master',
      repo: 'https://github.com/WinZip17/test-news-portal.git',
      env: {
        "NODE_ENV": "production"
      },
      path: '/data/reactness/app',
      'pre-deploy-local': '',
      'post-deploy':
        'NODE_ENV=production && cd server && yarn install && yarn build && ' +
        'npx sequelize-cli db:migrate && cd .. && ' +
        'cd client && yarn install && yarn build && cd .. && ' +
        'pm2 startOrReload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
