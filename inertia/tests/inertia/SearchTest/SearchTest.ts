import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import Search from "../../../pages/SearchPage/SearchPage";

fixture`Search File/Folder`.page(`${SystemConstant.API_URL}`);

test("Search File/Folder", async (t) => {
  await LoginPage.LoginPage();
  await Search.Search();
});
