import Cell from "./cell.js"

const canv = document.getElementById("canvas")
const ctx = canv.getContext("2d")

const rows = 8
const columns = 8
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
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let cell = new Cell(i, j, vars)
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
        current = next
        
    }
    else return
    draw()
}

setInterval(update, 25)