# Tracing Zombie Listening TCP Ports on macOS Back to Repo CWDs & `launchd`

> Date: 2026-11-02

Running `kill -9 $(lsof -ti :3000)` blindly kills background services managed by `launchd` (which immediately respawn on a new PID) or kills the wrong local dev server. Inspecting the process's `cwd` via `lsof -a -d cwd` and checking `launchctl procinfo` tells you *which* repo owns the port first.

```bash
port_owner() {
  local port="${1:?Usage: port_owner <port>}"
  local pid
  pid="$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t | head -n 1)"
  [ -z "$pid" ] && { echo "Nothing listening on :$port"; return 0; }

  local cwd cmd
  cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
  cmd="$(ps -p "$pid" -o command=)"

  printf "PID:  %s\nCWD:  %s\nCMD:  %s\n" "$pid" "${cwd:-unknown}" "$cmd"
}
```
