import Cell from "./cell.js"

const canv = document.getElementById("canvas")
const ctx = canv.getContext("2d")

const rows = 30
const columns = 30
const size = 25
let current = null
const vars = {
    rows: rows,
    columns: columns,
    size: size
}
canv.height = rows*size
canv.width = columns*size


const cells = []
for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
        let cell = new Cell(j, i, vars)
        cells.push(cell)
    }
}
vars.cells = cells
current = cells[0]
current.checked = true

function draw() {
    ctx.fillStyle = "silver"
    ctx.fillRect(0,0,canv.width,canv.height)

    ctx.strokeStyle = "black"
    cells.forEach((v) => {
        v.draw(ctx)
    })

}

function update() {
    current.checked = true
    const next = current.neighbors()
    if (next) {
        next.checked = true
        remove(current, next)
        current = next
        
    }
    else return
    draw()
}

function remove(cell1, cell2) {
    let dx = cell1.column - cell2.column
    let dy = cell1.row - cell2.row
    // cell1.walls = [false, false,false,false]
    // cell2.walls = [false, false,false,false]
    if (dy == -1) {
        cell1.walls[2] = false
        cell2.walls[0] = false
    }
    else if (dy == 1) {
        cell1.walls[0] = false
        cell2.walls[2] = false
    }
    else if (dx == 1) {
        cell1.walls[3] = false
        cell2.walls[1] = false
    }
    else if (dx == -1) {
        cell1.walls[1] = false
        cell2.walls[3] = false

    }
    
}

setInterval(update, 350)