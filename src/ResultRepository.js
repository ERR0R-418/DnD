"use strict"
const BetterSqlite = require('better-sqlite3')
const db = new BetterSqlite('DnD.db')

/// with side effect. its silly solution but its working
/// return type:
// |function -> boolean
// | Infinity
// | function -> false
let parsingPoints = (points) => {
    //  for ":"-based range construction
    let maybeValuesColon = points.split(":");
    if (maybeValuesColon.length === 2)
            if (maybeValuesColon[0] ==="" && maybeValuesColon[1] ==="")
                //  for example: ":" only in points
                return () => Infinity
            else
                //  for example: "2:4" - it's range
                return (value) => parseInt(maybeValuesColon[0]) <= value && value <= parseInt(maybeValuesColon[1]);
    //  for ","-based enumeration construction
    let maybeValuesComma = points.split(",");
    if (maybeValuesComma.length > 1)
        //  for example: "2,3,4,5,6" - it's enumeration
        return (value) => !!maybeValuesComma.find(e=>+e===value) || false;
    //  return none if comparisons is not success
    return ()=>false;
}

/// with side effect.
/// return Array
let getSpecFromDB = (table) => db.prepare(`select * from ${table}`).all() || null;

let tableToColumn = (table) => {
    switch (table) {
       case'Класс': return 'Класс';
       case 'Мораль': return 'Мировоззрение';
       case 'Раса': return 'Раcа';
       case 'Способность': return 'Название характеристики';
       default: throw new URIError('Table not found');
    }
}

let detectType = (table,points) => {
   return getSpecFromDB(table).reduce((acc,e)=>{
       const pp = parsingPoints(e['Очки'])(points);
       if (pp === true ) {
           acc.set(table,{name: e[tableToColumn(table)],desc: e['Описание']}); return acc;}
       if (pp === Infinity) {
          acc.set(table,{name: e[tableToColumn(table)],desc: e['Описание']})}
       return acc;
    },new Map());
}

module.exports = detectType;

