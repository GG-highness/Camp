server '18.181.47.69', 
  user: 'ec2-user', 
  roles: %w{app db web},
  ssh_options: {
    keys: %w(~/.ssh/Camp.pem),
    forward_agent: true,
    auth_methods: %w(publickey),
    port: 22
  }