const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type Item {
        id: ID,
        sku: String,
        name: String,
        price: Float,
        inventory: Int
    }

    type TransactionItem {
        id:ID
        itemId: ID
        transactionId: ID
        quantity: Int
        price: Float
}

    type Transaction {
        id: ID
        status_payment: String
        total: Float
        Transaction_items: [TransactionItem]
    }
    
    type Query {
        hello: String

        getAllItems:[Item]

        getTransaction(id: ID):  Transaction
    }

    input ItemInput{
        sku: String,
         name:String, 
         price:Float, 
         inventory:Int
    }

    input ItemPurchase{
        sku:  String,
        quantity: Int
    }


    type Mutation {
        createItem(item: ItemInput): Item
        createTransaction(transaction: ItemPurchase): String

    }



`



module.exports = typeDefs