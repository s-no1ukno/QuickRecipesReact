# Todo List

## Frontend
- [x] Match frontend to whatever I decide to do with the API for Notes component
- [x] Create landing page for non-user
  - [x] description of app
- [x] Get Register Page updated with a username input
  - [x] Double check that Register page matches the rest of the model for Strapi
- [ ] Get form validation rolling on all forms
  - [ ] Register
  - [ ] Login
  - [ ] Modal for CreateNote
  - [ ] Modal for UpdateRating
- [ ] Need a form for creating recipes
- [ ] 


### Recipes Page
- [x] User names on each note, to keep separation
- [ ] GET /categories

### Modal Component
- [x] Decide how to get user id to update notes on a recipe
- [x] Match user writing note to user in database

## Server
- [ ] Server side validation??
  - Probably not going to get XSS'd by Lex and Mom - ***LULZ***
- [ ] Need to check into handling errors responsibly
  - [ ] Register
  - [ ] Login
  - [ ] New Note
  - [ ] Update note
  - [ ] New Recipe
  - [ ] Update recipe


## API
- [x] Need to decide if the Notes area of the Recipe component needs to be it's own component with a relationship to recipes(one to one), or maybe use a reusable component within recipe that can be created on PUT /recipes/:id