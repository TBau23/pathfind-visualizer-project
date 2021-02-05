
export function parseRowAndColumn(id) {
    const rowNcol = id.split('-').slice(1)
    const row = parseInt(rowNcol[0])
    const col = parseInt(rowNcol[1])
    return [row,col]
};

