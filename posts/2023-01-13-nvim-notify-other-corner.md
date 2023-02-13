---
layout: zenn.tsx
title: "nvim-notifyでnotifyの表示を右上以外に表示する"
category: "vim"
excerpt: ""
---

# {{ page.title }}

noice.nvim を導入したが、LS の警告等が右上に出てしまい、コーディングしている領域と被って見づらい。


issue を調べてみると position を直には指定できないが notify の表示ロジックを差し替えることで対応できるらしい。


ref: https://github.com/rcarriga/nvim-notify/issues/99

以下で右下になる。

```lua
local stages_util = require('notify.stages.util')
require('notify').setup({
  background_colour = '#000000',
  stages = {
    function(state)
      local next_height = state.message.height + 2
      local next_row = stages_util.available_slot(
        state.open_windows,
        next_height,
        stages_util.DIRECTION.BOTTOM_UP
      )
      if not next_row then
        return nil
      end
      return {
        relative = 'editor',
        anchor = 'NE',
        width = state.message.width,
        height = state.message.height,
        col = vim.opt.columns:get(),
        row = next_row,
        border = 'rounded',
        style = 'minimal',
        opacity = 0,
      }
    end,
    function()
      return {
        opacity = { 100 },
        col = { vim.opt.columns:get() },
      }
    end,
    function()
      return {
        col = { vim.opt.columns:get() },
        time = true,
      }
    end,
    function()
      return {
        width = {
          1,
          frequency = 2.5,
          damping = 0.9,
          complete = function(cur_width)
            return cur_width < 3
          end,
        },
        opacity = {
          0,
          frequency = 2,
          complete = function(cur_opacity)
            return cur_opacity <= 4
          end,
        },
        col = { vim.opt.columns:get() },
      }
    end,
  },
})
```
