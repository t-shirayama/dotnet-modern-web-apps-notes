# Container Apps と AKS

コンテナー化すると、開発、CI、運用で実行環境を揃えやすくなります。

Azure Container Apps は、コンテナーを比較的少ない運用負荷で動かせる PaaS です。HTTP ingress、scale to zero、Dapr、revision、traffic splitting などを扱えます。マイクロサービスほど大規模でなくても、コンテナーで配布したい Web アプリに向いています。

AKS は Kubernetes の管理サービスです。高度な制御、複雑なネットワーク、複数サービスの運用、独自 operator、細かい scheduling が必要な場合に有力です。ただし運用負荷は高くなります。

| 選択肢 | 向いている場面 |
| --- | --- |
| App Service | 一般的な Web アプリを簡単に運用 |
| Container Apps | コンテナー前提で PaaS 的に運用 |
| AKS | Kubernetes の高度な制御が必要 |
| VM | OS レベルの自由度が必要 |

コンテナーを使う理由が「なんとなく新しいから」なら、App Service の方が楽なことがあります。実行環境の固定、依存関係、将来の可搬性など、理由を明確にします。
