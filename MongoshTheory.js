// ///////////////////////////////////////////////////////////////// MONGOSH
//  * 
//  * refer this - https://docs.google.com/document/d/1Xiups-R0Xvwk3gMQPtKgP7THU-S2IEhRZRTleCgZKQA/edit?usp=sharing
//  * https://docs.google.com/document/d/1Xiups-R0Xvwk3gMQPtKgP7THU-S2IEhRZRTleCgZKQA/edit?tab=t.0#heading=h.btvdbp1aiktu
//  * for the commands
//  * 
//  * show dbs - will list down all the database craeted
//  * putting ; at end of command in mongo shell isoptional but good to do
//  * use test - to switch to test databse directory
//  * use winter-mern-mongoshTest - if not in dattabse then will create one and directly switch to this
//  * .editor - commonds let yo enter multiline command; ctr+C will cancell out : ctrl+D to finish
//  * db.products.insertOne and db.products.insertMany inside .editor
//  * 
//  * after adding products we will get message with product id as - 
//  * {
//   acknowledged: true,
//   insertedIds: { '0': ObjectId('6980215fb256c7d63a1e2621') }
// }


//  *Similarly we have db.products.updateOne and db.products.insertMany
//  db.product.updateOne({ name: "Smart Fitness Watch" }, { $set: { name : "Smart Watch" } }); will update the product in Smart Watch
//  and return 
//  {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 0,
//   modifiedCount: 0,
//   upsertedCount: 0
// }
  
// but if theres no column like these then will crete one and put inside them with {upsert: true} command as , 
// like: db.products.updateOne({name: "Put Product" }, { $set: { name : "Put Product" } }, {upsert: true});
// and will retun upsertCount = 1
// {
//   acknowledged: true,
//   insertedId: ObjectId('6980238ddb2de7e584ac53ab'),
//   matchedCount: 0,
//   modifiedCount: 0,
//   upsertedCount: 1
// }

// use db.products.deleteOne and db.products.deleteMany for deletion  - response - { acknowledged: true, deletedCount: 1 }
// if want to delete all the records then use drop command
// all inside .editor









// since we are not editing we are finding so below will not be inside .editor 
// Finding all Records
// Note: Use with caution. It will scan all the records and in production, mongodb charges by the number of records retrieved by your query. 
// And even if you are using a dedicated instance with a fixed price, it can eat up a lot of your resources, slowing other users down.
// db.products.find();


// Find with Filter
// db.products.find({ name: "Smart Watch" });       - this is findMany

// Note: This query is performing an exact match.

// Finding a single Record
// db.products.findOne();

// Note: This query stops execution as soon as it finds the 1st matching record.
// db.products.findOne({ name: "Smart Watch" });


// .editor
// db.brands.insertMany([with all thebrands product data])
// will return 
// {
//   acknowledged: true,
//   insertedIds: { '0': ObjectId('69802751b256c7d63a1e2622') }
// }


// Operators
// most of them we are going to use them as a find query
// db.products.find({price: {$eq: 19.99}});   ($eq : price equals)

// will return an array of products since multiple products may have same price

// db.products.find({category: {$ne: 'Electronics'}});    ($ne : not equals)
// will return procts whose category is not equal to electronics


// db.products.find({ stocks: {$gt: 50} });    ($gt : greater than)
// db.products.find({ stocks: {$gte: 50} });    ($gt : greater than)
//  Less Than ($lt)
// Less Than Equal ($lte)

// 7. In an Array ($in)
// Find all the products in Electronics and Clothing categories.
// db.products.find({ 
//     category: { $in: ['Electronics', 'Clothing'] } 
// });

// /////////////Logical operators

// Logical AND
// db.products.find({ $and: [{ category: "Electronics" },{ price: { $gt: 1 }}]}) is an array to follow operators in between
// returns when both are true


// Logical OR
// db.products.find({ $or: [{ category: "Clothing" }, { tags: "Fitness" }] });

// 3. Not Operator ($not)
// db.products.find({
//     price: { $not: { $gt: 20 } }
// })

// 4. Nor Operator ($nor)
// db.products.find({
//     $nor: [
//         { category: 'Electronics' },
//         { category: 'Clothing' }
//     ]
// });

// we dont have nor operator in SQL since we can achieve same using multiple operators

// Evaluation Operators
// 1. Regular Expression ($regex)
// Find all the products whose name starts with smart and perform case-insensitive comparison.
// db.products.find({ name: { $regex: /^smart/i } });             i denotes case insensitive




// db.products.find({ $text: {$search: "Smart" } });
// db.products.find({ $where: "this.price === 149.5"});



// Aggregate Pipeline

// db.products.aggregate([])
// takes array of operations to perform

// db.products.aggregate([ { $match: {category: 'Electronics' , isAvailable: true }}])




// 1. Filter ($match)
// Query: Find all the products that are in the Electronics category and are available.
// db.products.aggregate([
//     { $match: { category: 'Electronics', isAvailable: true } }
// ]);

// 2. Summarize ($group and $count)
// Query: Group products by category and find count of products in each category with their average price.
// db.products.aggregate([
//     {
//         $group: {
//             _id: "$category",
//             totalProducts: { $count: {} },
//             avgPrice: { $avg: "$price" }
//         }
//     }
// ]);

// 3. Reshaping the Output ($project)
// Query: Print name and price of the Products with name being in all UPPERCASE. Do not include _id field in the output.
// db.products.aggregate([
//     {
//         $project: {
//             name: { $toUpper: "$name" },
//             price: 1,
//             _id: 0
//         }
//     }
// ]);

// 4. Ranking ($sort and $limit)
// Query: Find the most expensive product.
// db.products.aggregate([
//     { $sort: { price: -1 } },
//     { $limit: 1 }
// ]);

// 5. Computed Fields ($addFields)
// Query: Include a computed field, totalInventory, while returning all the products.
// db.products.aggregate([
//     {
//         $addFields: {
//             inventoryValue: { $multiply: ["$price", "$stock"] }
//         }
//     }
// ]);

// 6. Joins ($lookup)
// Query: Join brands table with products table on the name of the brand and show brand details under brand_details column
// db.products.aggregate([{ $lookup: { from: "brands", localField: "brand", foreignField: "name", as: "brand_details"}}]);

// where
// db.products.aggregate([
//     {
//         $lookup: {
//             from: "brands", // Name of collection joining
//             localField: "brand", // Name of field in current table to match
//             foreignField: "name", // Name of the field to match in joined table
//             as: "brand_details" // Name of the field in the output
//         }
//     }
// ]);

// 7. $unwind
// Note: It in used to break apart array
// db.products.aggregate([
//     { $unwind: "$tags" }
// ]);





// /////////////////////Assignment
// Find all products in stock, calculate their total inventory value, sort them by that value descending, and only show the top 3. command for mongosh

// db.products.aggregate([
//   // Only include products that are in stock
//   { $match: { quantity: { $gt: 0 } } },

//   // Calculate inventory value for each product
//   { $addFields: { inventoryValue: { $multiply: ["$price", "$quantity"] } } },

//   // Sort by inventory value descending
//   { $sort: { inventoryValue: -1 } },

//   // Limit to top 3
//   { $limit: 3 },
// ]);


// Calculate the total count of every tag across the entire product dataset
// db.products.aggregate([
//   // Unwind the tags array so each tag becomes its own document
//   { $unwind: "$tags" },

//   // Group by tag and count occurrences
//   { $group: { _id: "$tags", count: { $sum: 1 } } },

//   // Sort by count descending
//   { $sort: { count: -1 } }
// ]);


// //////////////////////////////////Index
// db.products.createIndex({ price: 1});
// db.products.createIndex({ catgory: 1 , price: -1});

