const resolver = require('./resolver');
const { Item, Transaction, Transaction_item, sequelize } = require('./models/index');

jest.mock('./models/index', () => ({
    Item: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    },
    Transaction: {
        create: jest.fn(),
        update: jest.fn(),
    },
    Transaction_item: {
        create: jest.fn(),
    },
    sequelize: {
        transaction: jest.fn(),
    },
}));

describe('createItem resolver', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create an item', async () => {
        const args = {
            item: {
                sku: '12345',
                name: 'Test Item',
                price: 10.99,
                inventory: 5,
            },
        };

        Item.create.mockResolvedValueOnce({
            id: 1,
            ...args.item,
        });

        const result = await resolver.Mutation.createItem(null, args, null, null);

        expect(Item.create).toHaveBeenCalledWith(args.item);
        expect(result).toEqual({
            id: 1,
            ...args.item,
        });
    });
});

describe('createTransaction resolver', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a transaction', async () => {
        // Mock the arguments
        const args = {
            transaction: {
                sku: '12345',
                quantity: 2,
            },
        };

        Item.findOne.mockResolvedValueOnce({
            id: 1,
            sku: args.transaction.sku,
            price: 10.99,
            inventory: 5,
        });

        Transaction.create.mockResolvedValueOnce({
            id: 1,
            total: 21.98,
            status_payment: 'paid',
        });

        Transaction_item.create.mockResolvedValueOnce({});

        sequelize.transaction.mockResolvedValueOnce({});

    });
});


