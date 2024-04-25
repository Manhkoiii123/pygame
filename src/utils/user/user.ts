export const covertStatus = (status: string) => {
  if (status === "Completed") {
    return {
      bgColor: "#A9F5AB",
      text: "Completed",
    };
  } else if (status === "In process") {
    return {
      bgColor: "#FFAC9F",
      text: "In Process",
    };
  } else if (status === "Not started") {
    return {
      bgColor: "#FFD0A5",
      text: "Not Started",
    };
  } else {
    throw new Error("Invalid index");
  }
};
export const convertDate = (date: string) => {
  var parts = date.split("/");

  // Lấy ngày và tháng, nếu tháng có một chữ số, thêm 0 vào trước
  var ngay = parts[1].length === 1 ? "0" + parts[1] : parts[1];
  var thang = parts[0].length === 1 ? "0" + parts[0] : parts[0];
  var nam = parts[2];

  // Xây dựng chuỗi mới với thứ tự ngày và tháng được hoán đổi
  var ngay_sau_chuyen_doi = ngay + "/" + thang + "/" + nam;
  return ngay_sau_chuyen_doi;
};
export const sosanhDate = (ngay1: string, ngay2: string) => {
  var ngay_thang_nam_1 = ngay1.split("/");
  var ngay_thang_nam_2 = ngay2.split("/");

  var ngay_1 = parseInt(ngay_thang_nam_1[0]);
  var thang_1 = parseInt(ngay_thang_nam_1[1]);
  var nam_1 = parseInt(ngay_thang_nam_1[2]);

  var ngay_2 = parseInt(ngay_thang_nam_2[0]);
  var thang_2 = parseInt(ngay_thang_nam_2[1]);
  var nam_2 = parseInt(ngay_thang_nam_2[2]);
  if (nam_1 > nam_2) {
    return true;
  } else if (nam_1 < nam_2) {
    return false;
  } else {
    if (thang_1 > thang_2) {
      return true;
    } else if (thang_1 < thang_2) {
      return false;
    } else {
      if (ngay_1 > ngay_2) {
        return true;
      } else if (ngay_1 < ngay_2) {
        return false;
      } else {
        return false;
      }
    }
  }
};
