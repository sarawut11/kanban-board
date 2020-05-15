![Screenshot](/screenshot.png)
## Project Overview
This project implements Kanban Board as a front-end web app like GitHub's Projects feature. Kanban board has several columns, and there are several cards in each column.

## The Task
All of the features in the `required features` must be implemented. Choose items you want to add from `advanced features` and implement as many as possible.

## Required features
* React
* Built with SPA (Single Page Application)
* Boilerplate, UI Kit can be customized according to your preference.

### Model: Column
* Required fields: Name, Order

### Model: Card
* Required fields: Name, Description, Created date, Status(Open, Closed), Order

### User Stories
* User can add column with name
* User can modify column name
* User can delete empty column
* User can move columns by drag & drop
* User can add card to column with name and description
* User can modify card details
* User can identify / switch status of card
* User can move / order card by drag & drop
* User can archive card

## Advanced features

* Test codes
* Graceful error handling

### Structure

* Multiple boards
* More metadata such as author, labels, assignee, comments, protected
* i18n feature

### PWA

* Add to Homescreen with an icon
* Persistent storage (by any method) to preserve state after refresh
* Push notification when a new card created

### Performance

* Windowing list (react-window, react-virtualized) when rendering lots of cards
* Code splitting and lazy loading

### Design

* RWD(Responsive Web Design) for desktop/mobile
* Show description when list is empty
* 404 Page if url is not valid

### UX
* Auto focus on initial state
* Input Validation