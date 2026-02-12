# TODOアプリ定義書

## 1. 定数・変数一覧

| 変数名   | 役割           | 型             | 備考                     |
|:---------|:---------------|:---------------|:-------------------------|
| `todos`  | TODOリスト     | State (Array)  | `setTodos`で更新         |
| `text`   | 入力テキスト   | State (String) | `setText`で更新          |
| `nextId` | 次に割り当てるID | State (Number) | `setNextId`で更新、初期値4 |

## 2. データ構造定義

### todos オブジェクト

- **id**: 固有ID（数値）
- **text**: やること（文字列）
- **completed**: 完了フラグ（真偽値）

### localStorage キーと構造

- **Key**: `todos`
- **Value (JSON)**: `[{ id: Number, text: String, completed: Boolean }]`

## 3. 関数・ロジック定義

| 名前             | 引数        | 処理内容                                  |
|:-----------------|:------------|:------------------------------------------|
| `handleAdd`      | なし        | 入力テキストをTODOリストに追加            |
| `handleChange`   | イベント    | 入力テキストを更新                        |
| `handleDelete`   | id          | 指定したIDのTODOを削除                    |
| `handleToggle`   | id          | 指定したIDの完了フラグを切り替え          |
| `saveTodos`      | todosArray  | TODOリストをlocalStorageに保存            |
