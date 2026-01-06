import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import SharePermissionPage from "../../../pages/SharePermissionPage/SharePermissionPage";

fixture`Test Share Permission`.page(`${SystemConstant.API_URL}`);

test("Test Share Permission", async (t) => {
  await t.wait(2000);
  await LoginPage.LoginPage();
  await SharePermissionPage.SharePermission();
});
