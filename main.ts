function turnLeft () {
    basic.showArrow(ArrowNames.West)
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    0,
    robotbit.Motors.M2A,
    100
    )
    basic.pause(100)
}
function stop () {
    basic.showIcon(IconNames.No)
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    0,
    robotbit.Motors.M2A,
    0
    )
}
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
    move()
    stopKey = 0
})
function moveBack () {
    basic.showArrow(ArrowNames.South)
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    100,
    robotbit.Motors.M2A,
    -90
    )
    music.playMelody("C - C - C - C - ", 240)
}
function turnRight () {
    basic.showArrow(ArrowNames.NorthEast)
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    -100,
    robotbit.Motors.M2A,
    0
    )
    basic.pause(100)
}
function move () {
    basic.showArrow(ArrowNames.North)
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    -100,
    robotbit.Motors.M2A,
    90
    )
}
let dir = 0
let dist = 0
let deg = 0
let mindist = 0
let stopKey = 0
stop()
stopKey = 1
basic.showArrow(ArrowNames.West)
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
basic.forever(function () {
    while (stopKey == 0) {
        mindist = 1000
        deg = 0
        robotbit.Servo(robotbit.Servos.S1, deg)
        basic.pause(500)
        for (let index = 0; index < 10; index++) {
            robotbit.Servo(robotbit.Servos.S1, deg)
            basic.pause(100)
            dist = sonar.ping(
            DigitalPin.P12,
            DigitalPin.P13,
            PingUnit.Centimeters
            )
            if (dist == 0) {
                dist = 100
            }
            deg += 20
            if (mindist > dist) {
                mindist = dist
                dir = deg
                if (mindist < 10) {
                    stop()
                    basic.pause(100)
                    moveBack()
                    basic.pause(100)
                    stop()
                    basic.pause(100)
                }
            }
        }
        if (mindist < 40 && stopKey == 0) {
            if (dir < 90) {
                turnLeft()
                move()
            } else {
                turnRight()
                move()
            }
        }
    }
})
basic.forever(function () {
    if (input.lightLevel() < 1) {
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Blue))
        strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
        strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        strip.show()
        basic.pause(5000)
    } else {
        strip.clear()
        strip.show()
    }
})
