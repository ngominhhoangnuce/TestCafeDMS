import { Selector, t, ClientFunction } from "testcafe";
import LoginUserShare from "../LoginUserSharePage/LoginUserSharePage";

class ShareLinkPage {
  async ShareLinkPage() {
    const getClipboardText = ClientFunction(() => {
      return navigator.clipboard.readText();
    });

    // Bước 1: Chọn ngẫu nhiên một file/folder
    console.log("[Bước 1] Chọn ngẫu nhiên một file/folder");
    const allItems = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    );
    const itemCount = await allItems.count;
    const randomIndex = Math.floor(Math.random() * itemCount);
    const testLine = allItems.nth(randomIndex);
    const itemName = await testLine.innerText;
    console.log(`File/folder được chọn (index ${randomIndex}): ${itemName}`);

    await t
      .expect(testLine.exists)
      .ok("Không tìm thấy file/folder")
      .click(testLine)
      .wait(2000);

    // Bước 2: Right click và chọn Share
    console.log("[Bước 2] Right click vào item");
    await t.rightClick(testLine).wait(2000);

    console.log("[Bước 3] Click vào Share trong menu");
    const shareMenuItem = Selector("li.ant-dropdown-menu-item")
      .find("span.ant-dropdown-menu-title-content")
      .withText("Share")
      .parent();
    await t
      .expect(shareMenuItem.exists)
      .ok("Không tìm thấy Share")
      .click(shareMenuItem)
      .wait(2000);

    // Bước 4-5: Thêm user admin với quyền View
    console.log("[Bước 4] Nhập 'admin' vào trường email or name");
    const emailInput = Selector('input[placeholder="Enter email or name"]');
    await t.typeText(emailInput, "admin", { replace: true }).wait(2000);

    console.log("[Bước 5] Click vào user adminhoang2@gmail.com");
    const adminUser = Selector("div")
      .withAttribute("style", /padding: 12px 14px/)
      .find("div")
      .withText("adminhoang2@gmail.com")
      .parent()
      .parent();
    await t.click(adminUser).wait(2000);

    // Bước 6-7: Chọn permission View
    console.log("[Bước 6] Click vào button Select Permissions");
    const permissionsButton = Selector("button.ant-dropdown-trigger")
      .find("span")
      .withText("Select Permissions")
      .parent();
    await t.click(permissionsButton).wait(2000);

    console.log("[Bước 7] Click vào option View");
    const viewOption = Selector("div")
      .withAttribute("style", /padding: 10px 12px/)
      .find("span")
      .withText("View")
      .parent()
      .parent();
    await t.click(viewOption).wait(2000);

    // Bước 8: Save
    console.log("[Bước 8] Click vào button Save");
    const saveButton = Selector("button.ant-btn-primary")
      .find("span")
      .withText("Save")
      .parent();
    await t.click(saveButton).wait(2000);

    // Bước 9: Copy link
    console.log("[Bước 9] Click vào button Copy link");

    const copyLinkButton = Selector("#button-copy-link-share-modal");
    await t.click(copyLinkButton).wait(500);

    // Click vào nút "Cho phép" trong popup clipboard permission
    const allowButton = Selector("button").withText("Cho phép");
    if (await allowButton.exists) {
      console.log("Đang click vào nút 'Cho phép' cho clipboard permission");
      await t.click(allowButton).wait(500);
    }

    await t.wait(500);
    const copiedLink = await getClipboardText();
    console.log(`Link đã copy: ${copiedLink}`);
    await t.wait(1000);

    // Bước 10: Done
    console.log("[Bước 10] Click vào button Done");
    const doneButton = Selector("#button-done-share-modal");
    await t.click(doneButton).wait(2000);

    // Bước 11-12: Sign out
    console.log("[Bước 11] Click vào avatar user");
    const userAvatar = Selector("div.ant-dropdown-trigger")
      .withAttribute("style", /display: flex/)
      .find("span.ant-avatar");
    await t.click(userAvatar).wait(2000);

    console.log("[Bước 12] Click vào Sign out");
    const signOutButton = Selector("div")
      .withAttribute("style", /display: flex/)
      .find("span")
      .withText("Sign out")
      .parent();
    await t.click(signOutButton).wait(2000);

    // Bước 13: Đăng nhập lại với tài khoản admin
    console.log("[Bước 13] Đăng nhập với tài khoản admin");
    await LoginUserShare.LoginUserShare();

    // Bước 14: Navigate đến link đã copy
    console.log("[Bước 14] Navigate đến link đã copy");
    const linkToNavigate = await getClipboardText();
    console.log(`Link: ${linkToNavigate}`);
    await t.navigateTo(linkToNavigate).wait(3000);
  }
}

export default new ShareLinkPage();
