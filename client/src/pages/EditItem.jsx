import React, { useEffect, useState } from 'react';
import ItemForm from '../components/ItemForm';
import ItemService from '../services/Item.service';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';
import Loading from '../components/Loading';

const EditItem = () => {
  const { itemType, id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchItem = async () => {
    try {
      const res = await ItemService.getItemByTypeAndId(itemType, id);
      
      const data = res.data?.data || res.data || res;
      setInitialData({ ...data, itemType });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'โหลดไม่สำเร็จ', text: err?.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };
  fetchItem();
}, [itemType, id]);


  const handleEdit = async (itemData) => {
    try {
      await ItemService.editItemByTypeAndId(itemData.itemType, id, itemData);
      Swal.fire({ icon: 'success', title: 'แก้ไขสำเร็จ', timer: 2000, showConfirmButton: false });
      navigate('/');
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'แก้ไขไม่สำเร็จ', text: err?.response?.data?.message || err.message });
    }
  };

  if (loading) return <Loading text="กำลังโหลดข้อมูล..." />;
  if (!initialData) return <div className="text-center p-8">ไม่พบข้อมูล</div>;

  return <ItemForm initialData={initialData} onSubmit={handleEdit} isEditing={true} />;
};

export default EditItem;
