import React, { useEffect, useState } from 'react';

import ItemService from '../services/Item.service';
import Card from '../components/Card';
import Loading from '../components/Loading';


const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ItemService.getAllItems();
      let itemArray = [];

      // ตรวจสอบโครงสร้าง response
      if (Array.isArray(response.data)) {
        itemArray = response.data;
      } else if (response.data) {
        // ถ้าเป็น object ตาม type (books, journals, comics)
        itemArray = Object.values(response.data)
          .filter(val => Array.isArray(val))
          .flat();
      }

      setItems(itemArray || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || 'ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <Loading text="กำลังโหลดรายการทั้งหมด..." />;
  if (error) return <div className="text-center text-error text-xl p-8">{error}</div>;
  if (!Array.isArray(items) || items.length === 0)
    return (
      <div className="text-center p-10 bg-base-200 rounded-box">
        <p className="text-lg">ไม่พบรายการในระบบ.</p>
      </div>
    );

  // จัดกลุ่มตาม itemType
  const groupedItems = items.reduce((acc, item) => {
    const typeKey = item.itemType || 'Item';
    if (!acc[typeKey]) acc[typeKey] = [];
    acc[typeKey].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">📚 คลังรายการทั้งหมด</h1>

      {Object.keys(groupedItems).map(typeKey => (
        <section key={typeKey} className="mb-10">
          <h2 className="text-3xl font-semibold mb-6 border-b-2 pb-2">
            {typeKey}s ({groupedItems[typeKey].length} รายการ)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupedItems[typeKey].map(item => (
              <Card
                key={item.itemId || item._id}
                item={item}
                type={typeKey.toLowerCase() + 's'}
                onRefresh={fetchItems}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
