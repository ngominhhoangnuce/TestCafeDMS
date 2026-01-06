import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import MovePage from "../../../pages/MovePage/MovePage";

fixture`Test Move File-Folder`.page(`${SystemConstant.API_URL}`);

test("Test Move File-Folder", async (t) => {
  await t.wait(2000);
  await LoginPage.LoginPage();
  await MovePage.MovePage();
});
