# ts-qrcode
基于uniapp ts 的二维码实现,该组件主要根据[tki-qrcode](https://github.com/q310550690/uni-app-qrcode) 进行修改的组件。

## 属性
| 属性名            | 类型    |默认值          | 可选值     |说明  |
| ---------------- | ------- | ------------- | ---------- | ---- | 
| cid              | String  |qrcode         |            |canvasId，页面存在多个二维码组件时需设置不同的ID |
| size             | Number  |200            |            |生成的二维码大小 |
| unit             | String  |upx            | upx	px    |大小单位尺寸 |
| show             | Boolean |true           |            |默认使用组件中的image标签显示二维码 |
| val              | String  |               |            |要生成的内容 |
| size             | Number  |200            |            |生成的二维码大小 |
| background       | String  |#000000	       |            |二维码背景色 |
| foreground       | String  |#ffffff	       |            |二维码前景色 |
| pdground         | String  |#ffffff	       |            |二维码角标色 |
| lv               | Number  |3(一般不用设置) | 1, 0, 3, 2 |容错级别 |
| usingComponents  | Boolean |true           | false      |是否使用了自定义组件模式（主要是为了修复非自定义组件模式时 v-if 无法生成二维码的问题） |
| showLoading      | Boolean |true	         | false      |是否显示loading |
| loadingText      | String  |	二维码生成中  |            |loading文字 |


## 方法
_makeCode()	 生成二维码
_clearCode() 清空二维码
_saveCode()	 保存二维码到图库
result       生成的图片base64或图片临时地址	返回二维码路径 