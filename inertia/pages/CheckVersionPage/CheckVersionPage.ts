import { Selector, t } from "testcafe";

class CheckVersion {
  // Hàm chính xử lý các tương tác kiểm tra version
  async CheckVersion() {
    console.log("[Bước 1] Nhấp vào thẻ version số 3");
    const versionTag = Selector(
      'span.ant-tag.css-7t2xvq[style*="cursor: pointer"][style*="border-radius: 8px"][style*="background: rgb(230, 247, 255)"]'
    ).withText("3");
    await t
      .expect(versionTag.exists)
      .ok("Không tìm thấy thẻ version số 3")
      .click(versionTag)
      .wait(2000);

    console.log("[Bước 2] Nhấp vào switch toggle trong row version 1");
    const versionRow = Selector("tr.ant-table-row")
      .withText("1")
      .find("button.ant-switch.table-switch");
    await t
      .expect(versionRow.exists)
      .ok("Không tìm thấy switch toggle trong row version 1")
      .click(versionRow)
      .wait(2000);

    console.log("[Bước 3] Nhấp vào switch toggle trong row version 1");
    const versionRow19 = Selector("tr.ant-table-row")
      .withText("1")
      .find("button.ant-switch.table-switch");
    await t
      .expect(versionRow19.exists)
      .ok("Không tìm thấy switch toggle trong row version 1")
      .click(versionRow19)
      .wait(2000);

    console.log("[Bước 4] Nhấp vào nút Done");
    const doneButton = Selector(
      'button.ant-btn.ant-btn-primary[style*="background-color: rgb(244, 135, 54)"]'
    ).withText("Done");
    await t
      .expect(doneButton.exists)
      .ok("Không tìm thấy nút Done")
      .click(doneButton)
      .wait(5000);
  }
}

export default new CheckVersion();
