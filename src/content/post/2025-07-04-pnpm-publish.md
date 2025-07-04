---
title: setup-pnpmでpnpm publishをしようとしたら手間取った話
date: 2025-07-04
topics: ["github-action", "pnpm"]
excerpt: ''
type: tech
---

あとから見返すとなんとないことだが詰ったのでメモを残す。

## TL;DR:

- `npm publish`をgithub actionからするには`.npmrc`の設定が必要
- setup-nodeが勝手にやるのでそれをつかうのがよい

## What happened

[@omochice/vite-plugin-inject-readme](https://github.com/Omochice/vite-plugin-inject-readme)を
github actionsでnpmにpublishしようとしたが、以下のエラーがでた。

workflowは以下のような感じ。

```yaml
  npm-publish:
    timeout-minutes: 10
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
        with:
          ref: main
          fetch-depth: 0
          persist-credentials: false
      - name: Install pnpm with pnpm install
        uses: pnpm/action-setup@a7487c7e89a18df4991f7f222e4898a00d66ddda # v4.1.0
      - run: pnpm install
      - run: pnpm publish --provenance --access=public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```


```console
$ pnpm publish --provenance --access=public

(略)
npm notice name: @omochice/vite-plugin-inject-readme
npm notice version: 1.0.2
npm notice filename: omochice-vite-plugin-inject-readme-1.0.2.tgz
npm notice package size: 2.9 kB
npm notice unpacked size: 8.7 kB
npm notice shasum: d95b0e1d3214939972b74be14a61525194455887
npm notice integrity: sha512-iGuzasv1ppQLW[...]zzRDNhZPk9JQw==
npm notice total files: 7
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
npm notice publish Signed provenance statement with source and build information from GitHub Actions
npm notice publish Provenance statement published to transparency log: https://search.sigstore.dev/?logIndex=259914618
npm error code E422
npm error 422 Unprocessable Entity - PUT https://registry.npmjs.org/@omochice%2fvite-plugin-inject-readme - Error verifying sigstore provenance bundle: Failed to validate repository information: package.json: "repository.url" is "", expected to match "https://github.com/Omochice/vite-plugin-inject-readme" from provenance
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2025-07-02T16_46_45_047Z-debug-0.log
```

## Why

<https://docs.github.com/en/actions/how-tos/use-cases-and-examples/publishing-packages/publishing-nodejs-packages>にだいたい書いてある。

> When a local .npmrc file exists and has a registry value specified, the npm publish command uses the registry configured in the .npmrc file. You can use the setup-node action to create a local .npmrc file on the runner that configures the default registry and scope. The setup-node action also accepts an authentication token as input, used to access private registries or publish node packages. For more information, see setup-node.

## How to fix

[`actions/setup-node`](https://github.com/actions/setup-node/)を使えばよい。

```yaml
  npm-publish:
    timeout-minutes: 10
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
        with:
          ref: main
          fetch-depth: 0
          persist-credentials: false
      - name: Install pnpm with pnpm install
        uses: pnpm/action-setup@a7487c7e89a18df4991f7f222e4898a00d66ddda # v4.1.0
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
        with:
          node-version: latest
          registry-url: https://registry.npmjs.org
          cache: pnpm
      - run: pnpm install
      - run: pnpm publish --provenance --access=public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
