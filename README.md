# Band ‘Я’ Snatch

A classifieds platform for musicians looking for collaborations.

Created by Marcus Plenty and Nison Malayev. </br>
[Backend Repo](https://github.com/nmala/bandrsnatch-backend)

# Concept

My wife and I had our first babyin 2018, and with the baby came hundreds of photos and videos of our special memories. We had no easy way to organize these memories - there are hashtags, tags in Google Photos, albums, scrapbooks, baby logs, etc. We also wanted to incorporate a way for our child to look back on these special memories as she gets older. Some brainstorming produced this project - Kinder Memories.

Kinder Memories is a double entendre - 'kinder' as in loving and warm, and 'kinder' for the German word for children.

# Features

## Timeline

The main feature is the timeline. It has alternating cards with the date of the memory and an icon denoting its memory type on the center timeline stalk. Each timeline card has a title, description, memory, age (calculated via the memory date), and a footer with who posted the memory and when.

## Full auth with auto-login

Users can sign up, login, and be auto-logged in upon returning to the web app.

## Filter and Sort

At the top of the timeline is a filter and sort bar. Users can the timeline by the relation of the poster, whether it be a grandparent, a sibling, or a cousin. Another layer of filtering is by type of memory post: photo, video, or letter.

I've also implemented a way to swap whether the timeline posts load chronologically or reverse-chronologically.

These three layers allow for fine tuning of how the timeline renders. For example, a user can view all video posts by grandparents in reverse chronological order.

## Add New Memory

Users can add a new memory in the form of a photo, video, or letter. Depending on the choice, the form renders a text area for the letter or a file upload button.

# Stack

- Ruby on Rails with Postgres - backend API
- Active Storage - file uploads
- React - for UI
- Vanilla JavaScript - for some of the timeline card functionality
- CodyHouse Library - inspired the design and functionality
- MomentJS - to standardize between Ruby and HTML date formats for use in calculations
- React-Router - for dynamic client-side routing and better UX
- Semantic UI React - for styling
- JWT and Bcrypt - to build auth

# Additional Notes

[Backend Repo](https://github.com/nmala/bandrsnatch-backend)
