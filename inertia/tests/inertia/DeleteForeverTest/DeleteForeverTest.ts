import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import DeleteForever from "../../../pages/DeleteForeverPage/DeleteForeverPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import CreateNewFolder from "../../../pages/CreateFolderPage/CreateFolderPage";

fixture`Test Delete Forever`.page(`${SystemConstant.API_URL}`);

test("Test Delete Forever", async (t) => {
  await LoginPage.LoginPage();
  await CreateNewFolder.CreateNewFolder();
  await DeleteForever.DeleteForever();
});
