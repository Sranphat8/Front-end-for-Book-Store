import api from "./api";
const RESTO_API = import.meta.env.VITE_RESTO_API;

//get all items
const getAllItems = async () => {
  return await api.get(ITEM_API);
};
//get item by Id
const getItemById = async (id) => {
  //   return await api.get(RESTO_API + "/" + id);
  return await api.get(`${ITEM_API}/${id}`);
};
//update item by Id
const editItemById = async (id, item) => {
  return await api.put(`${ITEM_API}/${id}`, item);
};
//add Item
const insertItem = async (item) => {
  return await api.post(ITEM_API, item);
};

//delete Item
const deleteItem = async (id) => {
  return await api.delete(`${ITEM_API}/${id}`);
};

const ItemService = {
  getAllItems,
  getItemById,
  editItemById,
  deleteItem,
  insertItem,
};

export default ItemService;
