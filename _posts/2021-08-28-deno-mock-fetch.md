---
layout: post
title: "denoのテストでfetchをmock化する方法"
category: "deno"
excerpt: ""
---

# {{ page.title }}

_Deno 1.13.2の時点での情報です。_
_バージョンによってはより良い方法があったり、これでは動かなかったりするかもしれません。_

denopsで作ったプラグインにテストをつけたくてやっていたが、関数の中で使ってる`fetch`をmock化する方法が見つからなかったので、記録しておく。

`fetch`は`window.fetch`を見ているらしく、それをオーバーライドしてやればmock化できる。

```typescript
window.fetch = async(): Promise<Response> => {
  return await new Response(
    '{"this_is": "test"}',
    {
      status: 200,
      statusText: "test",
      headers: { "content-type": "application/json" },
    },
  );
};
```

`body`についてはjsonを返すmockならそれっぽい文字列を入れてやればよい。
異常系のテストなら`null`でもよい。


### 参考

- [Response | Deno Deploy Docs](https://deno.com/deploy/docs/runtime-response)

