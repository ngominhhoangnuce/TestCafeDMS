import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import MakeacopyTestPage from "../../../pages/MakeacopyTestPage/MakeacopyTestPage";

fixture`Test Make a Copy`.page(`${SystemConstant.API_URL}`);

test("Test Make a Copy", async (t) => {
  await t.wait(2000);
  await LoginPage.LoginPage();
  await MakeacopyTestPage.MakeacopyTestPage();
});
