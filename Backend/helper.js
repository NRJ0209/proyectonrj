function emptyOrRows(rows) {
  if (!rows || rows.length === 0) {
    return []
  }
  return rows
}

module.exports = {
  emptyOrRows
}