server '', 
  user: 'Dice', 
  roles: %w{app db web},
  ssh_options: {
    keys: ["#{ENV.fetch('PRODUCTION_SSH_KEY')}"],  
    forward_agent: true,
    auth_methods: %w(publickey),
    port: 22
  }