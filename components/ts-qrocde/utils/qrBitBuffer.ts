export class QRBitBuffer {
	buffer: any
	length: number
	constructor() {
		this.buffer = new Array();
		this.length = 0;
	}
	get(index: number): number {
		var bufIndex = Math.floor(index / 8);
		return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1);
	}
	put(num: number, length: number): void {
		for (var i = 0; i < length; i++) {
			this.putBit(((num >>> (length - i - 1)) & 1));
		}
	}
	putBit(bit: any): void {
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
		}
		this.length++;
	}
}

