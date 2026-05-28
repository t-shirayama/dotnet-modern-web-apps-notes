# App Service

Azure App Service は、ASP.NET Core Web アプリの標準的な PaaS ホスティングです。

OS や runtime、スケール、TLS、custom domain、deployment slot、ログ、認証連携などを Azure 側で扱いやすく、アプリ開発に集中しやすいのが利点です。

App Service が向く場面は次の通りです。

- 一般的な Web アプリ / Web API を素早く安全に公開したい。
- インフラ運用を最小化したい。
- deployment slot で staging / production swap を使いたい。
- Azure SQL、Key Vault、Application Insights と組み合わせたい。

App Service では、構成値を App Settings として管理できます。secret は Key Vault 参照を使うと、アプリ設定に直接 secret 値を置かずに済みます。

スケールは vertical scale と horizontal scale の両方を検討します。セッション状態をメモリに持つ設計だと水平スケールで問題が出るため、分散 cache や stateless な設計を意識します。
