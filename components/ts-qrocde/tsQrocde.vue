<template xlang="wxml" minapp="mpvue">
	<view class="tki-qrcode">
		<!-- #ifndef MP-ALIPAY -->
		<canvas class="tki-qrcode-canvas" :canvas-id="props.cid" :style="{ width: cpSize + 'px', height: cpSize + 'px' }" />
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<canvas :id="props.cid" :width="cpSize" :height="cpSize" class="tki-qrcode-canvas" />
		<!-- #endif -->
		<image v-show="props.show" :src="result" :style="{ width: cpSize + 'px', height: cpSize + 'px' }" />
	</view>
</template>

<script lang="ts" setup>
import {
	defineProps,
	withDefaults,
	defineEmits,
	ref,
	getCurrentInstance,
	computed,
	watch,
	onMounted,
} from "vue";
import { QRCode } from "./qrcode";

import { _empty } from "./utils/index";

interface porpsType {
	cid: string;
	size: number;
	unit: string;
	show: boolean;
	val: string;
	background: string;
	foreground: string;
	pdground: string;
	icon: string;
	iconSize: number;
	lv: number;
	onval: boolean;
	loadMake: boolean;
	usingComponents: boolean;
	showLoading: boolean;
	loadingText: string;
}

const props = withDefaults(defineProps<porpsType>(), {
	cid: "tki-qrcode-canvas",
	size: 200,
	unit: "upx",
	show: true,
	val: "123123",
	background: "#ffffff",
	foreground: "#000000",
	pdground: "#000000",
	icon: "",
	iconSize: 40,
	lv: 3,
	onval: false,
	loadMake: false,
	usingComponents: true,
	showLoading: true,
	loadingText: "二维码生成中",
});

const emit = defineEmits<{
	(e: "result", url: string): void
	(e: "clear", res: any): void
}>();

const cpSize = computed(() => {
	if (props.unit === "upx") {
		return uni.upx2px(props.size);
	} else {
		return props.size || 180;
	}
});

watch(
	() => props.size,
	(n: any, o: any) => {
		if (n != o && !_empty(n)) {
			if (!_empty(props.val)) {
				setTimeout(() => {
					_makeCode();
				}, 100);
			}
		}
	}
);

watch(
	() => props.val,
	(n: any, o: any) => {
		if (props.onval) {
			if (n != o && !_empty(n)) {
				setTimeout(() => {
					_makeCode();
				}, 0);
			}
		}
	}
);
const result = ref("");
let qrcode: QRCode;
const _this = getCurrentInstance();
const _makeCode = () => {
	if (!_empty(props.val)) {
		qrcode = new QRCode({
			context: _this, // 上下文环境
			canvasId: props.cid, // canvas-id
			usingComponents: props.usingComponents, // 是否是自定义组件
			showLoading: props.showLoading, // 是否显示loading
			loadingText: props.loadingText, // loading文字
			text: props.val, // 生成内容
			size: cpSize.value, // 二维码大小
			background: props.background, // 背景色
			foreground: props.foreground, // 前景色
			pdground: props.pdground, // 定位角点颜色
			correctLevel: props.lv, // 容错级别
			image: props.icon, // 二维码图标
			imageSize: props.iconSize, // 二维码图标大小
			cbResult(res: string) {
				// 生成二维码的回调
				_result(res);
			},
		});
	}
};

const _clearCode = () => {
	_result("");
	qrcode.clear(() => {
		emit('clear', 'success')
	});
};
// 保存到相册
const _saveCode = () => {
	let that = this;
	if (result.value != "") {
		uni.saveImageToPhotosAlbum({
			filePath: result.value,
			success: function () {
				uni.showToast({
					title: "二维码保存成功",
					icon: "success",
					duration: 2000,
				});
			},
		});
	}
};
const _result = (res: string) => {
	console.log(res);
	result.value = res;
	// _saveCode()
	emit("result", res);

};
onMounted(() => {
	_makeCode();
});
</script>
<style>
.tki-qrcode {
	position: relative;
}

.tki-qrcode-canvas {
	position: fixed;
	top: -99999upx;
	left: -99999upx;
	z-index: -99999;
}
</style>
