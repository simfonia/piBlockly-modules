// piblockly/media/user_modules/_core_hw_lib/blocks.js

export function registerBlocks(Blockly) {
  // Sensors
  // Common Category
  // HC-SR04 Ultrasonic Distance Sensor Block
  Blockly.Blocks["piblockly_hw_ultrasonic_distance"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_ULTRASONIC_DISTANCE_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "TRIG_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow"
            },
          },
          {
            type: "input_value",
            name: "ECHO_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow"
            },
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_ULTRASONIC_DISTANCE_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_ULTRASONIC_DISTANCE_HELPURL"],
      });
    },
  };

  // DHT Sensor Block
  Blockly.Blocks["piblockly_hw_dht_read"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_DHT_READ_MESSAGE,
        args0: [
          {
            type: "field_dropdown",
            name: "DHT_TYPE",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_DHT_TYPE_11, "DHT11"],
              [Blockly.Msg.PIBLOCKLY_HW_DHT_TYPE_22, "DHT22"],
            ],
          },
          {
            type: "input_value",
            name: "PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow"
            },
          },
          {
            type: "field_dropdown",
            name: "READING_TYPE",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_DHT_READING_TEMP, "TEMP"],
              [Blockly.Msg.PIBLOCKLY_HW_DHT_READING_HUMIDITY, "HUMID"],
            ],
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_DHT_READ_TOOLTIP,
        helpUrl: "",
      });
    },
  };


  // MPU9250
  Blockly.Blocks["piblockly_hw_mpu9250_init"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_INIT_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "SDA_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow",
              fields: {
                PIN: "A4"
              }
            }
          },
          {
            type: "input_value",
            name: "SCL_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow",
              fields: {
                PIN: "A5"
              }
            }
          },
          {
            type: "field_dropdown",
            name: "ACCEL_RANGE",
            options: [
              ["+-2G", "0x00"],
              ["+-4G", "0x08"],
              ["+-8G", "0x10"],
              ["+-16G", "0x18"],
            ],
          },
          {
              type: "field_dropdown",
              name: "GYRO_RANGE",
              options: [
                ["250DPS", "0x00"],
                ["500DPS", "0x08"],
                ["1000DPS", "0x10"],
                ["2000DPS", "0x18"],
              ],
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_INIT_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };

  Blockly.Blocks["piblockly_hw_mpu9250_accel_fetch"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_ACCEL_FETCH"],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_ACCEL_FETCH_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_mpu9250_accel_3axis"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_ACCEL_3AXIS"] + " %1 " + Blockly.Msg["PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX"],
        args0: [
          {
            type: "field_dropdown",
            name: "AXIS",
            options: [
              ["X", "accelX()"],
              ["Y", "accelY()"],
              ["Z", "accelZ()"],
            ],
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_ACCEL_3AXIS_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_mpu9250_accel_pitch_roll"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_ACCEL_PITCH_ROLL"] + " %1",
        args0: [
          {
            type: "field_dropdown",
            name: "PITCH_ROLL",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_MPU9250_PITCH_ROLL_PITCH, "PITCH"],
              [Blockly.Msg.PIBLOCKLY_HW_MPU9250_PITCH_ROLL_ROLL, "ROLL"],
            ],
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_ACCEL_PITCH_ROLL_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };

  Blockly.Blocks["piblockly_hw_mpu9250_mag_fetch"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_MAG_FETCH"],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_MAG_FETCH_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_mpu9250_mag_3axis"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_MAG_3AXIS"] + " %1 " + Blockly.Msg["PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX"],
        args0: [
          {
            type: "field_dropdown",
            name: "AXIS",
            options: [
              ["X", "magX()"],
              ["Y", "magY()"],
              ["Z", "magZ()"],
            ],
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_MAG_3AXIS_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };

  Blockly.Blocks["piblockly_hw_mpu9250_gyro_fetch"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_GYRO_FETCH"],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_GYRO_FETCH_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_mpu9250_gyro_3axis"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_MPU9250_GYRO_3AXIS"] + " %1 " + Blockly.Msg["PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX"] + " " + Blockly.Msg["PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX_UNIT"],
        args0: [
          {
            type: "field_dropdown",
            name: "AXIS",
            options: [
              ["X", "gyroX()"],
              ["Y", "gyroY()"],
              ["Z", "gyroZ()"],
            ],
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_MPU9250_GYRO_3AXIS_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_MPU9250_HELPURL"],
      });
    },
  };


  //MAX30105
  Blockly.Blocks["PIBLOCKLY_HW_max30105_init"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_MAX30105_INIT_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "SDA_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow",
              fields: { PIN: "A4" }
            }
          },
          {
            type: "input_value",
            name: "SCL_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow",
              fields: { PIN: "A5" }
            }
          },
          {
            type: "input_value",
            name: "LED_RED",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_MAX30105_INIT_TOOLTIP,
        helpUrl: Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL,
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_max30105_check"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_MAX30105_CHECK_MESSAGE,
        args0: [
          {
            type: "field_dropdown",
            name: "CHECK_TYPE",
            options: Blockly.Msg.PIBLOCKLY_HW_MAX30105_CHECK_LIST,
          },
        ],
        inputsInline: true,
        output: "Boolean",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_MAX30105_CHECK_TOOLTIP,
        helpUrl: Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL,
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_max30105_get_beat_rate"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_MAX30105_GET_BEAT_RATE_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "AVG",
            check: "Number",
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_MAX30105_GET_BEAT_RATE_TOOLTIP,
        helpUrl: Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL,
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_max30105_get_spo2"] = {
    init: function () {
      this.jsonInit({
        message0:
          Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE +
          " " +
          Blockly.Msg.PIBLOCKLY_HW_MAX30105_SPO2,
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_MAX30105_GET_SPO2_TOOLTIP,
        helpUrl: Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL,
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_max30105_get_temperature"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_MAX30105_GET_TEMPERATURE_MESSAGE,
        args0: [
          {
            type: "field_dropdown",
            name: "TEMP_TYPE",
            options: Blockly.Msg.PIBLOCKLY_HW_MAX30105_TEMP_LIST,
          },
        ],
        inputsInline: true,
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_MAX30105_GET_TEMPERATURE_TOOLTIP,
        helpUrl: Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL,
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_max30105_set_beat_range"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_MAX30105_SET_BEAT_RANGE_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "MIN",
            check: "Number",
          },
          {
            type: "input_value",
            name: "MAX",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_MAX30105_SET_BEAT_RANGE_TOOLTIP,
        helpUrl: Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL,
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_max30105_set_spo2_clear"] = {
    init: function () {
      this.jsonInit({
        message0:
          Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE +
          " " +
          Blockly.Msg.PIBLOCKLY_HW_MAX30105_SPO2_CLEAR,
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_MAX30105_SET_SPO2_CLEAR_TOOLTIP,
        helpUrl: Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL,
      });
    },
  };


  // PS2
  Blockly.Blocks["PIBLOCKLY_HW_ps2_initial"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_INITIAL_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "CLK",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow"
            },
          },
          {
            type: "input_value",
            name: "CMD",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow"
            },
          },
          {
            type: "input_value",
            name: "CS",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow"
            },
          },
          {
            type: "input_value",
            name: "DAT",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow"
            },
          },
          {
            type: "field_dropdown",
            name: "pressures",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_DISABLED"], "false"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_ENABLED"], "true"],
            ],
          },
          {
            type: "field_dropdown",
            name: "rumble",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_DISABLED"], "false"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_ENABLED"], "true"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_INITIAL_TOOLTIP"],
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_ps2_read"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_READ_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "vibrate",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_VIBRATE_N"], "false"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_VIBRATE_Y"], "true"],
            ],
            validator: Blockly.Blocks["PIBLOCKLY_HW_ps2_read"].validate,
          },
          {
            type: "input_value",
            name: "val",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_READ_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_PS2"],
      });
    },
    validate: function (newValue) {
      const block = this.sourceBlock_;
      if (!block) {
        return;
      }
      if (newValue === "false") {
        block.getInput("val").setVisible(false);
      } else {
        block.getInput("val").setVisible(true);
      }
    },
  };

  var PIBLOCKLY_HW_ps2_button = [
    ["START", "PSB_START"],
    ["SELECT", "PSB_SELECT"],
    ["▲", "PSB_PAD_UP"],
    ["▶", "PSB_PAD_RIGHT"],
    ["◀", "PSB_PAD_LEFT"],
    ["▼", "PSB_PAD_DOWN"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_GREEN"], "PSB_TRIANGLE"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_RED"], "PSB_CIRCLE"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_BLUE"], "PSB_CROSS"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PINK"], "PSB_SQUARE"],
    ["L1", "PSB_L1"],
    ["L2", "PSB_L2"],
    ["L3", "PSB_L3"],
    ["R1", "PSB_R1"],
    ["R2", "PSB_R2"],
    ["R3", "PSB_R3"],
  ];
  Blockly.Blocks["PIBLOCKLY_HW_ps2_button_event"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_EVENT_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "button",
            options: PIBLOCKLY_HW_ps2_button,
          },
          {
            type: "field_dropdown",
            name: "event",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PRESS_JUST"], "press_just"],
              [
                Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_RELEASE_JUST"],
                "release_just",
              ],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PRESS"], "press"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PRESS_NEW"], "press_new"],
            ],
          },
        ],
        inputsInline: true,
        output: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_EVENT_TOOLTIP"],
      });
    },
  };

  Blockly.Blocks["PIBLOCKLY_HW_ps2_initial_func"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_INITIAL_FUNC_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "func",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_PRESSURES"], "PRESSURES"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_RUMBLE"], "RUMBLE"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_INITIAL_FUNC_TOOLTIP"],
      });
    },

  };

  var PIBLOCKLY_HW_direction8 = [
    ["START", "PSB_START"],
    ["SELECT", "PSB_SELECT"],
    ["▲", "PSB_PAD_UP"],
    ["▶", "PSB_PAD_RIGHT"],
    ["◀", "PSB_PAD_LEFT"],
    ["▼", "PSB_PAD_DOWN"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_GREEN"], "PSB_TRIANGLE"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_RED"], "PSB_CIRCLE"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_BLUE"], "PSB_CROSS"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PINK"], "PSB_SQUARE"],
    ["L1", "PSB_L1"],
    ["L2", "PSB_L2"],
    ["L3", "PSB_L3"],
    ["R1", "PSB_R1"],
    ["R2", "PSB_R2"],
    ["R3", "PSB_R3"],
  ];
  var PIBLOCKLY_HW_direction4 = [
    [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_UP"], "u"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_RIGHT"], "r"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_DOWN"], "d"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_LEFT"], "l"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_CENTER"], "x"],
  ];
  Blockly.Blocks["PIBLOCKLY_HW_ps2_stick_direction"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "position",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_LEFT"], "true"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_RIGHT"], "false"],
            ],
          },
          {
            type: "field_dropdown",
            name: "type",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION8"], "8"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION4"], "4"],
            ],
            validator:
              Blockly.Blocks["PIBLOCKLY_HW_ps2_stick_direction"].validate,
          },
          {
            type: "field_dropdown",
            name: "direction",
            options: PIBLOCKLY_HW_direction8,
          },
        ],
        inputsInline: true,
        output: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_TOOLTIP"],
      });
    },
    validate: function (newValue) {
      const block = this.sourceBlock_;
      if (!block) {
        return;
      }
      const directionField = block.getField("direction");
      if (directionField) {
        if (newValue === "8") {
          directionField.setOptions(PIBLOCKLY_HW_direction8);
        } else {
          directionField.setOptions(PIBLOCKLY_HW_direction4);
        }
      }
    },
  };

  Blockly.Blocks["PIBLOCKLY_HW_ps2_receiver_state"] = {
    init: function () {
      this.jsonInit({
        message0:
          Blockly.Msg["PIBLOCKLY_HW_PS2"] +
          " " +
          Blockly.Msg["PIBLOCKLY_HW_PS2_RECEIVER_STATE"],
        inputsInline: true,
        output: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_RECEIVER_STATE_TOOLTIP"],
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_ps2_state"] = {
    init: function () {
      this.jsonInit({
        message0:
          Blockly.Msg["PIBLOCKLY_HW_PS2"] +
          " " +
          Blockly.Msg["PIBLOCKLY_HW_PS2_STATE"],
        inputsInline: true,
        output: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_STATE_TOOLTIP"],
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_ps2_analog_max"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_MAX_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "val",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_MAX_TOOLTIP"],
      });
    },
  };
  Blockly.Blocks["PIBLOCKLY_HW_ps2_analog_read"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "analog",
            options: [
              [Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_LX"], "PSS_LX"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_LY"], "PSS_LY"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_RX"], "PSS_RX"],
              [Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_RY"], "PSS_RY"],
            ],
          },
        ],
        inputsInline: true,
        output: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_TOOLTIP"],
      });
    },
  };

  var PIBLOCKLY_HW_ps2_pressure_button = [
    ["START", "PSAB_START"],
    ["SELECT", "PSAB_SELECT"],
    ["▲", "PSB_PAD_UP"],
    ["▶", "PSB_PAD_RIGHT"],
    ["◀", "PSB_PAD_LEFT"],
    ["▼", "PSB_PAD_DOWN"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_GREEN"], "PSB_TRIANGLE"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_RED"], "PSB_CIRCLE"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_BLUE"], "PSB_CROSS"],
    [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PINK"], "PSB_SQUARE"],
    ["L1", "PSAB_L1"],
    ["L2", "PSAB_L2"],
    ["R1", "PSAB_R1"],
    ["R2", "PSAB_R2"],
  ];
  Blockly.Blocks["PIBLOCKLY_HW_ps2_pressures_read"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PS2_PRESSURES_READ_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "analog",
            options: PIBLOCKLY_HW_ps2_pressure_button,
          },
        ],
        inputsInline: true,
        output: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_SENSORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PS2_PRESSURES_READ_TOOLTIP"],
      });
    },
  };


  // Actuator
  // L293D Motor Block
  Blockly.Blocks["piblockly_hw_l293d_motor_run"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_MOTOR_RUN_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              ["M1", "1"],
              ["M2", "2"],
              ["M3", "3"],
              ["M4", "4"],
            ],
          },
          {
            type: "field_dropdown",
            name: "DIR",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_FORWARD, "FORWARD"],
              [Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_BACKWARD, "BACKWARD"],
            ],
          },
          {
            type: "input_value",
            name: "SPEED",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_L293D_MOTOR_RUN_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_l293d_motor_stop"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_MOTOR_STOP_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              ["M1", "1"],
              ["M2", "2"],
              ["M3", "3"],
              ["M4", "4"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_L293D_MOTOR_STOP_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };

  Blockly.Blocks["piblockly_hw_l293d_stepper_init"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_STEPPER_INIT_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              ["S1", "1"],
              ["S2", "2"],
            ],
          },
          {
            type: "input_value",
            name: "STEPS",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_L293D_STEPPER_INIT_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_l293d_stepper_speed"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_STEPPER_SPEED_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              ["S1", "1"],
              ["S2", "2"],
            ],
          },
          {
            type: "input_value",
            name: "SPEED",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_l293d_stepper_run"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_STEPPER_RUN_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              ["S1", "1"],
              ["S2", "2"],
            ],
          },
          {
            type: "field_dropdown",
            name: "DIR",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_FORWARD, "FORWARD"],
              [Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_BACKWARD, "BACKWARD"],
            ],
          },
          {
            type: "input_value",
            name: "STEPS",
            check: "Number",
          },
          {
            type: "field_dropdown",
            name: "METHOD",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_SINGLE, "SINGLE"],
              [Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_DOUBLE, "DOUBLE"],
              [
                Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_INTERLEAVE,
                "INTERLEAVE",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_MICROSTEP,
                "MICROSTEP",
              ],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_L293D_STEPPER_RUN_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_l293d_stepper_stop"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_STEPPER_STOP_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              ["S1", "1"],
              ["S2", "2"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_L293D_STEPPER_STOP_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };

  Blockly.Blocks["piblockly_hw_l293d_servo_run"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_SERVO_RUN_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_1, "9"],
              [Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_2, "10"],
            ],
          },
          {
            type: "input_value",
            name: "ANGLE",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_L293D_SERVO_RUN_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_l293d_servo_detach"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_L293D_SERVO_DETACH_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_1, "9"],
              [Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_2, "10"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_L293D_SERVO_DETACH_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_L293D_HELPURL"],
      });
    },
  };


  // PCA9685 Blocks
  Blockly.Blocks["piblockly_hw_pca9685_init"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PCA9685_INIT"], // "Initialize PCA9685 (I2C) SDA %1 SCL %2"
        args0: [
          {
            type: "input_value",
            name: "SDA_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow",
              fields: { PIN: "A4" }
            }
          },
          {
            type: "input_value",
            name: "SCL_PIN",
            check: ["Number", "String"],
            shadow: {
              type: "arduino_pin_shadow",
              fields: { PIN: "A5" }
            }
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PCA9685_INIT_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_PCA9685_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_pca9685_pwm_write"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PCA9685_PWM_WRITE_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "Channel",
            check: "Number",
          },
          {
            type: "input_value",
            name: "Value",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PCA9685_PWM_WRITE_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_PCA9685_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_pca9685_servo_init"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PCA9685_SERVO_INIT_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "pulse_min",
            check: "Number",
          },
          {
            type: "input_value",
            name: "pulse_max",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PCA9685_SERVO_INIT_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_PCA9685_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_pca9685_servo_write"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_PCA9685_SERVO_WRITE_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "Channel",
            check: "Number",
          },
          {
            type: "input_value",
            name: "Degree",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_PCA9685_SERVO_WRITE_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_PCA9685_HELPURL"],
      });
    },
  };


  // Stepper Blocks
  Blockly.Blocks["piblockly_hw_stepper_init"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_STEPPER_INIT_MESSAGE"],
        args0: [
          {
            type: "field_dropdown",
            name: "MOTOR",
            options: [
              ["1", "1"],
              ["2", "2"],
            ],
          },
          {
            type: "field_dropdown",
            name: "INTERFACE",
            options: [
              ["DRIVER", "DRIVER"],
              ["FULL2WIRE", "FULL2WIRE"],
              ["FULL4WIRE", "FULL4WIRE"],
              ["HALF4WIRE", "HALF4WIRE"],
            ],
          },
          {
            type: "input_value",
            name: "STEPS",
            check: "Number",
          },
          {
            type: "input_value",
            name: "P1",
            check: "Number",
          },
          {
            type: "input_value",
            name: "P2",
            check: "Number",
          },
          {
            type: "input_value",
            name: "P3",
            check: "Number",
          },
          {
            type: "input_value",
            name: "P4",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_STEPPER_INIT_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_STEPPER_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_stepper_set_speed"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_STEPPER_SET_SPEED_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "SPEED",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_STEPPER_SET_SPEED_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_STEPPER_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_stepper_set_accel"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_STEPPER_SET_ACCEL_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "ACCEL",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_STEPPER_SET_ACCEL_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_STEPPER_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_stepper_move_to"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_STEPPER_MOVE_TO_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "POSITION",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_STEPPER_MOVE_TO_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_STEPPER_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_stepper_move"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_STEPPER_MOVE_MESSAGE"],
        args0: [
          {
            type: "input_value",
            name: "STEPS",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_STEPPER_MOVE_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_STEPPER_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_stepper_run"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_STEPPER_RUN"],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_STEPPER_RUN_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_STEPPER_HELPURL"],
      });
    },
  };
  Blockly.Blocks["piblockly_hw_stepper_stop"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg["PIBLOCKLY_HW_STEPPER_STOP"],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_ACTUATORS,
        tooltip: Blockly.Msg["PIBLOCKLY_HW_STEPPER_STOP_TOOLTIP"],
        helpUrl: Blockly.Msg["PIBLOCKLY_HW_STEPPER_HELPURL"],
      });
    },
  };



  // AI
  // HuskyLens
  // Init Block
  Blockly.Blocks["piblockly_hw_huskylens_i2c_init"] = {
    init: function() {
      this.setColour(Blockly.Msg.PIBLOCKLY_HW_COLOR_AI);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_INIT_TOOLTIP);
      this.setHelpUrl(Blockly.Msg.HUSKYLENS_HELPURL);
      
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_INIT_TITLE);
      
      this.appendValueInput("SDA_PIN")
          .setCheck(["Number", "String"])
          .appendField("SDA");
          
      this.appendValueInput("SCL_PIN")
          .setCheck(["Number", "String"])
          .appendField("SCL");

      this.setInputsInline(true);
    }
  };
  Blockly.Blocks["piblockly_hw_huskylens_uart_init"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_UART_INIT_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "RX",
            check: "Number",
          },
          {
            type: "input_value",
            name: "TX",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_UART_INIT_TOOLTIP,
      });
    },
  };

  // Set Algorithm Block
  Blockly.Blocks["huskylens_set_algorithm"] = {
    init: function () {
      this.jsonInit({
        message0:
          Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_ALGORITHM_TITLE + " %1",
        args0: [
          {
            type: "field_dropdown",
            name: "ALGORITHM",
            options: [
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_FACE_RECOGNITION,
                "ALGORITHM_FACE_RECOGNITION",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_OBJECT_TRACKING,
                "ALGORITHM_OBJECT_TRACKING",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_OBJECT_RECOGNITION,
                "ALGORITHM_OBJECT_RECOGNITION",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_LINE_TRACKING,
                "ALGORITHM_LINE_TRACKING",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_COLOR_RECOGNITION,
                "ALGORITHM_COLOR_RECOGNITION",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_TAG_RECOGNITION,
                "ALGORITHM_TAG_RECOGNITION",
              ],
            ],
          },
        ],
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_ALGORITHM_TOOLTIP,
      });
    },
  };

  // Request and Check Block (Wrapper)
  Blockly.Blocks["huskylens_request_and_check"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_REQUEST_AND_CHECK_TITLE + " %1",
        args0: [
          {
            type: "input_statement",
            name: "DO",
          },
        ],
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_REQUEST_AND_CHECK_TOOLTIP,
      });
    },
  };

  // Get Result Property Block
  Blockly.Blocks["huskylens_get_result_property"] = {
    init: function () {
      this.jsonInit({
        message0:
          Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_RESULT_PROPERTY_TITLE +
          " %1 " +
          Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_PROPERTY_OF_RESULT,
        args0: [
          {
            type: "field_dropdown",
            name: "PROPERTY",
            options: [
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_X_CENTER, "xCenter"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_Y_CENTER, "yCenter"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_WIDTH, "width"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_HEIGHT, "height"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_ID, "ID"],
            ],
          },
        ],
        output: "Number",
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_RESULT_PROPERTY_TOOLTIP,
      });
    },
  };

  Blockly.Blocks["piblockly_hw_huskylens_show_text"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SHOW_TEXT_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "TEXT",
            check: "String",
          },
          {
            type: "input_value",
            name: "X",
            check: "Number",
          },
          {
            type: "input_value",
            name: "Y",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SHOW_TEXT_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_clear_screen"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_CLEAR_SCREEN_TITLE,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_CLEAR_SCREEN_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_learn"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_LEARN_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "ID",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_LEARN_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_forget"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_FORGET_TITLE,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_FORGET_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_get_count"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_COUNT_MESSAGE,
        args0: [
          {
            type: "field_dropdown",
            name: "COUNT_TYPE",
            options: [
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_COUNT_LEARNED_TOTAL,
                "LEARNED_IDS",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_COUNT_BLOCKS_SCREEN,
                "BLOCKS",
              ],
              [
                Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_COUNT_ARROWS_SCREEN,
                "ARROWS",
              ],
            ],
          },
        ],
        output: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_COUNT_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_set_name_for_id"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_NAME_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "NAME",
            check: "String",
          },
          {
            type: "input_value",
            name: "ID",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_NAME_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_save_photo"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SAVE_PHOTO_TITLE,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SAVE_PHOTO_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_save_model"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SAVE_MODEL_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "ID",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SAVE_MODEL_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };
  Blockly.Blocks["piblockly_hw_huskylens_load_model"] = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_LOAD_MODEL_MESSAGE,
        args0: [
          {
            type: "input_value",
            name: "ID",
            check: "Number",
          },
        ],
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        colour: Blockly.Msg.PIBLOCKLY_HW_COLOR_AI,
        tooltip: Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_LOAD_MODEL_TOOLTIP,
        helpUrl: Blockly.Msg.HUSKYLENS_HELPURL,
      });
    },
  };



}
