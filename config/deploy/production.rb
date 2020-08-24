server '13.114.161.69', 
  user: 'ec2-user', 
  roles: %w{app db web},
  ssh_options: {
    keys: ['~/.ssh/Camp.pem'], 
    forward_agent: true,
    auth_methods: %w(publickey),
    port: 22
  }