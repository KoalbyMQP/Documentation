---
title: Startup Process
sidebar_label: Startup Process
sidebar_position: 2
---

# Startup Process

#todo References:
- Sec 9.2 & 9.3 in Software Engineering report from last year


Boot init scripts:
- `S01-mounts`: mounts data partition
    - On first boot: expand to fill available storage on SD card
- `S02-first-boot`: runs WiFi setup and assigns hostname
- `S30-dbus`: starts D-Bus daemon for peripheral discovery
- `S40-bluetooth`: starts [BlueZ](https://www.bluez.org/) for wireless gamepad controllers
- `S50-node-exporter`: starts [Prometheus](https://grafana.com/docs/grafana/latest/fundamentals/intro-to-prometheus/) node exporter to make hardware metrics available
- `S60-cortex`: starts framebuffer setup wizard to reserve space for `nerdctl` image


