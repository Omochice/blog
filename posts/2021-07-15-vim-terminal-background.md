---
layout: zenn.tsx
title: "Vimのterminalの背景が透過しない"
category: "vim"
excerpt: ""
type: tech
---

# {{ page.title }}

vim の設定に `set termguicolors` というものがある。

これは[TrueColorを使うための設定](https://vim-jp.org/vimdoc-ja/options.html#'termguicolors')で、これが set されていないと colorscheme の一部が正しく表示されないことがある。

これを設定したところ、`:terminal` で起動する vim 内の端末の背景色が以下の画像のようにおかしくなったので、まとめる。

![Blackterminal](https://i.gyazo.com/0419875322440bc99aa70ef621080b21.png)

Vim(not neovim)で `set termguicolors` を設定した状態で `:term[inal]` を実行すると背景が黒になる。

背景・カラースキームの設定は `dein.toml` 内でやっている。

```toml
[[plugins]]
repo = "haishanh/night-owl.vim"
hook_add = """
function! DefineHighlights() abort
    if g:colors_name is "night-owl"
        highlight Normal       ctermbg=NONE guibg=NONE
        highlight NonText      ctermbg=NONE guibg=NONE
        highlight EndOfBuffer  ctermbg=NONE guibg=NONE
        highlight Folded       ctermbg=NONE guibg=NONE
        highlight LineNr       ctermbg=NONE guibg=NONE
        highlight CursorLineNr ctermbg=NONE guibg=NONE
        highlight SpecialKey   ctermbg=NONE guibg=NONE
        highlight Terminal     ctermbg=NONE guibg=NONE
    endif
endfunction

augroup colorcshemeSetting
    autocmd!
    autocmd VimEnter * nested colorscheme night-owl
    autocmd ColorScheme * :call DefineHighlights()
augroup END
"""
```

この設定で `term` すると背景が黒になる。

多分この黒っていうのは背景が無いけど割り当てる背景が存在しないから黒になってるんだと思う。

`guibg=white` だと白くなるから `black!=NONE` ではと思っている。


neovim だと背景透過はするが、色設定が独自っぽいのでそれも面倒。

某.jp で聞いた感じだとターミナルアプリとの相性もあるらしいが、alacritty と xfce4-terminal でこの現象が起こるので相性問題では無いような気がする。

picom を使えば透過はできるけれども文字も透過されるのでそれじゃない感が強い。

なんとかできそうで結局出来なそうな問題なので記録したが、いつか直せるのだろうか。
