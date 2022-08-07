// import { QRPolynomial, QRMath } from './qrPolynomial'

/**
 * 获取单个字符的utf8编码
 * unicode BMP平面约65535个字符
 * @param {num} code
 * return {array}
 */
export function unicodeFormat8(code: number): number[] {
	// 1 byte
	var c0, c1, c2;
	if (code < 128) {
		return [code];
		// 2 bytes
	} else if (code < 2048) {
		c0 = 192 + (code >> 6);
		c1 = 128 + (code & 63);
		return [c0, c1];
		// 3 bytes
	} else {
		c0 = 224 + (code >> 12);
		c1 = 128 + (code >> 6 & 63);
		c2 = 128 + (code & 63);
		return [c0, c1, c2];
	}
}

/**
	 * 获取字符串的utf8编码字节串
	 * @param {string} string
	 * @return {array}
	 */
export function getUTF8Bytes(string: string) {
	var utf8codes:number[] = [];
	for (var i = 0; i < string.length; i++) {
		var code = string.charCodeAt(i);
		var utf8 = unicodeFormat8(code);
		for (var j = 0; j < utf8.length; j++) {
			utf8codes.push(utf8[j]);
		}
	}
	return utf8codes;
}
/**
	 * 判断是否为空
	 * @param {string} v
	 * @return {Boolean}
	 */
export function _empty(v: any) {
	let tp = typeof v,
		rt = false;
	if (tp == "number" && String(v) == "") {
		rt = true
	} else if (tp == "undefined") {
		rt = true
	} else if (tp == "object") {
		if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
	} else if (tp == "string") {
		if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
	} else if (tp == "function") {
		rt = false
	}
	return rt
}
/**
 * QRMath
 * 
 */
// const EXP_TABLE: any = new Array(256)
// const LOG_TABLE: any = new Array(256)

// for (let i = 0; i < 8; i++) {
// 	EXP_TABLE[i] = 1 << i;
// }
// for (let i = 8; i < 256; i++) {
// 	EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
// }
// for (let i = 0; i < 255; i++) {
// 	LOG_TABLE[EXP_TABLE[i]] = i;
// }

// /*将n转化为a^m*/
// export function glog(n: any) {
// 	if (n < 1) {
// 		throw new Error("glog(" + n + ")");
// 	}
// 	return LOG_TABLE[n];
// }
// /*将a^m转化为n*/
// export function gexp(n: any) {
// 	while (n < 0) {
// 		n += 255;
// 	}
// 	while (n >= 256) {
// 		n -= 255;
// 	}
// 	return EXP_TABLE[n];
// }

/**
 * QRUtil
 */

// const QRMaskPattern = {
// 	PATTERN000: 0,
// 	PATTERN001: 1,
// 	PATTERN010: 2,
// 	PATTERN011: 3,
// 	PATTERN100: 4,
// 	PATTERN101: 5,
// 	PATTERN110: 6,
// 	PATTERN111: 7
// };

// const PATTERN_POSITION_TABLE = [
// 	[],
// 	[6, 18],
// 	[6, 22],
// 	[6, 26],
// 	[6, 30],
// 	[6, 34],
// 	[6, 22, 38],
// 	[6, 24, 42],
// 	[6, 26, 46],
// 	[6, 28, 50],
// 	[6, 30, 54],
// 	[6, 32, 58],
// 	[6, 34, 62],
// 	[6, 26, 46, 66],
// 	[6, 26, 48, 70],
// 	[6, 26, 50, 74],
// 	[6, 30, 54, 78],
// 	[6, 30, 56, 82],
// 	[6, 30, 58, 86],
// 	[6, 34, 62, 90],
// 	[6, 28, 50, 72, 94],
// 	[6, 26, 50, 74, 98],
// 	[6, 30, 54, 78, 102],
// 	[6, 28, 54, 80, 106],
// 	[6, 32, 58, 84, 110],
// 	[6, 30, 58, 86, 114],
// 	[6, 34, 62, 90, 118],
// 	[6, 26, 50, 74, 98, 122],
// 	[6, 30, 54, 78, 102, 126],
// 	[6, 26, 52, 78, 104, 130],
// 	[6, 30, 56, 82, 108, 134],
// 	[6, 34, 60, 86, 112, 138],
// 	[6, 30, 58, 86, 114, 142],
// 	[6, 34, 62, 90, 118, 146],
// 	[6, 30, 54, 78, 102, 126, 150],
// 	[6, 24, 50, 76, 102, 128, 154],
// 	[6, 28, 54, 80, 106, 132, 158],
// 	[6, 32, 58, 84, 110, 136, 162],
// 	[6, 26, 54, 82, 110, 138, 166],
// 	[6, 30, 58, 86, 114, 142, 170]
// ]
// const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
// const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)
// const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)

/*
BCH编码格式信息
*/
// export function getBCHTypeInfo(data: number): number {
// 	let d = data << 10;
// 	while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
// 		d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15)));
// 	}
// 	return ((data << 10) | d) ^ G15_MASK;
// }
/*
BCH编码版本信息
 */
// export function getBCHTypeNumber(data: number): number {
// 	let d = data << 12;
// 	while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
// 		d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18)));
// 	}
// 	return (data << 12) | d;
// }
/*
获取BCH位信息
 */
// export function getBCHDigit(data: number): number {
// 	let digit = 0;
// 	while (data != 0) {
// 		digit++;
// 		data >>>= 1;
// 	}
// 	return digit;
// }
/*
获取版本对应的矫正图形位置
 */
// export function getPatternPosition(typeNumber: number): any {
// 	return PATTERN_POSITION_TABLE[typeNumber - 1];
// }
/*
掩膜算法
 */
// export function getMask(maskPattern: any, i: number, j: number): boolean {
// 	switch (maskPattern) {
// 		case QRMaskPattern.PATTERN000:
// 			return (i + j) % 2 == 0;
// 		case QRMaskPattern.PATTERN001:
// 			return i % 2 == 0;
// 		case QRMaskPattern.PATTERN010:
// 			return j % 3 == 0;
// 		case QRMaskPattern.PATTERN011:
// 			return (i + j) % 3 == 0;
// 		case QRMaskPattern.PATTERN100:
// 			return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
// 		case QRMaskPattern.PATTERN101:
// 			return (i * j) % 2 + (i * j) % 3 == 0;
// 		case QRMaskPattern.PATTERN110:
// 			return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
// 		case QRMaskPattern.PATTERN111:
// 			return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
// 		default:
// 			throw new Error("bad maskPattern:" + maskPattern);
// 	}
// }
/*
获取RS的纠错多项式
 */
// export function getErrorCorrectPolynomial(errorCorrectLength: any): any {
// 	let a = new QRPolynomial([1], 0);
// 	for (let i = 0; i < errorCorrectLength; i++) {
// 		a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
// 	}
// 	return a;
// }
/*
获取评价
 */
// export function getLostPoint(qrCode: any): number {
// 	let moduleCount = qrCode.getModuleCount(),
// 		lostPoint = 0,
// 		darkCount = 0;
// 	for (let row = 0; row < moduleCount; row++) {
// 		let sameCount = 0;
// 		let head = qrCode.modules[row][0];
// 		for (let col = 0; col < moduleCount; col++) {
// 			let current = qrCode.modules[row][col];
// 			//level 3 评价
// 			if (col < moduleCount - 6) {
// 				if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
// 					if (col < moduleCount - 10) {
// 						if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
// 							lostPoint += 40;
// 						}
// 					} else if (col > 3) {
// 						if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
// 							lostPoint += 40;
// 						}
// 					}
// 				}
// 			}
// 			//level 2 评价
// 			if ((row < moduleCount - 1) && (col < moduleCount - 1)) {
// 				let count = 0;
// 				if (current) count++;
// 				if (qrCode.modules[row + 1][col]) count++;
// 				if (qrCode.modules[row][col + 1]) count++;
// 				if (qrCode.modules[row + 1][col + 1]) count++;
// 				if (count == 0 || count == 4) {
// 					lostPoint += 3;
// 				}
// 			}
// 			//level 1 评价
// 			if (head ^ current) {
// 				sameCount++;
// 			} else {
// 				head = current;
// 				if (sameCount >= 5) {
// 					lostPoint += (3 + sameCount - 5);
// 				}
// 				sameCount = 1;
// 			}
// 			//level 4 评价
// 			if (current) {
// 				darkCount++;
// 			}
// 		}
// 	}
// 	for (let col = 0; col < moduleCount; col++) {
// 		let sameCount = 0;
// 		let head = qrCode.modules[0][col];
// 		for (let row = 0; row < moduleCount; row++) {
// 			let current = qrCode.modules[row][col];
// 			//level 3 评价
// 			if (row < moduleCount - 6) {
// 				if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
// 					if (row < moduleCount - 10) {
// 						if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
// 							lostPoint += 40;
// 						}
// 					} else if (row > 3) {
// 						if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
// 							lostPoint += 40;
// 						}
// 					}
// 				}
// 			}
// 			//level 1 评价
// 			if (head ^ current) {
// 				sameCount++;
// 			} else {
// 				head = current;
// 				if (sameCount >= 5) {
// 					lostPoint += (3 + sameCount - 5);
// 				}
// 				sameCount = 1;
// 			}
// 		}
// 	}
// 	// LEVEL4
// 	let ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
// 	lostPoint += ratio * 10;
// 	return lostPoint;
// }


