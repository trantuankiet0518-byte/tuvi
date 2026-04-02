HẦN 2: CHIA NHỎ MODULE (SYSTEM ARCHITECTURE)
Để code không bị "rối" và dễ debug, bạn nên chia thành các file (hoặc class) sau:
1. types.ts
Chứa các interface TuViInput, SaoResult, và các Enum về Can, Chi, Cục.
2. constants.ts
Chứa các bảng tra (Lookup tables):
CHINH_TINH_RELATION: Khoảng cách giữa các sao trong hệ Tử Vi/Thiên Phủ.
CAN_NAM_DATA: Tứ Hóa, Lộc Tồn, Khôi Việt.
CHI_NAM_DATA: Thiên Mã, Hoa Cái, Đào Hoa...
3. formulas.ts (Utility)
Chứa các hàm thuần túy:
normalize(n)
getLụcThậpHoaGiáp(can, chi)
calculateCuc(canMệnh, chiMệnh)
4. starEngine.ts (Core Logic)
Chia thành các hàm nhỏ:
anChinhTinh(ngay, thang, gio, cuc)
anVongThaiTue(chiNam)
anVongLocTon(canNam, gioiTinh, loaiNam)
anSaoGio(gioSinh, ngaySinh)
5. main.ts
Điểm tập trung, nhận Input -> Gọi StarEngine -> Trả về JSON kết quả cuối cùng.