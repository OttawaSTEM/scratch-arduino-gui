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
}

