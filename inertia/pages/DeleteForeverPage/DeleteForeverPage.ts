import { Selector, t } from "testcafe";

class DeleteForever {
  // Hàm chính xử lý các tương tác xóa và khôi phục
  async DeleteForever() {
    console.log("[Bước 1] Nhấp vào thư mục Hoangtest0201");
    const folderElement = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    ).withText("Hoangtest0201");
    await t
      .expect(folderElement.exists)
      .ok("Không tìm thấy thư mục Hoangtest0201")
      .click(folderElement)
      .wait(1000);

    console.log("[Bước 2] Chuột phải vào thư mục Hoangtest0201");
    await t.rightClick(folderElement).wait(2000);

    console.log("[Bước 3] Nhấp vào tùy chọn Move to trash trong menu dropdown");
    const deleteMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.ant-dropdown-menu-title-content")
      .withText("Move to trash")
      .parent();
    await t
      .expect(deleteMenuItem.exists)
      .ok("Không tìm thấy tùy chọn Move to trash")
      .click(deleteMenuItem)
      .wait(2000);

    console.log("[Bước 4] Nhấp vào tùy chọn Trash trong menu");
    const trashMenuItem = Selector("li.ant-menu-item")
      .find("span.ant-menu-title-content")
      .withText("Trash")
      .parent();
    await t
      .expect(trashMenuItem.exists)
      .ok("Không tìm thấy tùy chọn Trash")
      .click(trashMenuItem)
      .wait(2000);

    console.log("[Bước 5] Click vào thư mục trong Trash và chuột phải");
    await t.click(folderElement).rightClick(folderElement).wait(2000);

    console.log("[Bước 6] Nhấp vào tùy chọn Restore trong menu dropdown");
    const foreverMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.ant-dropdown-menu-title-content")
      .withText("Delete forever")
      .parent();
    await t
      .expect(foreverMenuItem.exists)
      .ok("Không tìm thấy tùy chọn Delete forever")
      .click(foreverMenuItem)
      .wait(2000);

    console.log("[Bước 7] Click vào nút Yes để xác nhận xóa vĩnh viễn");
    const yesButton = Selector("button.ant-btn-primary")
      .find("span")
      .withText("Yes")
      .parent();
    await t
      .expect(yesButton.exists)
      .ok("Không tìm thấy nút Yes")
      .click(yesButton)
      .wait(2000);
  }
}

export default new DeleteForever();
