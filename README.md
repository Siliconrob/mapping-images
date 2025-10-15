# Hello and welcome to using Hapijs with MapBox+AirTable!

[Live site](https://mapping-images.glitch.me/)

This project includes a Node.js server script

- Make sure to set all your [.env](https://support.glitch.com/t/how-do-i-set-environment-variables/3921) variables, this example uses personal tokens
- [Node.js](https://nodejs.org/en/about/) is a popular runtime that lets you run server-side JavaScript.
- You will need to generate a free MapBox gljs API key [MapBox](https://docs.mapbox.com/mapbox-gl-js/guides/install/).
- You will need to generate a free AirTable API key [AirTable](https://airtable.com/)
- You should probably get a free HERE free geocode API Key (limit 1000 API calls per day) [HERE](https://platform.here.com/portal/).
- This project uses the [Hapijs](https://hapi.dev/) framework (I hope it makes you as happy as it does for me to use 😁) and explores basic routes.
- **Do not use this in production**


## Sample AirTable Format
```
Id,Approved,Photo,PublicText,Latitude,Longitude,SubmissionDate,ApprovalDate
UUID, checkbox, url, text, number (6), number (6), utc date, FORMULA = IF(Approved = 1, LAST_MODIFIED_TIME(), BLANK())
6b85b812-bd0d-4aad-8597-09eef7186ddb,checked,Prestige_Worldwide_logo.png (url here),Investors? Possibly You!,41.123457,-124.156738,2/13/2024 9:00pm,2/19/2024 2:35am
```


_Last updated: 15 Oct 2025_

## Prerequisites

You'll get best use out of this project if you're familiar with basic JavaScript. If you've written JavaScript for client-side web pages this is a little different because it uses server-side JS, but the syntax is the same!

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `public/map.html`: Holds the display map rendering.

← `public/style.css`: The styling rules for the pages in your site.

← `index.js`: The **Node.js** server script for your new site. The JavaScript defines the endpoints in the site back-end, one to return the homepage and one to update with the submitted color. Each one sends data to a Handlebars template which builds these parameter values into the web page the visitor sees.

← `package.json`: The NPM packages for your project's dependencies.

← `routes/`: This folder holds all the predefined Swagger entry points for hapijs to communicate with the OwnerRez API.

← `src/`: This folder holds general server side helper files for working with hapijs.

## Try this next 🏗️

Take a look in `TODO.md` for next steps you can try out in your new site!

**_Want a minimal version of this project to build your own Node.js app? Check out [Blank Node](https://glitch.com/edit/#!/remix/glitch-blank-node)!_**

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## You built this with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
