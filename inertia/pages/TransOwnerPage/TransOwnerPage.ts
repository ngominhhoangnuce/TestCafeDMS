import { Selector, t } from "testcafe";
import LoginOwner from "../LoginOwnerPage/LoginOwnerPage";

class TransOwner {
  // Hàm chính xử lý các tương tác tìm kiếm và lọc file
  async TransOwner() {
    // ===== BƯỚC 1: Click button "New" với icon plus =====
    const newBtn = Selector("button.ant-btn.ant-btn-default")
      .withAttribute("style", /width: 100px; height: 48px/)
      .find("span.anticon-plus")
      .parent("button");

    await t.expect(newBtn.exists).ok("Không tìm thấy button New với icon plus");
    await t.click(newBtn).wait(1000);

    // ===== BƯỚC 2: Click menu item "New Folder" =====
    const newFolderMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.anticon-folder-add")
      .parent("li");

    await t
      .expect(newFolderMenuItem.exists)
      .ok("Không tìm thấy New Folder menu item");
    await t.click(newFolderMenuItem).wait(5000);

    // ===== BƯỚC 3: Nhập tên folder random =====
    const randomFolderName = `TestFolder_${Date.now()}`;
    const folderNameInput = Selector("input#folderName");

    await t
      .expect(folderNameInput.exists)
      .ok("Không tìm thấy input folder name");
    await t.typeText(folderNameInput, randomFolderName, { replace: true });

    // ===== BƯỚC 4: Click button "Create" =====
    const createBtn = Selector("button.ant-btn-primary")
      .withAttribute("type", "submit")
      .withText("Create");

    await t.expect(createBtn.exists).ok("Không tìm thấy button Create");
    await t.click(createBtn).wait(2000);

    // ===== BƯỚC 5: Chọn folder vừa tạo =====
    const newFolderItem = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    ).withText(randomFolderName);

    await t
      .expect(newFolderItem.exists)
      .ok(`Không tìm thấy folder "${randomFolderName}" vừa tạo`)
      .click(newFolderItem)
      .wait(2000);

    // ===== BƯỚC 6: Right click vào folder vừa tạo =====
    await t.rightClick(newFolderItem).wait(2000);

    // ===== BƯỚC 7: Nhấp vào tùy chọn Manage members trong menu dropdown =====
    const manageMembersMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.ant-dropdown-menu-title-content")
      .withText("Manage members")
      .parent();
    await t
      .expect(manageMembersMenuItem.exists)
      .ok("Không tìm thấy tùy chọn Manage members")
      .click(manageMembersMenuItem)
      .wait(2000);

    // ===== BƯỚC 8: Nhập 'tu' vào trường email hoặc name =====
    const emailInput = Selector('input[placeholder="Enter email or name"]');
    await t
      .expect(emailInput.exists)
      .ok("Không tìm thấy trường nhập email hoặc name")
      .typeText(emailInput, "tu", { replace: true })
      .wait(2000);

    // ===== BƯỚC 9: Nhấp vào user tu từ danh sách gợi ý =====
    const adminUser = Selector("div")
      .withAttribute("style", /padding: 12px 14px/)
      .find("div")
      .withText("tu@nhiha.com")
      .parent()
      .parent();
    await t
      .expect(adminUser.exists)
      .ok("Không tìm thấy user tu trong danh sách")
      .click(adminUser)
      .wait(2000);

    // ===== BƯỚC 10: Nhấp vào button Select Permissions =====
    const permissionsButton = Selector("button.ant-dropdown-trigger")
      .find("span")
      .withText("Select Permissions")
      .parent();
    await t
      .expect(permissionsButton.exists)
      .ok("Không tìm thấy button Select Permissions")
      .click(permissionsButton)
      .wait(2000);

    // ===== BƯỚC 11: Nhấp vào option Manage =====
    const manageOption = Selector("div")
      .withAttribute("style", /padding: 10px 12px/)
      .find("span")
      .withText("Manage")
      .parent()
      .parent();
    await t
      .expect(manageOption.exists)
      .ok("Không tìm thấy option Manage")
      .click(manageOption)
      .wait(2000);

    // ===== BƯỚC 12: Nhấp vào button Save =====
    const saveButton = Selector("button.ant-btn-primary")
      .find("span")
      .withText("Save")
      .parent();
    await t
      .expect(saveButton.exists)
      .ok("Không tìm thấy button Save")
      .click(saveButton)
      .wait(2000);

    // ===== BƯỚC 13: Nhấp vào button Done =====
    const doneButton = Selector("button.ant-btn-primary")
      .find("span")
      .withText("Done")
      .parent();
    await t
      .expect(doneButton.exists)
      .ok("Không tìm thấy button Done")
      .click(doneButton)
      .wait(2000);

    // ===== BƯỚC 14: Nhấp vào avatar user dropdown =====
    const userAvatar = Selector("div.ant-dropdown-trigger")
      .withAttribute("style", /display: flex/)
      .find("span.ant-avatar");
    await t
      .expect(userAvatar.exists)
      .ok("Không tìm thấy avatar user")
      .click(userAvatar)
      .wait(2000);

    // ===== BƯỚC 15: Nhấp vào option Sign out =====
    const signOutButton = Selector("div")
      .withAttribute("style", /display: flex/)
      .find("span")
      .withText("Sign out")
      .parent();
    await t
      .expect(signOutButton.exists)
      .ok("Không tìm thấy option Sign out")
      .click(signOutButton)
      .wait(2000);

    // ===== BƯỚC 16: Đăng nhập với tài khoản tu =====
    await LoginOwner.LoginOwner();

    // ===== BƯỚC 17: Nhấp vào menu item Team Drives =====
    const teamDrivesItem = Selector("li.ant-menu-item")
      .find("span.ant-menu-title-content")
      .withText("Team Drives")
      .parent();
    await t
      .expect(teamDrivesItem.exists)
      .ok("Không tìm thấy menu item Team Drives")
      .click(teamDrivesItem)
      .wait(2000);

    // ===== BƯỚC 18: Kiểm tra folder vừa tạo có hiển thị =====
    const sharedItem = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    ).withText(randomFolderName);
    await t
      .expect(sharedItem.exists)
      .ok(`Folder "${randomFolderName}" không hiển thị trong Team Drives`)
      .click(sharedItem)
      .wait(5000);
  }
}

export default new TransOwner();
