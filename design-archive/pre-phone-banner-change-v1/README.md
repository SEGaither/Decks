# Pre-Phone Banner Change v1

**Archive name:** Pre-Phone Banner Change v1
**Archive purpose:** Preserve the current production files before widening the top banner and enabling direct phone contact with Shane Gaither via a tel: link displayed in the site header.

**Date created:** 2026-07-24
**Branch:** main
**Commit hash:** fba5a4df0504b3399989ef2a02ca919fa8972e0b
**Production URL:** https://daychangerdecks.com

## Exact files archived

| File | Repository-relative path |
|------|--------------------------|
| page.tsx | app/page.tsx |
| globals.css | app/globals.css |

## Rollback statement

This archive is the rollback source if the user rejects the banner change. To restore production state, replace the current `app/page.tsx` and `app/globals.css` with the copies in `source-snapshot/app/`, then commit and redeploy. Alternatively, use `git revert` or `git checkout fba5a4d -- app/page.tsx app/globals.css` to restore from Git history.

## Reference statement

The files in this archive are reference material and not active application code. They represent the exact state of the application at commit fba5a4d immediately before any phone-banner changes were applied.
