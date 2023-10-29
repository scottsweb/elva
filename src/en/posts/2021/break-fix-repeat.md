---
title: Break. Fix. Repeat.
description: I'll learn it someday, really
date: 2021-08-20
tags:
  - Netlify
  - testing
layout: post.njk
---

# It Happened. Again.

Once of the ways I feel like I learn best is by fixing things. Whether it's code or writing or a process or a wonky light switch, starting from __working__ doesn't help as much as getting it to working.

That doesn't always mean that it's the way I should do it. Take for instance, this site. I've gone through a lot of iterations {link to About here} in the past 18+ years and gone through quite a few issues - and learned a ton from them.

This latest setup is my second SSG connected to Git*b (GitHub or GitLab), first time out using eleventy, and very newly testing out Fomantic-UI (a fork of the seemingly-forgotten Semantic-UI) to help me with my poor frontend design skills.

# The Breakening

If you read through [Digging Out of an Issue](/notes/03/digging-out-of-an-issue) you'll see where I dropped the ball with release version management. I hoped I had learned my lesson and would avoid issues like that in the future.

This time, I thought I had things ready to roll. I updated and tested locally, no problems and the `eleventy --serve` worked great. Files generated and the pages loaded, so I pushed the changes and let Netlify do its thing. Wait a few minutes, hit refresh, and... shit. Please, not again. I pinned versions, tested it - why did it fail?
