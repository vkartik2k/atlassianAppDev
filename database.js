const Sequelize = require('sequelize')

const database = new Sequelize('atlassianhack', 'sama', 'password',{
    host : 'localhost',
    dialect : 'mysql',
    pool : {
        min:0,
        max:5
    },
    logging: false
})

const User = database.define('User', {
    email : {
        type : Sequelize.STRING,
        primaryKey : true,
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false,
    },

})

database.sync()
    .then(() => console.log('DATABASE HAS BE SYNCED.'))
    .catch((err) => console.error('PROBLEM IN SYNCING DATABASE. :' + err))

exports = module.exports = { User}