require("dotenv").config();


const config = {
  PORT: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  production: process.env.NODE_ENV === "production",
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  secretOrKey: process.env.SECRET_OR_KEY || "2rwpcT6lN4lqEy72urwFOmPCldrleNx/5a7kAJD2jnXA7CjobsZLtY3uzWl4/YsKo21qGqDIhvx5de37tOc8mc/Wbr/waYQ2rnKbsgO+aywPSBMA1twGw3Xp4kftCUSI05rLtFiVfPYE3nDYZoekcBVFYbUZrB35xtAwusnOXHFFjKUUTdQZknC5n7hxcSdQz0GVaCfDPZ4rRkcIzrAOG0FEWERmW0+WEsBQbu/7X6fk2b4v1BcifpFZ5paClEcCHGmTbSoVC5fYTiyNU3/0BQ74+h2vgNERscTHUbwOYazeV8wssPhW4p1s1sWahwFbBk5cbANLCiAD2c9OXkC7EAKWpKnoRF4QPcfvdVowW0DbCXwqWwr0DLvDFYJ0fcc69Dc3WRAVUTGXC3NaTND/2hv+L5lgSdeQDLGv043xZsKaxLW4K5tOnVrJYRos6UT4rQZe3/PvgPb0paHVn/QoCRjjs8aQar6sC4jOMyJ+6nHsUeHNL3EEXkEAwUMlBdRLtmd0uFA1CzMUDohZ6uQ1eqQr8wuJnPyjfU6JSU4HDUPiD9UexzlVyvZlDZWDhm2reeLXiaSE12ClYDHm2VqyumiWuiEIqzdczgu3kpUVvGyzf4/IVRReoLAvyD0JEB/ChPTqE/h5lyicwaM/g+/PWS//aRbwQja4XZuHY13K/jw=",
  id_developer: process.env.ID_DEVELOPER || "1",
  storageBucket: process.env.STORAGE_BUCKET || "gs://delivey-app-trujistudios.appspot.com/",
  sessionSecret: process.env.SESSION_SECERT || "2rwpcT6lN4lqEy72urwFOmPCldrleNx/5a7kAJD2jnXA7CjobsZLtY3uzWl4/YsKo21qGqDIhvx5de37tOc8mc/Wbr/waYQ2rnKbsgO+aywPSBMA1twGw3Xp4kftCUSI05rLtFiVfPYE3nDYZoekcBVFYbUZrB35xtAwusnOXHFFjKUUTdQZknC5n7hxcSdQz0GVaCfDPZ4rRkcIzrAOG0FEWERmW0+WEsBQbu/7X6fk2b4v1BcifpFZ5paClEcCHGmTbSoVC5fYTiyNU3/0BQ74+h2vgNERscTHUbwOYazeV8wssPhW4p1s1sWahwFbBk5cbANLCiAD2c9OXkC7EAKWpKnoRF4QPcfvdVowW0DbCXwqWwr0DLvDFYJ0fcc69Dc3WRAVUTGXC3NaTND/2hv+L5lgSdeQDLGv043xZsKaxLW4K5tOnVrJYRos6UT4rQZe3/PvgPb0paHVn/QoCRjjs8aQar6sC4jOMyJ+6nHsUeHNL3EEXkEAwUMlBdRLtmd0uFA1CzMUDohZ6uQ1eqQr8wuJnPyjfU6JSU4HDUPiD9UexzlVyvZlDZWDhm2reeLXiaSE12ClYDHm2VqyumiWuiEIqzdczgu3kpUVvGyzf4/IVRReoLAvyD0JEB/ChPTqE/h5lyicwaM/g+/PWS//aRbwQja4XZuHY13K/jw=",
  database: {
    dbHost: process.env.DB_HOST || "viaduct.proxy.rlwy.net",
    port: process.env.DB_PORT || 5432,
    dbName: process.env.DB_NAME || "railway",
    dbUsername: process.env.DB_USERNAME || "postgres",
    dbPassword: process.env.DB_PASSWORD || "12df-aeG13C-B-ECEADe-*Ca-B6Ede2*",
  },
};


module.exports = { config }



// DATABASE_HOST=ep-lingering-base-73023017.eu-central-1.aws.neon.tech
// DATABASE_USER=koyeb-adm
// DATABASE_PASSWORD=Awu4FfWi7eKp
// DATABASE_NAME=koyebdb

