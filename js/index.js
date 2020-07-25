var huabu = document.querySelector('#huabu')
var tools = huabu.getContext('2d')
huabu.width = 600
huabu.height = 600

//绘制食物——将绘制食物放置绘制网格线前，避免食物遮住网格线
//随机生成一个位置
//  Math.floor()向下取整-将网格分成20份，每份30px
//食物默认位置
var x = Math.floor(Math.random() * 20) * 30
var y = Math.floor(Math.random() * 20) * 30
var isEat = false //判断食物是否被吃
    //绘制贪吃蛇默认位置
var Aarry = [{ x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }]
var direactionX = 1
var direactionY = 0
    //判断边界
var isgameover = false

setInterval(() => {
    if (isgameover) {

        return
    }
    tools.clearRect(0, 0, 600, 600)
    document.onkeydown = function(event) {
        //上38下40左37右39
        console.log(event.keyCode)
        if (event.keyCode === 38) {
            direactionX = 0
            direactionY = -1
        } else if (event.keyCode === 40) {
            direactionX = 0
            direactionY = 1
        } else if (event.keyCode === 37) {
            direactionX = -1
            direactionY = 0
        } else if (event.keyCode === 39) {
            direactionX = 1
            direactionY = 0
        }
    }


    //拼接贪吃蛇

    var oldHead = Aarry[0]
    var newHead = {
            x: oldHead.x + direactionX,
            y: oldHead.y + direactionY
        }
        //判断边界
    if (newHead.y < 0 || newHead.x < 0 || newHead.x * 30 >= 600 || newHead.y * 30 >= 600) {
        isgameover = true
    } else {
        Aarry.unshift(newHead) //在头部添加新的头部
            //判断食物是否被吃
        if (Aarry[0].x * 30 == x && Aarry[0].y * 30 == y) {
            isEat = true
        } else {
            isEat = false
            Aarry.pop() //去掉贪吃蛇尾部
        }
    }



    //绘制食物
    if (isEat) {
        x = Math.floor(Math.random() * 20) * 30
        y = Math.floor(Math.random() * 20) * 30
    }
    tools.fillStyle = '#cccc00'
        //  tools.fillRect(x,y,width,height)
    tools.fillRect(x, y, 30, 30)

    //绘制贪吃蛇


    for (var i = 0; i < Aarry.length; i++) {
        r = Math.floor(Math.random() * 256)
        g = Math.floor(Math.random() * 256)
        b = Math.floor(Math.random() * 256)
            // console.log(r, g, b)
        if (i === 0) {
            tools.fillStyle = 'red'
        } else {
            tools.fillStyle = `rgb(${r}, ${g}, ${b})`
        }
        tools.fillRect(Aarry[i].x * 30, Aarry[i].y * 30, 30, 30)
    }


    //画表格
    for (var i = 1; i < 20; i++) {
        tools.moveTo(0, 30 * i + 0.5)
        tools.lineTo(600, 30 * i + 0.5)
        tools.moveTo(30 * i + 0.5, 0)
        tools.lineTo(30 * i + 0.5, 600)
    }

    tools.strokeStyle = 'white'
    tools.stroke()
}, 1000 / 3);