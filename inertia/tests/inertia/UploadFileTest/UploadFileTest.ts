import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import UploadFilePage from "../../../pages/UploadFilePage/UploadFilePage";

fixture`Test Upload File`.page(`${SystemConstant.API_URL}`);

test("Test Upload File", async (t) => {
  await LoginPage.LoginPage();
  await UploadFilePage.UploadFile();
});
