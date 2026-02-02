import express from 'express';
import {
  deleteItemById,
  getItemById,
  getItems,
  postNewItem,
  putItemById,
} from '../controllers/item-controller';

const itemRouter = express.Router();

// Endpoints for 'items' resource

itemRouter
// Define route
.route('/', getItems)
// Get all items
.get(getItems)
// Add new item
.post(postNewItem)

itemRouter
  // Define sub route
  .route('/:id')
  // GET route for items
  .get(getItemById)
  // PUT route for items
  .put(putItemById)
    // DELETE route for items
  .delete(deleteItemById);

// Add new item
itemRouter.post('/', postNewItem);

export default itemRouter;
