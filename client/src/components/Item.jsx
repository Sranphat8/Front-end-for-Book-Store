import Card from "./Card";

// Items component รับ prop เป็น Array ชื่อ items
const Items = ({ items }) => {

    // ตรวจสอบว่า items เป็น Array และมีข้อมูลหรือไม่
    const hasItems = Array.isArray(items) && items.length > 0;

    return (
        <div className="flex">
            <div className="flex flex-wrap justify-center gap-4 w-full">
                
        
                {hasItems ? (
                    items.map((item) => {
                     
                        return (
                            <Card
                                key={item.itemId || item._id} 
                                item={item} // ส่ง Object item ทั้งหมดไปให้ Card
                                
                            />
                        );
                    })
                ) : (
                    //  แสดงข้อความ "No content" เมื่อไม่มี items 
                    <div className="w-full flex justify-center mt-10 text-lg font-semibold text-gray-700">
                        ไม่พบรายการสินค้าในขณะนี้
                    </div>
                )}
            </div>
        </div>
    );
};

export default Items;