---
layout: zenn.tsx
title: "Raspberry Pi ZeroでRaspberry OS Liteの初期設定をする"
topics: ["RaspberryPi"]
excerpt: ""
type: tech
---

# {{ page.title }}

ラズパイでカメラ接続して遊びたかったのでラズパイ Zero を買った。

いろいろ調べるのが面倒だったのでまとめる。

## OS のインストール

OS は[https://www.raspberrypi.org/software/operating-systems/](https://www.raspberrypi.org/software/operating-systems/)から Raspberry Pi OS Lite をインストールした。

ハッシュ値の確認は次のコマンドで行う。

```console
$ sha256sum <ダウンロードしたzipファイル>
```

解凍した `.img` ファイルではなく zip にハッシュ関数を当てる。

OS の書き込みには Raspberry pi imager が推されているが SD への書き込み権限がうまくいかなかったので手元の PC の標準イメージライタで書き込んだ。

## ラズパイでの操作

ID と PASS は初期で `ID: pi, PASS: raspberry` になっている。

ログイン後、まずはキーボードの設定をする（日本語キーボードだと以降の設定で記号を打つのがとても面倒）

### キーボード配列の設定

```console
$ sudo raspi-config
```

ある程度の設定はこれでできる。

＞ localisation options > Keyborad > Genetic 104 key > Other > Japanese で設定した。

### 無線 LAN への接続

`$ sudo iwlist wlan0 scan | grep ESSID` で AP の SSID がでるので使っている AP があるか確認する。

`/etc/wpa_supplicant/wpa_supplicant.conf` 以下を追記する。
（パスは面倒なので bash の tab 補完を使うと楽）

```
network={
    ssid="<SSID>"
    psk="<key>"
}
```

再起動すれば自動で AP に接続するようになる。
（多分再起動しなくても `# systemctl restart` とかすれば動きそう）

### ssh の有効化

これも `rapi-config` から設定できる。

＞ interface options > SSH

### アドレスの固定化

`/etc/dhcpcd.conf` に追記する。

```
interface wlan0
static ip_address=<ip address>/<subnet mask>
static routers=<router address>
static domain_name_servers=<DNS address>
```

DNS は google の 8.8.8.8 とかでいい。

### ユーザ名とパスワードの変更

元の `pi` を `pi` でログインした状態で変更することはできないので、変更するためのユーザを作る。

```console
$ sudo usermod -M tmp
$ sudo gpasswd -a tmp sudo
$ sudo passwd tmp
```

作った `tmp` ユーザでログインして `pi` を変更する。
(パスワードは `sudo passwd tmp` で設定する)

```console
$ sudo usermod -l <username> pi
$ sudo sudo usermod -d /home/<username> -m <username>
$ sudo groupmod -n <usrname> pi
```

新しいユーザでログインし、`tmp` ユーザを消す。
ついでに新しいユーザのパスワードを変更する。
（変更前は `pi` のパスワードが引き継がれる。そもそも pi を改名している）。

```console
$ sudo userdel tmp
sudo passwd <username>
```

### `sudo` の警告を消す

個人的にあの >大いなる力~ が好きじゃないので出ないようにする。
`/etc/sudoers` に以下を追記する。

```
Default    lecture=never
```

Default の後の空白は `\t` で設定されていたので合わせた。

とりあえずこれで SSH で開発できる（`scp` で開発したのを持っていける）ので後はカメラの入荷を待つだけだ。
