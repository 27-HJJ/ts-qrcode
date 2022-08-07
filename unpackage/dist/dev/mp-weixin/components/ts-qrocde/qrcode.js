"use strict";
var common_vendor = require("../../common/vendor.js");
var components_tsQrocde_utils_qrCodeAlg = require("./utils/qrCodeAlg.js");
let qrcodeAlgObjCache = [];
class QRCode {
  constructor(opt) {
    this.options = opt;
    this.qrCodeAlg = new components_tsQrocde_utils_qrCodeAlg.QRCodeAlg("", components_tsQrocde_utils_qrCodeAlg.QRErrorCorrectLevel[2]);
    let len = qrcodeAlgObjCache.length;
    let i = 0;
    for (i = 0; i < len; i++) {
      if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
        this.qrCodeAlg = qrcodeAlgObjCache[i].obj;
        break;
      }
    }
    if (i === len) {
      this.qrCodeAlg = new components_tsQrocde_utils_qrCodeAlg.QRCodeAlg(this.options.text, this.options.correctLevel);
      qrcodeAlgObjCache.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: this.qrCodeAlg
      });
    }
    this.createCanvas(this.options);
  }
  getForeGround(config) {
    var options = config.options;
    if (options.pdground && (config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 || config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 || config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2)) {
      return options.pdground;
    }
    return options.foreground;
  }
  drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
    ctxi.setLineWidth(lineWidth);
    ctxi.setFillStyle(this.options.background);
    ctxi.setStrokeStyle(this.options.background);
    ctxi.beginPath();
    ctxi.moveTo(x + r, y);
    ctxi.arcTo(x + width, y, x + width, y + r, r);
    ctxi.arcTo(x + width, y + height, x + width - r, y + height, r);
    ctxi.arcTo(x, y + height, x, y + height - r, r);
    ctxi.arcTo(x, y, x + r, y, r);
    ctxi.closePath();
    if (fill) {
      ctxi.fill();
    }
    if (stroke) {
      ctxi.stroke();
    }
  }
  createCanvas(options) {
    if (options.showLoading) {
      common_vendor.index.showLoading({
        title: options.loadingText,
        mask: true
      });
    }
    let ctx = common_vendor.index.createCanvasContext(options.canvasId, options.context);
    let count = this.qrCodeAlg.getModuleCount();
    let ratioSize = options.size;
    let ratioImgSize = options.imageSize;
    let tileW = (ratioSize / count).toPrecision(4);
    let tileH = (ratioSize / count).toPrecision(4);
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        let w = Math.ceil((col + 1) * parseFloat(tileW)) - Math.floor(col * parseFloat(tileW));
        let h = Math.ceil((row + 1) * parseFloat(tileW)) - Math.floor(row * parseFloat(tileW));
        let foreground = this.getForeGround({
          row,
          col,
          count,
          options
        });
        ctx.setFillStyle(this.qrCodeAlg.modules[row][col] ? foreground : options.background);
        ctx.fillRect(Math.round(col * parseFloat(tileW)), Math.round(row * parseFloat(tileH)), w, h);
      }
    }
    if (options.image) {
      let x = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));
      let y = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));
      this.drawRoundedRect(ctx, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);
      ctx.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
    }
    setTimeout(() => {
      ctx.draw(true, () => {
        setTimeout(() => {
          common_vendor.index.canvasToTempFilePath({
            width: options.size,
            height: options.size,
            destWidth: options.size,
            destHeight: options.size,
            canvasId: options.canvasId,
            quality: Number(1),
            success(res) {
              if (options.cbResult) {
                options.cbResult(res.tempFilePath);
              }
            },
            complete() {
              if (options.showLoading) {
                common_vendor.index.hideLoading();
              }
            }
          }, options.context);
        }, options.text.length + 100);
      });
    }, options.usingComponents ? 0 : 150);
  }
  clear(fn) {
    let ctx = common_vendor.index.createCanvasContext(this.options.canvasId, this.options.context);
    ctx.clearRect(0, 0, this.options.size, this.options.size);
    ctx.draw(false, () => {
      if (fn) {
        fn();
      }
    });
  }
}
exports.QRCode = QRCode;
