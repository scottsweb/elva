# Getting started

more on elva: https://elva.scott.ee/

### to start-up the Win-Browser from WSL
in WSL:
`export BROWSER='/mnt/c/Windows/explorer.exe'`
`sensible-browser http://localhost:8001/`

(for details and more see: https://superuser.com/questions/1262977/open-browser-in-host-system-from-windows-subsystem-for-linux)

### build
(from readme.md)
Install / update dependencies:

```
npm install
```

Run Eleventy for site development. View the site at `http://localhost:8080`:

```
npm run dev
```

Generate a production-ready build to the `dist` folder:

```
npm run build:prod
```