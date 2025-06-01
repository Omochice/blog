---
title: GitHubのRepositoryの設定をOpenTofuで管理してみようとした
date: 2025-06-01
topics: ["tofu"]
excerpt: ''
type: tech
---

Repositoryの設定とかを手でポチポチするのが大変なので調べたメモ。

OpenTofuを使うのはただの逆張りである。

そもそもTerraform分からんの人なので、Tofuからでいいという気持ちもある。

```terraform
terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "github" {
  owner = "Omochice"
}

resource "github_repository" "here" {
  name                   = "ddu-source-gitlab"
  description            = "GitLab source for ddu.vim"
  visibility             = "public"
  allow_merge_commit     = false
  allow_squash_merge     = true
  allow_rebase_merge     = false
  delete_branch_on_merge = true
}
```

だめっぽい。

```console
$ nix run nixpkgs#opentofu apply

github_repository.here: Creating...
╷
│ Error: POST https://api.github.com/user/repos: 422 Repository creation failed. [{Resource:Repository Field:name Code:custom Message:name already exists on this account}]
│
│   with github_repository.here,
│   on main.tf line 16, in resource "github_repository" "here":
│   16: resource "github_repository" "here" {
│
╵
```

`import`しないとだめらしい。

https://registry.terraform.io/providers/integrations/github/latest/docs/resources/organization_security_manager#import

```console
$ nix run nixpkgs#opentofu import github_repository.here ddu-source-gitlab
```

これでplanしたときに差分がちゃんとでるようになった。

## rulesetを定義したい

ここがメインの目的。

複数のrepositoryに一々設定するのが面倒なのでなんとかしたい。

以下のように書けば実現できそう


```terraform
resource "github_repository_ruleset" "sample" {
  name        = "sample"
  repository  = github_repository.here.name
  target      = "branch"
  enforcement = "active"
  conditions {
    ref_name {
      include = ["~DEFAULT_BRANCH"]
      exclude = []
    }
  }
  rules {
    deletion = true
    non_fast_forward = true
    pull_request {
      # require_copilot_review = true
      # allowed_methods = ["squash"]
    }
    required_status_checks {
      required_check {
        context = "status-check"
      }
    }
  }
}
```

手で作っているときは以下を有効にしているが、Tofu(Terraform)経由だと現状できないようだ。

- Require a pull request before merging > Request pull request review from Copilot
- Require a pull request before merging > Allowed merge methods
    - これはrepoでsquashのみにしているからもしかすると不要?

ref:

- https://github.com/integrations/terraform-provider-github/issues/2583
- https://github.com/integrations/terraform-provider-github/issues/2624

結局手でやる部分があるなら移行する意義は薄そう。
