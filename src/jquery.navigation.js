/*!
 * Navigation 1.0.0
 *
 * Copyright © Capiner https://capiner.com
 * MIT License https://github.com/capiner/navigation/blob/master/LICENSE
 */
(function($){
	$.Navigation = function(element, options){
		this.e = $(element);
		this.o = $.extend(true, {}, $.Navigation.defaults, options);
		this.toggle()
	};
	$.Navigation.prototype = {
		toggle: function(){
			var self = this, $content;
			self.e.find(self.o.hoverClass).hover(function(){
				if (self.e.hasClass(self.o.hasClass)){
					if (!('ontouchstart' in window) || navigator.maxTouchPoints < 1 || navigator.msMaxTouchPoints < 1){
						$content = $(this).children(self.o.contentClass).stop(true,true).delay(self.o.delay);
						self.o.effect == 'fade' ?
							$content.fadeIn(self.o.speed,self.o.easing):
							$content.slideDown(self.o.speed,self.o.easing);
					}
				}
			}, function(){
				if (self.e.hasClass(self.o.hasClass)){
					$content = $(this).children(self.o.contentClass).stop(true,true).delay(self.o.delay);
					self.o.effect == 'fade' ?
						$content.fadeOut(self.o.speed,self.o.easing):
						$content.slideUp(self.o.speed,self.o.easing);
				}
			});
			self.e.find(self.o.clickClass).on('click', function(){
				if (self.e.hasClass(self.o.hasClass)){
					$content = $(this).parent().children(self.o.contentClass).stop(true,true).delay(self.o.delay);
					self.o.effect == 'fade' ?
						$content.fadeToggle(self.o.speed,self.o.easing):
						$content.slideToggle(self.o.speed,self.o.easing);
				}
			});
			self.e.find(self.o.clickClass).parent().hover(function(){
			}, function(){
				if (self.e.hasClass(self.o.hasClass)){
					$content = $(this).children(self.o.contentClass).stop(true,true).delay(self.o.delay);
					self.o.effect == 'fade' ?
						$content.fadeOut(self.o.speed,self.o.easing):
						$content.slideUp(self.o.speed,self.o.easing);
				}
			});
			if (self.o.doubleClick){
				$('.' + self.o.hasClass).on('click', 'a', function(e){
					if ($(this).parent().hasClass(self.o.doubleClickClass)){
						if (!$(this).hasClass('click')){
							if (self.o.doubleClick == 'all')
								e.preventDefault(); else
							if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
								e.preventDefault();
							$('.' + self.o.hasClass).find('.click').removeClass('click');
							$(this).addClass('click')
						}
					}
				})
			}
		}
	};
	$.fn.Navigation = function(options){
		if (typeof options === 'string'){
			var args = Array.prototype.slice.call(arguments, 1);
			this.each(function(){
				var Navigation = $.data(this, 'Navigation');
				Navigation[options].apply(Navigation, args)
			})
		} else {
			this.each(function(){
				var Navigation = $.data(this, 'Navigation');
				if (!Navigation) $.data(this, 'Navigation', new $.Navigation(this, options))
			})
		}
		return this
	};
	$.Navigation.defaults = {
		hasClass         : 'menu-main',
		hoverClass       : 'li.level-top',
		clickClass       : 'a.level-top',
		contentClass     : '.menu-panel',
		doubleClick      : null,
		doubleClickClass : 'menu-parent',
		effect           : 'fade',
		delay            : 125,
		speed            : 250,
		easing           : 'swing'
    }
})(jQuery)