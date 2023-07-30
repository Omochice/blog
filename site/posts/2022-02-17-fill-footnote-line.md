---
layout: zenn.tsx
title: "latexの二段組脚注の罫線を伸ばす"
topics: ["latex"]
excerpt: ""
type: tech
---

latex で二段組をしたときの脚注の罫線を横に伸ばしたかったのでやったことをメモする。

普通に `\footnote` を書くと次のようになる。

```latex
\documentclass[twocolumn,paper=a4paper,landscape]{jlreq}

\begin{document}

テキスト\footnote{footnote}

\hrulefill

\end{document}
```

![normal-footnote](https://i.gyazo.com/8049505c6e361d5079ad9b0d66c221a9.png)

雑に `\linewidth` の長さにしようとすると次のようになる。

```latex
\documentclass[twocolumn,paper=a4paper,landscape]{jlreq}

\renewcommand{\footnoterule}{\hrule width \linewidth}

\begin{document}

テキスト\footnote{footnote}

\hrulefill

\end{document}
```

![linewidth-footnote](https://i.gyazo.com/7e948ee33298cd83ee082dfa18afdda4.png)

これだと若干右が足りない。
かつ、文字と罫線が詰まってしまう。

いい感じに修正すると次のようになる。

```latex
\documentclass[twocolumn,paper=a4paper,landscape]{jlreq}

\renewcommand{\footnoterule}{\hrule\vspace{0.3em}}

\begin{document}

テキスト\footnote{footnote}

\hrulefill

\end{document}
```

![iikanji-footnote](https://i.gyazo.com/8f560757f189a354c0cf48c3929bb8a1.png)

`\hrule` はその環境の横幅にデフォルト値が設定されるようだ。[https://tex.stackexchange.com/questions/269885/what-is-the-default-length-of-hrule]。

