---
title: Building for Raspberry Pi 5
sidebar_label: Building for Pi 5
sidebar_position: 4
---

# Building for Raspberry Pi

:::warning
Building ZaraOS from source can take upwards of 30 minutes the first time you do it. Plan
accordingly
:::

## Prerequisites

Install the following dependencies:
- [Nix package manager](https://nixos.org/download/)
    - Note: you can also use [nix determinate](https://determinate.systems/install/)


The nix development shell in `flake.nix` contains all the dependencies needed to build
ZaraOS. Enter the dev shell by running the following command from the same directory
containing `flake.nix`:

```sh
nix develop
```

## Compiling

#todo check `ZaraOS/ZaraOS/KERNEL_BUILD.md`


#todo future sections
- Instructions for how to load onto the pi
- Getting the pi connected to the Wi-Fi

