# project_definition

## 1. 定数・変数一覧 (Constants & States)

AIにコードを渡す際、以下の名称を維持するよう指示してください。

| 変数名   | 役割                 | 型             | 備考              |
| :------- | :------------------- | :------------- | :---------------- |
| `Home`   | メインコンポーネント | Function       | ページのルート    |
| `photos` | Unsplash画像リスト   | State (Array)  | `setPhotos`で更新 |
| `page`   | 現在のページ番号     | State (Number) | 初期値 1          |
| `works`  | 制作物リスト         | Array (Object) | 静的なデータ定義  |

## 2. データ構造定義 (Data Schemas)

オブジェクトのキー名（プロパティ）を固定するための定義です。

### works オブジェクト

- **title**: 作品名
- **description**: 作品の説明文
- **href**: リンク先パス

### photos (Unsplash API) 依存キー

- **id**: 画像固有ID
- **urls.raw**: 画像URL（クエリパラメータでリサイズして使用）
- **alt_description**: 代替テキスト
- **user.name**: 撮影者名

### localStorage キーと構造

- **Key**: `clickData`
- **Value (JSON)**: `{ count: Number, time: ISOString }`

## 3. 関数・ロジック定義

| 名前                   | 実行タイミング   | 処理内容                                               |
| :--------------------- | :--------------- | :----------------------------------------------------- |
| `useEffect`            | `page` 変更時    | `unsplash.search.getPhotos` の実行と `photos` への追記 |
| `onClick` (もっと見る) | ボタンクリック時 | `page` の加算と `localStorage` への記録                |
