import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";

fixture`Test Login`.page(`${SystemConstant.API_URL}`);

test("Test Login", async (t) => {
  await t.wait(2000);
  await LoginPage.LoginPage();
});
