import { Selector, t } from "testcafe";

class LoginUserShare {
  // Hàm chính xử lý các tương tác đăng nhập
  async LoginUserShare() {
    // Nhập email vào trường Username hoặc Email
    const usernameInput = Selector("#input-email");
    await t
      .expect(usernameInput.exists)
      .ok("Không tìm thấy trường Username hoặc Email")
      .typeText(usernameInput, "adminhoang2@gmail.com", { replace: true });

    // Nhập mật khẩu vào trường Password
    const passwordInput = Selector("#input-password");
    await t
      .expect(passwordInput.exists)
      .ok("Không tìm thấy trường Password")
      .typeText(passwordInput, "Hicas@2025", { replace: true });

    // Nhấp vào nút LOGIN
    const loginBtn = Selector("#btn-login");
    await t
      .expect(loginBtn.exists)
      .ok("Không tìm thấy nút LOGIN")
      .click(loginBtn)
      .wait(4000); // Chờ 4 giây sau khi nhấp LOGIN
    await t.maximizeWindow();

    // Kiểm tra tiêu đề "Files" có tồn tại
    const filesHeading = Selector("h1.ant-typography.css-7t2xvq").withText(
      "My Drive"
    );
    await t
      .expect(filesHeading.exists)
      .ok("Đăng nhập không thành công - Không tìm thấy tiêu đề 'My Drive'")
      .wait(2000);
  }
}

export default new LoginUserShare();
