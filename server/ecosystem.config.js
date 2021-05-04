module.exports = {
  apps: [
    {
      name: 'news-portal-app',
      script: 'dist/main.js',
      watch: '.',
    },
    //   {
    //   script: './service-worker/',
    //   watch: ['./service-worker']
    // }
  ],

  deploy: {
    production: {
      user: 'wydo17@yandex.ua',
      host: 'https://reactness.6rs.ru',
      ref: 'origin/master',
      repo: 'https://github.com/WinZip17/test-news-portal.git',
      path: '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy':
        'cd client && npm install && cd .. && cd server && npm install && cd .. && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
