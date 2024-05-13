# Campus Management System - Client Side

## Contributors
- **Dulina Gunasekara** - *Full-Stack Dev* - [Dulinag](https://github.com/Dulinag)
- **Ian Clarke** - *Full-Stack Dev* - [ianclarke03 ](https://github.com/ianclarke03 )


## Overview
This repository contains the client-side code for the Campus Management System, a full-stack CRUD application developed using React, Redux, and React Router. This frontend interface provides a dynamic experience for managing campuses and students.

# Demo Video For Client and Server (Click Either Link or Picture for the two Video Demos)

## [![Watch the video](https://img.youtube.com/vi/INSERT_VIDEO_ID_HERE/maxresdefault.jpg)](https://vimeo.com/945860567)

[![Watch the Client Side Demo](https://github.com/Dulinag/final-project-server/assets/83606238/ccc1fb8b-9bcd-4f42-b63f-b942267a2ceb)](https://vimeo.com/945860567)

## [![Watch the video](https://img.youtube.com/vi/INSERT_VIDEO_ID_HERE/maxresdefault.jpg)](https://vimeo.com/945863884)

[![Watch the Server Side Demo](https://github.com/Dulinag/final-project-server/assets/83606238/631372f3-6f50-4bdb-9af4-1a64d0f48417)](https://vimeo.com/945863884)



## Features
- Interactive web interface with React components
- State management using Redux
- Client-side routing with React Router
- Form validation and error handling

## Usage
The application allows users to perform the following actions:
- **View All Campuses**: Display a list of all campuses with options to add, edit, or delete.
- **View Single Campus**: Detailed view of a single campus with options to edit or add students.
- **View All Students**: List all students with options to add, edit, or delete.
- **View Single Student**: Detailed information about a student and their campus affiliation.


## Getting Started
These instructions will guide you on how to get your project up and running on your local machine for development and testing purposes.

### Prerequisites
Ensure you have the following installed:
----------
### 1. Use the following process to ***import*** the Final Project client starter code repository to your GitHub account as the starter codebase
1.	Log on to GitHub
2.	Click on the + sign in the top right corner (next to the user icon)
3.	In the dropdown menu, select "Import repository"
4.	A new page will open
5.	In "Your old repository’s clone URL" field, enter: `https://github.com/johnnylaicode/client-starter-code`
6.	In "Your new repository details" field, enter your own repository name (e.g., "final-project-client")
7.	Click on the "Begin import" button to start the process
8.	After the process completed, your new "final-project-client" repository is created – as a completely independent codebase
9.	From this point on, you can clone your new repository, make changes, create feature branches, and create/merge pull requests

----------
### 2. Use the information below to ***clone*** the starter codebase to your local machine
After creating the starter codebase "final-project-client" repository on GitHub (see above), you can clone it to your local machine. The instructions on how to clone a GitHub repository are available at this [link](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

----------
### 3. Set up and run the client (front-end) application on your local machine
1.	Start a terminal (e.g., Git Bash) on your local machine.
2.  Go to the "final-project-client" folder, enter the command to install dependencies: `npm install` 
3.	Start the client application by entering the command: `npm start` 
4.	After the client application is successfully started, a web browser is automatically opened at the address: `http://localhost:3000` 

<br/>

## Common Errors You May Encounter
### Error: ERR_OSSL_EVP_UNSUPPORTED
This error indicates that your application uses an algorithm or key size not supported by OpenSSL 3.0.
#### Solution: 
1. If you use *Windows*, in the `package.json` file, set the "scripts" attributes as follows:

```
  "scripts": {
  "start": "SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts start", 
  "build": "SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts build", 
  ...
    },
```

2. If you use *Mac OSX or Linux*, include the following command in the `~/.bash_profile` or `~/.bashrc` file.

```
  export NODE_OPTIONS=--openssl-legacy-provider
```
