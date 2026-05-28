# EF Core と DbContext

EF Core は .NET の代表的な ORM です。LINQ を使ってデータを問い合わせ、Entity の変更を追跡し、SQL を生成して DB へ反映します。

`DbContext` は Unit of Work と Repository に近い役割を持ちます。変更追跡、クエリ、トランザクション境界、保存を扱います。

```csharp
public sealed class CatalogContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
}
```

小さなアプリでは、Application Service から `DbContext` を使うだけでも成立します。ただし、Controller から直接複雑な LINQ や保存処理を書くと、HTTP と永続化の責務が混ざります。

EF Core を使うときの注意点は、クエリがいつ実行されるか、追跡の有無、Include の使い方、N+1、トランザクション、Migration です。LINQ は C# のコードに見えますが、最終的には SQL に変換されることを意識します。
