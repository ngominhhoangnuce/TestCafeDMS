import { Selector, t } from "testcafe";

class UploadFile {
  // Main function to handle file upload interactions
  async UploadFile() {
    console.log("Bắt đầu test: Unload file");

    // ===== BƯỚC 1: Click button "New" với icon plus =====
    const newBtn = Selector("button.ant-btn.ant-btn-default")
      .withAttribute("style", /width: 100px; height: 48px/)
      .find("span.anticon-plus")
      .parent("button");

    await t.expect(newBtn.exists).ok("Không tìm thấy button New với icon plus");
    await t.click(newBtn).wait(1000);
    console.log("Bước 1: Đã click button New");

    // ===== BƯỚC 2: Click menu item "File upload" =====
    const fileUploadMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.anticon-file-add")
      .parent("li");

    await t
      .expect(fileUploadMenuItem.exists)
      .ok("Không tìm thấy File upload menu item");
    await t.click(fileUploadMenuItem).wait(5000);
    console.log("Bước 2: Đã click File upload menu item");

    // ===== BƯỚC 3: Kéo file vào upload area =====
    const uploadDragContainer = Selector("div.ant-upload-drag-container");
    const fileInput = Selector('input[type="file"]');

    await t
      .expect(uploadDragContainer.exists)
      .ok("Không tìm thấy upload drag container");

    await t.setFilesToUpload(fileInput, [
      "E:\\Hicas\\inertia\\testdata\\A1.01-Arch_Plans_(Audit) - Copy (2).pdf",
      "E:\\Hicas\\inertia\\testdata\\test9 (1) (1).docx",
      "E:\\Hicas\\inertia\\testdata\\test9 (1) (2).docx",
      "E:\\Hicas\\inertia\\testdata\\test9 (1) (3).docx",
      "E:\\Hicas\\inertia\\testdata\\test9 (1) (4).docx",
      "E:\\Hicas\\inertia\\testdata\\test9 (1).docx",
    ]);
    await t.wait(3000);
    console.log("Bước 3: Đã kéo 6 file vào upload area");

    // ===== BƯỚC 4: Click button "Yes" =====
    const yesBtn = Selector("button.ant-btn.ant-btn-primary").withText(
      "Overwrite"
    );

    await t.expect(yesBtn.exists).ok("Không tìm thấy button Overwrite");
    await t.click(yesBtn).wait(2000);
    console.log("Bước 4: Đã click button Overwrite");
  }
}

export default new UploadFile();
