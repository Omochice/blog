---
title: "Vimで独自のロケーションリストをつくる"
topics: ["Vim"]
excerpt: ""
type: tech
---

# {{ page.title }}

TeX のアウトラインを出すプラグインを作るときに自分でロケーションリストを作る方法を調べたのでまとめる。

Zenn のスクラップは[ここ](https://zenn.dev/omochice/scraps/0f24249a336b20)


表示させるメッセージは以下とする。

各行は `メッセージ:行番号` とする。

```vim
let messages = [
    \ 'section:1',
    \ 'subsection:4',
    \ 'section:5',
    \ 'subsection:7',
    \ 'subsubsection:10',
    \ ]
```

ロケーションリストを表示するために必要なものは次の 3 つだと思われる。

- ファイル名(`%f`)
- 行番号(`%l`)
- メッセージ(`%m`)

行ジャンプしないなら `%l` はいらないかも。

`messagesに` ファイル名を付け足す。


```vim
call map(messages, {_,v -> expand('%') .. ':' .. v})
```

このままではデフォルトの `errorformat` に適合しないため、`errorformat` を変更する。
(元の `errorformat` は退避)

```vim
let save_eft = &errorformat
let &errorformat = '%f:%m:%l'
```

ロケーションリストを開く。
ついでに退避させていた `errorformat` を戻す。

```vim
lgetexpr messages | vertical botright lopen
let &errorformat = save_eft
```

