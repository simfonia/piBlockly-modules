# πBlockly-modules 檔案結構規格

本文件旨在說明 πBlockly-modules (雲端硬體積木模組) 的檔案與目錄結構。此專案作為 πBlockly 的子專案，存放非核心的、可動態載入的硬體擴充積木。

## 根目錄 (`piBlockly-modules/`)

```
piBlockly-modules/
├── manifest.json (雲端模組載入設定檔)
├── piblockly_hw_blocks/ (核心硬體積木模組)
│   ├── blocks.js (積木定義)
│   ├── generators.js (程式碼產生器)
│   ├── toolbox.xml (工具箱配置)
│   ├── en.js (英文語言檔)
│   └── zh-hant.js (正體中文語言檔)
├── lib/ (相關硬體函式庫與資源)
│   └── HuskyLens.7z (HuskyLens 相關資源壓縮檔)
└── log/ (專案開發日誌與任務記錄)
    ├── todo.md (任務清單)
    └── work/ (工作日誌目錄)
        └── ...
```

- **`manifest.json`**: 雲端模組的清單設定檔。定義了 πBlockly 擴充功能從遠端載入時可用的模組路徑與名稱。
- **`piblockly_hw_blocks/`**: 通用硬體積木模組。包含感測器、致動器等通用硬體支援。
    - `blocks.js`: 定義硬體積木的外觀與欄位。
    - `generators.js`: 定義硬體積木轉換為 Arduino C++ 的邏輯。
    - `toolbox.xml`: 定義硬體積木在工具箱中的分類與顯示順序。
    - `en.js`, `zh-hant.js`: 語言檔案，包含積木標籤、訊息與 tooltip 的翻譯。
- **`lib/`**: 存放硬體模組可能需要的外部函式庫壓縮檔或其他大型資源。
- **`log/`**:
    - `todo.md`: 紀錄專案待辦事項與技術規範。
    - `work/`: 存放按日期或主題分類的工作日誌，紀錄開發過程中的重大異動與問題解決方案。
