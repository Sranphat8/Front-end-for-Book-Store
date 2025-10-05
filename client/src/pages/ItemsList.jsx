import React, { useEffect, useState } from 'react';
import ItemService from '../services/Item.service';
import Card from '../components/Card';
import Loading from '../components/Loading';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await ItemService.getAllItems();
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'ไม่สามารถดึงข้อมูลรายการสินค้าได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  if (loading) return <Loading text="กำลังโหลดรายการสินค้า..." />;
  if (error) return <div className="text-center p-8 text-red-600 text-xl font-semibold">{error}</div>;
  if (items.length === 0) return <div className="text-center p-8 text-yellow-600 text-xl font-semibold">ไม่มีรายการสินค้าในระบบ</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">รายการสินค้า</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <Card key={item.itemId || item._id} item={item} onRefresh={fetchItems} />
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
