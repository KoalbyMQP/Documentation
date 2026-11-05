---
title: Cortex API Reference
sidebar_label: Cortex API Reference
sidebar_position: 2
---

# Cortex API Reference

Cortex is the on-device HTTP control plane for ZaraOS. This page lists the endpoints it exposes.

### Health

#### `GET /health`
Returns server health status. No authentication required.

**Response `200`:**
```json
{ "status": "ok" }
```

---

### Authentication

#### `POST /auth/pair/start`
Start pairing a client. Cortex prints a 6-digit code to the server terminal and never returns it in the response. The code expires after 120 seconds. Starting a new pairing replaces any code that is still pending. **Public.**

**Response `200`:**
```json
{ "expires_in": 120 }
```

---

#### `POST /auth/pair/complete`
Finish pairing by sending the 6-digit code. The response contains a salt, which the client uses to derive its signing token. **Public.**

**Request:**
```json
{ "code": "123456", "label": "my-client" }
```

`label` is optional and defaults to `"Web Client"`.

**Response `200`:**
```json
{ "salt": "<hex>", "label": "my-client", "created_at": "<RFC3339>" }
```

**Response `400`:** `code` is missing.
**Response `401`:** The code is wrong or expired, or no pairing is pending.

---

#### `GET /auth/sessions`
List all paired sessions. `token_prefix` is the first 6 hex characters of the session's token, so it's safe to display. Sessions are kept in memory and are lost when Cortex restarts.

**Response `200`:**
```json
{
  "sessions": [
    { "token_prefix": "a1b2c3", "label": "my-client", "created_at": "<RFC3339>", "last_seen": "<RFC3339>" }
  ]
}
```

---

#### `POST /auth/revoke`
Revoke a session by its token prefix.

**Request:**
```json
{ "token_prefix": "a1b2c3" }
```

**Response `200`:**
```json
{ "revoked": true }
```

**Response `400`:** `token_prefix` is missing.
**Response `404`:** No session has that prefix.

---

### Identity

#### `GET /identity`
Get device identification information. Cortex doesn't read real hardware yet. Every field is a default set when Cortex starts, so the response always matches the example below. Only `location` can be changed (with `PUT /identity/location`), and it goes back to the default when Cortex restarts.

**Response `200`:**
```json
{
  "name": "robot-01",
  "serial": "RPi4-ABC123",
  "location": "warehouse-floor-3",
  "firmware_version": "0.4.2"
}
```

---

#### `PUT /identity/location`
Update the device's location.

**Request:**
```json
{ "location": "warehouse-floor-5" }
```

**Response `200`:**
```json
{ "location": "warehouse-floor-5" }
```

**Response `400`:** location missing or empty

---

#### `GET /ssh`
Get SSH connection details for the device. Cortex doesn't read the network configuration yet. `host`, `port`, `user`, and `hint` are hard-coded. Only `name` comes from the device identity.

**Response `200`:**
```json
{
  "host": "192.168.1.42",
  "port": 22,
  "user": "robot",
  "hint": "ssh robot@192.168.1.42",
  "name": "robot-01"
}
```

---

### Apps

Cortex builds its list of apps from GitHub releases. It reads the releases of each repository listed in `GITHUB_REPOS` and skips drafts. To get an app's name, it takes the release title, removes the version tag, lowercases the rest, and turns spaces and underscores into hyphens. For example, `Python Example v0.0.1` becomes `python-example`.

Release data is cached for 5 minutes, which you can change with `REGISTRY_CACHE_TTL`. If GitHub can't be reached, Cortex keeps serving the last list it cached.

#### `GET /apps`
List all available apps from the registry. `latest_version` is the most recently published release. It's `""` if the app has no releases.

**Response `200`:**
```json
{
  "apps": [
    { "name": "ros2-nav", "repo": "Core", "latest_version": "v1.2.3" }
  ]
}
```

---

#### `GET /apps/{name}/versions`
Get version history for a specific app. Versions are sorted by publish date, newest first. `changelog` is the body text of the release.

**Response `200`:**
```json
{
  "app": "ros2-nav",
  "versions": [
    { "version": "v1.2.3", "published_at": "<RFC3339>", "changelog": "Bug fixes" }
  ]
}
```

**Response `404`:** App not found.

---

### Images (Local Registry)

Endpoints for inspecting and managing container images stored locally on the device. The data comes straight from the container CLI (`docker` if it's installed, otherwise `nerdctl`). It shows what has been pulled or built on the device, not what is available upstream.

> Repository names contain slashes (e.g. `docker.io/koalbymqp/ros2-nav`). In URL path segments, **replace slashes with underscores**: `docker.io_koalbymqp_ros2-nav`. Cortex turns **every** underscore back into a slash, so these endpoints can't reach a repository whose name contains an underscore.

#### `GET /images`
List all locally available container images, grouped by repository. Untagged (`<none>`) images are left out.

**Response `200`:**
```json
{
  "images": [
    {
      "repository": "docker.io/koalbymqp/ros2-nav",
      "tags": ["v1.2.3", "latest"],
      "id": "sha256:abc123...",
      "size": "142.5 MiB",
      "created_at": "2025-06-15 09:30:00 +0000 UTC"
    }
  ]
}
```

**Response `500`:** The container CLI failed.

---

#### `GET /images/{name}/tags`
List all tags for a specific image repository. Use underscores in place of slashes in `{name}`.

**Example:** `GET /images/docker.io_koalbymqp_ros2-nav/tags`

**Response `200`:**
```json
{
  "repository": "docker.io/koalbymqp/ros2-nav",
  "tags": ["v1.2.3", "v1.2.2", "latest"]
}
```

**Response `404`:** No tags found for the image.
**Response `500`:** The container CLI failed.

---

#### `DELETE /images/{name}`
Remove a local image. Use underscores in place of slashes in `{name}`.

**Query Parameters:**
| Param | Default | Description |
|-------|---------|-------------|
| `tag` | — | Remove only this tag (e.g. `?tag=v1.2.2`). Omit to remove all tags. |
| `force` | `false` | Force removal even if containers reference the image (`?force=true`). |

**Example:** `DELETE /images/docker.io_koalbymqp_ros2-nav?tag=v1.2.2`

**Response `200`:**
```json
{
  "deleted": "docker.io/koalbymqp/ros2-nav:v1.2.2",
  "detail": "Untagged: docker.io/koalbymqp/ros2-nav:v1.2.2"
}
```

**Response `404`:** Image not found.
**Response `409`:** Removal failed for any reason other than a missing image. Usually this means a container is using the image (use `?force=true` to override).

---

### Instances

An instance is one run of an app's container. Its ID is `<app>-<version>-<unix seconds>`, and the container has the same name. An instance's state is one of `starting`, `running`, `stopping`, `stopped`, or `crashed`.

Every 10 seconds, Cortex checks each `running` instance against the container runtime. If the container has exited, Cortex marks the instance `stopped`. If the container no longer exists, it marks the instance `crashed`.

#### `GET /instances`
List every instance this Cortex process knows about, including stopped ones.

**Response `200`:**
```json
{
  "instances": [
    {
      "id": "ros2-nav-v1.2.3-1700000000",
      "app": "ros2-nav",
      "version": "v1.2.3",
      "image": "docker.io/koalbymqp/ros2-nav:v1.2.3",
      "state": "running",
      "error": "",
      "started_at": "<RFC3339>",
      "stopped_at": null
    }
  ]
}
```

---

#### `GET /instances/{id}`
Get detailed information for a specific instance. Includes `container_id` and `exit_code` beyond what the list endpoint returns. `exit_code` is `null` while the instance is running.

**Response `200`:** Full instance object.

**Response `404`:** Instance not found.

---

#### `POST /instances`
Start a new container instance.

**Request:**
```json
{
  "app": "ros2-nav",
  "version": "latest",
  "image": "",
  "privileged": false,
  "devices": ["/dev/ttyUSB0"],
  "volumes": ["/data/maps:/maps"],
  "env": { "LOG_LEVEL": "debug" }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `app` | Yes | App name |
| `version` | No | A version from the registry. If you leave it out or set it to `"latest"`, Cortex uses the newest version. |
| `image` | No | A full image reference to run directly. Cortex skips the registry, so `app` doesn't have to be in it, and `version` defaults to `dev`. |
| `privileged` | No | Run the container with `--privileged` |
| `devices` | No | Each entry is passed as `--device` |
| `volumes` | No | Each entry is passed as `-v` |
| `env` | No | Each pair is passed as `-e KEY=VALUE` |

If the app is a package in the requirements manifest, the package's `privileged`, `devices`, `volumes`, and `env` settings are applied first. The request's values are then merged on top of them:

- `devices` and `volumes` are added to the package's lists.
- `env` keys in the request replace the package's values.
- `privileged: true` turns on privileged mode. `false` doesn't turn it off.

**Response `201`:** Instance summary. Cortex starts the container with the container CLI before it responds, so the response shows the final state: `"running"` on success or `"crashed"` on failure. A container that fails to start still returns `201`, so check `state` and `error`.

**Response `400`:** Missing `app` field.
**Response `404`:** App or version not found (only when `image` isn't set).
**Response `409`:** An instance of this app is already `starting` or `running`.

---

#### `DELETE /instances/{id}`
Stop a running container instance. Cortex stops the container and then removes it.

**Response `200`:**
```json
{ "id": "ros2-nav-v1.2.3-1700000000", "state": "stopped" }
```

**Response `404`:** Instance not found.

---

#### `POST /instances/{id}/restart`
Restart an instance. Cortex stops the old instance and starts a new one with the same image and version. The new instance has a new ID, so use `new_id` for later requests.

The new container gets the package's run options from the requirements manifest. Options passed in the original `POST /instances` request (`privileged`, `devices`, `volumes`, `env`) are not reused.

**Response `201`:** Cortex starts the new container before it responds, so `state` is `"running"` on success or `"crashed"` on failure.
```json
{
  "old_id": "ros2-nav-v1.2.3-1700000000",
  "new_id": "ros2-nav-v1.2.3-1700000300",
  "app": "ros2-nav",
  "version": "v1.2.3",
  "state": "running",
  "started_at": "<RFC3339>"
}
```

**Response `404`:** Instance not found.

---

#### `POST /instances/{id}/update`
Update an instance to the latest version in the registry. Cortex stops the old instance and starts a new one, which has a new ID. Like restart, the new container uses the package's run options from the requirements manifest, not options passed in the original `POST /instances` request.

**Response `201`:** The instance was updated. `state` is `"running"` on success or `"crashed"` on failure.
```json
{
  "old_id": "ros2-nav-v1.2.2-1700000000",
  "old_version": "v1.2.2",
  "new_id": "ros2-nav-v1.2.3-1700000300",
  "new_version": "v1.2.3",
  "state": "running",
  "started_at": "<RFC3339>"
}
```

**Response `200`:** The instance is already on the latest version. Nothing changes.
```json
{ "message": "already running latest version v1.2.3" }
```

**Response `404`:** Instance not found, or the app has no versions in the registry.

---

#### `GET /instances/{id}/logs`
Fetch container logs. Supports one-shot and streaming modes.

**Query Parameters:**
| Param | Default | Description |
|-------|---------|-------------|
| `tail` | `100` | Number of log lines to return. Still applies when `since` is set. |
| `stream` | `false` | Set to `true` for Server-Sent Events streaming |
| `since` | — | RFC3339 timestamp; only return logs after this time |

**Response `200` (non-streaming):** Plain text log output.

**Response `200` (streaming):** SSE stream with structured events. Stays open until the client disconnects or the container exits.

**SSE Event Types:**

**`log`** — a container log line:
```
id: 42
event: log
data: {"ts":"2026-04-12T14:30:05.123Z","seq":42,"stream":"stdout","content":"Navigation started"}
```
| Field | Type | Description |
|-------|------|-------------|
| `ts` | string (RFC3339Nano) | Timestamp from the container runtime |
| `seq` | int | Sequence number. Starts at 1 and counts up on each connection. |
| `stream` | string | `"stdout"` or `"stderr"` |
| `content` | string | The log line text |

**`heartbeat`** — keep-alive sent every 15 seconds:
```
event: heartbeat
data: {"ts":"2026-04-12T14:30:15.000Z"}
```

**`error`** — always the last event. Sent when the stream ends or when the log process can't be started:
```
event: error
data: {"ts":"2026-04-12T14:30:20.000Z","message":"stream ended"}
```

**Reconnection:** Store the `ts` from the last received `log` event. On reconnect, pass `?since=<ts>&stream=true` to resume from where you left off.

:::caution
Don't depend on the `Last-Event-ID` header to reconnect. Cortex reads it as a `since` value, but the SSE `id` it sends is the `seq` number, not a timestamp. A browser `EventSource` that reconnects on its own sends that number, so the stream won't pick up in the right place. Pass `since` yourself instead.
:::

**Response `404`:** Instance not found.
**Response `500`:** Fetching the logs failed (non-streaming only).

---

#### `GET /instances/{id}/health`
Health check for a specific instance. Asks the container CLI whether the instance's container is running.

**Response `200`:** Always returned for an instance that exists, so check `healthy` for the result.
```json
{
  "id": "ros2-nav-v1.2.3-1700000000",
  "healthy": true,
  "last_checked": "<RFC3339>",
  "output": "OK"
}
```

When `healthy` is `false`, `output` gives the reason. It's the container CLI's error if the check failed, or otherwise a message like `instance is stopped`.

**Response `404`:** Instance not found.

---

#### `GET /instances/{id}/metrics`
Get CPU, memory, and uptime metrics for an instance, read with the container CLI's `stats` command.

**Response `200`:**
```json
{
  "id": "ros2-nav-v1.2.3-1700000000",
  "cpu_percent": 0.42,
  "memory_mb": 84.5,
  "uptime_seconds": 3600
}
```

`uptime_seconds` is `0` once the instance has stopped. If the `stats` command fails, the response is still `200`, but it has an `error` field in place of `cpu_percent` and `memory_mb`:
```json
{ "id": "ros2-nav-v1.2.3-1700000000", "uptime_seconds": 0, "error": "<CLI error>" }
```

**Response `404`:** Instance not found.

---

### Diagnostics

> Diagnostic tests currently return seeded/mock results — not yet running real hardware checks.

#### `GET /diagnostics`
Run all diagnostic tests and return aggregated results.

**Response `200`:**
```json
{
  "ran_at": "<RFC3339>",
  "passed": 3,
  "failed": 1,
  "results": [
    { "name": "lidar-ping", "passed": true, "output": "LIDAR responding at 10Hz", "duration_ms": 320, "ran_at": "<RFC3339>" },
    { "name": "camera-check", "passed": false, "output": "No device found at /dev/video0", "duration_ms": 50, "ran_at": "<RFC3339>" }
  ]
}
```

**Built-in tests:**
| Test | Description | Duration |
|------|-------------|----------|
| `lidar-ping` | LIDAR sensor responsiveness | ~320ms |
| `camera-check` | Camera device detection | ~50ms |
| `network-reachability` | Gateway connectivity | ~80ms |
| `disk-space` | Disk usage check | ~10ms |

---

#### `GET /diagnostics/history`
Get historical diagnostic run summaries. Currently returns generated mock data (max 5 entries) — not yet persisting real run history.

**Query Parameters:**
| Param | Default | Description |
|-------|---------|-------------|
| `limit` | `20` | Max number of history entries (capped at 5 with mock data) |

**Response `200`:**
```json
{
  "history": [
    { "ran_at": "<RFC3339>", "passed": 4, "failed": 0 }
  ]
}
```

---

#### `GET /diagnostics/{test}`
Get the last result for a specific diagnostic test.

**Response `200`:**
```json
{ "name": "lidar-ping", "passed": true, "output": "LIDAR responding at 10Hz", "duration_ms": 320, "ran_at": "<RFC3339>" }
```

**Response `404`:** Test not found.

---

#### `POST /diagnostics/{test}/run`
Run a specific diagnostic test on demand.

**Response `200`:**
```json
{ "name": "lidar-ping", "passed": true, "output": "LIDAR responding at 10Hz", "duration_ms": 320, "ran_at": "<RFC3339>" }
```

**Response `404`:** Test not found.

---

### ROS Integration

> ROS endpoints currently return mock/seeded data.

#### `GET /ros/nodes`
List active ROS 2 nodes.

**Response `200`:**
```json
{
  "nodes": [
    { "name": "/navigation", "namespace": "/", "status": "active" }
  ]
}
```

---

#### `GET /ros/topics`
List ROS 2 topics with type and subscriber info.

**Response `200`:**
```json
{
  "topics": [
    { "name": "/cmd_vel", "type": "geometry_msgs/msg/Twist", "publishers": 1, "subscribers": 2 }
  ]
}
```

---

#### `GET /ros/topic/{name}/echo`
Echo recent messages from a ROS topic. Use underscores in place of slashes for nested topic names.

**Response `200`:**
```json
{ "topic": "/cmd_vel", "type": "geometry_msgs/msg/Twist", "messages": [] }
```

---

#### `GET /ros/services`
List available ROS 2 services.

**Response `200`:**
```json
{
  "services": [
    { "name": "/navigation/reset", "type": "std_srvs/srv/Trigger" }
  ]
}
```

---

#### `GET /ros/graph`
Get the ROS node-topic graph showing connections between nodes.

**Response `200`:**
```json
{
  "nodes": ["..."],
  "edges": [
    { "from": "/lidar_driver", "to": "/navigation", "topic": "/scan" }
  ]
}
```

---

### Events

#### `GET /events`
Query the event log with optional filtering. Events are retained in-memory (last 500).

**Query Parameters:**
| Param | Default | Description |
|-------|---------|-------------|
| `since` | — | RFC3339 timestamp; return events after this time |
| `type` | — | Filter by event type |
| `limit` | `50` | Max events to return |

**Response `200`:**
```json
{
  "events": [
    { "id": "evt_0001", "type": "instance_started", "timestamp": "<RFC3339>", "data": { "app": "ros2-nav" } }
  ]
}
```

**Event types:** `auth_paired`, `auth_revoked`, `instance_started`, `instance_start_failed`, `instance_stopped`, `image_deleted`, `diagnostic_run`

---

### Shell (WebSocket)

#### `POST /shell/ticket`
Issue a one-time ticket for WebSocket shell access. Ticket expires after 30 seconds.

**Response `200`:**
```json
{ "ticket": "<base64-token>", "expires_in": 30 }
```

---

#### `GET /shell?ticket=<ticket>`
Upgrade to a WebSocket connection for an interactive shell session. **Public** (authenticated via ticket). Spawns `/bin/sh` with a full PTY.

**WebSocket Protocol:**
- **Binary frames (server → client):** PTY output
- **Binary frames (client → server):** Keyboard input (written to PTY)
- **Text frames (client → server):** Control messages only — `{"type": "resize", "cols": 120, "rows": 40}`

Connection stays open until the client disconnects or the shell process exits.

---

## Data Models

### Instance
```
id             string    — Unique ID (app-version-timestamp)
app            string    — App name
version        string    — Semantic version
image          string    — Full container image reference
container_id   string    — nerdctl container name
state          string    — starting | running | stopping | stopped | crashed
error          string    — Failure message (if any)
started_at     time      — When the instance was created
stopped_at     time?     — When the instance was stopped
pid            int?      — OS process ID
exit_code      int?      — Process exit code
```

### Event
```
id             string           — Sequential event ID (evt_XXXX)
type           string           — Event type name
timestamp      time             — When the event occurred
data           map[string]any   — Arbitrary event payload
```

### DiagResult
```
name           string    — Test name
passed         bool      — Whether the test passed
output         string    — Human-readable output
duration_ms    int       — Execution time in milliseconds
ran_at         time      — When the test was run
```

### Identity
```
name              string — Device name
serial            string — Hardware serial number
location          string — Physical location
firmware_version  string — Current firmware version
```

### LocalImage
```
repository     string     — Image repository name (e.g. docker.io/koalbymqp/ros2-nav)
tags           []string   — All tags present locally
id             string     — Image digest / ID
size           string     — Human-readable image size
created_at     string     — When the image was created
```

### App (Registry)
```
name           string    — App name
repo           string    — Source GitHub repository
versions       []Version — Version history (newest first)
```

### Version
```
version        string — Semantic version tag
published_at   time   — Release date
changelog      string — Release notes
```

---



