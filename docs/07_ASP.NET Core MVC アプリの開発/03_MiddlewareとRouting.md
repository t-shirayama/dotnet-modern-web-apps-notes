# Middleware と Routing

Middleware は、HTTP pipeline の中で request / response を処理する部品です。認証、認可、静的ファイル、例外処理、routing、logging などが middleware として組み込まれます。

順序が重要です。たとえば routing の前に endpoint が決まっていないと認可判断ができない場合があります。例外処理 middleware は早い段階に置くことで、後続処理の例外を捕まえやすくなります。

Routing は URL と endpoint を対応付けます。MVC では controller route、attribute route、conventional route などを使います。

```csharp
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

実務では、route は外部契約でもあります。URL を変えるとブックマーク、検索、API client に影響するため、画面や API の設計と合わせて慎重に決めます。
