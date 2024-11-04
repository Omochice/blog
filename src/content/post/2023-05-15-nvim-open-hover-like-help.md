---
title: "nvim-lspでtextDocument/hoverをsplitで開く"
date: 2023-05-15
topics: ["nvim", "lua", "lsp"]
excerpt: ""
type: tech
---

vim-lspからnvim-lspに乗り換えをしている。

vim-lspだとformat時になぜかファイルが二重に書き込まれてしまうので、それの解消と、noiceとかとの連携を考えての乗り換え決定。

ただ、使用感が変わってしまうとうれしくないので、できるだけvim-lspと合わせたい。

キーマップは`LspAttach`のイベントにフックしてbuffer-localなマッピングを設定すればいいので、vim-lspより設定はしやすい。

vim-lspだと現在のバッファに有効なサーバーでその機能が有効かどうか...みたいなことを考えないといけなかったので。

ただ、`textDocument/hover`がどうやら本当にhoverしかサポートしていないっぽいので自力で`split`で開くように設定する。

多分他の人がやってるだろうと思ってgithubで調べて見たがなかったので不思議。

以下を適用すれば`textDocument/hover`が通常の`:help`と同じ感じに上部に開く。


```lua
local help_bufnr = nil

vim.lsp.handlers["textDocument/hover"] = vim.lsp.with(
  function(_, result, context)
    -- NOTE: hevily based on vim-lsp: under_cursor.vil
    if context.bufnr ~= vim.fn.bufnr() then
      -- NOTE: changed buffer before responce reach
      vim.notify("LSP mey be slow...", vim.log.levels.WARN)
      return
    end

    local contents = vim.lsp.util.trim_empty_lines(
      vim.lsp.util.convert_input_to_markdown_lines(result.contents)
    )
    if vim.tbl_isempty(contents) then
      local server_name = vim.lsp.get_client_by_id(context.client_id).name
      vim.notify(
        string.format("No hover information found in server: %s", server_name),
        vim.log.levels.WARN
      )
      return
    end

    help_bufnr = help_bufnr == nil and vim.api.nvim_create_buf(false, true) or help_bufnr
    vim.bo[help_bufnr].filetype = "markdown"
    vim.bo[help_bufnr].buftype = "nofile"
    vim.bo[help_bufnr].buflisted = false
    vim.bo[help_bufnr].readonly = false
    vim.bo[help_bufnr].bufhidden = "hide"
    vim.bo[help_bufnr].swapfile = false

    vim.fn.deletebufline(help_bufnr, 1, "$")
    vim.fn.setbufline(help_bufnr, 1, contents)

    vim.cmd(string.format("leftabove sbuffer %d", help_bufnr))
    local winid = vim.api.nvim_get_current_win()
    vim.wo[winid].previewwindow = true
    vim.wo[winid].conceallevel = 2
    vim.wo[winid].wrap = true
  end,
  {}
)
```

hover用のバッファは使いまわすようにしたので`help_bufnr`で保存するようにした。


`vim.cmd(string.format("leftabove sbuffer %d", help_bufnr))`があまりきれいじゃないのでarrayを渡して実行するような感じにしたいけどluaのnvimよくわからんね。

(`nvim_cmd`は試したけど`leftabove`がinvalidってエラーが出た。よくわからん。)
