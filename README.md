callrail_eks
============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/callrail_eks.svg)](https://npmjs.org/package/callrail_eks)
[![Downloads/week](https://img.shields.io/npm/dw/callrail_eks.svg)](https://npmjs.org/package/callrail_eks)
[![License](https://img.shields.io/npm/l/callrail_eks.svg)](https://github.com/jbuoni/callrail_eks/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g callrail_eks
$ callrail_eks COMMAND
running command...
$ callrail_eks (-v|--version|version)
callrail_eks/1.0.0 darwin-x64 node-v14.4.0
$ callrail_eks --help [COMMAND]
USAGE
  $ callrail_eks COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`callrail_eks config-location [CONFIG]`](#callrail_eks-config-location-config)
* [`callrail_eks delete`](#callrail_eks-delete)
* [`callrail_eks domain [DOMAIN]`](#callrail_eks-domain-domain)
* [`callrail_eks help [COMMAND]`](#callrail_eks-help-command)
* [`callrail_eks install`](#callrail_eks-install)
* [`callrail_eks namespace [NAMESPACE]`](#callrail_eks-namespace-namespace)
* [`callrail_eks setup [GITHUBNAME] [NAMESPACE]`](#callrail_eks-setup-githubname-namespace)
* [`callrail_eks template`](#callrail_eks-template)
* [`callrail_eks token`](#callrail_eks-token)
* [`callrail_eks update`](#callrail_eks-update)
* [`callrail_eks upgrade`](#callrail_eks-upgrade)

## `callrail_eks config-location [CONFIG]`

Sets location of eks yaml config

```
USAGE
  $ callrail_eks config-location [CONFIG]

ARGUMENTS
  CONFIG  Kubernetes configuration

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $callrail_eks config-location my-config
```

_See code: [src/commands/config-location.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/config-location.ts)_

## `callrail_eks delete`

Deletes the stack along with the stateful sets associated with it

```
USAGE
  $ callrail_eks delete

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace

EXAMPLE
  $callrail_eks delete
```

_See code: [src/commands/delete.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/delete.ts)_

## `callrail_eks domain [DOMAIN]`

Sets current domain

```
USAGE
  $ callrail_eks domain [DOMAIN]

ARGUMENTS
  DOMAIN  Domain associated with the eks environment. Just include the base, as the rest will be appended

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $callrail_eks domain my-domain
```

_See code: [src/commands/domain.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/domain.ts)_

## `callrail_eks help [COMMAND]`

display help for callrail_eks

```
USAGE
  $ callrail_eks help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `callrail_eks install`

Installs the callrails eks environment.

```
USAGE
  $ callrail_eks install

OPTIONS
  -b, --branch=branch        [default: master]
  -c, --config=config
  -h, --help                 show CLI help
  -n, --namespace=namespace
  -s, --stack=stack          [default: callrail/stack]

EXAMPLES
  $ callrail_eks install
  $ callrail_eks install -b my-branch
  $ callrail_eks install -s callrail/stack
  $ callrail_eks install -n my-namespace
  $ callrail_eks install -c "~/my-custom-yaml.yml"
```

_See code: [src/commands/install.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/install.ts)_

## `callrail_eks namespace [NAMESPACE]`

Sets current namespace

```
USAGE
  $ callrail_eks namespace [NAMESPACE]

ARGUMENTS
  NAMESPACE  Namespace to use when talking to Kubernetes

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $callrail_eks namespace my-namespace
```

_See code: [src/commands/namespace.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/namespace.ts)_

## `callrail_eks setup [GITHUBNAME] [NAMESPACE]`

Installs needed packages to run EKS

```
USAGE
  $ callrail_eks setup [GITHUBNAME] [NAMESPACE]

ARGUMENTS
  GITHUBNAME  Github user name
  NAMESPACE   Namespace to use when talking to Kubernetes

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $callrail_eks setup my-github-username
```

_See code: [src/commands/setup.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/setup.ts)_

## `callrail_eks template`

Generate EKS Yaml template

```
USAGE
  $ callrail_eks template

OPTIONS
  -b, --branch=branch  [default: master]
  -d, --domain=domain
  -h, --help           show CLI help

EXAMPLES
  $callrail_eks template
  $callrail_eks template -d my-domain
  $callrail_eks template -b my-branch
  $callrail_eks template -d my-domain -b my-branch
```

_See code: [src/commands/template.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/template.ts)_

## `callrail_eks token`

Prints token needed to log into Kubernetes console

```
USAGE
  $ callrail_eks token

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $callrail_eks token
```

_See code: [src/commands/token.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/token.ts)_

## `callrail_eks update`

Updates the callrails eks environment. By default, the whole stack will be updated

```
USAGE
  $ callrail_eks update

OPTIONS
  -b, --branch=branch        [default: master]
  -c, --config=config
  -h, --help                 show CLI help
  -n, --namespace=namespace
  -s, --stack=stack          [default: callrail/stack]

EXAMPLES
  $ callrail_eks update
  $ callrail_eks update -b my-branch
  $ callrail_eks update -s callrail/stack
  $ callrail_eks update -n my-namespace
  $ callrail_eks update -c "~/my-custom-yaml.yml"
```

_See code: [src/commands/update.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/update.ts)_

## `callrail_eks upgrade`

Updates helm repo

```
USAGE
  $ callrail_eks upgrade

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $callrail_eks upgrade
```

_See code: [src/commands/upgrade.ts](https://github.com/jbuoni/callrail_eks/blob/v1.0.0/src/commands/upgrade.ts)_
<!-- commandsstop -->
