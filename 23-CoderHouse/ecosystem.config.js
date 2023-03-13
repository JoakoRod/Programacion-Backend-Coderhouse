module.exports = {
  apps: [{
    name: 'app1',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    //instances: 'max',
    args: '--port=8080',
  },
  {
    name: 'app2',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    //instances: 'max',
    args: '--port=8082 --cluster',
  },
  {
    name: 'app3',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    //instances: 'max',
    args: '--port=8083 --cluster',
  },
  {
    name: 'app4',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    //instances: 'max',
    args: '--port=8084 --cluster',
  },
  {
    name: 'app5',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    //instances: 'max',
    args: '--port=8085 --cluster',
  }, {
    //script: './service-worker/',
    //watch: ['./service-worker']
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

