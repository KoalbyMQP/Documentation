---
title: Building for QEMU VM
sidebar_label: Building for QEMU VM
sidebar_position: 3
---

# Building for QEMU VM

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

Once you are en the nix dev shell, run the following command to start the compilation
process:

```sh
./ZaraOS/scripts/build-qemu-devenv.sh
```

This script builds the development version of ZaraOS to `../kernel-build/output/` (i.e.,
in a directory outside the ZaraOS repo).

## Starting the virtual machine

While still in the nix dev shell, go to the `../kernel-build/output/` build output
directory, then run the following command to start a ZaraOS virtual machine:

```sh
./run-devenv.sh
```

You should see output resembling the following as the virtual machine boots up:

```
Starting in terminal mode (use --gui for graphical window)...

══════════════════════════════════════════════════════════
  ZaraOS QEMU Dev Environment
══════════════════════════════════════════════════════════
  SSH:     ssh -p 2222 root@localhost (password: zaraos)
  Cortex:  curl http://localhost:8080/health
  Exit:    Ctrl+A X  (or 'poweroff' in VM)
══════════════════════════════════════════════════════════


$$$$$$$$\                              $$$$$$\   $$$$$$\
\____$$  |                            $$  __$$\ $$  __$$\
    $$  / $$$$$$\   $$$$$$\  $$$$$$\  $$ /  $$ |$$ /  \__|
   $$  /  \____$$\ $$  __$$\ \____$$\ $$ |  $$ |\$$$$$$\
  $$  /   $$$$$$$ |$$ |  \__|$$$$$$$ |$$ |  $$ | \____$$\
 $$  /   $$  __$$ |$$ |     $$  __$$ |$$ |  $$ |$$\   $$ |
$$$$$$$$\\$$$$$$$ |$$ |     \$$$$$$$ | $$$$$$  |\$$$$$$  |
\________|\_______|\__|      \_______| \______/  \______/

  QEMU Development Environment

... (startup scripts)

  ╔══════════════════════════════════════════════════════╗
  ║        ZaraOS QEMU Dev Environment Ready             ║
  ╚══════════════════════════════════════════════════════╝

  Kernel:    6.12.47-g359f37f0faef-dirty
  Hostname:  zaraos
  Arch:      aarch64

  Services:
    ✓ containerd
    ✓ cortex (port 8080)
    ✓ SSH (port 22 → host:2222)

  From host machine:
    ssh -p 2222 root@localhost
    curl http://localhost:8080/health
    nerdctl ps

  Host share: /mnt/host
  Data disk:  /data

  Exit: poweroff  (or Ctrl+A then X)
```

After the boot process finishes, you should see the following prompt:

```
zaraos:/#
```



