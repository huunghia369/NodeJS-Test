const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listener

client.on("error", (error) =>
  console.log("Redis client error occured!", error),
);

async function redisDataStructures() {
  try {
    await client.connect();
    // String --> SET, GET, MSET, MGET

    // await client.set("user:name", "nghia");
    // const name = await client.get("user:name");
    // // console.log(name);

    // await client.mSet([
    //   "user:email",
    //   "nghia@gmail.com",
    //   "user:age",
    //   "23",
    //   "user:country",
    //   "vietnam",
    // ]);
    // const [email, age, country] = await client.mGet([
    //   "user:email",
    //   "user:age",
    //   "user:country",
    // ]);
    // console.log(email, age, country);

    // lists --> LPUSH, RPUSH, LRANGE, LPOP, RPOP
    // await client.lPush("notes", ["note 1", "note 2", "note 3"]);
    // const extractAllNotes = await client.lRange("notes", 0, -1);
    // console.log(extractAllNotes);

    // firstNote = await client.lPop("notes");
    // console.log(firstNote);

    // const remainingNotes = await client.lRange("notes", 0, -1);
    // console.log(remainingNotes, "remainingNotes");

    // sets --> SADD, SMEMBERS SISMEMBER, SREM
    // await client.sAdd("user:nickName", ["nghia", "varun", "abc"]);
    // const extractUserNickName = await client.sMembers("user:nickName");
    // console.log(extractUserNickName);

    // const isVarunIsOneOfUserNickName = await client.sIsMember(
    //   "user:nickName",
    //   "varun",
    // );
    // console.log(isVarunIsOneOfUserNickName);

    // await client.sRem("user:nickName", "nguyen");

    // const getUpdatedUserNickName = await client.sMembers("user:nickName");
    // console.log(getUpdatedUserNickName);

    // sorted sets --> ZADD, ZRANGE, ZRANK, ZREM

    // await client.zAdd("cart", [
    //   {
    //     score: 100,
    //     value: "Cart 1",
    //   },
    //   {
    //     score: 150,
    //     value: "Cart 2",
    //   },
    //   {
    //     score: 10,
    //     value: "Cart 3",
    //   },
    // ]);

    // const getTopCartItems = await client.zRange("cart", 0, -1);
    // console.log(getTopCartItems);

    // const extractAllCartItemsWithScore = await client.zRangeWithScores(
    //   "cart",
    //   0,
    //   -1,
    // );
    // console.log(extractAllCartItemsWithScore);

    // const cartTwoRank = await client.zRank("cart", "Cart 2");
    // console.log(cartTwoRank);

    // hashes --> HSET, HGET, HGETALL, HDEL
    await client.hSet("product:1", {
      name: "Product 1",
      description: "Product 1 description",
      rating: "S",
    });

    const getProductRating = await client.hGet("product:1", "rating");
    console.log(getProductRating);

    const getProductDetails = await client.hGetAll("product:1");
    console.log(getProductDetails);

    await client.hDel("product:1", "rating");

    const updatedProductDetails = await client.hGetAll("product:1");
    console.log(updatedProductDetails);
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
}

redisDataStructures();
