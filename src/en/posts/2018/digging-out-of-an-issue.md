---
title: Digging Out of an Issue
tags:
  - Git
  - GitLab
  - Hexo
  - WebDev
date: 2018-03-02 15:24:01
---


## Save, and Save Often

Now that I've been using [Hexo](https://hexo.io/) for about nine months I feel like I'm starting to get the hang of it. Since I don't post often it's pretty easy to manage the content without needing something heavier (or DB-backed) to keep track of everything.

Luckily I'm also running this on [GitLab](https://gitlab.com/) and have been committing and pushing updates regularly. Everything had been running smoothly... up until March 1st. I thought I might be a little out-of-date with some of the packages I'm using in [npm](https://www.npmjs.com/) so I ran `npm update` in my site directory, committed the changes, and pushed up to my repo.

Build failed.

Sonofa. Check the logs and see this right at the end:

    $ hexo deploy
    ERROR Local hexo not found in   /builds/********/********  
    ERROR Try running: 'npm install hexo --save'  
    ERROR: Job failed: exit code 1

Ok, easy enough (or so I thought). Just roll back one commit and I should be set. Didn't work, more because of my lack of git and npm knowledge than anything else. I ended up fixing it by merging an older version into the master, pulling changes, and pushing back up to the repo. This happened over the course of a few hours, working on it when I had a few minutes at a time. The quick(ish) version was something like this:

    git pull
    git checkout -b {branch}
    {edits, install correct version}
    git checkout master
    git fetch
    git merge {branch}
    {resolve a couple of conflicts}
    git pull
    git push

At least I'll remember to make a new branch before updating next time - I also have the Hexo version pinned in my CI configuration (to make sure it works with GitLab pages). This was a good learning experience, and hopefully something I won't have to do again... for this project anyway.
