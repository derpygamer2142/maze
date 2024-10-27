export default class Cell {
    constructor(row, column, vars) {
        this.row = row
        this.column = column
        this.checked = false
        this.vars = vars
        this.walls = [true,true,true,true]
    }
    draw(ctx) {
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3
        //ctx.strokeRect(this.column*this.vars.size,this.row*this.vars.size,this.vars.size,this.vars.size)
        const x = this.column*this.vars.size
        const y = this.row*this.vars.size
        let size = this.vars.size
        if (this.walls[0]) line(ctx,x,y,x+size,y)
        if (this.walls[1]) line(ctx,x+size,y,x+size,y+size)
        if (this.walls[2]) line(ctx,x+size,y+size,x,y+size)
        if (this.walls[3]) line(ctx,x,y+size,x,y)
        
        if (this.checked) {
            ctx.fillStyle = "rgba(0,200,0,0.5)"
            ctx.lineWidth = 0 
            ctx.fillRect(this.column*this.vars.size,this.row*this.vars.size,this.vars.size,this.vars.size)
        }
        
    }

    neighbors() {
        let v = []
        let index = this.index(this.column-1,this.row)
        if (index >= 0 && !this.vars.cells[index].checked) v.push(this.vars.cells[index])
        index = this.index(this.column+1,this.row)
        if (index >= 0 && !this.vars.cells[index].checked) v.push(this.vars.cells[index])
        index = this.index(this.column,this.row-1)
        if (index >= 0 && !this.vars.cells[index].checked) v.push(this.vars.cells[index])
        index = this.index(this.column,this.row+1)
        if (index >= 0 && !this.vars.cells[index].checked) v.push(this.vars.cells[index])

        
        if (v.length < 1) return false
        return v[Math.floor(Math.random() * v.length)]
    }

    index(x, y) {
        if (x < 0 || x > this.vars.columns-1 || y < 0 || y > this.vars.rows-1) return -1
        return (y * this.vars.columns) + x
    }

    drawCurrent(ctx) {
        ctx.lineWidth = 0 
        ctx.fillRect(this.column*this.vars.size,this.row*this.vars.size,this.vars.size,this.vars.size)
    }
}

function line(ctx, x1,y1,x2,y2) {
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()
}
