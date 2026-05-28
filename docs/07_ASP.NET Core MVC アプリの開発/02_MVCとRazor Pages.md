# MVC と Razor Pages

ASP.NET Core MVC は、Controller、Model、View を使ってリクエストを処理します。URL に対応する Controller action が呼ばれ、必要なデータを用意し、View または response を返します。

Razor Pages は、ページ単位で `PageModel` と `.cshtml` を組み合わせる方式です。画面と処理が近い場所にまとまるため、フォーム中心の画面では MVC より読みやすいことがあります。

| 方式 | 向いている場面 |
| --- | --- |
| MVC | 複数 action をまとめたい、既存 MVC 資産がある |
| Razor Pages | ページ単位で処理を閉じたい、フォーム中心 |
| Web API | JSON を返し、SPA や外部クライアントから呼ばれる |

どの方式でも、業務ロジックを直接置きすぎないことが重要です。Controller / PageModel は HTTP と画面の都合を扱い、業務判断は Application / Domain 側に寄せます。
