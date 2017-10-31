# imgLoader
angular 的图片懒加载插件（满足一般需求的简易版）
使用的时候angular.module('MyApp',['imgLoader'])，然后在<img ng-loader="{{imgAddress}}"/>就可以了
做了常用浏览器的兼容、跟随滑动按需加载、转换页面后丢弃前一页面的未加载图片、队列加载，一次一张，防止浏览器内存占用过大
