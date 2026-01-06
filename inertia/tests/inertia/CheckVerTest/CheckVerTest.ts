import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import CheckVersion from "../../../pages/CheckVersionPage/CheckVersionPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";

fixture`Test Version`.page(`${SystemConstant.API_URL}`);

test("Test Version", async (t) => {
  await LoginPage.LoginPage();
  await CheckVersion.CheckVersion();
});
