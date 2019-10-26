# Graph Editor API 

Backend for Graph Editor, a Node Express app using Sequelize and GraphQL. All wrapped up in a docker image.

Demo site: https://grapheditor.orderandchaoscreative.com/

## Set Up

Grab repo: `git clone git@github.com:sarcoma/Graph-Editor-Backend.git`

Run docker compose: `docker-compose up --build`

### Create the database and insert some initial data.

Run `docker-compose exec web bash` to access the docker container.

Navigate to the orm directory with: `cd src/orm`

Lastly run: `ts-node create-database.ts`

You should see the SQL queries printed to the terminal. Once they stop just hit `ctrl + c`.

## Frontend Repository

The frontend can be found here: https://github.com/sarcoma/Graph-Editor


