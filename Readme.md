# Installation

ce projet est amener a aller dans un theme wp

- creer tout un setup wp standard
- creer un theme `asbestos`
- TOUT le contenu de ce repo vas dans ce theme

## Development

### Require

- node v12.13.0
- yarn v1.7.0

### Quick setup

> ici le ROOT sera le dossier de ce theme

#### Install dependencies

```bash
cd src/vue
yarn
```

#### Run dev server

Attention, we moc data so copy `/datas` directly into `/src/vue/src/assets/moc/`

and vice verca, resync the other way if you want to keep your datas

also you can serve your apache website to `asbestos.int` and rename all your moc file path like ~~`/wp-content/uploads/`~~ to `http://asbestos.int/wp-content/uploads/`

To launche a dev server

```bash
yarn run dev
```

then go to `http://localhost:3000`

### Build

Attention, we copy `/static` into the `/public` folder so be carefull where to put assets

```bash
yarn run build
```

then go to `http://asbestos.int`