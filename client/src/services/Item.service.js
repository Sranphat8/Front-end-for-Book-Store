import api from "./api";

const getAllItems = async () => await api.get("/api/items");
const getItemByTypeAndId = async (type, id) => await api.get(`/api/items/${type}/${id}`);
const insertItem = async (type, itemData) => {
  if(type === "Book") return await api.post("/api/books", itemData);
  if(type === "Journal") return await api.post("/api/journals", itemData);
  if(type === "Comic") return await api.post("/api/comics", itemData);
};
const editItemByTypeAndId = async (type, id, itemData) => await api.put(`/api/${type.toLowerCase()}s/${id}`, itemData);
const deleteItemByTypeAndId = async (type, id) => await api.delete(`/api/${type.toLowerCase()}s/${id}`);


const ItemService = { getAllItems, getItemByTypeAndId, insertItem, editItemByTypeAndId, deleteItemByTypeAndId };

export default ItemService;
