import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import CheckInformation from "../../../pages/CheckInformationPage/CheckInformationPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";

fixture`Test Check Information`.page(`${SystemConstant.API_URL}`);

test("Test Check Information", async (t) => {
  await LoginPage.LoginPage();
  await CheckInformation.CheckInformation();
});
