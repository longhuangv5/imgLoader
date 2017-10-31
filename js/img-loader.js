/**
 * Created by Administrator on 2017/10/30 0030.
 */
void

function() {
	'use strict'

	angular.module('imgLoader', ['ng']).config(['imgQueueServiceProvider', function(imgQueueServiceProvider) {
		imgQueueServiceProvider.setOptions({
			errorImg: './img/error.gif',
			loadingImg: './img/loading.gif',
			preHeight: 50
		})
	}]).directive('ngLoader', ['imgQueueService', '$timeout', function(imgQueueService, $timeout) {
		return {
			restrict: 'A',
			scope: {
				ngLoader: '@'
			},
			link: function(scope, el, attr) {
				var watcher = scope.$watch('ngLoader', function(src) {
					if(src && src.length) {
						$timeout(function() {
							var img = {
								src: attr.ngLoader,
								currHref: location.href,
								el: el,
								y: el[0].y || 0
							}
							imgQueueService.pushQueue(img);
							watcher();
						});
					}
				})
			}
		}
	}]).provider('imgQueueService', [function() {
		var options = {
			errorImg: './img/error.gif',
			loadingImg: './img/loading.gif',
			preHeight: 50
		};
		return {
			setOptions: function(opt) {
				options = opt;
			},
			$get: function() {
				var queue = [],
					queueTemp = [];
				var running = false;
				var image = new Image();
				void

				function() {
					window.onscroll = function() {
						pushRealQueue()
					}
				}();
				return {
					pushQueue: pushQueue,
					goAhead: goAhead
				}

				function pushQueue(img) {
					queueTemp.push(img);
					img.el.attr('src', options.loadingImg);
					pushRealQueue()
				}

				function pushRealQueue() {
					var length = queueTemp.length;
					for(var i = 0; i < length; i++) {
						var q = queueTemp.shift();
						if(location.href !== q.currHref) continue;
						if(q.y - (window.scrollY || window.screenTop) - window.innerHeight < options.preHeight) {
							queue.push(q);
							goAhead();
						} else {
							queueTemp.push(q);
						}
					}
				}

				function goAhead() {
					if(running) return;
					if(!queue.length) return;
					var img = queue.shift();
					location.href === img.currHref ? loadImg(img) : goAhead();
				}

				function loadImg(img) {
					running = true;
					image.onload = function() {
						img.el.attr('src', img.src);
						img.el.addClass('img-loaded');
						running = false;
						goAhead();
					}
					image.onerror = function() {
						img.el.attr('src', options.errorImg);
						running = false;
						goAhead();
					}
					image.src = img.src;
				}
			}
		}
	}])
}()