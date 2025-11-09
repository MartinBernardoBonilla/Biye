db.createUser({
  user: "biyeuser",
  pwd: "biyepassword123",
  roles: [
    {
      role: "readWrite",
      db: "biyedb"
    }
  ]
});