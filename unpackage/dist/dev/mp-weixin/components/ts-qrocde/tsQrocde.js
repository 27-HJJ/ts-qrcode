"use strict";
var common_vendor = require("../../common/vendor.js");
var components_tsQrocde_qrcode = require("./qrcode.js");
var components_tsQrocde_utils_index = require("./utils/index.js");
require("./utils/qrCodeAlg.js");
require("./utils/QRUtil.js");
require("./utils/qrPolynomial.js");
require("./utils/qrBitBuffer.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tsQrocde",
  props: {
    cid: { type: String, required: true, default: "tki-qrcode-canvas" },
    size: { type: Number, required: true, default: 200 },
    unit: { type: String, required: true, default: "upx" },
    show: { type: Boolean, required: true, default: true },
    val: { type: String, required: true, default: "123123" },
    background: { type: String, required: true, default: "#ffffff" },
    foreground: { type: String, required: true, default: "#000000" },
    pdground: { type: String, required: true, default: "#000000" },
    icon: { type: String, required: true, default: "" },
    iconSize: { type: Number, required: true, default: 40 },
    lv: { type: Number, required: true, default: 3 },
    onval: { type: Boolean, required: true, default: false },
    loadMake: { type: Boolean, required: true, default: false },
    usingComponents: { type: Boolean, required: true, default: true },
    showLoading: { type: Boolean, required: true, default: true },
    loadingText: { type: String, required: true, default: "\u4E8C\u7EF4\u7801\u751F\u6210\u4E2D" }
  },
  emits: ["result", "clear"],
  setup(__props, { emit }) {
    const props = __props;
    const cpSize = common_vendor.computed$1(() => {
      if (props.unit === "upx") {
        return common_vendor.index.upx2px(props.size);
      } else {
        return props.size || 180;
      }
    });
    common_vendor.watch(() => props.size, (n, o) => {
      if (n != o && !components_tsQrocde_utils_index._empty(n)) {
        if (!components_tsQrocde_utils_index._empty(props.val)) {
          setTimeout(() => {
            _makeCode();
          }, 100);
        }
      }
    });
    common_vendor.watch(() => props.val, (n, o) => {
      if (props.onval) {
        if (n != o && !components_tsQrocde_utils_index._empty(n)) {
          setTimeout(() => {
            _makeCode();
          }, 0);
        }
      }
    });
    const result = common_vendor.ref("");
    const _this = common_vendor.getCurrentInstance();
    const _makeCode = () => {
      if (!components_tsQrocde_utils_index._empty(props.val)) {
        new components_tsQrocde_qrcode.QRCode({
          context: _this,
          canvasId: props.cid,
          usingComponents: props.usingComponents,
          showLoading: props.showLoading,
          loadingText: props.loadingText,
          text: props.val,
          size: cpSize.value,
          background: props.background,
          foreground: props.foreground,
          pdground: props.pdground,
          correctLevel: props.lv,
          image: props.icon,
          imageSize: props.iconSize,
          cbResult(res) {
            _result(res);
          }
        });
      }
    };
    const _result = (res) => {
      console.log(res);
      result.value = res;
      emit("result", res);
    };
    common_vendor.onMounted(() => {
      _makeCode();
    });
    return (_ctx, _cache) => {
      return {
        a: props.cid,
        b: common_vendor.unref(cpSize) + "px",
        c: common_vendor.unref(cpSize) + "px",
        d: props.show,
        e: result.value,
        f: common_vendor.unref(cpSize) + "px",
        g: common_vendor.unref(cpSize) + "px"
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/QQ/1527111875/FileRecv/ts-qrcode/components/ts-qrocde/tsQrocde.vue"]]);
wx.createComponent(Component);
