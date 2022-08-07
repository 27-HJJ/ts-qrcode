//---------------------------------------------------------------------
// QRMath使用的数学工具
//---------------------------------------------------------------------
export const QRMath = {
	/*
	将n转化为a^m
	 */
	glog(n: any) {
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		return QRMath.LOG_TABLE[n];
	},
	/*
	将a^m转化为n
	 */
	gexp(n: any) {
		while (n < 0) {
			n += 255;
		}
		while (n >= 256) {
			n -= 255;
		}
		return QRMath.EXP_TABLE[n];
	},
	EXP_TABLE: new Array(256),
	LOG_TABLE: new Array(256)

};

for (let i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (let i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (let i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}

export class QRPolynomial {
	num: any
	constructor(num: any, shift: number) {
		if (num.length == undefined) {
			throw new Error(num.length + "/" + shift);
		}
		let offset = 0;
		while (offset < num.length && num[offset] == 0) {
			offset++;
		}
		this.num = new Array(num.length - offset + shift);
		for (let i = 0; i < num.length - offset; i++) {
			this.num[i] = num[i + offset];
		}
	}

	get(index: number): any {
		return this.num[index];
	}

	getLength(): number {
		return this.num.length;
	}
	/**
	 * 多项式乘法
	 * @param  {QRPolynomial} e 被乘多项式
	 * @return {[type]}   [description]
	 */
	multiply(e: QRPolynomial): QRPolynomial {
		let num = new Array(this.getLength() + e.getLength() - 1);
		for (let i = 0; i < this.getLength(); i++) {
			for (let j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
			}
		}
		return new QRPolynomial(num, 0);
	}

	/**
	 * 多项式模运算
	 * @param  {QRPolynomial} e 模多项式
	 * @return {}
	 */
	mod(e: QRPolynomial): QRPolynomial {
		let tl = this.getLength(),
			el = e.getLength();
		if (tl - el < 0) {
			return this;
		}
		let num = new Array(tl);
		for (let i = 0; i < tl; i++) {
			num[i] = this.get(i);
		}
		while (num.length >= el) {
			let ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

			for (let i = 0; i < e.getLength(); i++) {
				num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
			}
			while (num[0] == 0) {
				num.shift();
			}
		}
		return new QRPolynomial(num, 0);
	}

}