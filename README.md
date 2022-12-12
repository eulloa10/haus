<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Harmonious-Voices](/screenshots/haus_splash.png "Hause")](https://house-me.onrender.com)

Haus is a Zillow inspired website with frontend and backend support for home listings and open house tour features. Favorites, offers and other features are still in development.

#### Listings

Browse homes across the United States. This feature leverages the Google Maps API.

![Listings](/screenshots/haus_listings.png)

#### Tours

Book a tour for any home you are interested in purchasing

![Tours](/screenshots/haus_tours.png)

### Built With

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/en/2.2.x/)
- [Postgres](https://www.postgresql.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [React Google Maps](https://www.npmjs.com/package/@react-google-maps/api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

### Backend

1. Clone this repository

   ```bash
   git clone https://github.com/eulloa10/houseme-project
   ```

2. Install dependencies

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

### Frontend

1. Navigate to the react-app folder and npm install

   ```bash
   cd react-app
   npm install
   ```

2. Start the React app

   ```bash
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- [Edgar Ulloa](https://github.com/eulloa10)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Additional Resources

- [Flask-SQLAlchemy Quick Reference](https://hackmd.io/@jpshafto/H1VbmP3yO#Query-Format)
- [AWS S3 Reference](https://hackmd.io/@jpshafto/SyWY45KGu)
- [React Google Maps](https://www.npmjs.com/package/@react-google-maps/api)
- [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
