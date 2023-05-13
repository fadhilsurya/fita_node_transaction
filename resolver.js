const { Item, Transaction, Transaction_item, sequelize } = require('./models/index');

const resolvers = {
    Query: {
        hello: () => {
            return "hello world";
        },

        getAllItems: async () => {

            const resp = await Item.findAll()

            return resp

        },

        getTransaction: async (_parent, { id }) => {
            const data = await Transaction.findAll({
                where: {
                    id: id
                },
                include: [{
                    model: Transaction_item,
                    attributes: ['id', 'itemId', 'transactionId', 'quantity', 'price'],
                }]
            });

            return data.length > 0 ? data[0] : null;

        }

    },
    Mutation: {
        createItem: async (parent, args, context, info) => {
            const { sku, name, price, inventory } = args.item

            const data = await Item.create({
                sku,
                name,
                price,
                inventory
            })

            return data
        },

        createTransaction: async (parent, args, context, info) => {
            const { sku, quantity } = args.transaction

            // we need to check their sku first

            const checkSKU = await Item.findOne({
                where: {
                    sku
                }
            })



            const t = await sequelize.transaction()

            if (checkSKU.inventory > quantity) {

                try {
                    // first we create the transaction
                    let totalPrice = checkSKU.price * quantity

                    let createTransaction = await Transaction.create({
                        total: totalPrice,
                        status_payment: 'paid'
                    })

                    // first case for macbook
                    if (sku == '43N23P') {
                        // check rasberry
                        const checkRasberry = await Item.findOne({
                            where: {
                                sku: '234234'
                            }
                        })

                        let generateRasberry = 0


                        if (checkRasberry.inventory > quantity) {
                            generateRasberry = quantity
                        } else {
                            generateRasberry = quantity
                        }

                        for (let index = 0; index < quantity; index++) {

                            await Transaction_item.create({
                                itemId: checkSKU.id,
                                transactionId: createTransaction.id,
                                quantity: 1,
                                price: checkSKU.price
                            })

                        }

                        for (let index = 0; index < generateRasberry; index++) {

                            await Transaction_item.create({
                                itemId: checkRasberry.id,
                                transactionId: createTransaction.id,
                                quantity: 1,
                                price: 0
                            })

                        }

                        let remainingSKU = checkSKU.inventory - quantity

                        await checkSKU.update({ inventory: remainingSKU })

                        await checkRasberry.update({ inventory: checkRasberry.inventory - quantity })

                        // we create this condition because 1 macbook pro == 1 rasberry free
                        // if the quantity of rasberry < macbook pro we will generate as much as free rasberry as available
                        // ex if rasberry left is 3 and macbook purchase 5 means transaction will be 5 macbook with 3 rasberry
                    }
                    // for google home
                    else if (sku == '120P90') {
                        if (quantity > 3) {
                            t.rollback()
                            return
                        }

                        if (quantity < 3) {
                            for (let index = 0; index < quantity; index++) {

                                await Transaction_item.create({
                                    itemId: checkSKU.id,
                                    transactionId: createTransaction.id,
                                    quantity: 1,
                                    price: checkSKU.price
                                })

                            }
                        }

                        if (quantity == 3) {
                            let priceSKU = checkSKU.price
                            for (let index = 0; index < quantity; index++) {
                                if (index + 1 == 3) {
                                    priceSKU = 0
                                }
                                await Transaction_item.create({
                                    itemId: checkSKU.id,
                                    transactionId: createTransaction.id,
                                    quantity: 1,
                                    price: priceSKU
                                })
                            }

                            await createTransaction.update({ price: checkSKU * 2 })

                        }

                        await checkSKU.update({ inventory: checkSKU.inventory - quantity })
                    }

                    else if (sku == 'A304SD') {
                        if (quantity > 3) {
                            const priceSKU = checkSKU.price - (checkSKU.price * 0.1)
                            const totalPrice = priceSKU * quantity

                            await createTransaction.update({ total: totalPrice })

                            for (let index = 0; index < quantity; index++) {

                                await Transaction_item.create({
                                    itemId: checkSKU.id,
                                    transactionId: createTransaction.id,
                                    quantity: 1,
                                    price: priceSKU
                                })

                            }
                        }

                        await checkSKU.update({ inventory: checkSKU.inventory - quantity })
                    }

                    t.commit()

                    return 'success'

                } catch (error) {

                    await t.rollback()

                    return error

                }


            }


            return
        }


    }
}


module.exports = resolvers