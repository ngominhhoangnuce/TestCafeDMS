import { test, fixture } from "testcafe";
import { SystemConstant } from "../../common/SystemConstant";
// import LoginSuccess from "../../../pages/login/loginSuccess";
// import BookingFormPage from "../../../pages/booking/bookingFormPage";
import LoginSuperUser from "../../../pages/LoginSuperUserPage/LoginSuperUserPage";
import TransOwner from "../../../pages/TransOwnerPage/TransOwnerPage";

fixture`Test Trans Owner`.page(`${SystemConstant.API_URL}`);

test("Test Trans Owner", async (t) => {
  await t.wait(2000);
  await LoginSuperUser.LoginSuperUser();
  await TransOwner.TransOwner();
});
