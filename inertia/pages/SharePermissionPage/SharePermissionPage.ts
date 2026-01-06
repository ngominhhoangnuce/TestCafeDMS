import { Selector, t } from "testcafe";
import LoginUserShare from "../LoginUserSharePage/LoginUserSharePage";

class SharePermission {
  // Hàm chính xử lý các tương tác tìm kiếm và lọc file
  async SharePermission() {
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

    console.log("[Bước 3] Nhấp vào tùy chọn Share trong menu dropdown");
    const shareMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.ant-dropdown-menu-title-content")
      .withText("Share")
      .parent();
    await t
      .expect(shareMenuItem.exists)
      .ok("Không tìm thấy tùy chọn Share")
      .click(shareMenuItem)
      .wait(2000);

    console.log("[Bước 4] Nhập 'admin' vào trường email hoặc name");
    const emailInput = Selector('input[placeholder="Enter email or name"]');
    await t
      .expect(emailInput.exists)
      .ok("Không tìm thấy trường nhập email hoặc name")
      .typeText(emailInput, "admin", { replace: true })
      .wait(2000);

    console.log("[Bước 5] Nhấp vào user admin từ danh sách gợi ý");
    const adminUser = Selector("div")
      .withAttribute("style", /padding: 12px 14px/)
      .find("div")
      .withText("adminhoang2@gmail.com")
      .parent()
      .parent();
    await t
      .expect(adminUser.exists)
      .ok("Không tìm thấy user admin trong danh sách")
      .click(adminUser)
      .wait(2000);

    console.log("[Bước 6] Nhấp vào button Select Permissions");
    const permissionsButton = Selector("button.ant-dropdown-trigger")
      .find("span")
      .withText("Select Permissions")
      .parent();
    await t
      .expect(permissionsButton.exists)
      .ok("Không tìm thấy button Select Permissions")
      .click(permissionsButton)
      .wait(2000);

    console.log("[Bước 7] Nhấp vào option View");
    const viewOption = Selector("div")
      .withAttribute("style", /padding: 10px 12px/)
      .find("span")
      .withText("View")
      .parent()
      .parent();
    await t
      .expect(viewOption.exists)
      .ok("Không tìm thấy option View")
      .click(viewOption)
      .wait(2000);

    console.log("[Bước 8] Nhấp vào button Save");
    const saveButton = Selector("button.ant-btn-primary")
      .find("span")
      .withText("Save")
      .parent();
    await t
      .expect(saveButton.exists)
      .ok("Không tìm thấy button Save")
      .click(saveButton)
      .wait(2000);

    console.log("[Bước 9] Nhấp vào button Done");
    const doneButton = Selector("button.ant-btn-primary")
      .find("span")
      .withText("Done")
      .parent();
    await t
      .expect(doneButton.exists)
      .ok("Không tìm thấy button Done")
      .click(doneButton)
      .wait(2000);

    console.log("[Bước 10] Nhấp vào avatar user dropdown");
    const userAvatar = Selector("div.ant-dropdown-trigger")
      .withAttribute("style", /display: flex/)
      .find("span.ant-avatar");
    await t
      .expect(userAvatar.exists)
      .ok("Không tìm thấy avatar user")
      .click(userAvatar)
      .wait(2000);

    console.log("[Bước 11] Nhấp vào option Sign out");
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

    console.log("[Bước 12] Đăng nhập với tài khoản admin");
    await LoginUserShare.LoginUserShare();

    console.log("[Bước 13] Nhấp vào menu item Shared with me");
    const sharedWithMeItem = Selector("li.ant-menu-item")
      .find("span.ant-menu-title-content")
      .withText("Shared with me")
      .parent();
    await t
      .expect(sharedWithMeItem.exists)
      .ok("Không tìm thấy menu item Shared with me")
      .click(sharedWithMeItem)
      .wait(2000);

    console.log("[Bước 14] Kiểm tra file/folder vừa share có hiển thị");
    const sharedItem = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    ).withText(itemName);
    await t
      .expect(sharedItem.exists)
      .ok(`File/folder "${itemName}" không hiển thị trong Shared with me`)
      .click(sharedItem)
      .wait(5000);
  }
}

export default new SharePermission();
