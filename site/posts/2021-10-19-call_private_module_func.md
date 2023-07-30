---
layout: zenn.tsx
title: "RubyのModule内にあるPrivateな関数を呼ぶ"
topics: ["Ruby"]
excerpt: ""
type: tech
---

研究室で個人的に使ってる便利な関数や使われがちな関数をまとめて野良 Gem を作ろうとしている。

外に公開するからにはちゃんとテストを書きたい。

DSL 的な記述よりは Ruby そのまんまな記述のほうが管理しやすそうなので、RSpec ではなく minitest でテストを書くことにした。

テストを書くにあたって、module 内部で使っている関数のうち、外部に公開しない Private な関数の呼び出し方を調べたのでまとめておく。

次のような module があるとする。

```ruby
module Sample
  class << self
    def hello(name)
      p "Hello #{name}."
    end

    private

    def good_bye(name)
      p "Good bye #{name}"
    end
  end
end
```

この module の hello 関数は `Sample.hello` で呼び出せる。しかし、good\_bye 関数は private なので `Sample.good_bye` で呼び出すことができない。

テストを書くときは非公開の関数もテストしたい。

これを呼び出すためには次のように書く。

```ruby
Sample.send(:good_bye, "taro")
```

最初は `class << self` ではなく `module_function :hello` と書いていたが、これでは `send` で呼び出せないようだ。
