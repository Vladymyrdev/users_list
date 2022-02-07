# Simple React App Users List

## :star: Implemented features

- App consist of two routes.
- Datagrid is sortable by all fields and filterable by Username (search).
- LastLogin is formatting to human friendly format and Enabled is represented as "Yes"/"No" text. Rows with Enabled set to "No" are colored red.
- New user dialog is activated using "New user" button.
  Dialog are contained validated form with fields:

1. User name - max. 15 characters, only alphanumeric characters, non-empty, unique, case insensitive.
2. First name, LastName - together max. 40 characters, both non-empty, each has max. 25 characters, each first letter is capital.
3. Enabled - is specified ("Yes"/"No" values).

- User name uniqueness is validated localy using data in datagrid with all users.
- Full name is combination of First name and Last name. Each cna are 25 chars long, but together can not exceed 40 chars.
- The page of user detail contains details of selected user. Fields FirstName, LastName and Enabled are editable.
- A dummy API has been created as a data source and is run by the `npm run server` command. API mock methods are contained some delay (~ 1 second) to simulate real server delays. All API calls are centralized in one place so it is easier to add error handling, HTTP request/response handling, security token handling etc.

## :hammer: Used technologies:

- React.JS + hooks (useContext, useReducer, etc.)
- Kendo React UI Library
- axios
- json-server

## To start app you can use:

### `npm run server`

Run fake server with user database.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
