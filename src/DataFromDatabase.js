const BetterSqlite = require('better-sqlite3')
const db = new BetterSqlite('DnD.db', { verbose: console.log })

module.exports = () => {
    const cache = new Map()
    let rows = db.prepare(`SELECT * FROM Классы, Мораль, Расы`).all()
    rows.forEach((e) => cache.set(e['Класс'], e['Описание']))
    rows.forEach((e) => cache.set(e['Мировоззрение'], e['Описание']))
    rows.forEach((e) => cache.set(e['Раса'], e['Описание']))
    let _rows = db.prepare(`SELECT * FROM Способности`).all()
    _rows.forEach((e) => cache.set(e['Название характеристики'], e['Описание']))
    return cache
}
