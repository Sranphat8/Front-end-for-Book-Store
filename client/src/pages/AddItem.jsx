import React from 'react';
import ItemForm from '../components/ItemForm';
import ItemService from '../services/Item.service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddItem = () => {
  const navigate = useNavigate();

  const handleInsert = async (itemData) => {
    try {
      await ItemService.insertItem(itemData.itemType, itemData);
      await Swal.fire({
        icon: 'success',
        title: 'เพิ่มสำเร็จ!',
        text: `${itemData.title} ถูกเพิ่มเข้าระบบแล้ว`,
        timer: 2000,
        showConfirmButton: false
      });
      
      navigate('/');
    } catch (error) {
      const apiMessage = error?.response?.data?.message || 'เกิดข้อผิดพลาดในการติดต่อ API';
      const validationErrors = error?.response?.data?.errors
        ? error.response.data.errors.map(e => e.message || e.msg).join('; ')
        : '';
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มไม่สำเร็จ',
        text: `${apiMessage}${validationErrors ? ': ' + validationErrors : ''}`
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">เพิ่มรายการสินค้าใหม่</h1>
      <ItemForm onSubmit={handleInsert} isEditing={false} />
    </div>
  );
};

export default AddItem;
