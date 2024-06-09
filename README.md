# Quests Manager

## :wave: About this project

Our innovative platform empowers individuals to earn money by completing small tasks.

## :game_die: Usage

You can create task and pay money; or you can pick, execute tasks and get money.

## :heavy_check_mark: Business Goals and Objectives

Our primary goal is to create a mutually beneficial ecosystem where individuals can monetize their time and skills, while other people accomplish tasks and save time.

## :fire: Features

1. Create tasks
2. Complete tasks
3. Pay money

## :hotsprings: Frameworks

- **Back:** java, spring boot, hibernate, PostgreSQL, Swagger
- **Front:** TypeScript, React, MUI
- **Deploy:** Yandex Cloud, git

## :heavy_exclamation_mark: Prerequisites

ToDo

## :wrench: Installation

ToDo

## :ferry: Docker compose

### Add environment variables in .env file in `/front/` directory

Replace `<<placeholder>>` with actual

```env
VITE_API_URL=http://localhost:8081/api/v1 #<<replace with order service url>
VITE_AUTH_LOGIN_URL=http://localhost:8080/realms/prototype/protocol/openid-connect/token #<<replace with keycloak url>>
VITE_AUTH_GRANT_TYPE=<<place the grant type from keycloak (currently "password")>>
VITE_AUTH_CLIENT_ID=<<place the client id from keycloak (currently "quests")>>
VITE_AUTH_CLIENT_SECRET=<<place the client secret form keycloak>>
VITE_AUTH_REGISTER_URL=http://localhost:8082/keycloak/register #<<replace with user service url>>
VITE_APP_TITLE=Quests Manager
VITE_YANDEX_API_KEY=<<your yandex api key here>>
```

### Build and Run

#### To build and run the front

```bash
docker compose up -d --build front
```

#### To build and run everything

```bash
docker compose up -d --build
```

### Open the [http://localhost:3000](http://localhost:3000) or your `http://ip-address:3000` to access the website

## :bookmark_tabs: Requirements

### Quality attribute

![quests-manager - Quality attributes](https://github.com/Maxkoz777/quests-manager/assets/54961113/08f5af41-65f0-405b-9d15-bddebad4a071)

### Glossary

### Stakeholders Roles

![quests-manager - Stakeholders](https://github.com/Maxkoz777/quests-manager/assets/54961113/8484084e-0f32-4b06-acfb-8d047cbf46a7)

### User stories

![quests-manager - User stories](https://github.com/Maxkoz777/quests-manager/assets/54961113/c59d8c5f-f78b-4d9a-866a-fd93c3110829)

### Non-functional requirements

![quests-manager - Functionality decomposition](https://github.com/Maxkoz777/quests-manager/assets/54961113/8a4495b2-a2ab-4878-a019-9eb3241234a1)

## :art: Design

In Progress

## :hammer: Architecture

ToDo

## :computer: Code quality

ToDo: in progress

## :link: Links

- [Swagger]()
- [Backend]()
- [Figma](https://www.figma.com/file/iJMwEqlGgj2MKRnQxkD9uK/Quests-Web-App-Design-Board?type=design&node-id=0%3A1&mode=design&t=LGLLjfQcIsUiKLlX-1)

## :movie_camera: Demo

![Demo]()

## :pencil2: Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## :lock: License

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## :v: Credits

This project was done by :

[Kostarev Grigorii](https://github.com/none-word), [Maxim Kozhinov](https://github.com/Maxkoz777), [Kim Fom](https://github.com/kimfom01)
