# πBlockly 雲端模組專案任務說明

## 概述
  - 本專案是在VS Code上開發一個Blockly延伸套件πBlockly中的擴充積木模組，以做為Arduino程式開發:
  - 本專案為πBlockly的子專案piBlockly-modules：
    * πBlockly (核心，在 @piblockly/ 資料夾)
    * piBlockly-modules (雲端擴充積木模組，在 @piBlockly-modules/ 資料夾)
  - 開發環境
      * Windows 11
      * VS Code v1.106.2
      * node.js v24.12.0
      * Blockly v12.3.1
      * Arduino IDE v2.3


## 技術規範
  - 若要加入 `arduino_pin_shadow`，請務必遵循以下流程：
    arduino_pin_shadow 作為 Blockly 的陰影積木，其運作方式是：
    * 它為需要腳位輸入的積木（如 arduino_pin_mode、arduino_digital_read等）提供一個預設的、可編輯的文字輸入欄位。
    * 使用者可以直接在陰影積木的欄位中輸入腳位名稱或數字（例如 A0, 2, ~ 等）。
    * 如果使用者需要更複雜的腳位來源（例如變數、運算結果等），他們可以直接拖曳其他積木到陰影積木的位置，陰影積木就會被替換掉。
    * 在 arduino.js 中定義的 arduino_pin_shadow 積木本身，其 setOutput(true, ["Number", "String"]) 與toolbox.xml 中使用它的父積木（例如 arduino_pin_mode 的 check: ["Number", "String"]）的輸入檢查類型相符，確保了相容性。

  - 註冊 generator 要使用 Blockly.Arduino.forBlock[]

## 任務清單:
[x] 1. 建立專案架構
