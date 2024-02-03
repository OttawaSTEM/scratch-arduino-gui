export default function (Blockly) {
    // Ultrasonic
    Blockly.Arduino['arduino_pin_setPinTrigger'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        Blockly.Arduino.definitions_['definitions_ultrasonic_setTrigger' + arg0] =
            '#define PIN_TRIGGER         ' + arg0 + '   // TRIGGER PIN';
        var code = '';
        return code;
    };

    Blockly.Arduino['arduino_pin_setPinEcho'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        Blockly.Arduino.definitions_['definitions_ultrasonic_setEcho' + arg0] =
            '#define PIN_ECHO            ' + arg0 + '   // ECHO PIN';
        var code = '';
        return code;
    };

    Blockly.Arduino['arduino_pin_getDistance'] = function (block) {
        Blockly.Arduino.customFunctions_['definitions_pin_getDistance'] =
            '#include <Ultrasonic.h>\n' +
            'Ultrasonic ultrasonic(PIN_TRIGGER, PIN_ECHO);\n' +
            'int distance;';

        var code = 'distance = ultrasonic.read();\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_readDistance'] = function (block) {
        var code = 'distance';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    // Buzzer
    Blockly.Arduino['arduino_pin_setPinBuzzer'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        Blockly.Arduino.definitions_['definitions_buzzer_setBuzzer' + arg0] =
            '#define PIN_BUZZER         13   // BUZZER PIN\n\n' +
            'void set_tone(float noteFrequency, long noteDuration, int silentDuration) {\n' +
            '    tone(PIN_BUZZER, noteFrequency, noteDuration);\n' +
            '    delay(noteDuration);\n' +
            '    delay(silentDuration);\n' +
            '}\n\n' +
            'void bend_tones(float startFrequency, float endFrequency, float step, long noteDuration, int silentDuration) {\n' +
            '    if (startFrequency < endFrequency) {\n' +
            '        for (int i = startFrequency; i < endFrequency; i += step) {\n' +
            '            set_tone(i, noteDuration, silentDuration);\n' +
            '        }\n' +
            '    } else {\n' +
            '        for (int i = startFrequency; i > endFrequency; i -= step) {\n' +
            '            set_tone(i, noteDuration, silentDuration);\n' +
            '        }\n' +
            '    }\n' +
            '};';
        var code = '';
        return code;
    };

    Blockly.Arduino['arduino_pin_setTone'] = function (block) {
        var arg0 = block.getFieldValue('TONE');
        // var arg0 = Blockly.Arduino.valueToCode(block, 'TONE', Blockly.Arduino.ORDER_NONE);
        var arg1 = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE) || 200;
        var arg2 = Blockly.Arduino.valueToCode(block, 'SILENT', Blockly.Arduino.ORDER_NONE) || 500;

        var code = 'set_tone(' + arg0 + ', ' + arg1 + ', ' + arg2 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_bendTones'] = function (block) {
        var arg0 = block.getFieldValue('INITIALTONE');
        var arg1 = block.getFieldValue('FINALTONE');
        var arg2 = Blockly.Arduino.valueToCode(block, 'STEP', Blockly.Arduino.ORDER_NONE) || 20;
        var arg3 = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE) || 100;
        var arg4 = Blockly.Arduino.valueToCode(block, 'SILENT', Blockly.Arduino.ORDER_NONE) || 0;

        var code = 'bend_tones(' + arg0 + ', ' + arg1 + ', ' + arg2 + ', ' + arg3 + ', ' + arg4 + ');\n';
        return code;
    };

    // Nokia 5110 LCD
    Blockly.Arduino['arduino_nokia5110_setInitial'] = function (block) {
        Blockly.Arduino.includes_['include_nokia5110'] =
            '#include <Adafruit_GFX.h>\n' +
            '#include <Adafruit_PCD8544.h>\n' +
            '#include <SPI.h>';
        Blockly.Arduino.definitions_['definitions_nokia5110_setInitial'] =
            'const int rightPin = 2;\n' +
            'const int leftPin = 3;\n' +
            'const int downPin = 4;\n' +
            'const int upPin = 5;\n' +
            'const int bPin = 6;\n' +
            'const int usePin = 7;\n\n' +
            'Adafruit_PCD8544 display = Adafruit_PCD8544(8, 9, 10, 11, 12);\n\n' +
            'const unsigned char PROGMEM smileyFace[] = {\n' +
            '  B01010000,\n' +
            '  B01010000,\n' +
            '  B00000000,\n' +
            '  B10001000,\n' +
            '  B01110000};\n\n' +
            'const unsigned char PROGMEM heart[] = {\n' +
            '  B01010000,\n' +
            '  B10101000,\n' +
            '  B10001000,\n' +
            '  B01010000,\n' +
            '  B00100000};\n\n' +
            'const unsigned char PROGMEM arrowR[] = {\n' +
            '  B00100000,\n' +
            '  B00010000,\n' +
            '  B11111000,\n' +
            '  B00010000,\n' +
            '  B00100000};\n\n' +
            'const unsigned char PROGMEM arrowL[] = {\n' +
            '  B00100000,\n' +
            '  B01000000,\n' +
            '  B11111000,\n' +
            '  B01000000,\n' +
            '  B00100000};\n\n' +
            'const unsigned char PROGMEM arrowU[] = {\n' +
            '  B00100000,\n' +
            '  B01110000,\n' +
            '  B10101000,\n' +
            '  B00100000,\n' +
            '  B00100000};\n\n' +
            'const unsigned char PROGMEM arrowD[] = {\n' +
            '  B00100000,\n' +
            '  B00100000,\n' +
            '  B10101000,\n' +
            '  B01110000,\n' +
            '  B00100000};\n\n' +
            'const unsigned char PROGMEM mushroom[] = {\n' +
            '  B00001111, B00000000,\n' +
            '  B00110000, B11000000,\n' +
            '  B01001000, B00100000,\n' +
            '  B01000000, B10100000,\n' +
            '  B10011000, B00010000,\n' +
            '  B10000000, B00010000,\n' +
            '  B01111111, B11100000,\n' +
            '  B00010000, B10000000,\n' +
            '  B00010000, B10000000,\n' +
            '  B00010000, B10000000,\n' +
            '  B00001111, B00000000};\n\n' +
            'const unsigned char PROGMEM music[] = {\n' +
            '  B00001000,\n' +
            '  B00001100,\n' +
            '  B00001110,\n' +
            '  B00001111,\n' +
            '  B00001011,\n' +
            '  B00001001,\n' +
            '  B00001000,\n' +
            '  B00001000,\n' +
            '  B01111000,\n' +
            '  B10111000,\n' +
            '  B11111000,\n' +
            '  B01110000};\n\n' +
            'const unsigned char PROGMEM spaceship[] = {\n' +
            '  B00000100, B00000000,\n' +
            '  B00001010, B00000000,\n' +
            '  B00010001, B00000000,\n' +
            '  B00011011, B00000000,\n' +
            '  B00010101, B00000000,\n' +
            '  B00100000, B10000000,\n' +
            '  B00100100, B10000000,\n' +
            '  B00101010, B10000000,\n' +
            '  B00100100, B10000000,\n' +
            '  B01100000, B11000000,\n' +
            '  B10010001, B00100000,\n' +
            '  B10010001, B00100000,\n' +
            '  B10010001, B00100000,\n' +
            '  B10101110, B10100000,\n' +
            '  B11010001, B01100000,\n' +
            '  B00111111, B10000000};\n\n' +
            'const unsigned char PROGMEM controller[] = {\n' +
            '  B00111100, B00111100,\n' +
            '  B01000011, B11000010,\n' +
            '  B10010000, B00001001,\n' +
            '  B10111010, B01010101,\n' +
            '  B10010000, B00001001,\n' +
            '  B10000110, B01100001,\n' +
            '  B10001111, B11110001,\n' +
            '  B10010110, B01101001,\n' +
            '  B10010000, B00001001,\n' +
            '  B01100000, B00000110};\n\n' +
            'const unsigned char PROGMEM tree[] = {\n' +
            '  B00111000,\n' +
            '  B01111100,\n' +
            '  B01111100,\n' +
            '  B11111110,\n' +
            '  B11111110,\n' +
            '  B11111110,\n' +
            '  B00010000,\n' +
            '  B00010000,\n' +
            '  B00010000,\n' +
            '  B00010000};\n\n' +
            'const unsigned char PROGMEM cup[] = {\n' +
            '  B01111111, B00000000,\n' +
            '  B10111110, B10000000,\n' +
            '  B10011100, B10000000,\n' +
            '  B10000000, B10000000,\n' +
            '  B10000000, B10000000,\n' +
            '  B10000000, B10000000,\n' +
            '  B01000001, B00000000,\n' +
            '  B00111110, B00000000};\n\n' +
            'const unsigned char PROGMEM coin[] = {\n' +
            '  B00011100, B00000000,\n' +
            '  B00100010, B00000000,\n' +
            '  B01001001, B00000000,\n' +
            '  B10010100, B10000000,\n' +
            '  B10010100, B10000000,\n' +
            '  B10010100, B10000000,\n' +
            '  B10010100, B10000000,\n' +
            '  B10010100, B10000000,\n' +
            '  B10010100, B10000000,\n' +
            '  B01001001, B00000000,\n' +
            '  B00100010, B00000000,\n' +
            '  B00011100, B00000000};\n\n' +
            'const unsigned char PROGMEM player1[] = {\n' +
            '  B00011111, B10000000,\n' +
            '  B00111111, B11000000,\n' +
            '  B01111111, B11100000,\n' +
            '  B01111111, B11100000,\n' +
            '  B11110110, B11110000,\n' +
            '  B11000000, B00110000,\n' +
            '  B10001001, B00010000,\n' +
            '  B01001001, B00100000,\n' +
            '  B00100000, B01000000,\n' +
            '  B01011111, B10100000,\n' +
            '  B10010000, B10010000,\n' +
            '  B01111001, B11100000,\n' +
            '  B00100110, B01000000,\n' +
            '  B00011001, B10000000};\n\n' +
            'const unsigned char PROGMEM player2[] = {\n' +
            '  B00001111, B00000000,\n' +
            '  B00110000, B11000000,\n' +
            '  B01001111, B00100000,\n' +
            '  B01011111, B10100000,\n' +
            '  B10111111, B11010000,\n' +
            '  B10110101, B01010000,\n' +
            '  B11000000, B00110000,\n' +
            '  B10001001, B00010000,\n' +
            '  B11001001, B00110000,\n' +
            '  B10100000, B01010000,\n' +
            '  B10111111, B11010000,\n' +
            '  B11011001, B10110000,\n' +
            '  B10110110, B11010000,\n' +
            '  B11111111, B11110000,\n' +
            '  B01111111, B11100000};\n\n' +
            'void drawPicture(int x, int y, String picture, int color) {\n' +
            '  if (picture == "smileyFace") {\n' +
            '    display.drawBitmap(x, y, smileyFace, 5, 5, color);\n' +
            '  } else if ((picture == "heart")) {\n' +
            '    display.drawBitmap(x, y, heart, 5, 5, color);\n' +
            '  } else if ((picture == "arrowU")) {\n' +
            '    display.drawBitmap(x, y, arrowU, 5, 5, color);\n' +
            '  } else if ((picture == "arrowD")) {\n' +
            '    display.drawBitmap(x, y, arrowD, 5, 5, color);\n' +
            '  } else if ((picture == "arrowL")) {\n' +
            '    display.drawBitmap(x, y, arrowL, 5, 5, color);\n' +
            '  } else if ((picture == "arrowR")) {\n' +
            '    display.drawBitmap(x, y, arrowR, 5, 5, color);\n' +
            '  } else if ((picture == "mushroom")) {\n' +
            '    display.drawBitmap(x, y, mushroom, 12, 11, color);\n' +
            '  } else if ((picture == "music")) {\n' +
            '    display.drawBitmap(x, y, music, 8, 12, color);\n' +
            '  } else if ((picture == "spaceship")) {\n' +
            '    display.drawBitmap(x, y, spaceship, 11, 16, color);\n' +
            '  } else if ((picture == "controller")) {\n' +
            '    display.drawBitmap(x, y, controller, 16, 10, color);\n' +
            '  } else if ((picture == "tree")) {\n' +
            '    display.drawBitmap(x, y, tree, 7, 10, color);\n' +
            '  } else if ((picture == "cup")) {\n' +
            '    display.drawBitmap(x, y, cup, 9, 8, color);\n' +
            '  } else if ((picture == "coin")) {\n' +
            '    display.drawBitmap(x, y, coin, 9, 12, color);\n' +
            '  } else if ((picture == "player1")) {\n' +
            '    display.drawBitmap(x, y, player1, 12, 14, color);\n' +
            '  } else if ((picture == "player2")) {\n' +
            '    display.drawBitmap(x, y, player2, 12, 15, color);\n' +
            '  }\n' +
            '}';
        Blockly.Arduino.setups_['setup_nokia5110'] =
            'display.begin();\n' +
            '  display.setContrast(40);\n' +
            '  display.display();\n' +
            '  delay(2000);\n' +
            '  display.clearDisplay();';

        var code = '';
        return code;
    };

    Blockly.Arduino['arduino_nokia5110_setDisplay'] = function (block) {
        var code = 'display.display();\n';
        return code;
    };

    Blockly.Arduino['arduino_nokia5110_clearDisplay'] = function (block) {
        var code = 'display.clearDisplay();\n';
        return code;
    };

    Blockly.Arduino['arduino_nokia5110_setContrast'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 40;
        var code = 'display.setContrast(' + arg0 + '); \n';
        return code;
    };

    Blockly.Arduino['arduino_nokia5110_setCursor'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 40;
        var arg1 = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 40;
        var code = 'display.setCursor(' + arg0 + ', ' + arg1 + '); \n';
        return code;
    };

    Blockly.Arduino['arduino_nokia5110_writeText'] = function (block) {
        var arg0 = block.getFieldValue('TEXT') || 'Hi';
        var arg1 = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 40;
        var arg2 = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 40;
        var code = 'display.setCursor(' + arg1 + ', ' + arg2 + '); \n' +
            'display.println("' + arg0 + '");\n';
        return code;
    };

    Blockly.Arduino['arduino_nokia5110_drawPixel'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 10;
        var arg1 = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 10;
        var arg2 = block.getFieldValue('COLOR') || 'BLACK';
        var code = 'display.drawPixel(' + arg0 + ', ' + arg1 + ', ' + arg2 + '); \n';
        return code;
    };

    Blockly.Arduino['arduino_nokia5110_drawPicture'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 10;
        var arg1 = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 10;
        var arg2 = block.getFieldValue('PICTURE') || 'smileyFace';
        var arg3 = block.getFieldValue('COLOR') || 'BLACK';
        var code = 'drawPicture(' + arg0 + ', ' + arg1 + ', "' + arg2 + '", ' + arg3 + '); \n';
        return code;
    };
}

