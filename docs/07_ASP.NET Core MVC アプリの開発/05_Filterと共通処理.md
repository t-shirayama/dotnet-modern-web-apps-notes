# Filter と共通処理

Filter は、MVC action の前後に共通処理を差し込む仕組みです。Authorization filter、Resource filter、Action filter、Exception filter、Result filter などがあります。

共通処理には middleware と filter のどちらを使うか迷うことがあります。

| 使う場所 | 向いている処理 |
| --- | --- |
| Middleware | HTTP pipeline 全体、MVC 以外にも関係する処理 |
| Filter | MVC action / result に密接な処理 |

例外処理は middleware で一元化することが多いです。Action ごとに try-catch を書くと、漏れや差分が出やすくなります。

認可は policy と attribute を組み合わせて、endpoint 単位で明示します。認可漏れは重大な不具合になるため、既定で保護し、公開 endpoint だけ明示的に許可する方針も検討します。
