// piblockly/media/user_modules/_core_hw_lib/generators.js

export function registerGenerators(Blockly) {

  function getPlatformAwareWireSetup(sdaPin, sclPin) {
    if (sdaPin && sclPin && sdaPin !== '""' && sclPin !== '""') {
      return `#if defined(ARDUINO_ARCH_RP2040)
  Wire.setSDA(${sdaPin});
  Wire.setSCL(${sclPin});
  Wire.begin();
#elif defined(ARDUINO_ARCH_ESP32) || defined(ARDUINO_ARCH_ESP8266)
  Wire.begin(${sdaPin}, ${sclPin});
#else
  // For standard AVR boards, custom I2C pins are not supported this way. Using default pins.
  Wire.begin();
#endif`;
    } else {
      return 'Wire.begin();';
    }
  }

  // Sensors
  // Common Category  
  // HC-SR04
  Blockly.Arduino.forBlock['piblockly_hw_ultrasonic_distance'] = function (block) {
    const trigPin = Blockly.Arduino.valueToCode(block, 'TRIG_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const echoPin = Blockly.Arduino.valueToCode(block, 'ECHO_PIN', Blockly.Arduino.ORDER_ATOMIC);

    const functionName = Blockly.Arduino.variableDB_.getDistinctName(
      'readUltrasonicDistance', Blockly.NAME_TYPE);
    Blockly.Arduino.function_definitions_[functionName] = `
long ${functionName}(int triggerPin, int echoPin) {
  pinMode(triggerPin, OUTPUT);
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  pinMode(echoPin, INPUT);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}`;
    const code = `${functionName}(${trigPin}, ${echoPin})`;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  // DHT
  Blockly.Arduino.forBlock['piblockly_hw_dht_read'] = function (block) {
    const readingType = block.getFieldValue('READING_TYPE');
    const pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    const dhtType = block.getFieldValue('DHT_TYPE');
    const dhtVarName = `dht_${pin}`;
    Blockly.Arduino.includes_['dht'] = '#include <DHT.h> // Library: "DHT sensor library" by Adafruit';
    Blockly.Arduino.global_vars_[`dht_${pin}`] = `DHT ${dhtVarName}(${pin}, ${dhtType});`;
    Blockly.Arduino.setups_[`dht_${pin}`] = `${dhtVarName}.begin();`;
    let code;
    if (readingType === 'TEMP') {
      code = `${dhtVarName}.readTemperature()`;
    } else if (readingType === 'HUMID') {
      code = `${dhtVarName}.readHumidity()`;
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };


  // MPU9250
  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_init'] = function (block) {
    const sdaPin = Blockly.Arduino.valueToCode(block, 'SDA_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const sclPin = Blockly.Arduino.valueToCode(block, 'SCL_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const accelRange = block.getFieldValue('ACCEL_RANGE');
    const gyroRange = block.getFieldValue('GYRO_RANGE');

    Blockly.Arduino.includes_['wire'] = '#include <Wire.h>';
    Blockly.Arduino.includes_['mpu9250_asukiaaa'] = '#include <MPU9250_asukiaaa.h>';
    Blockly.Arduino.global_vars_['mpu9250_obj'] = 'MPU9250_asukiaaa myMPU9250;';
    Blockly.Arduino.global_vars_['mpu9250_angles'] = 'double pitch, roll, yaw;';

    Blockly.Arduino.function_definitions_['calc_mpu9250_angle'] =
      `void calcMPU9250angle() {
  pitch = atan2(myMPU9250.accelY(), sqrt(myMPU9250.accelX() * myMPU9250.accelX() + myMPU9250.accelZ() * myMPU9250.accelZ())) * 57.3;
  roll = atan2(myMPU9250.accelX(), sqrt(myMPU9250.accelY() * myMPU9250.accelY() + myMPU9250.accelZ() * myMPU9250.accelZ())) * 57.3;
}`;

    const wireSetupCode = getPlatformAwareWireSetup(sdaPin, sclPin);

    let setupCode = `  ${wireSetupCode}\n`;
    setupCode += `  myMPU9250.setWire(&Wire);\n`;
    setupCode += `  myMPU9250.beginAccel(${accelRange});\n`;
    setupCode += `  myMPU9250.beginGyro(${gyroRange});\n`;
    setupCode += `  myMPU9250.beginMag();`;

    Blockly.Arduino.setups_['mpu9250_init'] = setupCode;
    return '';
  };



  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_accel_fetch'] = function (block) {
    return 'myMPU9250.accelUpdate();\ncalcMPU9250angle();\n';
  };

  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_accel_3axis'] = function (block) {
    const axis = block.getFieldValue('AXIS'); // 0, 1, 2 for x, y, z
    const axes = ['myMPU9250.accelX()', 'myMPU9250.accelY()', 'myMPU9250.accelZ()'];
    return [axes[parseInt(axis)], Blockly.Arduino.ORDER_ATOMIC];
  };



  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_gyro_fetch'] = function (block) {
    return 'myMPU9250.gyroUpdate();\n';
  };

  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_gyro_3axis'] = function (block) {
    const axis = block.getFieldValue('AXIS'); // 0, 1, 2 for x, y, z
    const axes = ['myMPU9250.gyroX()', 'myMPU9250.gyroY()', 'myMPU9250.gyroZ()'];
    return [axes[parseInt(axis)], Blockly.Arduino.ORDER_ATOMIC];
  };



  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_mag_fetch'] = function (block) {
    return 'myMPU9250.magUpdate();\n';
  };

  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_mag_3axis'] = function (block) {
    const axis = block.getFieldValue('AXIS'); // 0, 1, 2 for x, y, z
    const axes = ['myMPU9250.magX()', 'myMPU9250.magY()', 'myMPU9250.magZ()'];
    return [axes[parseInt(axis)], Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.forBlock['piblockly_hw_mpu9250_accel_pitch_roll'] = function (block) {
    const pitchRoll = block.getFieldValue('PITCH_ROLL'); // 0 for pitch, 1 for roll
    return [pitchRoll === "0" ? 'pitch' : 'roll', Blockly.Arduino.ORDER_ATOMIC];
  };


  //MAX30105
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_max30105_init'] = function (block) {
    const sdaPin = Blockly.Arduino.valueToCode(block, 'SDA_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const sclPin = Blockly.Arduino.valueToCode(block, 'SCL_PIN', Blockly.Arduino.ORDER_ATOMIC);
    var ledRed = Blockly.Arduino.valueToCode(block, "LED_RED", Blockly.Arduino.ORDER_ATOMIC) || "0";

    Blockly.Arduino.includes_['wire'] = '#include <Wire.h>';
    Blockly.Arduino.includes_['define_MAX30105_include'] = '#include "MAX30105.h"\n#include "heartRate.h"';
    Blockly.Arduino.global_vars_['define_MAX30105_variable_invoke'] = '#define FINGER_ON 7000\n#define MINIMUM_SPO2 90.0\nboolean max3010xReady=false;\ndouble avgRed=0, avgIR=0, ESpO2 = MINIMUM_SPO2;\nconst double FSpO2 = 0.7, frate = 0.95;\nbyte validMin=20, validMax=250;\nMAX30105 max3010xSensor;\n';

    const wireSetupCode = getPlatformAwareWireSetup(sdaPin, sclPin);

    let setupCode = `  ${wireSetupCode}\n`;
    setupCode += `  max3010xReady=max3010xSensor.begin(Wire, I2C_SPEED_FAST);\n`;
    setupCode += `  max3010xSensor.setup(${ledRed}, 4, 2, 800, 215, 16384);\n`;
    setupCode += `  max3010xSensor.enableDIETEMPRDY();\n`;
    setupCode += `  max3010xSensor.setPulseAmplitudeRed(0x0A);\n`;
    setupCode += `  max3010xSensor.setPulseAmplitudeGreen(0);`;

    Blockly.Arduino.setups_['setup_max30105_init'] = setupCode;
    return '';
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_max30105_check'] = function (block) {
    var a = block.getFieldValue("CHECK_TYPE");
    if (a === "IR") {
      return ['(max3010xSensor.getIR() > FINGER_ON)', Blockly.Arduino.ORDER_ATOMIC];
    } else if (a === "READY") {
      return ['max3010xReady', Blockly.Arduino.ORDER_ATOMIC];
    } else {
      return ['(checkForBeat(max3010xSensor.getIR()) == true)', Blockly.Arduino.ORDER_ATOMIC];
    }
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_max30105_get_beat_rate'] = function (block) {
    var a = Blockly.Arduino.valueToCode(block, "AVG", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.function_definitions_['define_MAX30105_heartbeat_invoke'] = 'int getHeartBeat(byte avgTimes)\n{\n  long lastBeat=0, myIRvalue=0, delta=0;\n  byte myCount=0;\n  int beatSum=0;\n  float myBPM=0.0;\n  while(myCount<avgTimes){\n    myIRvalue=max3010xSensor.getIR();\n    if (checkForBeat(myIRvalue)) {\n      delta = millis() - lastBeat;\n      lastBeat = millis();\n      myBPM = 60 / (delta / 1000.0);\n      if (myBPM < validMax && myBPM > validMin) {\n        beatSum+=( (byte)myBPM);\n        myCount++;\n      }\n    }\n    if (myIRvalue < FINGER_ON )\n      break;\n  }\n  if (myCount==0)\n    myCount=1;\n  return(beatSum/myCount);\n}\n';
    return ['getHeartBeat(' + a + ')', Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_max30105_get_spo2'] = function (block) {
    Blockly.Arduino.function_definitions_['define_MAX30105_spo2_invoke'] = 'double getSPO2(byte avgTimes)\n{\n  uint32_t ir,red;\n  double df_red,df_ir;\n  byte myCount=0;\n  double sumIR = 0, sumRed = 0, SpO2 = 0;\n  while(myCount<avgTimes){\n    max3010xSensor.check();\n    if (max3010xSensor.available()) {\n      myCount++;\n      red = max3010xSensor.getFIFOIR();\n      ir = max3010xSensor.getFIFORed();\n      max3010xSensor.nextSample();\n      df_red = (double)red;\n      df_ir = (double)ir;\n      avgRed = avgRed * frate + (double)red * (1.0 - frate);\n      avgIR = avgIR * frate + (double)ir * (1.0 - frate);\n      sumRed += (df_red - avgRed) * (df_red - avgRed);\n      sumIR += (df_ir - avgIR) * (df_ir - avgIR);\n    }\n  }\n  if (myCount==avgTimes){\n    double R = (sqrt(sumRed) / avgRed) / (sqrt(sumIR) / avgIR);\n    SpO2 = -23.3 * (R - 0.4) + 100;\n    ESpO2 = FSpO2 * ESpO2 + (1.0 - FSpO2) * SpO2;\n    if (ESpO2 <= MINIMUM_SPO2)\n      ESpO2 = MINIMUM_SPO2;\n    if (ESpO2 > 100)\n      ESpO2 = 99.9;\n  } else {\n      ESpO2 = MINIMUM_SPO2;\n  }\n  return ESpO2;\n}\n';
    return ['getSPO2(20)', Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_max30105_get_temperature'] = function (block) {
    var a = block.getFieldValue("TEMP_TYPE");
    if (a === "C") {
      return ['max3010xSensor.readTemperature()', Blockly.Arduino.ORDER_ATOMIC];
    }
    else {
      return ['max3010xSensor.readTemperatureF()', Blockly.Arduino.ORDER_ATOMIC];
    }
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_max30105_set_beat_range'] = function (block) {
    var a = Blockly.Arduino.valueToCode(block, "MIN", Blockly.Arduino.ORDER_ATOMIC) || "0",
      b = Blockly.Arduino.valueToCode(block, "MAX", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return 'validMin=' + a + ';\nvalidMax=' + b + ';\n';
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_max30105_set_spo2_clear'] = function (block) {
    return 'avgRed=0;\navgIR=0;\nESpO2=MINIMUM_SPO2;\n';
  };


  // PS2
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_initial'] = function (block) {
    var CLK = Blockly.Arduino.valueToCode(block, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
    var CMD = Blockly.Arduino.valueToCode(block, 'CMD', Blockly.Arduino.ORDER_ATOMIC);
    var CS = Blockly.Arduino.valueToCode(block, 'CS', Blockly.Arduino.ORDER_ATOMIC);
    var DAT = Blockly.Arduino.valueToCode(block, 'DAT', Blockly.Arduino.ORDER_ATOMIC);
    var pressures = block.getFieldValue('pressures');
    var rumble = block.getFieldValue('rumble');
    Blockly.Arduino.includes_['define_ps2_initial'] = '#include <PS2X_lib.h>\n'
      + '#define PS2_DAT        ' + DAT + '\n'
      + '#define PS2_CMD        ' + CMD + '\n'
      + '#define PS2_SEL        ' + CS + '\n'
      + '#define PS2_CLK        ' + CLK + '\n'
      + '#define pressures   ' + pressures + '\n'
      + '#define rumble      ' + rumble + '\n'
      + 'PS2X ps2x;\n'
      + 'int ps2_error = 0;\nbyte ps2_type = 0;\nString ps2_rotate[8] = {"ul","u","ur","r","dr","d","dl","l"};\n';
    Blockly.Arduino.setups_['define_ps2_initial'] = 'delay(300);\n  ps2_error = ps2x.config_gamepad(PS2_CLK, PS2_CMD, PS2_SEL, PS2_DAT, pressures, rumble);\n  if (ps2_error==0)\n    ps2_type = ps2x.readType();';
    return '';
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_read'] = function (block) {
    var vibrate = block.getFieldValue('vibrate');
    var val = Blockly.Arduino.valueToCode(block, 'val', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'if (ps2_error != 0) return;\nif (ps2_type == 2)\n  ps2x.read_gamepad();\nelse\n  ps2x.read_gamepad(' + vibrate + ', ' + val + ');\n';
    return code;
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_button_event'] = function (block) {
    var btn = block.getFieldValue('button');
    var event = block.getFieldValue('event');
    var code;
    if (event === "press") {
      code = 'ps2x.Button(' + btn + ')';
    }
    else if (event === "press_new") { code = 'ps2x.NewButtonState(' + btn + ')'; }
    else if (event === "press_just") { code = 'ps2x.ButtonPressed(' + btn + ')'; }
    else if (event === "release_just") { code = 'ps2x.ButtonReleased(' + btn + ')'; }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_initial_func'] = function (block) {
    var func = block.getFieldValue('func');
    if (func === "PRESSURES") { var code = 'ps2x.enablePressures();\n'; }
    else { var code = 'ps2x.enableRumble();\n'; }
    return code;
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_stick_direction'] = function (block) {
    var position = block.getFieldValue('position');
    var type = block.getFieldValue('type');
    var direction = block.getFieldValue('direction');
    var analogMax = "255";
    Blockly.Arduino.function_definitions_['ps2_stick_direction8'] = 'String ps2_stick_direction8(boolean position) {\n' +
      '  int X, Y;\n' +
      '  int analogMax = ' + analogMax + ';\n' +
      '  int lower = analogMax/2-analogMax/8;\n' +
      '  int upper = analogMax/2+analogMax/8;\n' +
      '  if (position)\n' +
      '  {\n' +
      '    X = ps2x.Analog(PSS_LX);\n' +
      '    Y = ps2x.Analog(PSS_LY);\n' +
      '  }\n' +
      '  else\n' +
      '  {\n' +
      '    X = ps2x.Analog(PSS_RX);\n' +
      '    Y = ps2x.Analog(PSS_RY);\n' +
      '  }\n' +
      '  if (X<=lower&&Y<=lower)  return ps2_rotate[0];\n' +
      '  if (X>=lower&&X<=upper&&Y<=lower)  return ps2_rotate[1];\n' +
      '  if (X>=upper&&Y<=lower)  return ps2_rotate[2];\n' +
      '  if (X>=upper&&Y>=lower&&Y<=upper)  return ps2_rotate[3];\n' +
      '  if (X>=upper&&Y>=upper)  return ps2_rotate[4];\n' +
      '  if (X>=lower&&X<=upper&&Y>=upper)  return ps2_rotate[5];\n' +
      '  if (X<=lower&&Y>=upper)  return ps2_rotate[6];\n' +
      '  if (X<=lower&&Y>=lower&&Y<=upper)  return ps2_rotate[7];\n' +
      '  return "x";\n' +
      '}\n';
    Blockly.Arduino.function_definitions_['ps2_stick_direction4'] = 'String ps2_stick_direction4(boolean position) {\n' +
      '  int X, Y;\n' +
      '  int analogMax = ' + analogMax + ';\n' +
      '  int lower = analogMax/2-analogMax/8;\n' +
      '  int upper = analogMax/2+analogMax/8;\n' +
      '  if (position)\n' +
      '  {\n' +
      '    X = ps2x.Analog(PSS_LX);\n' +
      '    Y = ps2x.Analog(PSS_LY);\n' +
      '  }\n' +
      '  else\n' +
      '  {\n' +
      '    X = ps2x.Analog(PSS_RX);\n' +
      '    Y = ps2x.Analog(PSS_RY);\n' +
      '  }\n' +
      '  if (X>=lower&&X<=upper&&Y<=lower)  return ps2_rotate[1];\n' +
      '  if (X>=upper&&Y>=lower&&Y<=upper)  return ps2_rotate[3];\n' +
      '  if (X>=lower&&X<=upper&&Y>=upper)  return ps2_rotate[5];\n' +
      '  if (X<=lower&&Y>=lower&&Y<=upper)  return ps2_rotate[7];\n' +
      '  return "x";\n' +
      '}\n';
    var code = '(ps2_stick_direction' + type + '(' + position + ')=="' + direction + '")';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_state'] = function (block) {
    var code = '(ps2_error == 0)';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_receiver_state'] = function (block) {
    var code = '(ps2x.receiver_state != 0)';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_analog_max'] = function (block) {
    var val = Blockly.Arduino.valueToCode(block, 'val', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'int analogMax = ' + val + ';\n';
    return code;
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_analog_read'] = function (block) {
    var analog = block.getFieldValue('analog');
    var code = 'ps2x.Analog(' + analog + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.forBlock['PIBLOCKLY_HW_ps2_pressures_read'] = function (block) {
    var analog = block.getFieldValue('analog');
    var code = 'ps2x.Analog(' + analog + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };


  // Actuator
  // L293D
  Blockly.Arduino.forBlock['piblockly_hw_l293d_motor_run'] = function (block) {
    Blockly.Arduino.includes_['l293d_afmotor'] = '#include <AFMotor.h>';
    const motor = block.getFieldValue('MOTOR');
    const dir = block.getFieldValue('DIR');
    let speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';

    Blockly.Arduino.global_vars_[`l293d_motor${motor}`] = `AF_DCMotor motor${motor}(${motor}, MOTOR12_8KHZ);`;
    
    // Constrain the speed to 0-255 range
    speed = `constrain(${speed}, 0, 255)`;

    return `motor${motor}.run(${dir});\nmotor${motor}.setSpeed(${speed});\n`;
  };

  // New block: piblockly_hw_l293d_motor_speed
  Blockly.Arduino.forBlock['piblockly_hw_l293d_motor_speed'] = function(block) {
    Blockly.Arduino.includes_['l293d_afmotor'] = '#include <AFMotor.h>';
    const motor = block.getFieldValue('MOTOR');
    const speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';

    // Ensure the motor object is defined globally
    Blockly.Arduino.global_vars_[`l293d_motor${motor}`] = `AF_DCMotor motor${motor}(${motor}, MOTOR12_8KHZ);`;
    
    // Define a helper function to handle the signed speed logic
    const functionName = Blockly.Arduino.variableDB_.getDistinctName(
      `runDCMotor_${motor}`, Blockly.NAME_TYPE
    ); // Use motor number in function name to avoid conflicts if multiple motors are used with this block

    const functionCode = `
void ${functionName}(AF_DCMotor &motor_obj, int speed_val) {
  if (speed_val > 255) speed_val = 255;
  if (speed_val < -255) speed_val = -255;
  
  if (speed_val > 0) {
    motor_obj.run(FORWARD);
    motor_obj.setSpeed(speed_val);
  } else if (speed_val < 0) {
    motor_obj.run(BACKWARD);
    motor_obj.setSpeed(abs(speed_val));
  } else {
    motor_obj.run(RELEASE);
    motor_obj.setSpeed(0);
  }
}`;
    
    Blockly.Arduino.function_definitions_[`l293d_motor_speed_helper_${motor}`] = functionCode;

    // Generate the call to the helper function
    return `${functionName}(motor${motor}, ${speed});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_l293d_motor_stop'] = function (block) {
    Blockly.Arduino.includes_['l293d_afmotor'] = '#include <AFMotor.h>';
    const motor = block.getFieldValue('MOTOR');

    return `motor${motor}.run(RELEASE);\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_l293d_stepper_init'] = function (block) {
    Blockly.Arduino.includes_['l293d_afmotor'] = '#include <AFMotor.h>';
    const motor = block.getFieldValue('MOTOR'); // S1 or S2, which map to 1 or 2
    const steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '0'; // steps per revolution

    // The original AFMotor library constructor takes (steps_per_rev, motor_num), where motor_num is 1 or 2 for stepper ports.
    // However, the original block's MOTOR dropdown gives "1" or "2" directly.
    // So, AF_Stepper stepper1(steps, 1) or AF_Stepper stepper2(steps, 2)
    Blockly.Arduino.global_vars_[`l293d_stepper${motor}`] = `AF_Stepper stepper${motor}(${steps}, ${motor});`;

    return ''; // Stepper init doesn't generate code in loop
  };

  Blockly.Arduino.forBlock['piblockly_hw_l293d_stepper_speed'] = function (block) {
    const motor = block.getFieldValue('MOTOR');
    const speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';

    return `stepper${motor}.setSpeed(${speed});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_l293d_stepper_run'] = function (block) {
    const motor = block.getFieldValue('MOTOR');
    const dir = block.getFieldValue('DIR'); // FORWARD or BACKWARD
    const steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    const method = block.getFieldValue('METHOD'); // SINGLE, DOUBLE, INTERLEAVE, MICROSTEP

    return `stepper${motor}.step(${steps}, ${dir}, ${method});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_l293d_stepper_stop'] = function (block) {
    const motor = block.getFieldValue('MOTOR');

    return `stepper${motor}.release();\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_l293d_servo_run'] = function (block) {
    Blockly.Arduino.includes_['l293d_servo'] = '#include <Servo.h>';
    const motor = block.getFieldValue('MOTOR'); // 9 or 10
    const angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '0';

    Blockly.Arduino.global_vars_[`l293d_servo_${motor}`] = `Servo L293dServo_${motor};`;
    Blockly.Arduino.setups_[`l293d_servo_attach_${motor}`] = `L293dServo_${motor}.attach(${motor});`;

    return `L293dServo_${motor}.write(${angle});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_l293d_servo_detach'] = function (block) {
    const motor = block.getFieldValue('MOTOR'); // 9 or 10

    return `L293dServo_${motor}.detach();\n`;
  };

  // PCA9685
  Blockly.Arduino.forBlock['piblockly_hw_pca9685_init'] = function (block) {
    const sdaPin = Blockly.Arduino.valueToCode(block, 'SDA_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const sclPin = Blockly.Arduino.valueToCode(block, 'SCL_PIN', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.includes_['wire'] = '#include <Wire.h>'; // Ensure Wire.h is included
    Blockly.Arduino.includes_['pca9685_adafruit_pwm'] = '#include <Adafruit_PWMServoDriver.h>';
    Blockly.Arduino.global_vars_['pca9685_pwm'] = 'Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();';

    const wireSetupCode = getPlatformAwareWireSetup(sdaPin, sclPin);

    let setupCode = `  ${wireSetupCode}\n`;
    setupCode += `  pwm.begin();\n`;
    setupCode += `  pwm.setOscillatorFrequency(27000000);\n`;
    setupCode += `  pwm.setPWMFreq(50);\n`;
    setupCode += `  Wire.setClock(400000);`;

    Blockly.Arduino.setups_['pca9685_begin'] = setupCode;
    return '';
  };

  Blockly.Arduino.forBlock['piblockly_hw_pca9685_pwm_write'] = function (block) {
    const channel = Blockly.Arduino.valueToCode(block, 'Channel', Blockly.Arduino.ORDER_ATOMIC) || '0';
    const value = Blockly.Arduino.valueToCode(block, 'Value', Blockly.Arduino.ORDER_ATOMIC) || '4095';

    Blockly.Arduino.function_definitions_['pca9685_pwmset'] =
      `void pwmset(int ch_, int pwm_) {
  if (pwm_ < 0) pwm_ = 0;
  if (pwm_ > 4095) pwm_ = 4095;
  pwm.setPWM(ch_, 0, (pwm_ + (4096/16)*0) % 4096 );
}`;
    return `pwmset(${channel}, ${value});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_pca9685_servo_init'] = function (block) {
    const pulse_min = Blockly.Arduino.valueToCode(block, 'pulse_min', Blockly.Arduino.ORDER_ATOMIC) || '600';
    const pulse_max = Blockly.Arduino.valueToCode(block, 'pulse_max', Blockly.Arduino.ORDER_ATOMIC) || '2400';

    Blockly.Arduino.global_vars_['pca9685_servomin'] = `int servomin = ${pulse_min};`;
    Blockly.Arduino.global_vars_['pca9685_servomax'] = `int servomax = ${pulse_max};`;

    return ''; // No code to generate in loop
  };

  Blockly.Arduino.forBlock['piblockly_hw_pca9685_servo_write'] = function (block) {
    const channel = Blockly.Arduino.valueToCode(block, 'Channel', Blockly.Arduino.ORDER_ATOMIC) || '0';
    const degree = Blockly.Arduino.valueToCode(block, 'Degree', Blockly.Arduino.ORDER_ATOMIC) || '180';

    Blockly.Arduino.function_definitions_['pca9685_servoset'] = `
void servoset(int ch_, int deg_) {
  if (deg_ < 0) deg_ = 0;
  if (deg_ > 180) deg_ = 180;
  int pulse_ = map(deg_, 0, 180, servomin, servomax);
  pwm.writeMicroseconds(ch_, pulse_);
}`;
    return `servoset(${channel}, ${degree});\n`;
  };


  // Servo
  Blockly.Arduino.forBlock['piblockly_hw_servo_attach'] = function (block) {
    const servoVar = block.getFieldValue('SERVO_VAR');
    const pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.includes_['servo'] = '#include <Servo.h>';
    Blockly.Arduino.global_vars_['servo_' + servoVar] = `Servo ${servoVar};`;
    Blockly.Arduino.setups_['servo_attach_' + servoVar] = `${servoVar}.attach(${pin});`;

    return '';

  };



  Blockly.Arduino.forBlock['piblockly_hw_servo_attach_advanced'] = function (block) {
    const servoVar = block.getFieldValue('SERVO_VAR');
    const pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    const min = Blockly.Arduino.valueToCode(block, 'MIN', Blockly.Arduino.ORDER_ATOMIC);
    const max = Blockly.Arduino.valueToCode(block, 'MAX', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.includes_['servo'] = '#include <Servo.h>';
    Blockly.Arduino.global_vars_['servo_' + servoVar] = `Servo ${servoVar};`;
    Blockly.Arduino.setups_['servo_attach_' + servoVar] = `${servoVar}.attach(${pin}, ${min}, ${max});`;

    return '';
  };



  Blockly.Arduino.forBlock['piblockly_hw_servo_write'] = function (block) {
    const servoVar = block.getFieldValue('SERVO_VAR');
    const angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC);

    return `${servoVar}.write(${angle});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_servo_write_micros'] = function (block) {
    const servoVar = block.getFieldValue('SERVO_VAR');
    const micros = Blockly.Arduino.valueToCode(block, 'MICROS', Blockly.Arduino.ORDER_ATOMIC);

    return `${servoVar}.writeMicroseconds(${micros});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_servo_read'] = function (block) {
    const servoVar = block.getFieldValue('SERVO_VAR');

    const code = `${servoVar}.read()`;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.forBlock['piblockly_hw_servo_detach'] = function (block) {
    const servoVar = block.getFieldValue('SERVO_VAR');

    return `${servoVar}.detach();\n`;
  };



  // Stepper
  Blockly.Arduino.forBlock['piblockly_hw_stepper_init'] = function (block) {
    Blockly.Arduino.includes_['stepper_accel'] = '#include <AccelStepper.h>';
    const motor = block.getFieldValue('MOTOR');
    const stepperInterface = block.getFieldValue('INTERFACE');
    const steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '2048';
    const p1 = Blockly.Arduino.valueToCode(block, 'P1', Blockly.Arduino.ORDER_ATOMIC) || '0';
    const p2 = Blockly.Arduino.valueToCode(block, 'P2', Blockly.Arduino.ORDER_ATOMIC) || '0';
    const p3 = Blockly.Arduino.valueToCode(block, 'P3', Blockly.Arduino.ORDER_ATOMIC) || '0';
    const p4 = Blockly.Arduino.valueToCode(block, 'P4', Blockly.Arduino.ORDER_ATOMIC) || '0';

    Blockly.Arduino.global_vars_[`stepper_${motor}`] = `AccelStepper stepper${motor}(AccelStepper::${stepperInterface}, ${p1}, ${p3}, ${p2}, ${p4});`;
    Blockly.Arduino.setups_[`stepper_${motor}`] = `stepper${motor}.setMaxSpeed(1000);\n  stepper${motor}.setAcceleration(500);`;

    return '';
  };

  Blockly.Arduino.forBlock['piblockly_hw_stepper_set_speed'] = function (block) {
    const motor = block.getFieldValue('MOTOR') || '1';
    const speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '1000';

    return `stepper${motor}.setMaxSpeed(${speed});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_stepper_set_accel'] = function (block) {
    const motor = block.getFieldValue('MOTOR') || '1';
    const accel = Blockly.Arduino.valueToCode(block, 'ACCEL', Blockly.Arduino.ORDER_ATOMIC) || '500';

    return `stepper${motor}.setAcceleration(${accel});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_stepper_move_to'] = function (block) {
    const motor = block.getFieldValue('MOTOR') || '1';
    const position = Blockly.Arduino.valueToCode(block, 'POSITION', Blockly.Arduino.ORDER_ATOMIC) || '0';

    return `stepper${motor}.moveTo(${position});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_stepper_move'] = function (block) {
    const motor = block.getFieldValue('MOTOR') || '1';
    const steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '0';

    return `stepper${motor}.move(${steps});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_stepper_run'] = function (block) {
    const motor = block.getFieldValue('MOTOR') || '1';

    return `stepper${motor}.run();\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_stepper_stop'] = function (block) {
    const motor = block.getFieldValue('MOTOR') || '1';

    return `stepper${motor}.stop();\n`;
  };


  // AI
  // HuskyLens
  Blockly.Arduino.forBlock['piblockly_hw_huskylens_i2c_init'] = function (block) {
    const sdaPin = Blockly.Arduino.valueToCode(block, 'SDA_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const sclPin = Blockly.Arduino.valueToCode(block, 'SCL_PIN', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.includes_['wire'] = '#include <Wire.h>';
    Blockly.Arduino.includes_['huskylens_softwareserial'] = '#include <SoftwareSerial.h>';
    Blockly.Arduino.includes_['huskylens'] = '#include "DFRobot_HuskyLens.h" // Library: https://github.com/simfonia/piBlockly-modules/blob/master/lib/HuskyLens.7z';
    Blockly.Arduino.global_vars_['huskylens'] = 'DFRobot_HuskyLens huskylens;';

    let wireSetupCode;
    const hasCustomPins = sdaPin && sclPin && sdaPin !== '""' && sclPin !== '""';

    if (hasCustomPins) {
      wireSetupCode =
        `#if defined(ARDUINO_ARCH_RP2040)
  Wire.setSDA(${sdaPin});
  Wire.setSCL(${sclPin});
  Wire.begin();
#elif defined(ARDUINO_ARCH_ESP32) || defined(ARDUINO_ARCH_ESP8266)
  Wire.begin(${sdaPin}, ${sclPin});
#else
  // For standard AVR boards, custom I2C pins are not supported this way. Using default pins.
  Wire.begin();
#endif`;
    } else {
      wireSetupCode = 'Wire.begin();';
    }

    let setupCode = `  ${wireSetupCode}\n`;
    setupCode += `  while (!huskylens.begin(Wire)) {\n`;
    setupCode += `    // Add error message here if needed, e.g., via Serial Monitor\n`;
    setupCode += `    delay(100);\n`;
    setupCode += `  }`;

    Blockly.Arduino.setups_['huskylens_begin'] = setupCode;
    return '';
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_uart_init'] = function (block) {
    var rx = Blockly.Arduino.valueToCode(block, "RX", Blockly.Arduino.ORDER_ATOMIC) || "10";
    var tx = Blockly.Arduino.valueToCode(block, "TX", Blockly.Arduino.ORDER_ATOMIC) || "11";

    // Main huskylens include/object are defined in the I2C block generator.
    // We still need to ensure SoftwareSerial is included, as the DFRobot_HuskyLens.h does not include it.
    Blockly.Arduino.includes_['huskylens_softwareserial'] = '#include <SoftwareSerial.h>';

    Blockly.Arduino.setups_['huskylens_begin'] = `huskylens.beginSoftwareSerialUntilSuccess(${rx}, ${tx});`;
    return "";
  };

  Blockly.Arduino.forBlock['huskylens_set_algorithm'] = function (block) {
    const algorithm = block.getFieldValue('ALGORITHM');
    return `huskylens.writeAlgorithm(${algorithm});\n`;
  };

  Blockly.Arduino.forBlock['huskylens_request_and_check'] = function (block) {
    const branch = Blockly.Arduino.statementToCode(block, 'DO');
    const code = `if (huskylens.request()) {
  while (huskylens.available()) {
    HUSKYLENSResult result = huskylens.read();
${branch}  }
}
`;
    return code;
  };

  Blockly.Arduino.forBlock['huskylens_get_result_property'] = function (block) {
    const property = block.getFieldValue('PROPERTY');
    const code = `result.${property}`;
    return [code, Blockly.Arduino.ORDER_MEMBER];
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_show_text'] = function (block) {
    var text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC) || '""';
    var x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC) || 0;
    var y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC) || 0;
    return "huskylens.customText(" + text + ", " + x + ", " + y + ");\n";
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_clear_screen'] = function (block) {
    return "huskylens.clearCustomText();\n";
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_learn'] = function (block) {
    var id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_ATOMIC) || '1';
    return `huskylens.writeLearn(${id});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_forget'] = function (block) {
    return `huskylens.writeForget();\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_get_count'] = function (block) {
    var countType = block.getFieldValue('COUNT_TYPE');
    var code = '';
    if (countType === 'LEARNED_IDS') {
      code = 'huskylens.readLearnedIDCount()';
    } else if (countType === 'BLOCKS') {
      code = 'huskylens.readCount(HUSKYLENSResultBlock)';
    } else if (countType === 'ARROWS') {
      code = 'huskylens.readCount(HUSKYLENSResultArrow)';
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_set_name_for_id'] = function (block) {
    var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '""';
    var id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_ATOMIC) || '1';
    return `huskylens.setCustomName(${name}, ${id});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_save_photo'] = function (block) {
    return `huskylens.savePictureToSDCard();\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_save_model'] = function (block) {
    var id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_ATOMIC) || '1';
    return `huskylens.saveModelToSDCard(${id});\n`;
  };

  Blockly.Arduino.forBlock['piblockly_hw_huskylens_load_model'] = function (block) {
    var id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_ATOMIC) || '1';
    return `huskylens.loadModelFromSDCard(${id});\n`;
  };



}
