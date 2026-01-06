import { Selector, t } from "testcafe";

class MovePage {
  // Hàm chính xử lý các tương tác tìm kiếm và lọc file
  async MovePage() {
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

    console.log("[Bước 2] Right click vào dòng thư mục mới");
    await t.rightClick(testLine).wait(2000);
    console.log("[Bước 3] Nhấp vào tùy chọn Move trong menu dropdown");
    const moveMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.ant-dropdown-menu-title-content")
      .withText("Move")
      .parent();
    await t
      .expect(moveMenuItem.exists)
      .ok("Không tìm thấy tùy chọn Move")
      .click(moveMenuItem)
      .wait(2000);

    console.log("[Bước 4] Chọn ngẫu nhiên một thư mục từ danh sách");
    const allFolders = Selector("li.ant-list-item");

    // Đếm số lượng folder có trong danh sách
    const folderCount = await allFolders.count;
    console.log(`Tổng số thư mục tìm thấy: ${folderCount}`);

    // Chọn ngẫu nhiên một folder
    const randomFolderIndex = Math.floor(Math.random() * folderCount);
    const selectedFolder = allFolders.nth(randomFolderIndex);

    // Lấy tên folder
    const folderName = await selectedFolder.find("span").nth(1).innerText;
    console.log(
      `Thư mục được chọn ngẫu nhiên (index ${randomFolderIndex}): ${folderName}`
    );

    await t
      .expect(selectedFolder.exists)
      .ok("Không tìm thấy thư mục để di chuyển")
      .click(selectedFolder)
      .wait(2000);

    console.log("[Bước 5] Nhấp vào button Move để xác nhận");
    const moveBtn = Selector("button").withText("Move");

    await t.click(moveBtn).wait(2000);
  }
}

export default new MovePage();
