---
layout: post
title: "mongo dbのセッティングの話"
category: ""
excerpt: ""
---

# mongo db

RDBとは違いNoSQLである(詳しいのは他の人のがわかりやすい)

とりあえず`pacman`にあるやろと思ったらなかった[MongoDB - ArchWiki](https://wiki.archlinux.org/index.php/MongoDB)

AURにあったので入れようとしたがいろいろある
どうやら`bin`がついていないものはソースからビルドするらしい。

> mongodbAUR - builds from source, requiring 180GB+ free disk space, and may take several hours to build (i.e. 6.5 hours on Intel i7, 1 hour on 32 Xeon cores with high-end NVMe.)

binで一番新しそうなのを入れた。

```console
$ yay -S mongodb
-> mongodb-bin
```

## 入れたあとのエラーへの対処

インストール後、`mongo`を実行するとエラーがでた。

```log
MongoDB shell version v4.4.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:374:17
@(connect):2:6
exception: connect failed
exiting with code 1
```

とりあえずarchWiki(日本語)を見るとトラブルシューティングがあるのでやってみる。

- データベースへのパスの設定

```console
$ cat /usr/lib/systemd/system/mongodb.service
ExecStart行にパスを書く
ExecStart=/usr/bin/numactl --interleave=all mongod --quiet --config /etc/mongodb.conf --dbpath /var/lib/mongodb
```

そもそもDBサーバを起動していないのが原因だった。

```console
# systemctl start mongodb
```

ついでなので自動起動の設定をしておく。

```console
# systemctl enable mongodb
# systemctl is-enabled mongodb # 確認
```

> `systemctl`のサービス名は`<service名>`でもいいし`<service名>.service`でもいいらしい

## mongoDB を触る

`mongo`でローカルのサーバと接続できる
RDBじゃないので色々用語が違うが。

```
root
└── DB
    └── Collection
        └── Document.json

{field:value}
```

### 管理者ユーザを作る

なにもしないとセキュリティがアレなので作る。

```console
$ mongo
> use admin
> db.createUser({
    user: "<username>",
    pwd: "<password>",
    roles: [{
        role: "userAdminAnyDatabase",
        db: "admin"
    }]
})
> db.auth("<username>", "<password>") # 一応確認
1
```

管理者ユーザを作ってもデフォルトだと認証しないので設定する。

```diff
# vim /etc/mongodb.conf
- #secrity:
+ secrity:
+   authorization: enabled
```

~~`authorization`とか`authorize`とか`authentication`とかタイポしやすくてきらい~~

サービスを再起動する。

```console
# systemctl restart mongodb
```

認証ありでmongodbを起動。

```console
$ mongo -u admin -authenticationDatabase admin
```

~~connection refused で詰まってたけど reboot したらうまくいった。多分プロセスがうまく start してなかったんだと思う~~

新しいcolletionをつくって読み書きできるユーザをつくる。

```console
> use test_col
> db.createUser({
    user: "test_user",
    pwd: "testpwd",
    roles: [{
        role: "readWrite",
        db: "test_col"
    }]
})
```

新しいコレクションを作ってユーザをつくる部分を外部スクリプト化しようと思う。
