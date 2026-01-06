import { Selector, t } from "testcafe";

class CheckInformation {
  // Hàm chính xử lý các tương tác tìm kiếm và lọc file
  async CheckInformation() {
    console.log("[Bước 1] Nhấp vào dòng thư mục mới");
    const testLine = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    ).withText("thư mục mới");
    await t
      .expect(testLine.exists)
      .ok("Không tìm thấy dòng thư mục mới")
      .click(testLine)
      .wait(2000);

    console.log("[Bước 3] Nhấp vào icon thông tin");
    const infoIcon = Selector(
      'span.anticon.anticon-info-circle[aria-label="info-circle"]'
    );
    await t
      .expect(infoIcon.exists)
      .ok("Không tìm thấy icon thông tin")
      .click(infoIcon)
      .wait(2000);

    console.log(
      "[Bước 4] Kiểm tra tên file trong bảng thông tin trùng với tên đã chọn"
    );
    const fileNameRow = Selector("tr")
      .find("td")
      .withText("File Name")
      .parent()
      .find("td")
      .withText("thư mục mới");
    await t
      .expect(fileNameRow.exists)
      .ok("Không tìm thấy tên file thư mục mới trong bảng thông tin");

    console.log("[Bước 5] Nhấp vào file bất kỳ trên màn hình");
    const allFiles = Selector(
      'div[style*="cursor: pointer"][style*="border-radius: 8px"][style*="padding: 6px 10px"]'
    );

    // Đếm số lượng file/folder có trên màn hình
    const fileCount = await allFiles.count;
    console.log(`Tổng số file/folder tìm thấy: ${fileCount}`);

    // Chọn ngẫu nhiên một file (bỏ qua item đầu tiên là "thư mục mới")
    const randomIndex = Math.floor(Math.random() * (fileCount - 1)) + 1;
    const anyFile = allFiles.nth(randomIndex);

    // Lấy tên file
    const fileName = await anyFile.innerText;
    console.log(
      `File được chọn ngẫu nhiên (index ${randomIndex}): ${fileName}`
    );

    await t
      .expect(anyFile.exists)
      .ok("Không tìm thấy file nào trên màn hình")
      .click(testLine)
      .click(anyFile)
      .wait(2000);

    console.log("[Bước 6] Kiểm tra tên file trong bảng thông tin");
    const fileNameInTable = Selector("tr")
      .find("td")
      .withText("File Name")
      .parent()
      .find("td")
      .nth(1); // Lấy cột thứ 2 (giá trị của File Name)

    await t
      .expect(fileNameInTable.exists)
      .ok("Không tìm thấy thông tin tên file trong bảng thông tin")
      .expect(fileNameInTable.innerText)
      .eql(
        fileName,
        `Tên file trong bảng thông tin không khớp với file đã chọn`
      )
      .wait(5000);

    console.log("[Bước 7] Double click vào file");
    await t.doubleClick(anyFile).wait(5000);
  }
}

export default new CheckInformation();
