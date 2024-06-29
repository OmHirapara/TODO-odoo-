import Todo from "../models/todo.js"

const checkAll = async (req, res) => {
  try {
    const items = await Todo.findAll(); // Call the async function to fetch items

    res.render("todo.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).send("Internal server error"); // Handle error response
  }
}

const insertItem =  async (req, res) => {
  try {
    const newItem = req.body.newItem;

    // Create new item in the database using Sequelize
    const createdItem = await Todo.create({
      title: newItem,
    });

    if (createdItem) {
      // Insert successful
      res.redirect("/todo");
    } else {
      res.send("Failed to create item");
    }
  } catch (error) {
    console.error('Error inserting item:', error);
    res.status(500).send("Internal server error"); // Handle error response
  }
};

const updateItem = async (req, res) => {
  try {
    const { updatedItemId, updatedItemTitle } = req.body;

    // Update item in the database using Sequelize
    const result = await Todo.update(
      { title: updatedItemTitle },
      { where: { id: updatedItemId } }
    );

    if (result[0] === 1) {
      // Update successful
      res.redirect("/todo");
    } else {
      // No rows updated (item not found)
      res.status(404).send("Item not found");
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send("Internal server error"); // Handle error response
  }
};

const  deleteItem  = async (req, res) => {
  try {
    const { deleteItemId } = req.body;

    if (deleteItemId) {
      // Delete item from the database using Sequelize
      const deletedRows = await Todo.destroy({ where: { id: deleteItemId } });

      if (deletedRows === 1) {
        // Deletion successful
        res.redirect("/todo");
      } else {
        res.send("Item not found");
      }
    } else {
      res.status(400).json("Missing deleteItemId");
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send("Internal server error"); // Handle error response
  }
};
const controller = {
  checkAll,
  insertItem,
  updateItem ,
  deleteItem 
}
export default controller