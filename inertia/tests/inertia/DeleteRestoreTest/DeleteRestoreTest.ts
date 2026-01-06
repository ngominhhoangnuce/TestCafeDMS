import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import DeleteRestore from "../../../pages/DeleteRestorePage/DeleteRestorePage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import CreateNewFolder from "../../../pages/CreateFolderPage/CreateFolderPage";

fixture`Test Delete Restore`.page(`${SystemConstant.API_URL}`);

test("Test Delete Restore", async (t) => {
  await LoginPage.LoginPage();
  await CreateNewFolder.CreateNewFolder();
  await DeleteRestore.DeleteRestore();
});
