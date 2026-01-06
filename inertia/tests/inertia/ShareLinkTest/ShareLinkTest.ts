import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import ShareLinkPage from "../../../pages/ShareLinkPage/ShareLinkPage";

fixture`Test Share Link`.page(`${SystemConstant.API_URL}`);

test("Test Share Link", async (t) => {
  await LoginPage.LoginPage();
  await ShareLinkPage.ShareLinkPage();
});
