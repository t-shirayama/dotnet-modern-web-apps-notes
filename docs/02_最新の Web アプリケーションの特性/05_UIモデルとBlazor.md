# UI モデルと Blazor

ASP.NET Core は、従来型の MVC / Razor Pages、Web API、SPA、Blazor を同じ基盤上で扱えます。

従来型 Web アプリでは、サーバーが HTML を生成し、画面遷移ごとにリクエストとレスポンスが発生します。フォーム中心、管理画面、SEO が重要な公開ページでは扱いやすい構成です。

SPA では、初回に JavaScript アプリを読み込み、以降は Web API と通信しながらブラウザー側で UI を更新します。リッチな操作体験には向きますが、フロントエンドの状態管理、ルーティング、認証、ビルド、セキュリティの考慮が増えます。

Blazor は、C# と Razor で対話的 UI を作る選択肢です。Blazor Server はサーバー側で UI 状態を持ち SignalR で差分更新します。Blazor WebAssembly はブラウザー上で .NET コードを実行します。

| UI モデル | 向いている場面 |
| --- | --- |
| MVC / Razor Pages | フォーム、管理画面、SEO、単純な画面遷移 |
| SPA | 高頻度の画面更新、複雑なクライアント状態 |
| Blazor Server | C# 中心で対話的 UI を作りたい社内アプリ |
| Blazor WebAssembly | クライアント側で .NET を動かしたい SPA |

実務では混在も自然です。公開ページは Razor Pages、管理画面の一部だけ SPA、内部ツールは Blazor、外部連携は Web API というように、アプリ全体を一つの UI モデルに固定しない判断もあります。
