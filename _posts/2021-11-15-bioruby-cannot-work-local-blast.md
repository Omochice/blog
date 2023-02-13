---
layout: post
title: "BioRubyでローカルのBlastが動かない"
category: "bioruby"
excerpt: ""
---

BioRuby には `Bio::Blast` というクラスがあり、リモート / ローカルの Blast を動かすことができる。

しかし、自分の手元でローカルの Blast を動かそうとしたところ、うまくいかなかった。

原因と思われるところを記録する。

検証環境は以下の通り。

```sh
$ blastp -version
blastp: 2.12.0+
 Package: blast 2.12.0, build Jun  4 2021 03:22:54

$ ruby --version
ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [x86_64-linux]

$ gem list | grep bio
bio (2.0.2)
```

どうでもいいが、 `--version` や `-v`、 `-V` では無いのがなんだかなあという感じ。

- エラー内容

```sh
/home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/command.rb:312:in `popen': No such file or directory - blastall (Errno::ENOENT)
	from /home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/command.rb:312:in `_call_command_popen_ruby19'
	from /home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/command.rb:240:in `call_command_popen'
	from /home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/command.rb:478:in `query_command_popen'
	from /home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/command.rb:444:in `query_command'
	from /home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/appl/blast.rb:487:in `exec_local'
	from /home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/appl/blast.rb:367:in `query'
	from exercise10.rb:23:in `block in <main>'
	from /home/mochi/.anyenv/envs/rbenv/versions/3.0.1/lib/ruby/gems/3.0.0/gems/bio-2.0.2/lib/bio/io/flatfile.rb:336:in `each_entry'
	from exercise10.rb:15:in `<main>'
```

エラー本体は `popen': No such file or directory - blastall (Errno::ENOENT)` とある。

リポジトリを見ると、こんなコードである。

```ruby
  def _call_command_popen_ruby19(cmd, options = {})
    # For Ruby 1.9 or later, using command line array with options.
    dir = options[:chdir]
    cmd = safe_command_line_array(cmd)
    if dir then
      cmd = cmd + [ { :chdir => dir } ]
    end
    r = IO.popen(cmd, "r+") do |io|
      yield io
    end
    return r
  end
  private :_call_command_popen_ruby19
```

`IO.popen` でプロセスを open している。

どうやらこの `cmd` に `blastall` が入り、コマンドが存在しないのでエラーになるようだ。

```ruby
   # returns an array containing NCBI BLAST options
    def make_command_line_options
      set_options
      cmd = []
      if @program
        cmd.concat([ '-p', @program ])
      end
      if @db
        cmd.concat([ '-d', @db ])
      end
      if @format
        cmd.concat([ '-m', @format.to_s ])
      end
      if @matrix
        cmd.concat([ '-M', @matrix ]) 
      end
      if @filter
        cmd.concat([ '-F', @filter ]) 
      end
      ncbiopts = NCBIOptions.new(@options)
      ncbiopts.make_command_line_options(cmd)
    end

    # makes command line.
    def make_command_line
      cmd = make_command_line_options
      cmd.unshift @blastall
      cmd
    end
```

`cmd` に対して `Bio::Blast.local` の引数の `blastp` が入り、`['-p', 'blastp']` unshift で先頭に追加されている。

- `blastall`

軽く検索をすると[BLAST 利用法 | スーパーコンピュータ | ヒトゲノム解析センター](https://supcom.hgc.jp/japanese/utili_info/manual/blast_util.html)がヒットする。

> このページは現在メンテナンスされていない Legacy BLAST の説明を記載しています。Legacy BLAST ではなく BLAST+ を使用することを推奨します。

と記載されている。

加えて、執筆時点の NCBI が提供している [`blast` の ftp](https://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/) には `blastall` のコマンドは収録されておらず、 `blastp` が収録されている。

このことから、_昔のコマンド実行方法がハードコードされており、 `blastp` への変更に追従できていない_ と結論づけた。


これを後方互換性をもたせたまま修正しようとすると `blastall` が実行可能であれば `blastall -p ~` を実行、 `blastall` は無いが `blastp` が実行可能であれば `blastp ~` を実行するのが良いのだろうか？
