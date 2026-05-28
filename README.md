# Modern Web Apps with ASP.NET Core and Azure Notes

Microsoft Learn の「ASP.NET Core と Azure を使用して最新の Web アプリケーションを設計する」を、日本語の備忘録として整理するリポジトリです。

原典のサイドメニューにある 11 ページを 11 章として扱い、各章の主要見出しを短いメモに分割します。逐語訳ではなく、設計判断、実務で見る観点、ASP.NET Core / Azure の選択肢を後から確認しやすくまとめます。

## 到達目標

| 分野 | 合格ライン |
| --- | --- |
| 最新 Web アプリ | クラウド、クロスプラットフォーム、疎結合、テスト容易性の意味を説明できる |
| UI アーキテクチャ | 従来型 Web アプリ、SPA、Blazor、ハイブリッド構成を選び分けられる |
| 設計原則 | 関心の分離、依存関係の反転、単一責任、明示的依存関係を説明できる |
| アプリ構成 | 単一プロジェクト、レイヤー分割、Clean Architecture、DDD の違いを説明できる |
| ASP.NET Core MVC | Middleware、routing、model binding、validation、filters の役割を説明できる |
| Data | EF Core、Repository、Specification、キャッシュ、接続復元性の判断を説明できる |
| Test | 単体、統合、機能テストを分け、どこを自動化するか判断できる |
| Azure | CI/CD、App Service、Container Apps、Azure SQL、監視の基本構成を説明できる |

## 学ぶ順番

```text
01 概要
02 最新の Web アプリケーションの特性
03 従来の Web アプリと SPA の選択
04 アーキテクチャの原則
05 一般的な Web アプリケーションアーキテクチャ
06 一般的なクライアント側 Web テクノロジ
07 ASP.NET Core MVC アプリの開発
08 ASP.NET Core アプリでのデータ操作
09 ASP.NET Core MVC アプリのテスト
10 Azure の開発プロセス
11 ASP.NET Core Web アプリの Azure ホスティング推奨事項
```

## ローカルで動かす

初回セットアップ:

```bash
npm ci
```

開発サーバー:

```bash
npm run dev
```

本番ビルド:

```bash
npm run build
```

プレビュー:

```bash
npm run preview
```

## ドキュメント構成

ドキュメントは `docs/` に章ごとのフォルダで整理します。

```text
docs/
  01_概要/
    01_概要.md
    02_このガイドの位置づけ.md
    ...
    05_参考サイト.md
```

基本ルール:

- 章フォルダ名は `01_章タイトル` の形式にする。
- 章内の Markdown は `01_タイトル.md` の形式にする。
- 表示順はファイル名先頭の番号で決まる。
- 各章の参考リンクは、章末尾の `xx_参考サイト.md` にまとめる。
- 本文は原典の要点を日本語の備忘録として再構成し、長い引用や転載を避ける。

## 公開

GitHub Pages は `.github/workflows/pages.yml` で公開します。

- `main` への push で GitHub Actions が実行される。
- Node.js 22 で `npm ci` と `npm run build` を実行する。
- `dist` を GitHub Pages にデプロイする。

Repository Settings の Pages は、Source を `GitHub Actions` に設定します。

## Node.js バージョン

Vite 8 の要件に合わせて、Node.js は `20.19.0` 以上を使います。GitHub Actions では Node.js 22 を使用します。
