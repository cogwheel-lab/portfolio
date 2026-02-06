# Portfolio 2026 - プロジェクト仕様

## プロジェクト概要

フロントエンドエンジニアのポートフォリオサイト。Next.js + SCSSで構築。

## セクション構成

| セクション | 内容 |
|---|---|
| Hero | cogwheel-lab タイトル表示 |
| Practice | 学習用作品一覧（Todoアプリ、コンビニナビ等） |
| おすすめ写真 | Unsplash API連携のおすすめ写真表示 |

---

## おすすめ写真機能 仕様

### 目的
- ユーザーに閲覧履歴ベースのパーソナライズされた写真を提供
- Unsplashの高品質な画像をサイトに統合

### 仕様フロー

```
タグごとに新着3〜6件を取得
    ↓
LocalStorageの閲覧履歴と照合
    ↓
未見優先で表示
```

### 技術要素

| 項目 | 詳細 |
|---|---|
| API | Unsplash API |
| 取得枚数 | 3〜6件/タグ |
| 画像サイズ | `photo.urls.small`（400px程度） |
| クレジット表記 | 必須「Photo by {user.name} on Unsplash」 |
| ストレージ | LocalStorageで閲覧履歴を管理 |
| 表示ロジック | 未写真を優先、閲覧済みは後ろに配置 |

### 実装上の注意

- Unsplashの利用規約に従いクレジットを必ず表示
- LocalStorageのキー設計（例: `viewed_photos` 配列でphoto.idを管理）
- APIリクエスト回数の制限（1時間あたり50回など）に注意

---

## 画像表示スタイル

### 推奨設定

```scss
.photobox {
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3列
  gap: 20px;

  img {
    width: 100%;
    height: 200px; // 固定高さ
    object-fit: cover; // トリックして整える
    border-radius: 8px;
  }
}
```

### レスポンシブ

- PC: 3列
- Tablet: 2列
- Mobile: 1列

---

## 今後の拡張案

- タグのカテゴリ分け（nature, architecture, people等）
- お気に入り機能
- 無限スクロール
