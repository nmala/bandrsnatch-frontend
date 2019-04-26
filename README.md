# Band ‘Я’ Snatch

A classifieds platform for musicians looking for collaborations.

Created by Marcus Plenty and Nison Malayev. </br>
[Backend Repo](https://github.com/nmala/bandrsnatch-backend)

# Concept

We tried our skills at building a frontend completely from vanilla JavaScript with a Rails API backend. Being that we're both interested in music production, we thought it would be a cool idea to develop a classfieds platform for musicians looking for collaborations. Users can browse all collabs requiring specific talents, and request to join. We envisioned the service to work by sending an email to the original collab poster with the join requests and for conversations to spark.

Band ‘Я’ Snatch is a platform for rappers, drummers, bassists, singers, keyboardists, guitarists, producers, and beatboxers.

The name Band ‘Я’ Snatch is a play on Netflix's Black Mirror episode, which was all the hype when we were working on this project. The pun seemed to fit our purpose.

# Features

## All Collabs

The main page of the site featuring all current collabs. Each collab posting includes an image, title, how many of each artist is needed, the last sign-up, and a 'More info' button that opens a modal with more information.

The modal lists the names of artists who have joined the collab, and a button to request to join. The request form includes a specialty dropdown which is dynamically created for each collab depending on which specialties were chosen for the collab and how many of each. The dropdown updates with only those specialties with vacancies.

## New Collab

Click on 'New Collab' in the navbar opens a model allowing users to post a new collab. The form requires a name, image, and a selection of how many of each specialty is desired.

The form also provides a live image preview pending a URL input in the 'Image' field.

## Sort by Specialty

'Sort by Specialty'

## Search

Users can search by collab title, and the collab postings update live as the search term is entered.

# Stack

- Ruby on Rails with Postgres - backend API
- Vanilla JavaScript - UI & functionality
- Bootstrap and custom CSS - styling
- Faker Gem - random collab names and users

# Additional Notes

[Backend Repo](https://github.com/nmala/bandrsnatch-backend)
