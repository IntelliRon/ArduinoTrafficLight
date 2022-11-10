var five = require("johnny-five");
var wait = require("wait-for-stuff");
var board = new five.Board({port:"COM4"});


board.on("ready", function() {
        var redCarLed = new five.Led(13);
        var yellowCarLed = new five.Led(12);
        var greenCarLed = new five.Led(11);
        var redPedLed = new five.Led(10);
        var greenPedLed = new five.Led(9);

        var button = new five.Button({pin: 3, isPullup: true});
        var buzzer = new five.Piezo(2);
        
        greenCarLed.on();
        redPedLed.on();

        function startCross() {
            greenCarLed.off();

            //Yellow car led
            yellowCarLed.on();
            wait.for.time(4);
            yellowCarLed.off();

            // Green ped led stuff
            redPedLed.off();
            greenPedLed.on();

            
            // Red car led stuff
            redCarLed.on();
            for (let j = 0; j < 40; j++) {
                buzzer.frequency(1000, 50);
                wait.for.time(0.1);
            }
            redCarLed.off();
            
            // Yellow car blink led
            for (var i = 0; i < 5; i++) {
                yellowCarLed.on();
                greenPedLed.off();
                wait.for.time(0.5);
                yellowCarLed.off();
                greenPedLed.on();
                wait.for.time(0.5);
            }
            
            // Red ped led stuff
            greenPedLed.off();
            redPedLed.on();
            
            // Green car led stuff
            greenCarLed.on();
        }

        let alreadyTriggered = false;
        button.on("press", function() {
            if (alreadyTriggered === true) return;
            wait.for.time(2);
            alreadyTriggered = true;
            startCross();
            alreadyTriggered = false;
        });
});