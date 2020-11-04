Frontend SPA for an online student evaluation system

Modular application containing Vuejs components for data processing and rendering. State management is done with pure vanilla js service modules.

Bundling is done via webpack.

UI contains Vuetify library that replicates google's materialize styling.

Utilizes backend API which will be released in the near future

Development mode:

1) npm install
2) npm run dev
3) index.html will be server on localhost:8080
4) api calls will be proxied to backend server on localhost:8081

Production mode:
1) "npm install"
2) "npm run build"
3) "node server"
4) node server will serve index.html on localhost:5000
5) the vue js application will be server from dist/ folder 
6) please provide backend api url in dotenv file 

Backend API
Application is given in a separate repository "online-exam-backend"
