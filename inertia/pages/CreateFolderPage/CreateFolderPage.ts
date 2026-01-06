import { Selector, t } from "testcafe";

class CreateNewFolder {
  // Hàm chính xử lý các tương tác xóa và khôi phục
  async CreateNewFolder() {
    console.log("Bắt đầu test: Create Folder");

    // ===== BƯỚC 1: Click button "New" với icon plus =====
    const newBtn = Selector("button.ant-btn.ant-btn-default")
      .withAttribute("style", /width: 100px; height: 48px/)
      .find("span.anticon-plus")
      .parent("button");

    await t.expect(newBtn.exists).ok("Không tìm thấy button New với icon plus");
    await t.click(newBtn).wait(1000);
    console.log("Bước 1: Đã click button New");

    // ===== BƯỚC 2: Click menu item "New Folder" =====
    const newFolderMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.anticon-folder-add")
      .parent("li");

    await t
      .expect(newFolderMenuItem.exists)
      .ok("Không tìm thấy New Folder menu item");
    await t.click(newFolderMenuItem).wait(5000);
    console.log("Bước 2: Đã click New Folder menu item");

    // ===== BƯỚC 3: Nhập tên folder random =====
    const randomFolderName = `TestFolder_${Date.now()}`;
    const folderNameInput = Selector("input#input-folder-name");

    await t
      .expect(folderNameInput.exists)
      .ok("Không tìm thấy input folder name");
    await t.typeText(folderNameInput, randomFolderName, { replace: true });
    console.log(`Bước 3: Đã nhập tên folder: ${randomFolderName}`);

    // ===== BƯỚC 4: Click button "Create" =====
    const createBtn = Selector("button.ant-btn-primary")
      .withAttribute("type", "submit")
      .withText("Create");

    await t.expect(createBtn.exists).ok("Không tìm thấy button Create");
    await t.click(createBtn).wait(2000);
    console.log("Bước 4: Đã click button Create");
  }
}

export default new CreateNewFolder();
