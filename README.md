# fita_node_transaction

https://dbdiagram.io/d/645e6dfcdca9fb07c4fd4760


# query  {
  # getAllItems {
  #   id
  #   sku
  #   price
  #   inventory
  # }

#   getTransaction(id: 10) {
#     id
#     total
#     status_payment
#     Transaction_items {
#       id
#       itemId
#       transactionId
#       quantity
#       price
#     }
#   }
# }

mutation {
#   createItem(item:{
#     sku: "FADHIL123",
#     name: "AYAM GUNDUT",
#     price: 1300.50,
#     inventory: 10
#   }){
# sku
# name
# price
# inventory
#   }

  createTransaction(transaction: { sku: "43N23P", quantity: 1 }) 
  # {
  #   id
  #   status_payment
  #   total
  #   Transaction_items {
  #     itemId
  #     transactionId
  #     quantity
  #     price
  #   }
  # }

}
