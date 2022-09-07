const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const startMemoryDB = () => {
  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
    return mongod;
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
};

module.exports = startMemoryDB;
