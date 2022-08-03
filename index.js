const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const listModel = require("./models/list");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`

    type List {
      title: String!
    }

    type MongoList {
      title: String!
      _id: String!
    }

    input ListInput {
      title: String!
    }

    type RootQuery {
      lists: [MongoList!]!
    }

    type RootMutation {
      createList(list: ListInput): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      lists: () => {
        return listModel.find();
      },
      createList: async (args) => {
        console.log("Create List Received Arguments ", args);
        const buildList = new listModel({
          title: args.list.title,
        });
        await buildList.save();
        return "List Created !";
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/graphqlexpress")
  .then(() => {
    console.log("mongoose connected");
    app.listen(3000, function () {
      console.log("listening at http://localhost:3000/graphql");
    });
  })
  .catch(() => {
    console.log("error connecting database");
  });
