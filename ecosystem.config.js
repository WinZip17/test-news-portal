module.exports = {
  apps: [
    {
      name: 'news',
      // script: 'server/dist/main.js',
      script: 'NODE_ENV=production && cd server && yarn start',
      watch: '.',
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
        'cd server && ' +
        'npm install  && ' +
        'npm run-script build && ' +
        ' cd .. &&' +
        ' cd client && npm install && npm run-script build &&' +
        ' cd .. && ' +
        'pm2 startOrRestart ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
