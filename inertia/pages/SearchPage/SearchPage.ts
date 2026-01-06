import { Selector, t } from "testcafe";

class Search {
  // Hàm chính xử lý các tương tác tìm kiếm và lọc file
  async Search() {
    console.log("[Bước 1] Nhập 't' vào ô tìm kiếm");
    const searchInput = Selector('input[placeholder="Search in total"]');
    await t
      .expect(searchInput.exists)
      .ok("Không tìm thấy ô tìm kiếm")
      .click(searchInput)
      .typeText(searchInput, "t")
      .wait(2000);

    console.log("[Bước 2] Kiểm tra kết quả tìm kiếm được làm nổi bật");
    const highlightedResult = Selector(
      'span[style*="background-color: yellow"]'
    );
    await t
      .expect(highlightedResult.exists)
      .ok("Không tìm thấy kết quả tìm kiếm được làm nổi bật")
      .wait(5000);
  }
}

export default new Search();
