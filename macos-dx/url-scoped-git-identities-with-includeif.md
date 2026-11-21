# Automatic Per-Remote Git Identity Switching with `includeIf` (`hasconfig`)

> Date: 2026-11-15

Instead of organizing repositories into separate parent directories just to switch `user.email`, Git 2.36+ supports matching directly against `remote.*.url` with `includeIf.hasconfig:remote.*.url`. As soon as a repo's `origin` points to a matching GitHub namespace, Git swaps author identity automatically.

```ini
# ~/.gitconfig
[user]
    name = Work Identity
    email = work@example.com

[includeIf "hasconfig:remote.*.url:https://github.com/zaynelovecraft/**"]
    path = ~/.gitconfig-personal

[includeIf "hasconfig:remote.*.url:git@github.com:zaynelovecraft/**"]
    path = ~/.gitconfig-personal
```

```ini
# ~/.gitconfig-personal
[user]
    name = Zayne Lovecraft
    email = 88962596+zaynelovecraft@users.noreply.github.com
```

### Verifying Before Commit

Run `git var GIT_AUTHOR_IDENT` inside any clone to verify the exact resolved name and email Git will bake into the next commit.
