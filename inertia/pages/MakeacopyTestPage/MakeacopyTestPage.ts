import { Selector, t } from "testcafe";

class MakeacopyTestPage {
  // Hàm chính xử lý các tương tác tìm kiếm và lọc file
  async MakeacopyTestPage() {
    console.log("[Bước 1] Chọn ngẫu nhiên một file/folder trên màn hình");
    const allItems = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    );

    // Đếm số lượng file/folder có trên màn hình
    const itemCount = await allItems.count;
    console.log(`Tổng số file/folder tìm thấy: ${itemCount}`);

    // Chọn ngẫu nhiên một item
    const randomIndex = Math.floor(Math.random() * itemCount);
    const testLine = allItems.nth(randomIndex);

    // Lấy tên item
    const itemName = await testLine.innerText;
    console.log(
      `Item được chọn ngẫu nhiên (index ${randomIndex}): ${itemName}`
    );

    await t
      .expect(testLine.exists)
      .ok("Không tìm thấy file/folder nào trên màn hình")
      .click(testLine)
      .wait(2000);

    console.log("[Bước 2] Right click vào item được chọn");
    await t.rightClick(testLine).wait(2000);

    console.log("[Bước 3] Nhấp vào tùy chọn Make a copy trong menu dropdown");
    const copyMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.ant-dropdown-menu-title-content")
      .withText("Make a copy")
      .parent();
    await t
      .expect(copyMenuItem.exists)
      .ok("Không tìm thấy tùy chọn Make a copy")
      .click(copyMenuItem)
      .wait(2000);
  }
}

export default new MakeacopyTestPage();
