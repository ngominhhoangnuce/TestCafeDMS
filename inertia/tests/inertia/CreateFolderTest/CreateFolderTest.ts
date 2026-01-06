import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import CreateFolderPage from "../../../pages/CreateFolderPage/CreateFolderPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";

fixture`Test Create Folder`.page(`${SystemConstant.API_URL}`);

test("Test Create Folder", async (t) => {
  await LoginPage.LoginPage();
  await CreateFolderPage.CreateNewFolder();
});
