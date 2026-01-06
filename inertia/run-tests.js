const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const glob = require("glob");

// === Danh sách test files theo thứ tự bạn muốn chạy ===
const testFiles = [
  "dist/tests/inertia/LoginTest/LoginTest.js",
  "dist/tests/inertia/CreateFolderTest/CreateFolderTest.js",
  "dist/tests/inertia/UploadFileTest/UploadFileTest.js",
  "dist/tests/inertia/UploadFileTest/UploadFileTest.js",
  "dist/tests/inertia/SearchTest/SearchTest.js",
  // Thêm các test file khác theo thứ tự bạn muốn
];

// Lọc ra những file thực sự tồn tại
const existingTestFiles = testFiles.filter((file) => {
  const exists = fs.existsSync(file);
  if (!exists) {
    console.warn(`⚠️ File không tồn tại (bỏ qua): ${file}`);
  }
  return exists;
});

if (existingTestFiles.length === 0) {
  console.error("❌ Không tìm thấy file test nào!");
  process.exit(1);
}

console.log(`📋 Sẽ chạy ${existingTestFiles.length} test files theo thứ tự:\n`);
existingTestFiles.forEach((file, index) => {
  console.log(`   ${index + 1}. ${file}`);
});
console.log("");

// === Get Vietnam time (UTC+7) ===
const now = new Date();
now.setHours(now.getHours() + 7);

const timestamp = now
  .toISOString()
  .replace(/[:.]/g, "-")
  .replace("T", "_")
  .slice(0, 19);

// === Function to wait for report to appear (max 5s) ===
function waitForReport(globPattern, timeoutMs = 5000, intervalMs = 200) {
  return new Promise((resolve) => {
    const start = Date.now();
    function check() {
      const files = glob.sync(globPattern);
      if (files.length > 0) return resolve(files);
      if (Date.now() - start > timeoutMs) return resolve([]);
      setTimeout(check, intervalMs);
    }
    check();
  });
}

(async () => {
  for (const file of existingTestFiles) {
    const testName = path.basename(file, path.extname(file)); // e.g., bookingtest
    const folderName = path.basename(path.dirname(file)); // e.g., bookingtest
    const reportFolder = path.resolve(
      __dirname,
      "reports",
      folderName,
      testName
    );

    if (!fs.existsSync(reportFolder)) {
      fs.mkdirSync(reportFolder, { recursive: true });
    }

    const finalReportPath = path.join(reportFolder, `report-${timestamp}.html`);
    //const command = `npx testcafe chrome --disable-web-security --disable-native-automation "${file}" -r acd-html-reporter -s takeOnFails=true`;
    const command = `npx testcafe "chrome --allow-insecure-localhost --disable-web-security --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=http://nexus.inertiasystems.com --auto-accept-camera-and-microphone-capture --enable-features=AutomationControlled --disable-blink-features=AutomationControlled" "${file}" -r acd-html-reporter -s takeOnFails=true`;

    console.log(`\n▶️ Running test file: ${file}`);
    console.log(`📂 Report will be saved at: ${finalReportPath}\n`);

    try {
      execSync(command, { stdio: "inherit" });
    } catch (err) {
      console.error(`❌ Error while running test file: ${file}`);
    }

    const reportFiles = await waitForReport("test-results/**/report*.html");

    // Pick the latest report
    let sourceReport = null;
    let latestMtime = 0;
    for (const file of reportFiles) {
      const stat = fs.statSync(file);
      if (stat.mtimeMs > latestMtime) {
        latestMtime = stat.mtimeMs;
        sourceReport = file;
      }
    }

    if (sourceReport && fs.existsSync(sourceReport)) {
      let html = fs.readFileSync(sourceReport, "utf8");
      // const screenshotPrefix =
      //   "C:\\Users\\Hicas\\Downloads\\jasminetest\\screenshots\\";
      const screenshotPrefix = "E:\\Hicas\\inertia\\screenshots\\";
      const screenshotAttrs = [
        ...html.matchAll(/screenshot=["']([^"']+)["']/g),
      ].map((m) => m[1]);
      const screenshotSrcs = screenshotAttrs.filter((src) =>
        src.startsWith(screenshotPrefix)
      );
      if (screenshotSrcs.length > 0) {
        console.log("🖼️ Local screenshot paths found in the report:");
        screenshotSrcs.forEach((src) => console.log("   ", src));
        // Replace local paths with public URLs in the report content
        screenshotSrcs.forEach((localPath) => {
          const urlPath =
            "http://localhost:4000/files/screenshots/" +
            localPath.substring(screenshotPrefix.length).replace(/\\/g, "/");
          html = html.replaceAll(localPath, urlPath);
        });
        // Save report with replaced screenshot paths
        fs.writeFileSync(sourceReport, html, "utf8");
      } else {
        console.log("ℹ️ No local screenshot paths found in the report.");
      }
      fs.renameSync(sourceReport, finalReportPath);
      console.log(`✅ Report moved to: ${finalReportPath}`);
    } else {
      console.warn("⚠️ No report file found to move!");
    }
  }

  // Copy screenshots folder into reports
  //const srcDir = "C:\\Users\\Hicas\\Downloads\\jasminetest\\screenshots";
  const srcDir = "E:\\Hicas\\inertia\\screenshots";
  const destDir = path.join(__dirname, "reports", "screenshots");

  // Check if screenshots folder exists
  if (fs.existsSync(srcDir)) {
    try {
      fs.cpSync(srcDir, destDir, { recursive: true, force: true });
      console.log("📂 Screenshots folder copied into reports/screenshots.");
    } catch (err) {
      console.error("❌ Error while copying screenshots folder:", err);
    }
  } else {
    console.log("ℹ️ Screenshots folder does not exist, skipping copy.");
  }

  console.log("\n🎉 Finished running all test cases.");
})();
