// export default function HeroCarousel({
//   slides = [],
//   rounded = "rounded-xl",
//   height = 420,
// }) {
//   if (!slides.length) return null;

//   return (
//     <div
//       className={`carousel w-full ${rounded} overflow-hidden shadow-md`}
//       style={{ maxHeight: height }}
//     >
//       {slides.map((s, i) => {
//         const prev = `#slide-${i === 0 ? slides.length - 1 : i - 1}`;
//         const next = `#slide-${i === slides.length - 1 ? 0 : i + 1}`;
//         const id = `slide-${i}`;
//         return (
//           <div key={id} id={id} className="carousel-item relative w-full">
//             {/* รูปภาพเต็มกว้าง สูงตามอัตราส่วน */}
//             <img
//               src={s.src}
//               alt={s.alt || `slide-${i + 1}`}
//               className="w-full h-full object-cover"
//               loading="lazy"
//             />

//             {/* ปุ่มเลื่อนซ้าย/ขวา */}
//             <div className="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 transform justify-between">
//               <a href={prev} className="btn btn-circle btn-sm sm:btn-md">
//                 ❮
//               </a>
//               <a href={next} className="btn btn-circle btn-sm sm:btn-md">
//                 ❯
//               </a>
//             </div>

//             {/* จุดบอกตำแหน่งสไลด์ */}
//             <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
//               {slides.map((_, dotIdx) => (
//                 <a
//                   key={dotIdx}
//                   href={`#slide-${dotIdx}`}
//                   className={`btn btn-xs min-h-0 h-2 w-2 p-0 rounded-full ${
//                     dotIdx === i ? "btn-primary" : "btn-ghost"
//                   }`}
//                   aria-label={`Go to slide ${dotIdx + 1}`}
//                 />
//               ))}
//             </div>

//             {/* คลิกทั้งสไลด์ไปลิงก์ได้ (ถ้าต้องการ) */}
//             {s.href && (
//               <a
//                 href={s.href}
//                 className="absolute inset-0"
//                 aria-label={s.alt || "banner"}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }