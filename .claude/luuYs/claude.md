1. QUY ƯỚC HỆ QUY CHIẾU (NORMALIZATION)
Mọi phép toán cộng/trừ trên vòng tròn 12 cung phải đi qua hàm normalize để tránh lỗi Index Out of Bounds.
Chiều thuận: normalize(index + offset)
Chiều nghịch: normalize(index - offset)
Hàm chuẩn: const normalize = (n: number): number => ((n % 12) + 12) % 12;
Index: Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5, Ngọ=6, Mùi=7, Thân=8, Dậu=9, Tuất=10, Hợi=11.
2. RÀNG BUỘC TỨ HÓA (BẮC TÔNG CHUẨN)
Đây là "vân tay" để phân biệt Bắc Tông. Ép thuật toán dùng bảng sau, đặc biệt lưu ý Can Mậu, Canh, Nhâm:
Can	Hóa Lộc	Hóa Quyền	Hóa Khoa	Hóa Kỵ
Giáp	Liêm Trinh	Phá Quân	Vũ Khúc	Thái Dương
Ất	Thiên Cơ	Thiên Lương	Tử Vi	Thái Âm
Bính	Thiên Đồng	Thiên Cơ	Văn Xương	Liêm Trinh
Đinh	Thái Âm	Thiên Đồng	Thiên Cơ	Cự Môn
Mậu	Tham Lang	Thái Âm	Hữu Bật	Thiên Cơ
Kỷ	Vũ Khúc	Tham Lang	Thiên Lương	Văn Khúc
Canh	Thái Dương	Vũ Khúc	Thiên Đồng	Thái Âm
Tân	Cự Môn	Thái Âm	Văn Xương	Thiên Lương
Nhâm	Thiên Lương	Tử Vi	Thiên Phủ	Vũ Khúc
Quý	Phá Quân	Cự Môn	Thái Âm	Tham Lang
3. RÀNG BUỘC CÁC SAO PHỨC TẠP
3.1 Hỏa Tinh & Linh Tinh (Thuật toán Tra điểm khởi + Đếm)
Không được an cố định. Phải tuân thủ:
Xác định điểm khởi (Base):
Dần Ngọ Tuất: Hỏa khởi Sửu(1), Linh khởi Mão(3).
Thân Tý Thìn: Hỏa khởi Dần(2), Linh khởi Tuất(10).
Tỵ Dậu Sửu: Hỏa khởi Mão(3), Linh khởi Tuất(10).
Hợi Mão Mùi: Hỏa khởi Dậu(9), Linh khởi Tuất(10).
Xác định chiều và điểm dừng:
Dương Nam / Âm Nữ: Hỏa đi THUẬN, Linh đi NGHỊCH.
Âm Nam / Dương Nữ: Hỏa đi NGHỊCH, Linh đi THUẬN.
Số cung di chuyển = gioSinh.
3.2 Kình Dương & Đà La
Kình Dương luôn ở: normalize(locTon + 1).
Đà La luôn ở: normalize(locTon - 1).
Check logic: Lộc Tồn chỉ đóng ở 4 sinh (Dần Thân Tỵ Hợi) và 4 bại (Tý Ngọ Mão Dậu). Do đó Kình/Đà không bao giờ nằm ở Tứ Mộ (Thìn Tuất Sửu Mùi).
3.3 Tuần & Triệt (Cặp cung)
Phải lưu trữ dưới dạng mảng 2 phần tử vì chúng chặn giữa 2 cung:
Triệt:
Giáp Kỷ: Thân-Dậu (8, 9)
Ất Canh: Ngọ-Mùi (6, 7)
Bính Tân: Thìn-Tỵ (4, 5)
Đinh Nhâm: Dần-Mão (2, 3)
Mậu Quý: Tý-Sửu (0, 1)
Tuần: Xác định dựa vào năm sinh thuộc con giáp (Giáp...) đầu tuần nào. Ví dụ: Giáp Tý thì Tuần tại Tuất-Hợi.
4. RÀNG BUỘC TÍNH ĐỐI XỨNG (UNIT TEST CONSTRAINTS)
Sau khi an xong, kiểm tra các cặp sao để đảm bảo không lệch code:
Xương - Khúc: Đối xứng qua trục Thìn - Tuất (Index 4 và 10).
Tả - Hữu: Đối xứng qua trục Sửu - Mùi (Index 1 và 7).
Không - Kiếp: Đối xứng qua trục Tỵ - Hợi (Index 5 và 11).
Long Trì - Phượng Các: Đối xứng qua trục Thìn - Tuất.
Tam Thai - Bát Tọa: Phải an sau Tả Hữu.
Tam Thai = normalize(taPhu + ngaySinh - 1)
Bat Toa = normalize(huuBat - ngaySinh + 1)
5. VÒNG LỘC TỒN & TRÀNG SINH (CHIỀU QUAY)
Đây là nơi dễ sai nhất khi đổi giới tính/năm sinh:
Dương Nam / Âm Nữ: An THUẬN (theo chiều kim đồng hồ).
Âm Nam / Dương Nữ: An NGHỊCH (ngược chiều kim đồng hồ).
Vòng Lộc Tồn (12 sao): Bác Sĩ, Lực Sĩ, Thanh Long, Tiểu Hao, Tướng Quân, Tấu Thư, Phi Liêm, Hỷ Thần, Bệnh Phù, Đại Hao, Phục Binh, Quan Phủ.
6. VALIDATION TRƯỚC KHI XUẤT (OUTPUT CHECK)
Mỗi lá số phải có đủ 14 Chính Tinh.
Tử Vi và Thiên Phủ luôn đối xứng qua trục Tỵ - Hợi (Tổng index = 16 hoặc 4 sau khi normalize).
Cung Mệnh và Thân không bao giờ lệch quá 12 cung (luôn nằm trong 0-11).
Kiểm tra Can năm và Tứ hóa: Nếu Can là Canh, bắt buộc Thái Dương phải có Hóa Lộc.
