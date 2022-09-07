const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(
  "mongodb+srv://livingodlife:FnjzDCcLuSholnnX@cluster0.rvzulm5.mongodb.net/mission24?retryWrites=true&w=majority"
);

app.listen(80, () => {
  console.log("섭어가 열렸읍니다");
});
