---
layout: post
title: "github actionsでfortranのformatを自動実行する"
category: "fortran"
excerpt: ""
---

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

fortran の formatter の[fprettify](https://github.com/pseewald/fprettify)は pip で入れれるので Ubuntu-latest と Python をセットアップするレシピ(用語が正しいかわからない)を使って入れる。
pip で fprettfy を入れ、`-r(--recursive)` オプションで `src` 以下の fortran ファイルを上書きフォーマットする。

`git add -u` で追跡ファイルのうち、変更があったものをステージングする。

> ここの部分、変更ファイルがないとエラーを吐きそうなので `--allow-empty` とかしたほうがいいかもしれない

github actions の変数で見ているブランチが入る `steps.extract_branch.outputs.BRANCH_NAME` があるみたいなのでそれを使って push する。

> ここの `origin` の設定をしていないけど大丈夫なのか(動いているから多分大丈夫なんだと思う)

## 参考

[python code の自動整形をするアクションを作ってみた - Qiita](https://qiita.com/utom/items/d6b17776f8e966985b01)
