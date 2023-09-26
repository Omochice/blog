---
layout: zenn.tsx
title: CSVライクな文字列をTeXの表に変換するプラグインを作った
topics: &ref_0
  - vim
excerpt: ''
type: tech
author: Omochice
tags: *ref_0

---
# {{ page.title }}

基本的に私が書いたプログラムが吐き出すデータは json か csv だ。

しかし、これらをそのまま LaTeX の文書に入れると見た目が良くない。
さらにキャプションとかラベルまで考えるとなかなかにめんどくさい。

インターネット上には json から csv や csv から latex の表に変換するサービスが色々あるが、いちいちブラウザにフォーカスを移動するのが面倒なので vim のプラグインにした。

[https://github.com/Omochice/TeXTable.vim](https://github.com/Omochice/TeXTable.vim)

```tex
1,2,3
one,two,three
a,b

% 上が下に変換される

\begin{table}[htbp]
	\centering
	\caption{}
	\begin{tabular}{l|l|l}
	\hline
		1 & 2 & 3 \\ \hline
		one & two & three \\ \hline
		a & b &  \\ \hline
	\end{tabular}
	\label{table:}
\end{table}
```

このプラグインを書く上で詰まった部分は次の通り。

- vim における `"` と `'` の取り扱いの違い
- 正規表現でエスケープする文字の取り扱い


##  vimにおける `"` と `'` の取り扱いの違い

vim では `"` でコメントアウトができる。
例えばこんな感じ。

```vim
" this is comment
let g:string_hoge = "hgoehoge" " <- これは文字列になる
```

そのため、混乱を避けるために文字列の表現には `'` を使うほうがよいとされている。

しかし、`"` と `'` では `\` の取り扱いが違う。
`"` で囲うと `\t` などの特殊文字が使える。
`'` で囲うと `\t` はそのままの文字として解釈される。
(Python で言うところの `r""` や Ruby の `",''` と似たイメージ)

なので、vim で正規表現を使って文字列を `split` したいときには次のように書く必要がある。

```vim
let g:sample_string = 'hogehoge  , hogehoge'

" 方法1
let g:splited = split(g:sample_string, '\s*,\s*') " -> ['hogehoge', 'hogehoge']

" 方法2
let g:splited = split(g:sample_string, "\\s*,\\s*") " -> ['hogehoge', 'hogehoge']
```

## 正規表現でエスケープする文字の取り扱い

正規表現では `.` など、そのまま使うと特殊な意味になる文字がある。
そのため、`one . two.three . fo ur` を `['one', 'two', 'three', 'fo ur']` に分割したいとき、ユーザからくる `.` をエスケープする必要がある。

`need_escape?(char)` みたいな関数があればいいのだが、調べた感じ無かったので作った。


```vim
function! s:need_escape(char) abort
  let s:chars_need_escape = [
        \ '\',
        \ '+',
        \ '.',
        \ '*',
        \ '[',
        \ ']',
        \ '(',
        \ ')',
        \ '{',
        \ '}',
        \ '?',
        \ '^',
        \ '$',
        \ '|',
        \ ]
  return get(s:chars_need_escape, a:char) != -1
endfunction
```

2 文字以上の入力に対応してないが、最低限動いてるのでいいかな。
