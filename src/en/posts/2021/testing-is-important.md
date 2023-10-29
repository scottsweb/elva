---
title: Testing is Important!
description: That is, unless you like redoing work
date: 2021-07-27
tags:
  - development
  - testing
  - backups
  - Roam
  - editors
  - Atom
layout: post.njk
---

# Test, Test Again, and Test a Bit More

One thing I've learned over many years of writing, coding, and working with anything digital - __always__ have a backup plan. Make a copy, even if you think it's "just a small change" or "gonna test out something" and you'll be done in a few minutes.

As a follow-up to [Digging Out of an Issue](/notes/2018/03/digging-out-of-an-issue/), I was working with backups from [Roam Research](https://roamresearch.com/) and needed to reformat the files so I could `diff` them better (default file is all on one line). Easy enough to undo if there's an issue, right? WRONG.

Most of the time, undo is great when you're working with one file in an editor. When you batch edit, you tend to overwrite the files when you make the changes. Luckily I was ready - I ran the changes I needed, and just as it worked through the last of the files, [Atom](https://atom.io) crashed.

Where did that leave me? I had to copy a few files over to the folder I was working in, and back to normal and ready to test again.

Quick lesson to deal with batch file work and backups.
