<h1 align="center">Online Editor for Galois Autocompleter </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/iedmrc">
    <img alt="Twitter: iedmrc" src="https://img.shields.io/twitter/follow/iedmrc.svg?style=social" target="_blank" />
  </a>
</p>

> An online code editor (playground) for [Galois](https://github.com/iedmrc/galois-autocompleter).

### 🏠 [Homepage](https://usegalois.com)

**Galois** is an auto code completer for code editors (or any text editor) based on [OpenAI GPT-2](https://github.com/openai/gpt-2). It is trained (finetuned) on a curated list of approximately 45K Python (~470MB) files gathered from the Github. It is now just works properly on Python but not bad at other languages (thanks to GPT-2's power). 

This repository contains the online code editor crafted with [vue-prism-editor](https://github.com/koca/vue-prism-editor) and [tribute](https://github.com/zurb/tribute).

## Installation

You can install and run this repository with or without Docker. This repository only contains the Web API's for **Galois**. You should also need to install **Galois Autocompleter** to enjoy the autocompleter.

### With Docker
Either clone the repository and build the image from docker file or directly run the following command:

```sh
docker run --rm -dit -p 3003:3003 --env-file backend/.env iedmrc/galois-web
```

**Don't forget to provide a valid environment file.** You can find an example environment file at `backend` directory.

### Without Docker
Clone the repository and build the vue frontend with:

```sh
npm install && npm run build
```
copy `dist/` directory to `backend/public`. Install modules via `npm install` (or use yarn if you prefer). Run the server via:
```sh
npm run start
```

> Check out the [gist here](https://gist.github.com/iedmrc/1e41197a6a2f7a9a654a0df9bd932290) for a `docker-compose` file.

## Contribution

Contributions are welcome especially for the frontend side. Because I'm not good at with frontend development, any UI/UX improvements are welcome! Feel free to create an issue or a pull request.

### Known Bugs
There are some bugs with the [vue-prism-editor](https://github.com/koca/vue-prism-editor) and [tribute](https://github.com/zurb/tribute). Because `vue-prism-editor` is just a dead simple code editor and `tribute` is not really designed for autocompletion, it is possible to face with UX issues. Look *contributions* section if you say "hey I can fix these issues!" 🙌

## Author

👤 **Ibrahim Ethem DEMIRCI**

Twitter: [@iedmrc](https://twitter.com/iedmrc) | Github: [@iedmrc](https://github.com/iedmrc) | Patreon: [@iedmrc](https://patreon.com/iedmrc)


Ibrahim's open-source projects are supported by his Patreon. If you found this project helpful, any monetary contributions to the Patreon are appreciated and will be put to good creative use.

## License

It is licensed under MIT License as found in the LICENSE file.