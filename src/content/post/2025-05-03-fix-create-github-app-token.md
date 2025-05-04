---
title: "create-github-app-tokenのバグをなおした"
date: 2025-05-03
topics: ["github actions"]
excerpt: ''
type: tech
---

[actions/create-github-app-token](https://github.com/actions/create-github-app-token)が2.0.4になったタイミングでCIが落ちるようになってしまった。

[nur-packages issue #86](https://github.com/Omochice/nur-packages/issues/86)

なんやかんやで直したので以下に備忘録を書く。

アプリにはちゃんと必要な権限ついてるし、2.0.3までは動いていたので、なにかが2.0.4で変わったことになる。

調べてみたところ、アプリに全ての権限をつけても422になってしまったので、権限が足りないという訳ではなさそう。

最小構成を作ってみると`permission-pull-requests`を指定するかどうかで挙動が変わっているようだった。

ここで、[2.0.4のdiff](https://github.com/actions/create-github-app-token/compare/v2.0.3...v2.0.4)をみてみるとactionsの引数で`permission-pull-requests`を指定すると環境変数`INPUT_PERMISSION-PULL-REQUESTS`になるようだった。

これは公式のドキュメントにも書かれている変換方式である。

[GitHub Actions metadata syntax docs](https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions#example-specifying-inputs)

> For example, if a workflow defined the num-octocats and octocat-eye-color inputs, the action code could read the values of the inputs using the INPUT_NUM-OCTOCATS and INPUT_OCTOCAT-EYE-COLOR environment variables.

これをactionsが解釈するときに`toLowerCase()`しかしてないので、`pull-requests`というキーで問い合わせしてる。

[get-permissions-from-inputs.js#L13](https://github.com/actions/create-github-app-token/blob/2950cbc446a8d3030ea17d3f7cbdd3c0fce4b0f5/lib/get-permissions-from-inputs.js#L13)

これはsnapshotの変更からも分かる。

[APIのドキュメント](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#create-an-installation-access-token-for-an-app) を見ると以下のようにかかれている。

> `pull_requests` string
>
> The level of permission to grant the access token for pull requests and related comments, assignees, labels, milestones, and merges.
>
> Can be one of: read, write

`pull_requests`を予期してるのに`pull-requests`を投げているので、存在しないキーの確認となって422となっていた。

これは`env`で`INPUT_PERMISSION-HOGE`を設定すると同じ挙動になるのを確認できる。

結局のところ、環境変数からapiに投げるキーへの変換でダメになってたので直した。

[actions/create-github-app-token#246](https://github.com/actions/create-github-app-token/pull/246)

なお、この問題を踏んでたのはgithubで調べるかぎり世界で3人程度だったっぽい。
