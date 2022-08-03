## How to run

`npm install` to install all the packages

`npm start` to run it

if you don't have `nodemon` then install it globally `npm install nodemon -g`

## localhost URL

http://localhost:3001/graphql

## Mutations

```
mutation {
  createList(list: {
    title: "New List"
  })
}
```

## Query

```
query {
  lists {
    title
    _id
  }
}
```
