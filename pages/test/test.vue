<template>
	<view>
		<tsQrocde @result='getQRcodeUrl' cid="qrcode" :val="val" :size="size" :unit="unit" :background="background"
			:foreground="foreground" :pdground="pdground" :lv="lv" :onval="onval" :loadMake="loadMake"
			:showLoading="showLoading"></tsQrocde>
		<button @click="changeVal">重新绘制</button>
	</view>
</template>

<script lang="ts" setup>
	import tsQrocde from '@/components/ts-qrocde/tsQrocde.vue'
	import {
		ref
	} from 'vue'
	const val = ref("qrcodeId")
	const size = ref(200)
	const unit = ref("px")
	const background = ref("#fff")
	const foreground = ref("#000")
	const pdground = ref("#000")
	const lv = ref(3)
	const onval = ref(true)
	const loadMake = ref(true)
	const showLoading = ref(true)

	const changeVal = () => {
		val.value = '1231231'
	}

	const getQRcodeUrl = (url: string) => {
		console.log(url);
	}
</script>

<style>
</style>
