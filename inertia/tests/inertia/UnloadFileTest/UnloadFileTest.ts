import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import UnloadFilePage from "../../../pages/UnloadFilePage/UnloadFilePage";

fixture`Test Unload File`.page(`${SystemConstant.API_URL}`);

test("Test Unload File", async (t) => {
  await LoginPage.LoginPage();
  await UnloadFilePage.UnloadFile();
});
