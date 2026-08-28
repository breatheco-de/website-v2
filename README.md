# 4Geeks Academy Website 

- Here you can find the [website design in Figma](https://www.figma.com/file/0kfc9La5QthLyu927siuCw/Website-Project?node-id=0%3A1).
- This website was built using Gatsby.js and Styled Components.
- All the website information is stored in [YML files inside ./src/data](https://github.com/4GeeksAcademy/website-v2/tree/master/src/data).

# Recommended Readings before understanding the website:

- Gatsby.js
- Styled Components

## Open locally:

To run this project locally, follow these steps:

1. Copy Environment File: Create a local environment file by copying the example file.

```bash
cp -n .env.example .env.development || true
```

2. Install Node Version Manager (NVM): If you don't have NVM installed, follow the instructions here.

3. Install Node.js Version 22: Use NVM to install Node.js version 22.

```bash
nvm install v22
```

4. Set Default Node.js Version: Set Node.js version 22 as the default version.

```bash
nvm alias default v22
```

5. Use Node.js Version 22: Switch to using Node.js version 22.

```bash
nvm use v22
```

6. Install Dependencies: Install the project dependencies.

```bash
npm install --legacy-peer-deps
```

7. Run the Project: Start the project.

```bash
npm run start
```

## Tests

Test SEO best practice and YML format and rules:

```bash
$ node ./src/test/test.seo.yml
$ node ./src/test/test.yml.yml
```

## Redirects

You can create bloposts redirects:

```bash
$ node ./src/utils/create_redirects.js
```

.
