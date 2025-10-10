import Swal from "sweetalert2";

export async function confirm(title = "ยืนยันการทำรายการ", text = "") {
  const res = await Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });
  return res.isConfirmed;
}

export function toastOK(msg = "สำเร็จ") {
  return Swal.fire({ icon: "success", title: msg, timer: 1400, showConfirmButton: false });
}
export function toastERR(msg = "เกิดข้อผิดพลาด") {
  return Swal.fire({ icon: "error", title: msg });
}
