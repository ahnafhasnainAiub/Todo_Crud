const express = require("express");clearImmediate
const app = express();
const mongoose = require("mongoose");
const Todo = require("./todo.js");

app.use(express.json())
const MONGO_URL = "mongodb://127.0.0.1:27017/todo";

main()
 .then(() => {
    console.log("Connected to DB");
 })
 .catch((err) => {
    console.log(err);
 });

 async function main(){
    await mongoose.connect(MONGO_URL);
 }



 //Create New Todo
app.post("/todos", async  (req, res) => {
     let { title, date, time } = req.body;

     console.log({title, date, time})
     const newTodo = await Todo.create(req.body);
     
    //  await newTodo.save();
     res.status(200).json({todos: newTodo});
 
});

//Show All Todo
app.get("/todos", async (req, res) => {
  
    const todoItem = await Todo.find({});
    res.status(200).json({todos: todoItem});
    console.log(todoItem);

});



// Delete Todo
app.delete("/todos/:id", async (req, res) => {
    let { id } = req.params;
    const deltedItem = await Todo.findById( '666845763e30bbc90ec1eaa3');

    if (!deltedItem) {
        return res.status(404).json({message: 'Item not found'});
    }

    await deltedItem.deleteOne()


    res.status(201).json({message: 'Successfully Delete'});

});


// Update Todo
app.put("/todos/:id", async (req, res) => {
    let { id } = req.params;
    let updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (updatedTodo) {
        res.status(200).json({ message: "Todo updated successfully", todos: updatedTodo });
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});



app.listen(8080, () => {
    console.log("Server is listing at 8080 ")
});