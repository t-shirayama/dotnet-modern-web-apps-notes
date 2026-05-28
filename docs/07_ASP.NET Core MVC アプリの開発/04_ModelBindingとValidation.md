# Model Binding と Validation

Model binding は、HTTP request の route、query string、form、body などから action parameter や model へ値を詰める仕組みです。

Validation は、受け取った値が要求仕様を満たすか確認します。`DataAnnotations` を使うと、必須、文字数、範囲などの入力検証を model に宣言できます。

```csharp
public sealed class CreateProductRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; init; } = "";
}
```

重要なのは、入力検証と業務ルール検証を分けることです。

| 種類 | 例 | 置き場所 |
| --- | --- | --- |
| 入力検証 | 必須、形式、文字数 | Request model / validator |
| 業務ルール | 在庫がある、注文可能期間内 | Domain / Application |

クライアント側 validation は UX を改善しますが、信頼してはいけません。サーバー側で必ず検証します。
