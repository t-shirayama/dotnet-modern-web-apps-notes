# JavaScript と jQuery

JavaScript は、ブラウザー上で動作を作るための言語です。フォーム入力の補助、表示切り替え、Web API 呼び出し、validation、リアルタイム更新などに使われます。

jQuery は、DOM 操作や AJAX を簡単にするライブラリとして広く使われてきました。既存アプリでは今でも多く見かけます。

ただし、jQuery は基本的に命令型です。つまり「どの要素を探して、どう変更するか」をコードで書きます。画面状態が増えると、どのコードが表示を変えているのか追いにくくなります。

```javascript
$("#message").text("保存しました").show();
```

小さな動作なら jQuery で十分です。一方、複数コンポーネント、複雑な状態、画面内 routing、宣言的な UI 更新が必要なら、React、Angular、Vue、Blazor などの component model を検討します。
