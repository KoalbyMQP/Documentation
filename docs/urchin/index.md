---
title: Urchin Framework Overview
sidebar_label: Urchin Framework Overview
sidebar_position: 1
---

# Urchin Framework Overview

The **Urchin Framework** is a motor control software system used by the humanoid team to achieve simple and safe motor control. It is cross-language and cross-platform, and provides communication between high-level applications and low-level hardware actuation.

## [Repository Link](https://github.com/KoalbyMQP/Urchin-Framework)

## The three major components

- ### [Coral](./coral.md)
- ### [Crab API](./crab-api/index.md)
- ### [Firmware](./firmware.md)

## Where it fits in the big picture

**Urchin** connects to both the Driver Station and ZaraOS to form the full system. The Driver Station starts a motor control app on the robot, and Crab API logs travel from the firmware through ZaraOS back to the Driver Station.

```text
┌─────────────────┐   Bluetooth / WiFi   ┌──────────────────────────────┐
│  Driver Station │ ───────────────────▶ │ Raspberry Pi (ZaraOS)        │
│  (web app)      │ ◀─────────────────── │   Cortex → launches app      │
└─────────────────┘      logs / status   │   └─ Crab API (Python)       │
                                         └──────────────┬───────────────┘
                                                        │ USB serial, 115200 baud
                                                        │ 1028-byte packets
                                                        ▼
                                         ┌──────────────────────────────┐
                                         │ ESP32 — Urchin firmware      │
                                         │   bridge.toml limits check   │
                                         └──────────────┬───────────────┘
                                                        │ TTL UART bus
                                                        ▼
                                         ┌──────────────────────────────┐
                                         │ HerkuleX servos              │
                                         │ (Shoulder #7, Hip #8, ...)   │
                                         └──────────────────────────────┘
```
