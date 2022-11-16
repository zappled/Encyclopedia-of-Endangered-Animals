# SEI-39 Project 4

# Encyclopedia of Endangered Animals

## Project Overview

The project aim is to build a web application that showcases my ability to develop RESTful APIs to perform CRUD (Create, Read, Update, Delete) on data stored within a SQL database. The data is to be displayed within an interactive front end, with intuitive UX design and data displayed in a graphics-focused and aesthetically pleasing manner.

## Tech Stack

Front-end: React, Typescript, HTML, SCSS
Back-end: Node.js, JWT, Express, PostgreSQL

## Project Screenshots

![homepage](/client/src/images/for_readme/endangered_animals_01.png)

## User Requirements

- Data is visual and easy to understand
- Can search database by various categories
- Can select favourite animals
- Can showcase list of favourites
- Can view other users' favourites
- Lesser known animal species are also visible

## Proposed Features

- Minimize text, use images and icons where possible
- Can filter search results by different categories
- Can add favourite animals to animal spotlight
- View user list and see other users' animal spotlights
- Randomized 'featured animal' on homepage

# Folder/File Structure

- Main
  - client - React
  - server - Express
  - endangered_animals.sql (SQL table file)
  - README.md

## SQL Table Structure

to be added

## React Components Hierarchy

to be added

## General Approach

Before commencing coding work, I planned out the pages and components I would need to give the website functionality. Then, I sketched out the wireframes of what features and components each page would contain, how they would be positioned and react to one another etc. This ensured that I would only be doing minor redesigning of pages once I started coding.

I started by crafting out the front-end first, populated with a set of dummy data. This allowed me to create a base template that other pages could follow, such as setting typical container sizes, font type/size/colour etc. Once I fleshed out a few key pages using dummy data, I switched over to building the back-end.

The SQL database structure was decided during the planning phase, and at this stage I focused on building the database using those specifications. Queries were tested out to ensure functionality, before they were exported to my API routes to be further tested, and finally synced to my front-end functions.

From here I filled in my database with the necessary data, removed the dummy data files, and linked my pages to use the database data instead. With front-end and back-end now successfully synced, I proceeded to work on implementing more features based on a pre-determined priority list, such as search filters, user authentication etc.

## Issues Not Yet Resolved

- 'Remove From Spotlight' feature on settings page does not work if animal name contains special characters
- When editing entry in animal database, unable to update values for habitats & threats
- On user list page, adding links to respective spotlight animals did not work if the user had more than 1 animal saved in their spotlight
