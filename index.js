const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolver')
const { Transaction, Item, Transaction_item} = require('./models/index')

require('dotenv').config()


const port = process.env.PORT || 3000


async function startServer() {
    const app = express()
    const appoloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await appoloServer.start()

    appoloServer.applyMiddleware({ app: app })

    app.listen(port, () => {
        console.log(`live and well listening at port ${port}`)
    })
}

startServer();