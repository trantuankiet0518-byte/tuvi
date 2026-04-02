/**
 * Giải thích phụ tinh Bắc Tông (Thiên bàn tham chiếu lasotuvi / sách phổ biến).
 * Hiển thị trong popup chi tiết cung.
 */

export const PHU_TINH_GROUP_ORDER = [
  "tinh_duc_tu_hoa",
  "vong_loc_ton",
  "vong_thai_tue",
  "vong_truong_sinh",
  "caidia_quy_tinh",
  "van_tai",
  "tang_sao",
  "tinh_duyen",
  "khac",
] as const;

export const PHU_TINH_GROUP_LABEL: Record<(typeof PHU_TINH_GROUP_ORDER)[number], string> = {
  tinh_duc_tu_hoa: "Tứ hóa & cát tinh tài lộc",
  vong_loc_ton: "Vòng Lộc Tồn (Thập nhị lộc thức)",
  vong_thai_tue: "Vòng địa chi — Thái tuế",
  vong_truong_sinh: "Vòng Trường sinh",
  caidia_quy_tinh: "Cái, Địa võng — Quý, Ân",
  van_tai: "Văn — Tài — Thọ",
  tang_sao: "Sát phụ — Tang — Hình",
  tinh_duyen: "Đào hoa — Hỷ — Hồng loan",
  khac: "Khác",
};

/** Nhóm hiển thị cho từng key sao (trùng với engine minor star name). */
export const PHU_TINH_GROUP: Record<string, (typeof PHU_TINH_GROUP_ORDER)[number]> = {
  "Hoa Loc": "tinh_duc_tu_hoa",
  "Hoa Quyen": "tinh_duc_tu_hoa",
  "Hoa Khoa": "tinh_duc_tu_hoa",
  "Hoa Ky": "tinh_duc_tu_hoa",
  "Loc Ton": "vong_loc_ton",
  "Bac Sy": "vong_loc_ton",
  "Luc Si": "vong_loc_ton",
  "Thanh Long": "vong_loc_ton",
  "Tieu Hao": "vong_loc_ton",
  "Tuong Quan": "vong_loc_ton",
  "Tau Thu": "vong_loc_ton",
  "Phi Liem": "vong_loc_ton",
  "Hy Than": "vong_loc_ton",
  "Benh Phu": "vong_loc_ton",
  "Dai Hao": "vong_loc_ton",
  "Phuc Binh": "vong_loc_ton",
  "Quan Phu 2": "vong_loc_ton",
  "Thai Tue": "vong_thai_tue",
  "Thieu Duong": "vong_thai_tue",
  "Thien Khong": "vong_thai_tue",
  "Tang Mon": "vong_thai_tue",
  "Thieu Am": "vong_thai_tue",
  "Quan Phu 3": "vong_thai_tue",
  "Tu Phu": "vong_thai_tue",
  "Nguyet Duc": "vong_thai_tue",
  "Tue Pha": "vong_thai_tue",
  "Long Duc": "vong_thai_tue",
  "Bach Ho": "vong_thai_tue",
  "Phuc Duc Sao": "vong_thai_tue",
  "Thien Duc": "vong_thai_tue",
  "Dieu Khach": "vong_thai_tue",
  "Truc Phu": "vong_thai_tue",
  "Trang Sinh": "vong_truong_sinh",
  "Moc Duc": "vong_truong_sinh",
  "Quan Doi": "vong_truong_sinh",
  "Lam Quan": "vong_truong_sinh",
  "De Vuong": "vong_truong_sinh",
  Suy: "vong_truong_sinh",
  Benh: "vong_truong_sinh",
  Tu: "vong_truong_sinh",
  Mo: "vong_truong_sinh",
  Tuyet: "vong_truong_sinh",
  Thai: "vong_truong_sinh",
  "Duong Tinh": "vong_truong_sinh",
  "Thien La": "caidia_quy_tinh",
  "Dia Vong": "caidia_quy_tinh",
  "An Quang": "caidia_quy_tinh",
  "Thien Quy": "caidia_quy_tinh",
  "Thien Quan": "caidia_quy_tinh",
  "Thien Phuc": "caidia_quy_tinh",
  "Van Xuong": "van_tai",
  "Van Khuc": "van_tai",
  "Ta Phu": "van_tai",
  "Huu Bat": "van_tai",
  "Tam Thai": "van_tai",
  "Bat Toa": "van_tai",
  "Thien Khoi": "van_tai",
  "Thien Viet": "van_tai",
  "Thien Tai": "van_tai",
  "Thien Tho": "van_tai",
  "Thien Hu": "tang_sao",
  "Thien Khoc": "tang_sao",
  "Thien Hinh": "tang_sao",
  "Thien Rieu": "tang_sao",
  "Thien Y": "tang_sao",
  "Co Than": "tang_sao",
  "Qua Tu": "tang_sao",
  "Pha Toai": "tang_sao",
  "Kinh Duong": "khac",
  "Da La": "khac",
  "Hoa Tinh": "khac",
  "Linh Tinh": "khac",
  "Dia Khong": "khac",
  "Dia Kiep": "khac",
  "Thien Ma": "khac",
  "Hoa Cai": "khac",
  "Kiep Sat": "khac",
  "Dao Hoa": "tinh_duyen",
  "Hong Loan": "tinh_duyen",
  "Thien Hy": "tinh_duyen",
  "Long Tri": "khac",
  "Phuong Cac": "khac",
  "Giai Than": "khac",
};

/** Mô tả dài cho popup (Bắc Tông). */
export const PHU_TINH_DETAIL: Record<string, string> = {
  "Loc Ton":
    "Đóng vai trò trọng tâm của vòng Thập nhị lộc thức. Chủ tài lộc ổn, của cải tích lũy, sinh khí cho vòng sao lân cận. Khi đắc địa hay gặp cát tinh, dễ có nguồn thu đều; hãm hoặc gặp sát phải xét cùng Kình–Đà.",
  "Bac Sy":
    "Phụ tinh đồng cung Lộc Tồn trong bài an lasotuvi. Chủ về y dược, sức khỏe, giải họa bệnh; cần xét thêm chính tinh và vòng Thái tuế.",
  "Luc Si":
    "Bước kế Lộc Tồn theo chiều nam nữ với can âm dương năm. Liên quan sức mạnh, can đảm, có thể mang tính cạnh tranh hoặc lao động tay chân. Luận cần ghép Thất Sát, Tham Lang, hoặc Lộc Tồn.",
  "Thanh Long":
    "Sao cát trong vòng lộc thức, thường gắn may mắn nhẹ, thuận lợi xuất hành, việc vãng lai tốt. Thực tế luận đoán lấy bộ tổ hợp chính tinh làm gốc.",
  "Tieu Hao":
    "Chủ tiêu hao nhỏ, chi tiêu từng phần hoặc nỗ lực dồn vào việc không lớn. Gặp Tài–Lộc đắc có thể là tiêu mà tái sinh lợi; gặp sát tinh thì hao do thị phi.",
  "Tuong Quan":
    "Tượng quân uy, quyền bính, kỷ luật. Trong vòng lộc thức hay liên quan trách nhiệm, cấp trên. Độ mạnh phụ thuộc cách cục toàn lá.",
  "Tau Thu":
    "Quan hệ chứng từ, thủ tục, công văn. Đắc địa có thể lợi khoa cử, hành chính; nhược cần phòng giấy tờ rắc rối nếu hội hung tinh.",
  "Phi Liem":
    "Tính phiêu, biến động, đôi khi liên quan phiền toái nhỏ. Xét cùng Thiên Không, Địa Kiếp để biết nhẹ hay nặng.",
  "Hy Than":
    "Chủ tin vui nhỏ, hỷ sự trong nhà. Là phụ tinh nên luận kèm Hồng Loan, Thiên hỷ hoặc cung Phu thê.",
  "Benh Phu":
    "Liên quan bệnh tật, tiểu tai. Cần xem Tật Ách, Thiên y, Thiên hình; không tự đoán hung một mình.",
  "Dai Hao":
    "Hao tổn lớn hơn Tiểu hao trong cùng vòng: chi phí, đầu tư, hoặc sức lực bỏ ra nhiều. Kết hợp Tài Bạch, Phá quân để luận.",
  "Phuc Binh":
    "Che chở, ẩn mình, đôi khi trì hoãn. Có trường phái xem là tinh giải trừ nhẹ; luận theo toàn bộ.",
  "Quan Phu 2":
    "Ám chỉ quan phi, thị phi, công việc liên quan pháp lý nhẹ. Trong vòng lộc thức là một bước của Thập nhị hành; soi kèm Cự Môn, Thiên cơ.",
  "Thai Tue":
    "Trung tâm vòng Thái tuế — gốc theo chi năm sinh. Năm gặp tuế quá hay phạm tuế cần lấy đây làm neo. Chủ biến động đương niên, không nhất thiết hung nếu cục cát.",
  "Thieu Duong":
    "Sao phụ theo Thái tuế, thuộc nhóm tuế tinh. Có sách cho là chủ dương cực nhỏ, dao động nóng; luận nhanh hay chậm tùy cách cục.",
  "Thien Khong":
    "Hư vô, trống, dễ có việc “có mà như không”. Cùng cung Thiếu dương trong lasotuvi; xét Địa không để phân hư thực.",
  "Tang Mon":
    "Tang lễ, bi ai, chia ly. Mạnh nhất khi đi với Dưỡng, Tuyệt, hoặc Bạch hổ trong vận hạn. Luận phục vụ.",
  "Thieu Am":
    "Tuế phụ âm cực, nhỏ hơn Thiếu dương trong cách quy ước; về tinh thần có thể trầm hoặc âm thầm. So sánh toàn lá.",
  "Quan Phu 3":
    "Quan phi thứ hai trong vòng tuế — tinh nhỏ nhưng có thể gây thị phi. Xét cùng Cự Môn, Thái tuế.",
  "Tu Phu":
    "Tử tinh trong vòng tuế, liên quan nguy hiểm nhỏ, trẻ nhỏ, hoặc việc cần thận trọng. Luận theo cung đặt.",
  "Nguyet Duc":
    "Cát tinh trong vòng Thái tuế (lasotuvi an đồng cung Tử phù). Chủ âm đức, nữ quý nhân, hoặc giải nhẹ hung nhỏ.",
  "Tue Pha":
    "Phá tuế — năm xung dễ có thay đổi, phá cũ lập mới. Không cố định hung hay cát; xem đại vận tiểu vận.",
  "Long Duc":
    "Long đức, nhân hậu, che chở; một trong các bước vòng tuế có tính giải hung.",
  "Bach Ho":
    "Hổ tinh — thương tật, huyết quang, hoặc việc gấp. Luận cùng Thiên hình, Kình dương, vận hạn.",
  "Phuc Duc Sao":
    "Phúc đức trong vòng tuế (khác với tên cung Phúc đức). Chủ phúc nhẹ, đức hạnh lan tỏa khi cục cát.",
  "Thien Duc":
    "Thiên đức, cát tinh đi kèm trong lasotuvi, giải hoá nhẹ hung tinh nhỏ.",
  "Dieu Khach":
    "Khách tang, viếng thăm, tang ma; hoặc khách đến không mời. Tính phục vụ trong luận đoán.",
  "Truc Phu":
    "Trực phù, thẳng thắn hoặc va chạm nhỏ, cũng được liên hệ thủ tục.",
  "Trang Sinh":
    "Mười hai bước Trường sinh — bắt đầu sinh phát theo cục (Thủy nhị tại Thân…). Chủ sự nảy nở, khởi đầu. Chiều vòng xem giới nam nữ trong sách.",
  "Moc Duc":
    "Mộc dục — trưởng thành, học hỏi, thử sức; còn gọi là “quan đới” ở một số bảng — engine tách riêng.",
  "Quan Doi":
    "Quan đới / tụ bến — chỗ dừng nghỉ của vòng; cần đối chiếu bản lasotuvi Việt Nam.",
  "Lam Quan":
    "Lâm quan — vào quan trường, có trách nhiệm; cát cho sự nghiệp khi chính tinh đẹp.",
  "De Vuong":
    "Đế vượng — đỉnh vượng của vòng trường sinh; sức mạnh, danh vọng tạm thời đạt đỉnh theo vận.",
  "Suy":
    "Suy — hơi suy, hụt hơi; chuẩn bị vào giai đoạn bệnh tật tinh.",
  "Benh":
    "Bệnh — suy yếu, ốm đau tiềm ẩn cần xét Tật Ách.",
  "Tu":
    "Tử — đoạn tận một giai đoạn; không đồng nghĩa chết người, mà là kết thúc chu kỳ. Luận kỹ với Phụ mẫu, Tử tức.",
  "Mo":
    "Mộ — tàng, dự trữ, nghỉ ngơi; cũng liên quan mồ mả trong từ điển cổ.",
  "Tuyet":
    "Tuyệt — cùng cực, không tiến thêm; chờ chuyển sang Thai–Dưỡng.",
  "Thai":
    "Thai — mang thai tinh thần khởi sự, ý tưởng mới.",
  "Duong Tinh":
    "Dưỡng — nuôi dưỡng, chăm sóc, an dưỡng; tiếp theo chu kỳ sau Tuyệt.",
  "Kinh Duong":
    "Dương nhận, xung kích, mổ xẻ, tranh chấp. Bắc Tông xếp đôi với Đà La; xét nam nữ, cung Mệnh, vận hạn.",
  "Da La":
    "Âm chướng, vương vướng, trở lực âm thầm. Cùng Kình dương hình thành cặp Kình–Đà cần luận đồng bộ.",
  "Van Xuong":
    "Văn chương, khoa danh, học thuật. Cách an: từ Thìn thuận giờ sinh Văn khúc, Văn xương đối chiếu (lasotuvi).",
  "Van Khuc":
    "Tài hoa nghệ thuật, từ ngữ tinh tế; đôi với Văn xương.",
  "Ta Phu":
    "Tả phù — giúp đỡ ngoại tại, quý nhân bên trái (theo quy ước cổ). An theo tháng âm từ Thìn.",
  "Huu Bat":
    "Hữu bật đối xứng Tả phù; phối hợp luận việc người giúp.",
  "Thien Khoi":
    "Quý nhân đứng đắn, danh vọng, khoa giáp; bắc tông xếp theo can năm.",
  "Thien Viet":
    "Quý nhân nữ tính / âm trợ; công thức đối Khôi qua trục Sửu–Mùi trong lasotuvi.",
  "Thien Ma":
    "Di chuyển, biến động địa lý, xuất ngoại, hay thay chỗ ở. Theo chi năm.",
  "Hoa Tinh":
    "Nóng, gấp, tai nạn lửa hoặc cãi vã; an theo nhóm tam hợp chi + giới tính can năm.",
  "Linh Tinh":
    "Bất ngờ, động, tai nạn nhỏ; luận cùng Hỏa.",
  "Dia Khong":
    "Hư vọng, mất mát về tinh thần hoặc kế hoạch; công thức Hợi nghịch đếm giờ trong lasotuvi (đã đồng bộ mã).",
  "Dia Kiep":
    "Kiếp sát đất, trắc trở bất ngờ; đối lập Địa không trong cách an.",
  "Dao Hoa":
    "Nhân duyên, dễ thu hút; lasotuvi an theo Kiếp sát +4 bước (đã đồng bộ).",
  "Hong Loan":
    "Hôn hỉ, duyên vợ chồng, lễ nghi; công thức từ Mão theo chi.",
  "Thien Hy":
    "Song hỷ — việc vui song song Hồng loan.",
  "Hoa Loc":
    "Tứ hóa — Tài lộc, thu nhập, cơ hội khi gặp vận. Sao được hóa theo can năm.",
  "Hoa Quyen":
    "Tứ hóa — Quyền uy, điều khiển, thăng chức.",
  "Hoa Khoa":
    "Tứ hóa — Danh khoa, tiếng tăm tốt.",
  "Hoa Ky":
    "Tứ hóa — Trở ngại, thị phi, tiểu hung khi gặp vận.",
  "Long Tri":
    "Danh tiếng, đẹp bề ngoài, phù hợp nghệ thuật; an từ Thìn theo chi.",
  "Phuong Cac":
    "Phượ thích, huy hoàng; đi với Long trì nhiều sách.",
  "Giai Than":
    "Giải thần — giải trừ nhẹ; đồng cung Phượng các trong lasotuvi.",
  "Tam Thai":
    "Văn quý, đệ tam giáp, thi cử; an theo tháng + ngày âm.",
  "Bat Toa":
    "Bát tọa — quý nhân ngồi, địa vị; đối Tam thai.",
  "An Quang":
    "Ân quang — ân huệ, phúc nhỏ; lasotuvi an từ Văn xương + ngày.",
  "Thien Quy":
    "Thiên quý đối Ân quang qua Sửu–Mùi.",
  "Thien Tai":
    "Tài mệnh thiên phú — lộc thực; từ Mệnh + chi năm.",
  "Thien Tho":
    "Thọ tinh — từ Thân + chi năm trong lasotuvi.",
  "Thien Hu":
    "Hư tinh, dễ thất vọng hoặc hão danh nhẹ; an theo Thân dương/nghịch.",
  "Thien Khoc":
    "Khốc, bi ai, chia ly; ghép Thiên hư.",
  "Thien Quan":
    "Quan lộc trời, chức tước; bảng theo can.",
  "Thien Phuc":
   "Phúc lộc từ trời; bảng theo can.",
  "Thien Hinh":
    "Hình phạt, phẫu thuật, thương tích; an theo tháng từ Dậu.",
  "Thien Rieu":
    "Rượu chè, sắc dục, thị phi nhẹ; cách Thiên hình +4.",
  "Thien Y":
    "Y tinh — thuốc men, chữa lành; đồng cung Thiên riêu trong lasotuvi.",
  "Co Than":
    "Cô đơn, ít thân; an theo chi cụm Tứ mộ.",
  "Qua Tu":
    "Quả tú — vắng, thiếu, đôi khi ảnh hưởng duyên; đối Cô thần.",
  "Hoa Cai":
    "Văn chương hoa lệ, che cái; thường +2 từ Thiên mã.",
  "Kiep Sat":
    "Kiếp sát trên thiên bàn; +3 từ Thiên mã trước Đào hoa.",
  "Pha Toai":
    "Phá toái nhỏ, hao tán; theo chi năm modulo.",
  "Thien La":
    "Thiên la — “lưới trời” thị phi/ràng buộc nhẹ; vị trí cố định Tỵ trong lasotuvi.",
  "Dia Vong":
    "Địa võng — vướng đất, trói buộc tinh thần nhẹ; vị trí cố định Hợi.",
};
