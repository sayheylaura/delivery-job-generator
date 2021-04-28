# Delivery job generator 🚀

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
        <li><a href="#other-technologies-used">Other technologies used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About the project

The Delivery Job Generator allows the user to create a delivery job by choosing pick up and drop off addresses. It leverages the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) to load Google Maps positioned at Paris, France.

![First load of the project screenshot][first-load-screenshot]

Addresses introduced by the user are geocoded by sending a request to [a private API](#warning). If they are valid, a request to the Google Maps JavaScript API adds map markers to the chosen addresses.

![Valid addresses screenshot][valid-addresses-screenshot]

When the user clicks on "Create a job", another request to the private API is sent to create the delivery job. If the request is successful, the form is reset, the map markers removed, and a toaster is displayed to notify the user.

![Job created screenshot][job-created-screenshot]

### Built with

-   [React](https://reactjs.org/)
-   [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
-   [Apollo Client](https://www.apollographql.com/apollo-client)
-   [Sass](https://sass-lang.com/)
-   [webpack](https://webpack.js.org/)
-   [Babel](https://babeljs.io/)

### Other technologies used

-   [ESLint](https://eslint.org/)
-   [stylelint](https://stylelint.io/)
-   [Prettier](https://prettier.io/)
-   [Yarn](https://yarnpkg.com/)

## Getting Started

### Prerequisites

-   Install [Node.js](https://nodejs.org/en/)
-   Install [Git](https://www.git-scm.com/)
-   Create a project in the Google Cloud Console, enable the Maps JavaScript API and get an API key. [This tutorial](https://developers.google.com/maps/gmp-get-started) from the Google Maps Platform documentation will set you up un running!

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/lauraferrandof/delivery-job-generator.git
    ```

2. Install dependencies

    ```sh
    npm run deps:install
    ```

    Or

    ```sh
    yarn deps:install
    ```

3. Create a `.env` file by duplicating the `.env_sample` file and add your API key and URL:

    ```JS
    API_KEY = YOUR_API_KEY
    API_URL = YOUR_API_URL
    ```

### Warning

The current project relies on a private GraphQL API. I'm planning on implementing my own API to make this project really usable by other people. In the meantime, you're free to implement your own :)

## Usage

To start the webpack dev server, run:

```sh
npm run start
```

Or

```sh
yarn start
```

The current private API only accepts two valid addresses, which you can find in the `src/components/app/utils/isAddressValid.js` file:

```javascript
const VALID_ADDRESSES = ['29 Rue du 4 Septembre', '15 Rue de Bourgogne'];
```

### Technical decisions

-   React architecture (loosely) [based on file type](https://reboot.studio/blog/folder-structures-to-organize-react-project/#structure-based-on-file-type).
-   Sass architecture based on the [7-1 pattern](https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4).
-   ESLint configuration based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
-   Due to the private nature of the API used to geocode and post the delivery job, the project is not ready to be deployed to production, therefore only development webpack config was created.

## Roadmap

-   [ ] Geocode the addresses once the user stops typing, and not only on blur
-   [ ] Make the toaster disappear automatically after a few seconds
-   [ ] Implement a state reducer for state management (either with React Hooks or with [Redux](https://redux.js.org/))
-   [ ] Add tests with [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/)
-   [ ] Improve loading experience
-   [ ] Add error screen
-   [ ] Create a pipeline with GitHub Actions
-   [ ] Add CSS transitions and animations
-   [ ] Refactor to [TypeScript](https://www.typescriptlang.org/)
-   [ ] Implement a custom [GraphQL](https://graphql.org/) API

## Contributing

Any contributions you make are **greatly appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push -u origin feature/AmazingFeature`)
5. Open a Pull Request against the parent Project

Or [open an issue](https://github.com/lauraferrandof/delivery-job-generator/issues) if you spot a bug :)

## Contact

Laura Ferrando - [LinkedIn](https://www.linkedin.com/in/lauraferrandof/) - lauraferrandof@gmail.com

## Acknowledgements

-   [Google Maps JavaScript API Loader](https://github.com/googlemaps/js-api-loader)
-   [Google Fonts](https://fonts.google.com/)
-   [Single Element CSS Spinners](https://github.com/lukehaas/css-loaders)
-   [normalize.css](https://github.com/necolas/normalize.css/)
-   [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[first-load-screenshot]: readmeAssets/first-load.png
[valid-addresses-screenshot]: readmeAssets/valid-addresses.png
[job-created-screenshot]: readmeAssets/job-created.png
