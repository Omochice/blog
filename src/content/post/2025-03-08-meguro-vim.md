---
title: "Meguro.vim #28に参加した"
date: 2025-03-08
topics: ["vim", "event"]
excerpt: ''
type: tech
---

[Meguro.vim #28](https://megurovim.connpass.com/event/338986/)に参加した。

## やったこと

### [thinca/node-vimhelp](https://github.com/thinca/node-vimhelp)の調査

依存をあげたいらしい

#### macでテストがおちる

- てもとのmacでtestしたらおちた

```console
> vimhelp@4.1.0 test
> nyc --reporter=lcovonly --reporter=text mocha



vimhelp
  index
    ✔ has VimHelp class
    ✔ has PluginManager class
    ✔ has ExecError class

vimhelp
  PluginManager
    .plugins
      ✔ returns array of plugin informations
    .dirNames
      ✔ returns array of dir names
    .pluginNames
      1) returns array of plugin names
    .runtimepaths
      ✔ returns array of runtimepath
    .rtpProvider
      ✔ returns the rtp provider
    .install()
      with exist plugin
        ✔ installs a plugin
        ✔ returns version hash
        with already installed
          ✔ is fail
      with non-exist plugin
        ✔ is fail (557ms)
    .uninstall()
      ✔ uninstalls a plugin (57ms)
      with not installed plugin
        ✔ is fail
    .clean()
      ✔ uninstalls plugins
    .update()
      with no updates
        ✔ does nothing as result (40ms)
        ✔ returns update info object with Promise
      with updates
        ✔ updates repository (64ms)
      with no exist path
        ✔ is fail
    .updatePlugin()
      with no updates
        ✔ does nothing as result (39ms)
        ✔ returns update info object with Promise
      with updates
        ✔ updates repository (57ms)
      with no exist path
        ✔ is fail
    .updateAll()
      with no arguments
        with no updates
          ✔ does nothing as result (39ms)
          2) returns updateInfos
        with updates
          3) updates repository
      with plugin list as arguments
        with no updates
          ✔ does nothing as result (40ms)
          ✔ returns updateInfos
        with updates
          when argument does not contain updateing plugin
            ✔ does nothing as result (40ms)
            ✔ returns updateInfos
          when argument does not contain updateing plugin
            ✔ updates repository (65ms)
        with empty array
          ✔ returns empty result
    .updateTags()
      ✔ updates helptags
    .nameToRepository()
      simple name
        ✔ is treated as vim-scripts's plugin
      username/repos form
        ✔ is treated as Github's plugin
      full URL
        ✔ returns directly
    .repositoryToDirname()
      when repository is http/https
        ✔ returns path
        when repository has .git suffix
          ✔ is removed
      when repository is git://
        ✔ returns path
        when repository has .git suffix
          ✔ is removed
      when repository is ssh
        ✔ returns path
        when repository has .git suffix
          ✔ is removed
    .nameToPath()
      ✔ converts plugin name to path
    .dirnameToName()
      vim-scripts plugin
        ✔ converts dirname to plugin name
      github.com plugin
        ✔ converts dirname to plugin name
      other plugin
        ✔ does not restore the full URL

vimhelp
  VimHelp
    .search()
      ✔ returns Promise object
      ✔ removes extra commands
      ✔ can not execute extra commands by |
      the result
        ✔ is a text from Vim's help
        ✔ keeps the whitespaces of head
        ✔ doesn't have the blank chars in tail
        ✔ contains a range of before of a next tag from a tag
        ✔ can treat a tag at the head of file
        ✔ does not contain separator
        ✔ can separate section when the line ends with >
        ✔ can handle a tag that is placed to head of line
      when the help does not exist
        ✔ throws error
      when rtp provider is set
        ✔ is set rtp from provider
      when helplang is set
        ✔ sets 'helplang' options
    .setRTPProvider()
      ✔ sets a rtp provider


58 passing (2s)
3 failing

1) vimhelp
     PluginManager
       .pluginNames
         returns array of plugin names:

    AssertionError: expected [ Array(1) ] to deeply equal [ Array(1) ]
    + expected - actual

     [
    -  "/var/folders/v/_jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l"
    +  "/var/folders/v_/jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l"
     ]

    at Context.<anonymous> (test/plugin_manager.test.ts:80:36)
    at processImmediate (node:internal/timers:491:21)

2) vimhelp
     PluginManager
       .updateAll()
         with no arguments
           with no updates
             returns updateInfos:

    AssertionError: expected '/var/folders/v/_jvpg1wl10gzc01h6kv0j5…' to deeply equal '/var/folders/v_/jvpg1wl10gzc01h6kv0j5…'
    + expected - actual

    -/var/folders/v/_jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l
    +/var/folders/v_/jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l

    at Context.<anonymous> (test/plugin_manager.test.ts:276:40)

3) vimhelp
     PluginManager
       .updateAll()
         with no arguments
           with updates
             updates repository:

    AssertionError: expected '/var/folders/v/_jvpg1wl10gzc01h6kv0j5…' to deeply equal '/var/folders/v_/jvpg1wl10gzc01h6kv0j5…'
    + expected - actual

    -/var/folders/v/_jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l
    +/var/folders/v_/jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l

    at Context.<anonymous> (test/plugin_manager.test.ts:295:50)



-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |      100 |     100 |     100 |
exec_vim.ts       |     100 |      100 |     100 |     100 |
index.ts          |     100 |      100 |     100 |     100 |
plugin_manager.ts |     100 |      100 |     100 |     100 |
vimhelp.ts        |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------
```

```diff
-/var/folders/v/_jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l
+/var/folders/v_/jvpg1wl10gzc01h6kv0j5rq40000gn/T/vimhelp-test-dummy-plugin-repo202528-79301-p8jvh0.00j9l
```

- dockerで`node:22`つかってテストするとおちないので多分macだけ
  - `/var`だし多分そう
  - `/var/folders/v_/`みたいに`_`が含まれるパスが入ると内部でやってる`/`を`__`で`v___`になる
    - `__`を`/`にするときに`v___`が`v/_`になってしまう

#### 依存を上げるとテストが落ちる

- node22.0.0だとおちてしまう
  - テストだしmochaあたり?

```console
> vimhelp@4.1.0 test /Users/omochice/ghq/github.com/Omochice/node-vimhelp
> nyc --reporter=lcovonly --reporter=text mocha


Exception during run: TypeError: Unknown file extension ".ts" for /Users/omochice/ghq/github.com/Omochice/node-vimhelp/test/index.test.ts
  at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:176:9)
  at defaultGetFormat (node:internal/modules/esm/get_format:219:36)
  at defaultLoad (node:internal/modules/esm/load:143:22)
  at async ModuleLoader.load (node:internal/modules/esm/loader:541:7)
  at async ModuleLoader.moduleProvider (node:internal/modules/esm/loader:422:45)
  at async link (node:internal/modules/esm/module_job:88:21) {
code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |
----------|---------|----------|---------|---------|-------------------
 ELIFECYCLE  Test failed. See above for more details.

```

- masterであれば22.0.0で通る
- 関連しそうなissue
  - https://github.com/mochajs/mocha/issues/4900
- 個別に上げてみるとchaiをv5にすると落ちる
  - typescriptとかmochaを上げるだけなら落ちない

元々使ってるchaiは以下の通り(lockから引用)

```console
"node_modules/@types/chai": {
  "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@types/chai/-/chai-4.3.1.tgz",
      "integrity": "sha512-/zPMqDkzSZ8t3VtxOa4KPq7uzzW978M9Tvh+j7GHKuo6k6GTLxPJ4J5gE5cjfJ26pnXst0N5Hax8Sr0T2Mi9zQ==",
      "dev": true
},
```

chaiのv5でesmに移行してるらしいので、これが影響ありそう。

そもそも22.0.0なら落ちて22だと落ちないので、どこでgreenに戻ってる？

- 22.7.0: NG
- 22.10.0: NG
- 22.11.0: NG
- 22.12.0: OK

https://nodejs.org/en/blog/release/v22.12.0#requireesm-is-now-enabled-by-default で`require(esm)`ができるようになってる。

ここでmochaを読むと内部で`require`してるやつがある。

https://github.com/mochajs/mocha/blob/b720ec1b3ca630a90f80311da391b2a0cdfead4e/lib/nodejs/esm-utils.js#L53

これが根本の原因のようだが、じゃあどうすれば？

https://github.com/chaijs/chai/discussions/1575

https://gist.github.com/43081j/78ce1392abb5043b02a29355006880a5 のgistだと動くが、警告がでる。

```console
(node:13092) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
(Use `node --trace-warnings ...` to show where the warning was created)
(node:13092) [DEP0180] DeprecationWarning: fs.Stats constructor is deprecated.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

ひっぺがしてvitestとかにするほうが楽そう。

