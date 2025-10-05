import React, { useState, useEffect } from 'react';

const initialItemState = {
  itemType: 'Book',
  title: '',
  author: '',
  category: '',
  publishYear: null,
  isbn: '',
  publisher: '',
  coverImage: '',
  description: '',
  location: '',
  edition: '',
  pageCount: null,
  language: '',
  genre: '',
  issn: '',
  volume: '',
  issue: '',
  publicationFrequency: '',
  series: '',
  volumeNumber: null,
  illustrator: '',
  colorType: '',
  targetAge: '',
  status: 'AVAILABLE',
};

const ItemForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [itemData, setItemData] = useState({ ...initialItemState, ...initialData });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setItemData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === 'number') finalValue = value === '' ? null : parseInt(value, 10);
    setItemData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...itemData };

    // แปลง publishYear ให้เป็น Number
    ['publishYear', 'pageCount', 'volumeNumber'].forEach(f => {
    if (payload[f] !== null && payload[f] !== '') payload[f] = Number(payload[f]);
  });

  // เปลี่ยนค่า '' เป็น null สำหรับ field ที่เป็น URL หรือ optional
  payload.coverImage = payload.coverImage?.trim() || null;
  payload.location = payload.location?.trim() || null;

 // Validation ตามประเภท
  switch (payload.itemType) {
    case 'Book':
      if (!payload.title || !payload.author || !payload.isbn) {
        alert('กรุณากรอก Title, Author, ISBN');
        return;
      }
      // ตั้งค่า field อื่น ๆ เป็น null
      payload.issn = payload.volume = payload.issue = payload.publicationFrequency = null;
      payload.series = payload.volumeNumber = payload.illustrator = payload.colorType = payload.targetAge = null;
      break;

    case 'Journal':
      if (!payload.title || !payload.author || !payload.issn || !payload.volume || !payload.issue) {
        alert('กรุณากรอก Title, Author, ISSN, Volume, Issue');
        return;
      }
      payload.isbn = payload.series = payload.volumeNumber = payload.illustrator = payload.colorType = payload.targetAge = null;
      payload.edition = payload.pageCount = payload.language = payload.genre = null;
      break;

    case 'Comic':
      if (!payload.title || !payload.series || payload.volumeNumber === null) {
        alert('กรุณากรอก Title, Series, Volume Number');
        return;
      }
      payload.isbn = payload.issn = payload.volume = payload.issue = payload.publicationFrequency = null;
      payload.edition = payload.pageCount = payload.language = payload.genre = null;
      break;
  }

  payload.status = payload.status || 'AVAILABLE';
  onSubmit(payload);
};

  const renderSpecificFields = () => {
    const type = itemData.itemType;
    if (type === 'Book') {
      return (
        <>
          <input type="text" name="edition" placeholder="ครั้งที่พิมพ์ (edition)" value={itemData.edition || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="number" name="pageCount" placeholder="จำนวนหน้า (pageCount)" value={itemData.pageCount || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="language" placeholder="ภาษา (language)" value={itemData.language || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="genre" placeholder="ประเภทหนังสือ (genre)" value={itemData.genre || ''} onChange={handleChange} className="input input-bordered w-full" />
        </>
      );
    }
    if (type === 'Journal') {
      return (
        <>
          <input type="text" name="issn" placeholder="หมายเลข ISSN (issn)" value={itemData.issn || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="publicationFrequency" placeholder="ความถี่ในการออก (publicationFrequency)" value={itemData.publicationFrequency || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="volume" placeholder="เล่มที่ (volume)" value={itemData.volume || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="issue" placeholder="ฉบับที่ (issue)" value={itemData.issue || ''} onChange={handleChange} className="input input-bordered w-full" />
        </>
      );
    }
    if (type === 'Comic') {
      return (
        <>
          <input type="text" name="series" placeholder="ชื่อซีรีส์ (series)" value={itemData.series || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="number" name="volumeNumber" placeholder="เล่มที่ในซีรีส์ (volumeNumber)" value={itemData.volumeNumber || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="illustrator" placeholder="นักวาด (illustrator)" value={itemData.illustrator || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="colorType" placeholder="ประเภทสี (colorType)" value={itemData.colorType || ''} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="targetAge" placeholder="กลุ่มอายุเป้าหมาย (targetAge)" value={itemData.targetAge || ''} onChange={handleChange} className="input input-bordered w-full" />
        </>
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-base-100 shadow-xl rounded-lg space-y-4">
      <h2 className="text-2xl font-bold">{isEditing ? `แก้ไข ${itemData.title}` : 'เพิ่ม Item ใหม่'}</h2>

      {!isEditing && (
        <select name="itemType" value={itemData.itemType} onChange={handleChange} className="select select-bordered w-full">
          <option value="Book">Book</option>
          <option value="Journal">Journal</option>
          <option value="Comic">Comic</option>
        </select>
      )}

      <input type="text" name="title" placeholder="ชื่อหนังสือ / สื่อ (title)" value={itemData.title} onChange={handleChange} className="input input-bordered w-full" required />
      <input type="text" name="author" placeholder="ผู้แต่ง / ผู้เขียน (author)" value={itemData.author} onChange={handleChange} className="input input-bordered w-full" required />
      <input type="text" name="category" placeholder="หมวดหมู่ (category)" value={itemData.category || ''} onChange={handleChange} className="input input-bordered w-full" />
      <input type="number" name="publishYear" placeholder="ปีที่พิมพ์ (publishYear)" value={itemData.publishYear || ''} onChange={handleChange} className="input input-bordered w-full" />
      <input type="text" name="isbn" placeholder="หมายเลข ISBN (isbn)" value={itemData.isbn || ''} onChange={handleChange} className="input input-bordered w-full" />
      <input type="text" name="publisher" placeholder="สำนักพิมพ์ (publisher)" value={itemData.publisher || ''} onChange={handleChange} className="input input-bordered w-full" />
      <input type="text" name="location" placeholder="ตำแหน่งเก็บ (location)" value={itemData.location || ''} onChange={handleChange} className="input input-bordered w-full" />
      <input type="url" name="coverImage" placeholder="URL รูปปก (coverImage)" value={itemData.coverImage || ''} onChange={handleChange} className="input input-bordered w-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-box bg-base-200">
        <h3 className="col-span-full font-bold">รายละเอียดเฉพาะ {itemData.itemType}</h3>
        {renderSpecificFields()}
      </div>

      <textarea name="description" placeholder="คำอธิบาย (description)" value={itemData.description || ''} onChange={handleChange} className="textarea textarea-bordered w-full" />

      <button type="submit" className="btn btn-primary mt-4">
        {isEditing ? 'บันทึกแก้ไข' : 'เพิ่ม Item'}
      </button>
    </form>
  );
};

export default ItemForm;
