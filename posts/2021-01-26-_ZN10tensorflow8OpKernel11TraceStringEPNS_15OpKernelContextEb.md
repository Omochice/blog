---
layout: zenn.tsx
title: "tensorflow2.3.0でエラーが出て解決にそこそこかかった話"
category: "python"
excerpt: ""
---

いつも使っている tensorflow のコードを動かそうとしたら次のエラーが出た。

```console
2021-01-26 17:19:08.615052: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcudart.so.11.0
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/mochi-svr/.local/share/virtualenvs/machine-genome-classification-2aiVrJsB/lib/python3.8/site-packages/tensorflow/__init__.py", line 435, in <mod
ule>
   _ll.load_library(_main_dir)
  File "/home/mochi-svr/.local/share/virtualenvs/machine-genome-classification-2aiVrJsB/lib/python3.8/site-packages/tensorflow/python/framework/load_library.p
y", line 153, in load_library
    py_tf.TF_LoadLibrary(lib)
tensorflow.python.framework.errors_impl.NotFoundError: /home/mochi-svr/.local/lib/python3.8/site-packages/tensorflow/core/kernels/libtfkernel_sobol_op.so: und
efined symbol: _ZN10tensorflow8OpKernel11TraceStringEPNS_15OpKernelContextEb
```

そもそもコードの 1 行目でエラーを吐いている。

```python
import tensorflow as tf
```

調べるとこんなことが書いてあった。

> According to github it looks like a problem only with version 2.3.0, but not 2.4.0.
> [python 3.x - undefined symbol: \_ZN10tensorflow8OpKernel11TraceStringEPNS_15OpKernelContextEb - Stack Overflow](https://stackoverflow.com/questions/65405705/undefined-symbol-zn10tensorflow8opkernel11tracestringepns-15opkernelcontexteb)

2.3.0 で起こるエラーで 2.4.0 だと起こらないらしい。

なので 2.4.0 にバージョンを上げる。

プロジェクトには `pipenv` を使っているので。

```console
$ pipenv install -U tensorflow==2.4.0
$ pipenv run pip freeze | grep tensor
tensorboard==2.4.1
tensorboard-plugin-wit==1.8.0
tensorflow==2.4.0
tensorflow-estimator==2.4.0
tensorflow-hub==0.11.0
```

仮想環境下の tensorflow が 2.4.0 になった。

| Version          | Python version | Compiler  | Build tools | cuDNN | CUDA |
| ---------------- | -------------- | --------- | ----------- | ----- | ---- |
| tensorflow-2.4.0 | 3.6-3.8        | GCC 7.3.1 | Bazel 3.1.0 | 8.0   | 11.0 |

と[Build from source  |  TensorFlow](https://www.tensorflow.org/install/source#gpu_support_2)にあるのでそれぞれ対応したものを入れる。
もとのドライバ関連をすべて `# apt --purge remove` し、新しく入れる。
cuda については対応するページに記載されたコードをコピー&ペースト、cudnn についてはダウンロードした tbz ファイルの中身を `/usr/local/cuda` 内に入れる。
~~毎回 nvidia に登録しているような気がする~~

この状態で元のコードを叩くと相変わらずエラーが出た。

## 何が原因だったか

_仮想環境だけでなく、ホスト環境に入っている tensorflow も 2.4.0 に上げないとだめだった_

なんでかはよくわからないけどホストに 2.3.0 が残っているとエラーがでる。

元のコードは `pipenv run python -m ~~~` で実行しているので見てるのは仮想環境の Python のはず。

よくわからないけどとりあえず動いたのでヨシとする。
