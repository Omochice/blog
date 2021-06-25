---
layout: post
title: "github actionsでfortranのformatを自動実行する"
category: "fortran"
excerpt: ""
---

# {{ page.title  }}

```yaml
name: Fortran CI

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: set up python
        uses: actions/setup-python@v1
        with:
          python-version: 3.7

      - name: install fprettify
        run: pip install fprettify

      - name: apply fprettify
        run: fprettify -i 2 -r src/

      - name: commit formatted file
        run: |
          git config user.name = "github-actions"
          git config user.email = "github-actions[bot]@users.noreply.github.com"
          git add -u 
          git commit -m "auto format by github actions"
          git push origin ${{ steps.extract_branch.outputs.BRANCH_NAME  }}
```

fortranのformatterの[fprettify](https://github.com/pseewald/fprettify)はpipで入れれるのでUbuntu-latestとPythonをセットアップするレシピ(用語が正しいかわからない)を使って入れる。
pipでfprettfyを入れ、`-r(--recursive)`オプションで`src`以下のfortranファイルを上書きフォーマットする。

`git add -u`で追跡ファイルのうち、変更があったものをステージングする。

> ここの部分、変更ファイルがないとエラーを吐きそうなので`--allow-empty`とかしたほうがいいかもしれない

github actionsの変数で見ているブランチが入る`steps.extract_branch.outputs.BRANCH_NAME`があるみたいなのでそれを使ってpushする。

> ここの`origin`の設定をしていないけど大丈夫なのか(動いているから多分大丈夫なんだと思う)

## 参考

[python code の自動整形をするアクションを作ってみた - Qiita](https://qiita.com/utom/items/d6b17776f8e966985b01)
