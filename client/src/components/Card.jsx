import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ItemService from '../services/Item.service';
import { useNavigate } from 'react-router';

const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: 'ว่าง', color: 'badge-success' },
  { value: 'BORROWED', label: 'ถูกยืม', color: 'badge-error' },
  { value: 'MAINTENANCE', label: 'ซ่อมบำรุง', color: 'badge-warning' },
];

const showToast = (message, type = 'success') => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: 'shadow-lg rounded-lg'
    }
  });
};

const Card = ({ item, onRefresh }) => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(item.status);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `คุณต้องการลบ "${item.title}" หรือไม่?`,
      text: "รายการที่ลบไปแล้วจะไม่สามารถกู้คืนได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await ItemService.deleteItem(item.itemId || item._id, item.itemType);
        showToast(`"${item.title}" ถูกลบออกจากระบบแล้ว`, 'success');
        onRefresh();
      } catch (err) {
        console.error(err);
        showToast('เกิดข้อผิดพลาดในการลบรายการ', 'error');
      }
    }
  };

  const handleEdit = () => navigate(`/edit/${item.itemType}/${item.itemId || item._id}`);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await ItemService.editItemById(item.itemId || item._id, item.itemType, { ...item, status: newStatus });
      setCurrentStatus(newStatus);
      showToast('อัปเดตสถานะเรียบร้อย!', 'success');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถอัปเดตสถานะ', 'error');
    }
  };

  const handleView = () => {
    Swal.fire({
      title: item.title,
      html: `
        <p><b>ผู้แต่ง:</b> ${item.author || '-'}</p>
        <p><b>ประเภท:</b> ${item.genre || item.series || '-'}</p>
        <p><b>สถานะ:</b> ${STATUS_OPTIONS.find(opt => opt.value === currentStatus)?.label || 'ไม่ระบุ'}</p>
        <p><b>คำอธิบาย:</b> ${item.description || '-'}</p>
      `,
      imageUrl: item.coverImage || 'https://placehold.co/400x600?text=No+Image',
      imageHeight: 400,
      imageAlt: item.title,
      showCloseButton: true,
      showConfirmButton: false,
      width: '600px',
    });
  };

  const statusLabel = STATUS_OPTIONS.find(opt => opt.value === currentStatus)?.label || 'ไม่ระบุ';
  const statusColor = STATUS_OPTIONS.find(opt => opt.value === currentStatus)?.color || 'badge-neutral';

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-64 object-cover"
            onError={e => e.target.src = 'https://placehold.co/400x600?text=No+Image'}
          />
        ) : (
          <div className="w-full h-64 bg-base-200 flex items-center justify-center">
            <span className="text-6xl">📚</span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <span className={`badge ${statusColor} px-3 py-1 text-sm font-semibold`}>
            {statusLabel}
          </span>
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            className="select select-sm mt-1 w-full border rounded"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </figure>

      <div className="card-body">
        <h2 className="card-title line-clamp-2">{item.title}</h2>
        <p className="text-sm"><span className="font-semibold">ผู้แต่ง:</span> {item.author || '-'}</p>
        {item.genre && <p className="text-sm"><span className="font-semibold">ประเภท:</span> {item.genre}</p>}
        {item.description && <p className="text-sm text-gray-600 line-clamp-2 mt-2">{item.description}</p>}
        <div className="card-actions justify-end mt-4">
          <button onClick={handleView} className="btn btn-sm btn-outline btn-info gap-1">👁️ ดู</button>
          <button onClick={handleEdit} className="btn btn-sm btn-outline btn-warning gap-1">✏️ แก้ไข</button>
          <button onClick={handleDelete} className="btn btn-sm btn-outline btn-error gap-1">🗑️ ลบ</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
