db.createUser({
  user: "hypertube_api",
  pwd: "dev_password",
  roles: [
    {
      role: "readWrite",
      db: "hypertube"
    },
  ],
})

db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
