import { QRCodeAlg, QRErrorCorrectLevel } from './utils/qrCodeAlg'

// 初始化配置项
export interface initType {
	text: string,
	size: number,
	correctLevel: number,
	background: string,
	foreground: string,
	pdground: string,
	image: string,
	imageSize: number,
	canvasId: string,
	context: any,
	usingComponents: boolean,
	showLoading: boolean,
	loadingText: string,
	cbResult(res: string): void
}

// 前景色类型
interface ForeGroundConfigType {
	row: number,
	col: number,
	count: number,
	options: initType
}

let qrcodeAlgObjCache: any = [];

export class QRCode {
	options: initType
	qrCodeAlg: QRCodeAlg // 初始化
	constructor(opt: initType) {
		this.options = opt
		this.qrCodeAlg = new QRCodeAlg('', QRErrorCorrectLevel[2])
		let len = qrcodeAlgObjCache.length
		let i = 0
		for (i = 0; i < len; i++) {
			if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
				this.qrCodeAlg = qrcodeAlgObjCache[i].obj;
				break;
			}
		}
		if (i === len) {
			this.qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
			qrcodeAlgObjCache.push({
				text: this.options.text,
				correctLevel: this.options.correctLevel,
				obj: this.qrCodeAlg
			});
		}
		this.createCanvas(this.options);
	}
	/**
	 * 计算矩阵点的前景色
	 * @param {Obj} config
	 * @param {Number} config.row 点x坐标
	 * @param {Number} config.col 点y坐标
	 * @param {Number} config.count 矩阵大小
	 * @param {Number} config.options 组件的options
	 * @return {String}
	 */
	getForeGround(config: ForeGroundConfigType) {
		var options = config.options;
		if (options.pdground && (
			(config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5) ||
			(config.row > (config.count - 6) && config.row < (config.count - 2) && config.col > 1 && config.col < 5) ||
			(config.row > 1 && config.row < 5 && config.col > (config.count - 6) && config.col < (config.count - 2))
		)) {
			return options.pdground;
		}
		return options.foreground;
	}

	// 画圆角矩形
	drawRoundedRect(ctxi: any, x: number, y: number, width: number, height: number, r: number, lineWidth: number, fill: boolean, stroke: boolean) {
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
	// 创建canvas
	createCanvas(options: initType) {
		if (options.showLoading) {
			uni.showLoading({
				title: options.loadingText,
				mask: true
			});
		}
		let ctx = uni.createCanvasContext(options.canvasId, options.context); // 创建画布
		let count = this.qrCodeAlg.getModuleCount();
		let ratioSize = options.size;
		let ratioImgSize = options.imageSize;
		//计算每个点的长宽
		let tileW = (ratioSize / count).toPrecision(4);
		let tileH = (ratioSize / count).toPrecision(4);
		//绘制
		for (let row = 0; row < count; row++) {
			for (let col = 0; col < count; col++) {
				let w = (Math.ceil((col + 1) * parseFloat(tileW)) - Math.floor(col * parseFloat(tileW)));
				let h = (Math.ceil((row + 1) * parseFloat(tileW)) - Math.floor(row * parseFloat(tileW)));
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
			this.drawRoundedRect(ctx, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true)
			ctx.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
		}
		setTimeout(() => {
			ctx.draw(true, () => {
				// 保存到临时区域
				setTimeout(() => {
					uni.canvasToTempFilePath({
						width: options.size,
						height: options.size,
						destWidth: options.size,
						destHeight: options.size,
						canvasId: options.canvasId,
						quality: Number(1),
						success(res: any) {
							if (options.cbResult) {
								options.cbResult(res.tempFilePath)
							}
						},
						complete() {
							if (options.showLoading) {
								uni.hideLoading();
							}
						},
					}, options.context);
				}, options.text.length + 100);
			});
		}, options.usingComponents ? 0 : 150);
	}
	/* 清除 */
	clear(fn: any) {
		let ctx = uni.createCanvasContext(this.options.canvasId, this.options.context)
		ctx.clearRect(0, 0, this.options.size, this.options.size)
		ctx.draw(false, () => {
			if (fn) {
				fn()
			}
		})
	};

}