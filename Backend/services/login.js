const db = require('./db')
const helper = require('../helper')

async function getUserData (user, password) {
    const rows = await db.query(`
        select nombre, rol 
        from usuarios
        where login = '${user}'
        and password = '${password}' 
    `)

    // +++ CORREGIDO: Pasa rows, no rows[0]
    const data = helper.emptyOrRows(rows)

    return {
        data 
    }
}

module.exports = {
    getUserData
}