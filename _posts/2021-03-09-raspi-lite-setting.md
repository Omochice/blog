---
layout: post
title: "Raspberry Pi ZeroでRaspberry OS Liteの初期設定をする"
category: "RaspberryPi"
excerpt: ""
---

# {{ page.title }}

ラズパイでカメラ接続して遊びたかったのでラズパイZeroを買った。

いろいろ調べるのが面倒だったのでまとめる。

## OSのインストール

OSは[https://www.raspberrypi.org/software/operating-systems/](https://www.raspberrypi.org/software/operating-systems/)からRaspberry Pi OS Liteをインストールした。

ハッシュ値の確認は次のコマンドで行う。
```console 
$ sha256sum <ダウンロードしたzipファイル>
```

解凍した`.img`ファイルではなくzipにハッシュ関数を当てる。

OSの書き込みにはRaspberry pi imagerが推されているがSDへの書き込み権限がうまくいかなかったので手元のPCの標準イメージライタで書き込んだ。

## ラズパイでの操作

IDとPASSは初期で`ID: pi, PASS: raspberry`になっている。

ログイン後、まずはキーボードの設定をする。（日本語キーボードだと以降の設定で記号を打つのがとても面倒）

### キーボード配列の設定

```console
$ sudo raspi-config
```

ある程度の設定はこれでできる。

＞localisation options > Keyborad > Genetic 104 key > Other > Japaneseで設定した。

### 無線LANへの接続

`$ sudo iwlist wlan0 scan | grep ESSID`でAPのSSIDがでるので使っているAPがあるか確認する。

`/etc/wpa_supplicant/wpa_supplicant.conf`以下を追記する。
（パスは面倒なのでbashのtab補完を使うと楽）

```
network={
    ssid="<SSID>"
    psk="<key>"
}
```

再起動すれば自動でAPに接続するようになる。
（多分再起動しなくても`# systemctl restart`とかすれば動きそう）

### sshの有効化

これも`rapi-config`から設定できる。

＞interface options > SSH

### アドレスの固定化

`/etc/dhcpcd.conf`に追記する。

```
interface wlan0
static ip_address=<ip address>/<subnet mask>
static routers=<router address>
static domain_name_servers=<DNS address>
```

DNSはgoogleの8.8.8.8とかでいい。

### ユーザ名とパスワードの変更

元の`pi`を`pi`でログインした状態で変更することはできないので、変更するためのユーザを作る。
```console
$ sudo usermod -M tmp
$ sudo gpasswd -a tmp sudo 
$ sudo passwd tmp
```

作った`tmp`ユーザでログインして`pi`を変更する。
(パスワードは`sudo passwd tmp`で設定する)

```console
$ sudo usermod -l <username> pi
$ sudo sudo usermod -d /home/<username> -m <username>
$ sudo groupmod -n <usrname> pi
```

新しいユーザでログインし、`tmp`ユーザを消す。
ついでに新しいユーザのパスワードを変更する。
（変更前は`pi`のパスワードが引き継がれる。そもそもpiを改名している。）

```console
$ sudo userdel tmp
sudo passwd <username>
```

### `sudo`の警告を消す

個人的にあの >大いなる力~ が好きじゃないので出ないようにする。
`/etc/sudoers`に以下を追記する。

```
Default    lecture=never
```

Defaultの後の空白は`\t`で設定されていたので合わせた。



とりあえずこれでSSHで開発できる（`scp`で開発したのを持っていける）ので後はカメラの入荷を待つだけだ。
