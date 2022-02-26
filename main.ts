// show target number
input.onButtonPressed(Button.A, function () {
    basic.showNumber(target)
})
input.onGesture(Gesture.Shake, function () {
    if (flag != 0) {
        for (let index = 0; index < 3; index++) {
            basic.showString("Win:" + winner)
        }
    } else {
        basic.showNumber(0)
    }
})
// new random
input.onButtonPressed(Button.AB, function () {
    target = randint(1, 100)
    basic.showNumber(target)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(flag)
})
// name = id
// value = try
radio.onReceivedValue(function (name, value) {
    if (flag == 1) {
        basic.showString("Dead")
        radio.sendString("Win:" + winner)
    } else {
        if (name == "id") {
            hunter = value
        }
        if (name == "try") {
            if (value > target) {
                radio.sendString("" + value + ">")
            } else {
                // bingo!
                // 
                if (value < target) {
                    radio.sendString("" + value + "<")
                } else {
                    if (flag == 0) {
                        winner = hunter
                        flag = 1
                    }
                    radio.sendString("Dead")
                    basic.showIcon(IconNames.Heart)
                    music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
                }
            }
        }
    }
})
// server
let hunter = 0
let winner = 0
let target = 0
let flag = 0
radio.setTransmitPower(2)
radio.setGroup(99)
// hunted or not?
flag = 0
target = randint(1, 100)
basic.showNumber(target)
winner = 0
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
})
