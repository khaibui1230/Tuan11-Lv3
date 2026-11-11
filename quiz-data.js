// Ngân hàng câu hỏi ôn tập Tuần 11 - IC3 GS6 Level 3
// Bài 13: Các nguyên tắc đánh giá thông tin
// Bài 14: AI hỗ trợ tìm kiếm thông tin an toàn

const QUIZ_QUESTIONS = [
  // --- BÀI 13: CÁC NGUYÊN TẮC ĐÁNH GIÁ THÔNG TIN ---
  {
    id: 1,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "multiple", // multiple select (Chọn 2)
    requiredCount: 2,
    question: "Khi tìm kiếm thông tin đáng tin cậy và chính xác trên mạng, người dùng nên cẩn trọng với những điều nào sau đây? (Chọn 2 đáp án)",
    options: [
      { id: "A", text: "Các bài báo trên Web đã được đánh giá bởi các học giả đáng tin cậy." },
      { id: "B", text: "Các bài đăng trên mạng xã hội không trích dẫn nguồn của chúng." },
      { id: "C", text: "Ý kiến của bạn bè và thành viên gia đình được trình bày dưới dạng cơ sở lập luận." },
      { id: "D", text: "Bài báo khoa học có thông tin rõ ràng về tác giả và lý lịch của họ." },
      { id: "E", text: "Những trang Web có chú thích rõ ràng nguồn gốc của thông tin." }
    ],
    correct: ["B", "C"],
    explanation: "Bài đăng trên mạng xã hội không có trích dẫn nguồn và ý kiến cá nhân của người thân/bạn bè chưa qua kiểm chứng khoa học chỉ mang tính cảm tính, không thể dùng làm bằng chứng xác thực đáng tin cậy."
  },
  {
    id: 2,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "single",
    question: "Yếu tố nào sau đây giúp đánh giá tính chính xác của thông tin trên một trang web chuyên môn?",
    options: [
      { id: "A", text: "Trang web cho phép người dùng bình luận tự do." },
      { id: "B", text: "Tác giả không có bằng cấp nhưng viết bài rất rõ ràng." },
      { id: "C", text: "Có tài liệu tham khảo và nguồn đính kèm (nếu có)." },
      { id: "D", text: "Trang web có nhiều quảng cáo bắt mắt để thu hút người xem." }
    ],
    correct: "C",
    explanation: "Một trang web chuyên môn đáng tin cậy phải có danh mục tài liệu tham khảo, số liệu dẫn chứng và nguồn gốc dữ liệu rõ ràng để người đọc có thể kiểm chứng chéo."
  },
  {
    id: 3,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "single",
    question: "Khi đọc các bài viết trên mạng, yếu tố nào sau đây cho thấy thông tin có thể bị thiên vị và cần cân nhắc kỹ lưỡng?",
    options: [
      { id: "A", text: "Tác giả có lý lịch học thuật và thông tin liên hệ rõ ràng." },
      { id: "B", text: "Có nhiều trích dẫn số liệu từ các tổ chức chuyên môn quốc tế." },
      { id: "C", text: "Bài viết thể hiện quan điểm chủ quan dựa trên tôn giáo, địa vị xã hội hoặc chính trị." },
      { id: "D", text: "Bài viết được xuất bản trên một tạp chí học thuật có bình duyệt." }
    ],
    correct: "C",
    explanation: "Khi bài viết bị chi phối bởi quan điểm cá nhân, lập trường chính trị, tôn giáo hoặc quyền lợi phe nhóm, thông tin rất dễ bị cắt xén, thiếu khách quan và mang tính định hướng thiên vị."
  },
  {
    id: 4,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "single",
    question: "Trên công cụ tìm kiếm (như Google), bộ lọc tìm kiếm nào sẽ cung cấp cho người dùng kết quả về các mặt hàng họ có thể đặt mua?",
    options: [
      { id: "A", text: "Maps (Bản đồ)" },
      { id: "B", text: "Videos (Video)" },
      { id: "C", text: "Images (Hình ảnh)" },
      { id: "D", text: "Shopping (Mua sắm)" }
    ],
    correct: "D",
    explanation: "Bộ lọc 'Shopping' (Mua sắm) được thiết kế chuyên biệt để hiển thị sản phẩm, giá bán, người bán và liên kết đặt hàng trực tiếp."
  },
  {
    id: 5,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "multiple", // Chọn 3
    requiredCount: 3,
    question: "Người dùng nên tìm kiếm điều gì để xác định độ tin cậy và thẩm quyền của tác giả? (Chọn 3 đáp án)",
    options: [
      { id: "A", text: "Trình độ học vấn và học hàm/học vị của tác giả." },
      { id: "B", text: "Thông tin về đời sống gia đình và sở thích cá nhân của tác giả." },
      { id: "C", text: "Các đánh giá, bình luận chuyên môn từ cộng đồng học giả về nghiên cứu của tác giả." },
      { id: "D", text: "Kinh nghiệm làm việc thực tế trong lĩnh vực đang viết." },
      { id: "E", text: "Các bài báo, công trình nghiên cứu khác của cùng tác giả trong chủ đề đó." }
    ],
    correct: ["A", "D", "E"],
    explanation: "Để xác định độ uy tín của tác giả, ta cần xem xét: (1) Trình độ học vấn chuyên ngành, (2) Kinh nghiệm thực tiễn trong ngành, và (3) Các công trình/bài viết chuyên môn khác cùng chủ đề. Đời tư cá nhân không liên quan đến tính khoa học."
  },
  {
    id: 6,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "matching",
    question: "Ghép từng loại quyền sở hữu trí tuệ (Intellectual Property) với mô tả vi phạm tương ứng của nó:",
    pairs: [
      {
        id: "p1",
        term: "Bằng sáng chế (Patent)",
        match: "Sử dụng hoặc bán một phát minh sáng chế mà không được phép của chủ sở hữu quyền sở hữu trí tuệ."
      },
      {
        id: "p2",
        term: "Bí mật thương mại (Trade Secret / Misappropriation)",
        match: "Trộm cắp hoặc chiếm đoạt thông tin kinh doanh bí mật cho mục đích kinh tế hoặc làm lợi cho thế lực bên ngoài (tội phạm liên bang)."
      },
      {
        id: "p3",
        term: "Thương hiệu (Trademark)",
        match: "Sử dụng Logo, nhãn hiệu hoặc tên gọi tương tự gây nhầm lẫn với Logo hoặc tên của một doanh nghiệp khác."
      },
      {
        id: "p4",
        term: "Bản quyền (Copyright)",
        match: "Sao chép, phân phối, trình chiếu biểu diễn tác phẩm, hoặc tạo tác phẩm phái sinh mà không có sự đồng ý của tác giả/chủ bản quyền."
      }
    ],
    explanation: "Bằng sáng chế bảo hộ phát minh kỹ thuật; Bí mật thương mại bảo vệ bí quyết kinh doanh; Thương hiệu bảo vệ nhãn hiệu/logo nhận diện; Bản quyền bảo hộ tác phẩm văn học, nghệ thuật, âm nhạc, phim ảnh và phần mềm."
  },
  {
    id: 7,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "single",
    question: "Kịch bản nào sau đây là ĐƯỢC PHÉP khi sử dụng một bộ phim thương mại (Lưu ý: Bạn không sở hữu bản quyền bộ phim)?",
    options: [
      { id: "A", text: "Bạn cắt lấy 3 khung hình tĩnh từ bộ phim đó để minh họa cho bài phê bình/đánh giá phim đăng trên blog cá nhân (Fair Use)." },
      { id: "B", text: "Bạn chiếu bộ phim cạnh nhà và mời bà con lối xóm cùng xem miễn phí trên màn ảnh rộng." },
      { id: "C", text: "Bạn đăng toàn bộ phim lên trang web của mình và thu tiền mỗi lượt xem của người dùng." },
      { id: "D", text: "Bạn sao chép bộ phim ra đĩa/USB gửi cho bạn bè với lời hứa họ sẽ tự xóa sau khi xem xong." }
    ],
    correct: "A",
    explanation: "Theo nguyên tắc 'Sử dụng hợp lý' (Fair Use), việc trích đoạn ngắn hoặc chụp vài khung hình tĩnh để bình luận, phê bình, nghiên cứu hoặc giảng dạy là hợp pháp. Chiếu cho công chúng hoặc sao chép chia sẻ đều vi phạm quyền biểu diễn và phân phối."
  },

  // --- BÀI 14: AI HỖ TRỢ TÌM KIẾM THÔNG TIN AN TOÀN ---
  {
    id: 8,
    lesson: "bai14",
    lessonTitle: "Bài 14: AI an toàn & Thám tử",
    type: "multiple",
    requiredCount: 2,
    question: "Tùy chọn nào sau đây là ví dụ thực tế về ứng dụng của Trí tuệ nhân tạo (AI)? (Chọn 2 đáp án)",
    options: [
      { id: "A", text: "Ghi âm bài hát bằng ứng dụng ghi âm mặc định trên điện thoại." },
      { id: "B", text: "Chuyển đổi giọng nói thời gian thực thành văn bản (Speech-to-Text)." },
      { id: "C", text: "Xem tọa độ kinh độ và vĩ độ từ chip định vị vệ tinh GPS." },
      { id: "D", text: "Hệ thống tự động phát hiện và dự đoán các giao dịch ngân hàng gian lận (Fraud Detection)." }
    ],
    correct: ["B", "D"],
    explanation: "Nhận dạng giọng nói (Speech-to-Text) và dự đoán phát hiện gian lận ngân hàng đều dùng mô hình Machine Learning/AI để nhận diện mẫu và ra quyết định. Ghi âm và GPS phần cứng đơn thuần chỉ là thu thập tín hiệu vật lý."
  },
  {
    id: 9,
    lesson: "bai14",
    lessonTitle: "Bài 14: AI an toàn & Thám tử",
    type: "single",
    question: "Theo 'Công thức lấy lời khai' (Slide 3), 4 thành phần thiết yếu để viết một câu Prompt chuẩn xác cho AI là gì?",
    options: [
      { id: "A", text: "Thời gian + Địa điểm + Ngân sách + Người thực hiện" },
      { id: "B", text: "Chủ đề + Ngữ cảnh + Đối tượng + Định dạng" },
      { id: "C", text: "Tiêu đề + Mật khẩu + Phần mềm + Kết quả" },
      { id: "D", text: "Câu hỏi + Lời khen + Tên AI + Ngôn ngữ" }
    ],
    correct: "B",
    explanation: "Công thức viết Prompt hiệu quả gồm: 1. Chủ đề (Topic) - 2. Ngữ cảnh (Context) - 3. Đối tượng thụ hưởng (Audience) - 4. Định dạng mong muốn (Format). Càng rõ ràng, AI càng cho câu trả lời chuẩn xác."
  },
  {
    id: 10,
    lesson: "bai14",
    lessonTitle: "Bài 14: AI an toàn & Thám tử",
    type: "single",
    question: "Hiện tượng AI trả lời rất lưu loát, tự tin nhưng thực chất thông tin sai lệch hoặc trích dẫn các đường link/cuốn sách không hề có thật được gọi là gì?",
    options: [
      { id: "A", text: "Ảo giác AI (AI Hallucination / Hiện tượng bịa đặt nguồn)" },
      { id: "B", text: "Lỗi nghẽn mạng máy chủ (Server Timeout)" },
      { id: "C", text: "Tấn công từ chối dịch vụ (DDoS)" },
      { id: "D", text: "Lỗi phần cứng vi xử lý (Hardware Crash)" }
    ],
    correct: "A",
    explanation: "AI Hallucination (Ảo giác AI / Bịa đặt nguồn) là hiện tượng mô hình ngôn ngữ tự sinh ra thông tin, số liệu và URL trông rất hợp lý nhưng hoàn toàn là sản phẩm thêu dệt, không tồn tại trong thực tế."
  },
  {
    id: 11,
    lesson: "bai14",
    lessonTitle: "Bài 14: AI an toàn & Thám tử",
    type: "single",
    question: "Bộ công cụ 'AAOCC' trong Sổ tay thám tử kỹ thuật số gồm 5 tiêu chí khám nghiệm thông tin nào?",
    options: [
      { id: "A", text: "Accuracy (Chính xác), Authority (Thẩm quyền), Objectivity (Khách quan), Currency (Cập nhật), Coverage (Bao quát)" },
      { id: "B", text: "Action (Hành động), Access (Truy cập), Online (Trực tuyến), Cost (Chi phí), Check (Kiểm tra)" },
      { id: "C", text: "Apple, Android, OpenAI, Chrome, Computer" },
      { id: "D", text: "Author (Tác giả), Article (Bài báo), Opinion (Ý kiến), Channel (Kênh), Code (Mã số)" }
    ],
    correct: "A",
    explanation: "AAOCC là viết tắt của: A - Accuracy (Chính xác), A - Authority (Thẩm quyền/Uy tín), O - Objectivity (Khách quan), C - Currency (Tính cập nhật), C - Coverage (Tính bao quát, đầy đủ)."
  },
  {
    id: 12,
    lesson: "bai14",
    lessonTitle: "Bài 14: AI an toàn & Thám tử",
    type: "multiple",
    requiredCount: 3,
    question: "Theo bài học, 3 'Vụ án' (lĩnh vực nhạy cảm) nào sau đây người dùng TUYỆT ĐỐI KHÔNG NÊN chỉ dựa vào AI mà bắt buộc phải đối chiếu nguồn chính thống? (Chọn 3 đáp án)",
    options: [
      { id: "A", text: "Sức khỏe & Y tế (Đơn thuốc, triệu chứng, điều trị)" },
      { id: "B", text: "Pháp luật & Quy định (Luật pháp, án phạt, hợp đồng)" },
      { id: "C", text: "Tài chính & Tiền bạc (Đầu tư, giao dịch, ngân hàng)" },
      { id: "D", text: "Gợi ý danh sách nhạc nghe khi tập thể dục" },
      { id: "E", text: "Lên ý tưởng trang trí phòng học ngày lễ 20/11" }
    ],
    correct: ["A", "B", "C"],
    explanation: "Sức khỏe & Y tế, Pháp luật & Quy định, và Tài chính & Tiền bạc là 3 lĩnh vực rủi ro cao trực tiếp ảnh hưởng đến tính mạng, tài sản và pháp lý. Bắt buộc phải tham vấn chuyên gia và văn bản pháp luật chính thống."
  },
  {
    id: 13,
    lesson: "bai13",
    lessonTitle: "Bài 13: Đánh giá thông tin",
    type: "single",
    question: "Một tin nhắn trong nhóm lớp viết: 'Chiều nay nghỉ học'. Tin nhắn này vi phạm nguyên tắc đánh giá thông tin nào?",
    options: [
      { id: "A", text: "Tính Đầy đủ (Completeness) - Thiếu quy tắc 4W + 1H (ai nghỉ, lớp nào, môn gì, lúc mấy giờ)" },
      { id: "B", text: "Tính Thẩm mỹ (Aesthetics) - Thiếu biểu tượng cảm xúc (emoji)" },
      { id: "C", text: "Tính Băng thông (Bandwidth) - Quá ngắn không tải hết dung lượng" },
      { id: "D", text: "Tính Bảo mật (Security) - Cần phải đặt mật khẩu mã hóa tin nhắn" }
    ],
    correct: "A",
    explanation: "Tin nhắn quá mơ hồ không nói rõ lớp nào, tiết nào, lý do gì, vi phạm tính Đầy đủ (4W + 1H), dễ gây hoang mang và hiểu lầm cho học sinh."
  },
  {
    id: 14,
    lesson: "bai14",
    lessonTitle: "Bài 14: AI an toàn & Thám tử",
    type: "single",
    question: "Quy trình tác nghiệp 3 bước của Thám tử Kỹ thuật số khi tiếp nhận kết quả từ AI gồm những bước nào theo đúng thứ tự?",
    options: [
      { id: "A", text: "1. Sao chép -> 2. Dán vào bài nộp -> 3. Xong việc" },
      { id: "B", text: "1. Đọc hiểu -> 2. Kiểm chứng (sử dụng AAOCC) -> 3. Quyết định sử dụng" },
      { id: "C", text: "1. Đăng lên mạng -> 2. Chờ phản hồi -> 3. Chỉnh sửa" },
      { id: "D", text: "1. Xóa bỏ -> 2. Tìm kiếm thủ công -> 3. Bỏ cuộc" }
    ],
    correct: "B",
    explanation: "Quy trình 3 bước chuẩn: 1. ĐỌC HIỂU (xác định các mệnh đề AI khẳng định) -> 2. KIỂM CHỨNG (dùng AAOCC đối chiếu chéo) -> 3. QUYẾT ĐỊNH (chỉ dùng khi đã kiểm tra kỹ lưỡng)."
  },
  {
    id: 15,
    lesson: "bai14",
    lessonTitle: "Bài 14: AI an toàn & Thám tử",
    type: "single",
    question: "Tên miền nào sau đây thường có độ tin cậy và thẩm quyền cao nhất khi tra cứu thông tin chính sách, pháp luật tại Việt Nam?",
    options: [
      { id: "A", text: ".com.vn hoặc .net" },
      { id: "B", text: ".gov.vn (Cơ quan Chính phủ Việt Nam)" },
      { id: "C", text: ".xyz hoặc .tk (Tên miền miễn phí, vô danh)" },
      { id: "D", text: ".club hoặc .info" }
    ],
    correct: "B",
    explanation: "Đuôi tên miền '.gov.vn' là tên miền cấp quốc gia dành riêng cho các cơ quan chính phủ và hành chính nhà nước Việt Nam, được quản lý chặt chẽ nên có độ thẩm quyền và pháp lý cao nhất."
  }
];

// Dữ liệu hồ sơ vụ án thực hành thẩm định (Detective Case Files)
const CASE_STUDIES = [
  {
    id: "case-1",
    title: "Vụ Án 01: 'Thần Dược' Nước Ép Chữa Bách Bệnh",
    badge: "Y tế & Sức khỏe",
    badgeType: "danger",
    author: "Tài khoản TikTok 'BacSiOnline99' (không rõ tên thật)",
    date: "Đăng 2 ngày trước",
    content: "Cảnh báo khẩn cấp: Uống 500ml nước ép cần tây pha chanh vào mỗi buổi sáng khi đói bụng sẽ loại bỏ hoàn toàn 100% tế bào ung thư và độc tố trong máu, không cần xạ trị hay uống thuốc tây! Hãy chia sẻ gấp để cứu người thân!",
    linkSupplied: "http://suckhoetoandien24h.xyz/can-tay-than-duoc",
    aaoccCheck: {
      accuracy: { pass: false, note: "Sai sự thật, phản khoa học. Không có loại nước ép nào chữa khỏi 100% ung thư." },
      authority: { pass: false, note: "Tài khoản ẩn danh, không có học hàm, bằng cấp hay chứng chỉ hành nghề y khoa." },
      objectivity: { pass: false, note: "Giật tít, kích động nỗi sợ hãi và kêu gọi chia sẻ câu view." },
      currency: { pass: true, note: "Mới đăng gần đây nhưng thông tin độc hại." },
      coverage: { pass: false, note: "Một chiều, không có bất kỳ số liệu lâm sàng hay thử nghiệm đối chứng." }
    },
    conclusion: "TIN GIẢ NGUY HIỂM",
    advice: "Báo cáo bài viết xấu độc, tuyệt đối không làm theo và đối chiếu thông tin y tế trên Cổng thông tin Bộ Y tế (moh.gov.vn) hoặc Tổ chức Y tế Thế giới (who.int)."
  },
  {
    id: "case-2",
    title: "Vụ Án 02: Tin Nhắn 'Lớp Nghỉ Học Vì Bão'",
    badge: "Học đường",
    badgeType: "warning",
    author: "Tin nhắn chuyển tiếp trong nhóm Zalo phụ huynh/học sinh",
    date: "Không rõ ngày gửi (chỉ ghi 'Chuyển tiếp')",
    content: "Thông báo khẩn: Do tình hình mưa bão phức tạp, chiều nay toàn bộ các lớp được nghỉ học. Các bạn ở nhà tự ôn bài nhé!",
    linkSupplied: "Không có liên kết đính kèm",
    aaoccCheck: {
      accuracy: { pass: false, note: "Chưa được xác minh bởi Ban Giám hiệu hay Sở GD&ĐT." },
      authority: { pass: false, note: "Tin nhắn chuyển tiếp vô danh, không có chữ ký giáo viên chủ nhiệm hay văn bản đóng dấu." },
      objectivity: { pass: true, note: "Không mang mục đích câu like nhưng gây rối loạn thông tin." },
      currency: { pass: false, note: "Tin chuyển tiếp không rõ mốc thời gian, có thể là tin từ mùa bão năm ngoái!" },
      coverage: { pass: false, note: "Thiếu 4W + 1H: Không rõ trường nào, lớp nào, buổi nào, hiệu lệnh từ ai." }
    },
    conclusion: "TIN THIẾU KIỂM CHỨNG (4W+1H)",
    advice: "Không vội nghỉ học. Liên hệ trực tiếp với Thầy/Cô chủ nhiệm hoặc xem thông báo trên website chính thức của nhà trường (.edu.vn)."
  },
  {
    id: "case-3",
    title: "Vụ Án 03: Chatbot AI Trích Dẫn 'Bài Báo Khoa Học 2025'",
    badge: "AI Ảo Giác",
    badgeType: "info",
    author: "Hệ thống AI Chatbot",
    date: "Tạo tức thì",
    content: "Theo báo cáo nghiên cứu năm 2025 của Viện Công nghệ Thiên văn Quốc tế tại bài báo 'Nhiệt độ bề mặt Sao Hỏa tăng gấp 10 lần do biến đổi khí quyển', loài người có thể sinh sống không cần mũ dưỡng khí vào năm 2030.",
    linkSupplied: "https://www.astronomy-fake-univ-2025.org/mars-living",
    aaoccCheck: {
      accuracy: { pass: false, note: "Vô lý về mặt vật lý và sinh học (Sao Hỏa áp suất khí quyển rất loãng, chủ yếu CO2)." },
      authority: { pass: false, note: "Viện nghiên cứu và đường link do AI tự bịa ra (link bấm vào báo lỗi 404 Not Found)." },
      objectivity: { pass: false, note: "Mô hình ngôn ngữ tự xâu chuỗi từ ngữ cho mượt mà chứ không hiểu bản chất." },
      currency: { pass: false, note: "Năm 2025/2030 dự đoán viển vông, giả mạo mốc thời gian." },
      coverage: { pass: false, note: "Không có trích dẫn từ NASA hay ESA." }
    },
    conclusion: "AI HALLUCINATION (ẢO GIÁC AI)",
    advice: "Kiểm tra mở đường link thật xem có tồn tại không. Luôn đối chiếu với trang NASA (nasa.gov) để kiểm chứng kiến thức thiên văn."
  }
];

