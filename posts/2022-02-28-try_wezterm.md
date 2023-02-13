---
layout: zenn.tsx
title: "weztermをためしてみる"
category: ""
excerpt: ""
---

# {{ page.title }}

[alacritty+tmuxもいいけど、weztermがすごい件](https://zenn.dev/yutakatay/articles/wezterm-intro#4.-%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E3%83%9E%E3%83%AB%E3%83%81%E3%83%97%E3%83%AC%E3%82%AF%E3%82%B5(tmux-%E7%9B%B8%E5%BD%93)%E3%82%92%E5%86%85%E8%94%B5%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE%E3%81%8C%E3%81%99%E3%81%94%E3%81%84)

wezterm というのが流行っているらしい。

普段は alacritty を使っているが、試してみる。

## インストール

```console
$ paru -S wezterm-nightly-bin
```

rust で書かれているようなので直接 `cargo build` してもいいかもしれない。

## 設定

設定は `~/.config/wezterm/wezterm.lua` に書くようだ。(置き場所は他にもある)

普段使っている alacritty+tmux に合わせるために以下の設定をかいた。

```lua
local wezterm = require("wezterm");

-- utils

function merge(...)
    local results = {}
    local tables = {...}
    for i = 1, #tables do
        results = _merge(results, tables[i])
    end
    return results
end

function _merge(t1, t2) -- from [https://github.com/yutkat/dotfiles/blob/3576916618fa7991de69682f628ec4832cf919c7/.config/wezterm/utils.lua]
	for k, v in pairs(t2) do
		if (type(v) == "table") and (type(t1[k] or false) == "table") then
			merge_tables(t1[k], t2[k])
		else
			t1[k] = v
		end
	end
	return t1
end

function basename(path)
	return string.gsub(path, "(.*[/\\])(.*)", "%2")
end

-- setting variables

local fonts = {
    font = wezterm.font("Firge35Nerd Console"),
    font_size = 15,
}

local keys = {
    disable_default_keybindings = true,
    keys = {
        { key = "c", mods = "ALT", action = wezterm.action({ SpawnTab = "DefaultDomain" }) },
        { key = "n", mods = "ALT", action = wezterm.action({ ActivateTabRelative = 1 }) },
        { key = "n", mods = "ALT|SHIFT", action = wezterm.action({ ActivateTabRelative = -1 }) },
        { key = "raw:132", mods = "ALT", action = wezterm.action({ SplitHorizontal = {domain = "CurrentPaneDomain"} }) }, -- 132 = backslash
        { key = "-", mods = "ALT", action = wezterm.action({ SplitVertical = {domain = "CurrentPaneDomain"} }) },
        { key = "h", mods = "ALT", action = wezterm.action({ ActivatePaneDirection = "Left" }) },
        { key = "j", mods = "ALT", action = wezterm.action({ ActivatePaneDirection = "Down" }) },
        { key = "k", mods = "ALT", action = wezterm.action({ ActivatePaneDirection = "Up" }) },
        { key = "l", mods = "ALT", action = wezterm.action({ ActivatePaneDirection = "Right" }) },
        { key = "LeftArrow", mods = "ALT", action = wezterm.action({ AdjustPaneSize = {"Left", 3} })},
        { key = "DownArrow", mods = "ALT", action = wezterm.action({ AdjustPaneSize = {"Down", 3} })},
        { key = "UpArrow", mods = "ALT", action = wezterm.action({ AdjustPaneSize = {"Up", 3} })},
        { key = "RightArrow", mods = "ALT", action = wezterm.action({ AdjustPaneSize = {"Right", 3} })},
        { key = "q", mods = "ALT|SHIFT", action = wezterm.action({ CloseCurrentPane = {confirm = false} })},
        { key = "q", mods = "ALT", action = "ActivateCopyMode" },
    }
}

local bars = {
    use_fancy_tab_bar = false,
    colors = {
        tab_bar = {
            background = "#000000",
            active_tab = {
                bg_color = "#81d0c9",
                fg_color = "#1f1e1c",
                intensity = "Normal",
                underline = "None",
                italic = false,
                strikethrough = false,
            }
        },
    }
}

local colors = {
    window_background_opacity = 0.8,
    color_scheme = "sonokai",
    color_scheme_dirs = { "$HOME/.config/wezterm/colors/" }
}

wezterm.on("format-tab-title", function(tab, tabs, panes, config, hover, max_width)
	local title = wezterm.truncate_right(basename(tab.active_pane.foreground_process_name), max_width)
	return {
		{ Text = " " .. tab.tab_index + 1 .. ": " .. title .. " "},
	}
end)

return merge(
    keys,
    fonts,
    bars,
    colors
)
```

### 完成図

![alacritty+tmux vs wezterm](https://i.gyazo.com/b9255a87fb554c4a002c755d985cb260.png)

### alacrittyと比べて良いところ

- IME 入力中の文字が見える
    alacritty だと IME のポップアップが荒ぶったりするのでありがたい

- emoji がきれいになるものがある
- sixel が通る
    `img2sixel sample.png` で画像が見れる。
    画像を見るためだけに x を通したり vscode の remote 機能を使わなくてよい。

### 詰まったところ

- `M-\` で横分割をしたいが `keys = "\\"` だと通らない。
    うまく行かないのでキーコードを直接 `raw:<keycode>` で書き込んだ。
    keycode は `xmodmap -pke | less` で調べた。

- `MoveTabRelative` だとタブ移動がサイクルしない。
    `ActivateTabRelative` を使う。

- Vim の `TmuxNavigator` がうまく動かない
    そのままだと wezterm にキー入力が吸われるのでうまいことやらないといけなそう

- Vim の tmux をソースにする補完が動かない
    なんとかすればとれたりしないものか
