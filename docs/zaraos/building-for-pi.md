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
The first build will take anywhere from 5 to 15 minutes depending on your CPU.
Rebuilds will be much faster, aroudn 2 to 3 minutes.

```bash
cd ZaraOS/
nix develop
```

**What this does:**
1. Downloads the Raspberry Pi Linux kernel (stable_20250916)
2. Applies Pi 5 configuration (`bcm2712_defconfig` + `linux-pi5.fragment`)
3. Compiles kernel, modules, and copies device trees
4. Creates a deployment-ready archive

### Build Options

```bash
# Use 8 parallel jobs (faster on multi-core)
./ZaraOS/scripts/build-kernel-local.sh -j 8

# Interactive kernel configuration (menuconfig)
./ZaraOS/scripts/build-kernel-local.sh --menuconfig

# Clean all previous builds
./ZaraOS/scripts/build-kernel-local.sh --clean

# QEMU build with menuconfig
./ZaraOS/scripts/build-kernel-local.sh --qemu --menuconfig -j 8
```

### Output Files
```
kernel-build/output/
├── Image                       # Kernel image (copy to Pi /boot/)
├── dtb/                        # Device tree files
├── modules/                    # Compiled kernel modules
└── zaraos-kernel-*.tar.gz      # Ready-to-deploy archive
```

## Deploying to a Raspberry Pi 5

### Method 1: Workflow Script (Recommended)
```bash
./kernel-workflow.sh deploy
```

This will automatically transfer the kernel archive over ssh and installs it.

### Method 2: Manual SSH Transfer

**On your build machine:**
```bash
cd ZaraOS/scripts
./build-kernel-local.sh
scp ../kernel-build/output/zaraos-kernel-*.tar.gz pi@zaraos:/tmp/
```

**On the Raspberry Pi 5:**
```bash
ssh pi@zaraos

# Extract and baskup current kernel
cd /tmp
tar xzf zaraos-kernel-*tar.gz
sudo cp /boot/Image /boot/Image.backup

# Install new kernel
sudo cp Image /boot/
sudo cp dtb/* /boot/overlays/

# Install modules
sudo cp -r modules/lib/modules/* /lib/modules/
sudo depmod -a

# Reboot
sudo reboot
```

### Method 3: SD Card Modification

1. Build kernel on your machine following compilation instructions
2. Mount Pi's SD card on build machine
3. Copy files to boot partition:
   ```bash
   sudo cp Image /Volumes/boot/
   sudo cp dtb/*.dtb /Volumes/boot/overlays/
   ```
### Verifying Installation

After reboot:
```bash
ssh pi@zaraos
uname -a         # check kernel version
lsmod            # check modules loaded
dmesg | head -30 # watch boot log for errors
```

## Kernel Configuration

### Pi 5 Fragment (`kernel-fragments/linux-pi5.fragment`)
- 16K page size (Pi 5 optimization)
- GPU: VC4/V3D DRM drivers
- WiFi: Broadcom brcmfmac
- I/O: GPIO, I2C, SPI, PWM, USB serial
- Container support (namespaces, cgroups, overlay FS, seccomp)

### Customizing Configuration

```bash
# Launch menuconfig before building
./build-kernel-local.sh --menuconfig

# Your config is saved to output/kernel-config-<timestamp>
```
## Further Reading

- [Buildroot Manual](https://buildroot.org/downloads/manual/manual.html)
- [Raspberry Pi Kernel Build](https://www.raspberrypi.com/documentation/computers/linux_kernel.html)
- [QEMU ARM Emulation](https://wiki.qemu.org/Documentation/Platforms/ARM)
- [Linux Kernel Configuration](https://www.kernel.org/doc/html/latest/admin-guide/index.html)

#todo check `ZaraOS/ZaraOS/KERNEL_BUILD.md`

#todo future sections
- Instructions for how to load onto the pi
- Getting the pi connected to the Wi-Fi

