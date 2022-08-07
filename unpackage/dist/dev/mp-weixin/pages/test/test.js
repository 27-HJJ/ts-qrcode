"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  tsQrocde();
}
const tsQrocde = () => "../../components/ts-qrocde/tsQrocde.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "test",
  setup(__props) {
    const val = common_vendor.ref("qrcodeId");
    const size = common_vendor.ref(200);
    const unit = common_vendor.ref("px");
    const background = common_vendor.ref("#fff");
    const foreground = common_vendor.ref("#000");
    const pdground = common_vendor.ref("#000");
    const lv = common_vendor.ref(3);
    const onval = common_vendor.ref(true);
    const loadMake = common_vendor.ref(true);
    const showLoading = common_vendor.ref(true);
    const changeVal = () => {
      val.value = "1231231";
    };
    const getQRcodeUrl = (url) => {
      console.log(url);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getQRcodeUrl),
        b: common_vendor.p({
          cid: "qrcode",
          val: val.value,
          size: size.value,
          unit: unit.value,
          background: background.value,
          foreground: foreground.value,
          pdground: pdground.value,
          lv: lv.value,
          onval: onval.value,
          loadMake: loadMake.value,
          showLoading: showLoading.value
        }),
        c: common_vendor.o(changeVal)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/QQ/1527111875/FileRecv/ts-qrcode/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
