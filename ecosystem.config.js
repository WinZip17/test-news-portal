module.exports = {
  apps: [
    {
      name: 'news-portal-app',
      script: 'server/dist/main.js',
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
      path: '/data/reactness/app',
      'pre-deploy-local': '',
      'post-deploy':
        'cd server && npm install && npm build && cd .. && cd client && npm install && cd .. && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
