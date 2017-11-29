/**
 * ------------------------------------------------------------------------
 * JA Smashboard Template
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2011 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - Copyrighted Commercial Software
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites:  http://www.joomlart.com -  http://www.joomlancers.com
 * This file may not be redistributed in whole or significant part.
 * ------------------------------------------------------------------------
 */


var SmashBoard = SmashBoard || {};

//extend jquery selector to support focusable and tabbable
(function($){

	function focusable( element, isTabIndexNotNaN ) {
		var map, mapName, img,
			nodeName = element.nodeName.toLowerCase();
		if ( "area" === nodeName ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = jQuery( "img[usemap=#" + mapName + "]" )[0];
			return !!img && visible( img );
		}
		return ( /input|select|textarea|button|object/.test( nodeName ) ?
			!element.disabled :
			"a" === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN) &&
			// the element and all of its ancestors must be visible
			visible( element );
	}

	function visible( element ) {
		return $.expr.filters.visible( element ) &&
			!jQuery( element ).parents().addBack().filter(function() {
				return $.css( this, "visibility" ) === "hidden";
			}).length;
	}

	$.extend( $.expr[ ":" ], {
		data: $.expr.createPseudo ?
			$.expr.createPseudo(function( dataName ) {
				return function( elem ) {
					return !!$.data( elem, dataName );
				};
			}) :
			// support: jQuery <1.8
			function( elem, i, match ) {
				return !!$.data( elem, match[ 3 ] );
			},

		focusable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},

		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				isTabIndexNaN = isNaN( tabIndex );
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
		}
	});

	// Fix scroll on popup
	if (/tmpl=component/gi.test(window.location.href)) {
		jQuery(document.documentElement).on('mousewheel', function(e, delta, deltaX, deltaY){
			var e = $.Event('keydown.iscroll');
		    e.keyCode = e.which = delta > 0 ? SmashBoard.keys.UP : SmashBoard.keys.DOWN;
		    jQuery(this).trigger(e);
			return true;
		});
	}	
})(jQuery);


//init some SmashBoard variables
(function($){

	$.extend(SmashBoard, {

		define: {
			SMB_PERFECT_HEIGHT: 1022,
			SMB_MINIMUM_WIDTH: 767
		},

		keys: {
			DOWN: 40,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38,

			F: 70, /* F: Search / Find */
			I: 73, /* I: Info (left column) */
			S: 83, /* S: Share / Social */
			U: 85, /* U: User login */
			Z: 90  /* Z: Zoom (fullscreen in signle content page)*/
		},

		support: (function(){

			var docStyle = document.documentElement.style,
				engine;

			if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
				engine = 'presto';
			} else if ('MozAppearance' in docStyle) {
				engine = 'gecko';
			} else if ('WebkitAppearance' in docStyle) {
				engine = 'webkit';
			} else if (typeof navigator.cpuClass === 'string') {
				engine = 'trident';
			}
			
			var vendorPrefix = {
					trident: 'ms',
					gecko: 'Moz',
					webkit: 'Webkit',
					presto: 'O'
				}[engine],

				helperElem = document.createElement('div'),
				undef,
				perspectiveProperty = vendorPrefix + 'Perspective',
				transformProperty = vendorPrefix + 'Transform',

				result = {
					isAndroid: (/android/gi).test(navigator.appVersion),
					isIDevice: (/iphone|ipad/gi).test(navigator.appVersion),
					isTouchPad: (/hp-tablet/gi).test(navigator.appVersion),
					engine: vendorPrefix,
					transformProperty: transformProperty
				};

			if (helperElem.style[perspectiveProperty] !== undef) {
				result.transform3d = true;
				result.transform = true;
				result.translateZ = ' translateZ(0)';
			} else if (helperElem.style[transformProperty] !== undef) {
				result.transform = true;
				result.translateZ = '';
			}

			helperElem = null;

			return result;
		})(),

		plugins: [],

		baselink: window.location.protocol.split(':')[0] + '://' + window.location.hostname,

		//helpers functions
		focusin: function(elm){

			SmashBoard.focus = elm;
			SmashBoard.focuselm = elm.find('[autofocus]:first, :tabbable:first').eq(0);
			if(!SmashBoard.hasTouch){
				SmashBoard.focuselm.focus();
			}

			//bind event
			SmashBoard.focus.off('.tabbable')
				.on('keydown.tabbable', SmashBoard.onfocuskeys)
				.on('click.tabbable', function(e){
					e.stopImmediatePropagation();
				});

			if(SmashBoard.hasTouch){
				//limit the focus scroll
				jQuery(window).on('scroll.tabbable', function(){
					if(document.activeElement.tagName.match(/input|textarea|select/i)){
						jQuery(window).scrollLeft(0);
					}
				});
			}

			//jQuery(document).off('focusin.tabbable').on('focusin.tabbable', SmashBoard.onfocusin);
		},

		removefocus: function(){
			if(SmashBoard.focus){
				SmashBoard.focus && SmashBoard.focus.off('.tabbable');
				//jQuery(document).off('focusin.tabbable');
				jQuery(window).off('scroll.tabbable');

				jQuery('.btn-social .open').removeClass('open').trigger('hidesub');
				jQuery('#mega-dim').removeClass('active');
				jQuery(document.body).removeClass('sidebar-modal');

				//remove current popup focus => focus to top document element
				document.activeElement.blur();	

				//remove iscroll of sidebar
				if(SmashBoard.focus.hasClass('t3-sidebar')){
					var iscroll = SmashBoard.focus.data('iscroll');
					if(iscroll){
						iscroll.destroy();
					}

					SmashBoard.focus.data('iscroll', null);

					//remove event
					jQuery(window).off('resize.sidebar');
				}

				//remove
				SmashBoard.focus = null;
			}
		},

		onfocuskeys: function(e){
			if(e.keyCode == SmashBoard.keys.TAB && SmashBoard.focus && SmashBoard.focus.length){
				
				var tabbables = SmashBoard.focus.find(":tabbable"),
					first = tabbables.filter(":first"),
					last  = tabbables.filter(":last");

				if ( ( e.target === last[0] || e.target === SmashBoard.focus[0] ) && !e.shiftKey ) {
					first.focus(  );
					e.preventDefault();
				} else if ( ( e.target === first[0] || e.target === SmashBoard.focus[0] ) && e.shiftKey ) {
					last.focus(  );
					e.preventDefault();
				}
			} else if(e.keyCode == SmashBoard.keys.ESCAPE){

				if(SmashBoard.focus.is('[role="dialog"]')){
					SmashBoard.focus.modal('hide');
				} else {
					SmashBoard.focus.parent().removeClass('open').trigger('hidesub');
				}
				
				SmashBoard.removefocus();
			}

			e.stopPropagation();
		},

		onfocusin: function( e ) {
			var tgt = e.target, $tgt, container = SmashBoard.focus;

			if ( tgt !== container[ 0 ] ) {
				$tgt = jQuery( e.target );
				if ( 0 === $tgt.parents().filter( container[ 0 ] ).length ) {
					jQuery( document.activeElement ).one( 'focus', function(/* e */) {
						$tgt.blur();
					});

					SmashBoard.focuselm.focus();
					e.preventDefault();
					e.stopImmediatePropagation();

					return false;
				} else {
					SmashBoard.focuselm = $tgt;
				}
			}
		},


		//
		cleanurl: function(link){
			return link.replace(this.baselink, '').replace(T3JSVars.baseUrl, '');
		},

		//responsive functions
		init: function(){
			this.ismobile ? this.onmobile() : this.onnormal();
		},

		onmobile: function(){
			var plugins = this.plugins,
				plugin = null;

			for(var i = 0, il = plugins.length; i < il; i++){
				plugin = plugins[i];

				plugin.onmobile && plugin.onmobile();
			}
		},

		onnormal: function(){
			
			var plugins = this.plugins,
				plugin = null;

			for(var i = 0, il = plugins.length; i < il; i++){
				plugin = plugins[i];

				plugin.onnormal && plugin.onnormal();
			}
		}
	});

})(jQuery);


//limit window do not allow scroll
(function($){

	var totop = function(){
		jQuery(window).scrollLeft(0);
	};

	SmashBoard.plugins.push({
		onnormal: function(){
			if(!SmashBoard.hasTouch && jQuery('.ja-infinity').length){
				jQuery(window).off('scroll.blockscroll').on('scroll.blockscroll', totop);
			}

			jQuery(window).scrollLeft(0).scrollTop(0);
		},

		onmobile: function(){
			jQuery(window).off('scroll.blockscroll');
		}
	});
})(jQuery);


//check touch events for ipad
(function($){

	SmashBoard.plugins.push({
		onnormal: function(){
			jQuery(document).off('touchmove.ipad');
			if(SmashBoard.hasTouch && jQuery('.ja-infinity').length){
				jQuery(document).on('touchmove.ipad', function (e) {
					e.preventDefault();
				});
			}
		},

		onmobile: function(){
			if(SmashBoard.hasTouch){
				jQuery(document).off('touchmove.ipad');
			}
		}
	});
})(jQuery);


//initialize popup window on article detail
(function($){

	SmashBoard.plugins.push({
		onnormal: function(){
			if(!((window.parent != window || window.opener) && /tmpl=component/gi.test(window.location.href)) && !jQuery('.ja-infinity').length){
				
				var itemscoller = jQuery('.item-page-scoller');

				if(itemscoller.length){					
					//remove anchor
					if(!jQuery(document.body).hasClass('wnd-loaded')){
						itemscoller.scrollTop(0).scrollLeft(0);
						var hash = window.location.hash,
							toelm = null;

						if(hash){
							toelm = itemscoller.find(hash);
						}
					}

					var keys = SmashBoard.keys,
						scroller = new iScroll(itemscoller[0], {
							vScrollbar: true,
							hScrollbar: false,
							checkDOMChanges: true,
							scrollbarClass: 'popup-tracker',
							nodragging: true
						}),

						closepopup = function () {

							var menu = jQuery('#t3-mainnav .nav-list:first');
								
							if(menu.data('items')){
								menu = menu.data('items');

								link = menu.filter('.active').find('a').attr('href');

								if(!link || SmashBoard.cleanurl(link) == SmashBoard.cleanurl(window.location.href)){
									link = menu.filter('.home').find('a').attr('href');
								}
							} else {

								link = menu.find('> .active a').attr('href');

								if(!link || SmashBoard.cleanurl(link) == SmashBoard.cleanurl(window.location.href)){
									link = menu.find('> .home a').attr('href');
								}
							}

							if(link){
								window.location.href = link;
								return false;
							}
						},

						keyhandle = function(e){

							if(!(
								jQuery(document.body).hasClass('qsearch') ||
								document.activeElement.tagName.match(/input|textarea|select/i)
								)){
						
								if(e.keyCode == keys.ESCAPE){
									
									return closepopup();

								} else if (scroller && e.keyCode == keys.UP){
									
									scroller._wheel(1);

								} else if (scroller && e.keyCode == keys.DOWN) {
									
									scroller._wheel(-1);

								} else if(scroller && e.keyCode == keys.HOME) {
									
									scroller.scrollTo(0, 0, 500);
								}
							}
						};

					if(!jQuery(document.body).hasClass('wnd-loaded') && toelm && toelm.length){
						jQuery(window).on('load', function(){
							setTimeout(function(){
								itemscoller.scrollTop(0).scrollLeft(0);
								scroller.scrollToElement(toelm[0], 500);
							}, 1000);
						});
					}

					itemscoller.data('iscroll', scroller);

					jQuery(document.body).addClass('popup-simulate');

					jQuery('<div class="overlay"></div>').appendTo(document.body);
					jQuery('#t3-content > .btn-close').off('click.articledetail').on('click.articledetail', closepopup);

					//support back to top
					jQuery('.itemBackToTop .k2Anchor').off('click.articledetail').on('click.articledetail', function(e) {
						e.preventDefault();
						scroller.scrollTo(0, 0, 500);
					});

					jQuery(document.documentElement).off('keydown.articledetail').on('keydown.articledetail', keyhandle);
				}
			}
		},

		onmobile: function(){
			jQuery('.item-page-scoller').each(function(){
				var iscroll = jQuery(this).data('iscroll');
				iscroll && iscroll.destroy();
				jQuery(document.body).children('.overlay').remove();
				jQuery(document.documentElement).off('keydown.articledetail');
			});
		}
	});
})(jQuery);


//font-size
(function($){
	var sid = null,
		pfHeight = SmashBoard.define.SMB_PERFECT_HEIGHT,
		wHeight = null;

	SmashBoard.plugins.push({
		onmobile: function(){
			jQuery(window).off('resize.fontsize');
			jQuery(document.body).css('font-size', '');
		},

		onnormal: function(){

			//we will not enable responsive by fontsize when popup or mobile (cause it scroll height)
			if(!((window.parent != window || window.opener) && /tmpl=component/gi.test(window.location.href))){

				wHeight = jQuery(window).height();
				jQuery(document.body).css('font-size', wHeight / pfHeight * 100 + '%');

				// we will use resize function of scroller instead if available
				// or else we will handle resize font-size if not mobile
				if(!jQuery('.ja-infinity').length){
					jQuery(window).off('resize.fontsize').on('resize.fontsize', function(){

						if(wHeight != jQuery(window).height()){
							wHeight = jQuery(window).height();

							clearTimeout(sid);
							sid = setTimeout(function(){
								jQuery(document.body).css('font-size', wHeight / pfHeight * 100 + '%');
							}, 50);
						}
					});
				}
			}
		}
	});
})(jQuery);


//initialize main scroller
(function($){

	SMBScroller = function(content, options) {

		this.content = content;
		this.container = content.parentNode;

		this.options = $.extend({
			
			scrollingX: true,
			scrollingY: false,
			zooming: false,
			snapping: true,
			wheelDelay: 400,
			updateDelay: 200,

			maxDomItems: 20,
			minDomThreshold: 5,

			animationDuration: 600

		}, options || {});

		this.uid = 0;
		this.options.updateDelay += SmashBoard.hasTouch ? 300 : 0;
		
		//initilze for the first time
		
		this.items = jQuery(this.content).children('.item').detach(); 	//remove 
		jQuery(this.content).prepend(this.items);						//append again to remove the space
		this.itemLength = this.items.length;
		this.itemWidth = jQuery(this.content).children('.item:first').outerWidth(true);
		jQuery(this.content).css('width', this.itemLength * this.itemWidth);
		
		//internal state variable
		this.lastDomItem = 0;
		this.visible = Math.ceil(this.container.clientWidth / this.itemWidth);
		this.selectedIndex = 0;
		this.items.eq(this.selectedIndex).addClass('active');

		//flag to not allow scroll
		this.invalidate = false;

		//allow update current when scroll
		this.updateCurrent = true;

		//init the scroller
		var iscroll = this;
		// create Scroller instance
		this.scroller = new ZyngaScroller(function(left, top, zoom){

			iscroll.render(left, top, zoom);
			
			clearTimeout(iscroll.uid);
			
			if(iscroll.updateCurrent){
				iscroll.uid = setTimeout(function(){
					
					//check if the current selected item was out of screen view
					var newHighlight = iscroll.lastDomItem + Math.round(left / iscroll.itemWidth);
					
					if(!isNaN(newHighlight) && newHighlight < iscroll.items.length && (newHighlight != iscroll.selectedIndex)){
						iscroll.items.eq(iscroll.selectedIndex).removeClass('active');
						iscroll.selectedIndex = newHighlight;
						iscroll.items.eq(iscroll.selectedIndex).addClass('active');

						if(SmashBoard.hasTouch && !SmashBoard.ismobile){
							setTimeout(function(){
								jQuery('#t3-mainnav').removeClass('focus');
							}, 0);
						}
					}
					
				}, iscroll.options.updateDelay);
			}

		}, this.options);

		//provide hack for safari
		this.hackSafari();

		// bind events
		this.bindEvents();

		// the content element needs a correct transform origin for zooming
		this.content.style[SMBScroller.vendorPrefix + 'TransformOrigin'] = 'left top';

		// reflow for the first time
		this.reflow();
	};

	SMBScroller.prototype = {

		render: (function() {
		
			var docStyle = document.documentElement.style;
			
			var engine;
			if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
				engine = 'presto';
			} else if ('MozAppearance' in docStyle) {
				engine = 'gecko';
			} else if ('WebkitAppearance' in docStyle) {
				engine = 'webkit';
			} else if (typeof navigator.cpuClass === 'string') {
				engine = 'trident';
			}
			
			var vendorPrefix = SMBScroller.vendorPrefix = {
				trident: 'ms',
				gecko: 'Moz',
				webkit: 'Webkit',
				presto: 'O'
			}[engine];
			
			var helperElem = document.createElement("div");
			var undef;
			
			var perspectiveProperty = vendorPrefix + "Perspective";
			var transformProperty = vendorPrefix + "Transform";
			
			if (helperElem.style[perspectiveProperty] !== undef) {
				
				return function(left, top, zoom) {
					this.content.style[transformProperty] = 'translate3d(' + (SmashBoard.irtl * -left / this.content.clientWidth) * 100 + '%,' + (-top / this.content.clientHeight * 100) + '%, 0) scale(' + zoom + ')';
				};	
				
			} else if (helperElem.style[transformProperty] !== undef) {
				
				return function(left, top, zoom) {
					this.content.style[transformProperty] = 'translate(' + (SmashBoard.irtl * -left / this.content.clientWidth * 100) + '%,' + (-top / this.content.clientHeight * 100) + '%) scale(' + zoom + ')';
				};
				
			} else {
				
				return function(left, top, zoom) {
					this.content.style[SmashBoard.rtl ? 'marginRight' : 'marginLeft'] = left ? ( -left - (this.lastDomItem > 0 ? this.itemWidth : 0)) + 'px' : '';
					this.content.style.marginTop = top ? (SmashBoard.irtl * -top) + 'px' : '';
					this.content.style.zoom = zoom || '';
				};
				
			}
		})(),

		reflow: function(e) {

			if(SmashBoard.isIpadSafari && e){
				document.documentElement.style.width = (document.documentElement.offsetWidth + 1) + 'px';
				jQuery(window).scrollLeft(0);
				
				setTimeout(function () {
					document.documentElement.style.width = '';
				}, 0);
			}

			if(SmashBoard.hasTouch && !SmashBoard.ismobile){
				setTimeout(function(){
					jQuery('#t3-mainnav').removeClass('focus');
				}, 0);
			}

			//just make sure the font-size has been resize
			jQuery(document.body).css('font-size', jQuery(window).height() / SmashBoard.define.SMB_PERFECT_HEIGHT * 100 + '%');

			//re calculate scroller width and item width
			this.itemWidth = jQuery(this.content).children('.item:first').outerWidth(true);
			jQuery(this.content).css('width', this.itemLength * this.itemWidth).css('margin-' + (SmashBoard.rtl ? 'right' : 'left'), this.lastDomItem > 0 ? - this.itemWidth : '');
			this.visible = Math.ceil(this.container.clientWidth / this.itemWidth);
			// set the right scroller dimensions
			this.scroller.setSnapSize(this.itemWidth);
			this.scroller.setDimensions(this.container.clientWidth, this.container.clientHeight, this.content.offsetWidth - (this.lastDomItem > 0 ? this.itemWidth : 0), this.content.offsetHeight);

			// refresh the position for zooming purposes
			var rect = this.container.getBoundingClientRect();
			this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop);

			//set the position
			this.scroller.scrollTo((this.selectedIndex - this.lastDomItem) * this.itemWidth, 0, false);
		},

		hackSafari: function(){
			if($.browser.safari){
				var safarihack = document.createElement('style');
					head = document.head || document.getElementsByTagName('head')[0];

				if(safarihack){
					// add css	
					safarihack.type = 'text/css';
					var cssText = '.ja-infinity article .item-image { -webkit-transform: translate3d(0, 0, 0); }';
					if (safarihack.styleSheet) {
						safarihack.styleSheet.cssText = cssText;
					} else {
						safarihack.appendChild(document.createTextNode(cssText));
					}

					head.appendChild(safarihack);
				}
			}
		},

		bindEvents: function() {

			var iscroll = this,
				wheight = jQuery(window).height();

			// reflow handling
			iscroll.rzid = null;
			jQuery(window).off('.smbscroll').on('resize.smbscroll orientationchange.smbscroll', function(e) {
				var nwheight = jQuery(window).height();
				
				if(nwheight != wheight){
					wheight = nwheight;
					clearTimeout(iscroll.rzid);
					iscroll.rzid = setTimeout($.proxy(iscroll.reflow, iscroll, e), iscroll.updateDelay);
				}
			});

			// touch devices bind touch events
			if ('ontouchstart' in window) {

				jQuery(this.container).on('touchstart.smbscroll', function(e) {
					if(iscroll.invalidate){
						return false;
					}

					e = e.originalEvent || e;

					// Don't react if initial down happens on a form element
					if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
						return;
					}

					
					if(iscroll.needUpdate = iscroll.checkUpdate()){
						return false;
					}

					iscroll.scroller.doTouchStart(e.touches, e.timeStamp || (new Date).getTime());
					//e.preventDefault();

				});

				jQuery(document).off('touchmove.smbscroll').on('touchmove.smbscroll', function(e) {
					if(iscroll.invalidate){
						return false;
					}

					e = e.originalEvent || e;

					iscroll.scroller.doTouchMove([{
						pageX: e.touches[0].pageX * SmashBoard.irtl,
						pageY: e.touches[0].pageY
					}], e.timeStamp || (new Date).getTime(), e.scale);
				});

				jQuery(document).off('touchend.smbscroll').on('touchend.smbscroll', function(e) {
					if(iscroll.invalidate){
						return false;
					}

					e = e.originalEvent || e;
						
					if(iscroll.needUpdate){
						iscroll.updateItems();
						return false;
					}

					if(!iscroll.scroller.__isDragging){

						var point = e.changedTouches[0],
							ev = null,
							target = point.target;

						while (target.nodeType != 1) target = target.parentNode;

						if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
							ev = document.createEvent('MouseEvents');
							ev.initMouseEvent('click', true, true, e.view, 1,
								point.screenX, point.screenY, point.clientX, point.clientY,
								e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
								0, null);
							ev._fake = true;
							target.dispatchEvent(ev);
						}
					}

					iscroll.scroller.doTouchEnd(e.timeStamp || (new Date).getTime());
				});

				jQuery(document).off('touchcancel.smbscroll').on('touchcancel.smbscroll', function(e) {
					if(iscroll.invalidate){
						return false;
					}

					e = e.originalEvent || e;

					iscroll.scroller.doTouchEnd(e.timeStamp || (new Date).getTime());
				});

			// non-touch bind mouse events
			} else {
				
				iscroll.noclick = false;

				var mousedown = false,
					posx = 0,
					posy = 0,
					movethreshold = 3,
					
					mousemove = function(e){
						if(iscroll.invalidate){
							return false;
						}

						if (!mousedown) {
							return;
						}
						
						iscroll.scroller.doTouchMove([{
							pageX: e.pageX * SmashBoard.irtl,
							pageY: e.pageY
						}], e.timeStamp || (new Date).getTime() || (new Date).getTime());

						mousedown = true;
						iscroll.noclick = Math.abs(posx - e.pageX) > movethreshold || Math.abs(posy - e.pageY) > movethreshold;
						iscroll.updateCurrent = false;
                        jQuery('.ja-infinity').addClass('item-moving');
					},

					mouseup = function(e){
						jQuery(document)
							.unbind('mousemove.smbscroll', mousemove)
							.unbind('mouseup.smbscroll', mouseup);

						if(iscroll.invalidate){
							return false;
						}

						if(iscroll.needUpdate){
							iscroll.updateItems();
						}

						if (!mousedown) {
							return;
						}

						iscroll.scroller.doTouchEnd(e.timeStamp || (new Date).getTime());

						mousedown = false;
						iscroll.updateCurrent = true;

                        setTimeout(function(e) {
                            jQuery('.ja-infinity').removeClass('item-moving');
                        }, 500);

						return false;
					};


				jQuery(this.container).off('mousedown.smbscroll').on('mousedown.smbscroll', function(e) {
					if(iscroll.invalidate){
						return false;
					}

					if (e.target.tagName.match(/input|textarea|select/i)) {
						return;
					}

					mousedown && mouseup(e);
					
					if(iscroll.needUpdate = iscroll.updateItems()){
						return false;
					}
				
					iscroll.scroller.doTouchStart([{
						pageX: e.pageX * SmashBoard.irtl,
						pageY: e.pageY
					}], e.timeStamp || (new Date).getTime() || (new Date).getTime());

					mousedown = true;
					posx = e.pageX;
					posy = e.pageY;

					iscroll.noclick = false;
					iscroll.updateCurrent = false;

					jQuery(document)
						.bind('mousemove.smbscroll', mousemove)
						.bind('mouseup.smbscroll', mouseup);

					e.preventDefault();
				});

				jQuery(document).off('mousewheel.smbscroll').on('mousewheel.smbscroll', function(e, delta, deltaX, deltaY) {
					//invalidate - no action
					if(iscroll.invalidate){
						return false;
					}

					//default wheel => check for popup view or focus on other element
					if(document.body.className.match(/popupview|popup-simulate|qsearch|sidebar-modal/) || 
						document.activeElement.tagName.match(/input|textarea|select/i)){
						return;
					}

					var now = new Date().getTime();

					if(!iscroll.mwheelid || now > iscroll.mwheellast + iscroll.options.wheelDelay){

						iscroll.mwheellast = now;

						iscroll.mwheelid = setTimeout(function(){
							
							delta < 0 ? iscroll.next() : iscroll.prev();
							iscroll.mwheelid = 0;

						}, iscroll.options.wheelDelay);
					}
				});

			}
		},

		addItems: function(items){
			if(items && items.length){
				this.items = this.items.add(items);
			}

			this.updateItems(items && items.length);
		},

		checkUpdate: function(){
			var options = this.options;

			if(this.items.length > options.maxDomItems + this.visible){
				var lastDomItem = this.lastDomItem,
					clientWidth = this.container.clientWidth,
					left = this.scroller.getValues().left,
					nItemsFromLeft = Math.max(0, Math.ceil(left / this.itemWidth)),
					nItemsFromRight = (this.curItems ? this.curItems.length : options.maxDomItems + this.visible) - nItemsFromLeft - this.visible;

				if((nItemsFromLeft < options.minDomThreshold && this.lastDomItem > 0) || (nItemsFromRight < options.minDomThreshold && this.lastDomItem + options.maxDomItems + this.visible < this.items.length)){

					lastDomItem = Math.max(0, Math.min(this.items.length - options.maxDomItems, lastDomItem + Math.floor(nItemsFromLeft - options.maxDomItems / 2)));

					if(lastDomItem != this.lastDomItem){
						return true;
					}
				}
			}

			return false;
		},

		updateItems: function(force){

			//update
			var options = this.options,
				updated = false;

			if(this.items.length > options.maxDomItems + this.visible){
				var newDomItem = this.lastDomItem,
					clientWidth = this.container.clientWidth,
					left = this.scroller.getValues().left,
					nItemsFromLeft = Math.max(0, Math.ceil(left / this.itemWidth)),
					nItemsFromRight = (this.curItems ? this.curItems.length : options.maxDomItems + this.visible) - nItemsFromLeft - this.visible;


				if((nItemsFromLeft < options.minDomThreshold && newDomItem > 0) || (nItemsFromRight < options.minDomThreshold && newDomItem + options.maxDomItems + this.visible < this.items.length)){

					newDomItem = Math.max(0, Math.min(this.items.length - options.maxDomItems - this.visible, newDomItem + Math.floor(nItemsFromLeft - options.maxDomItems / 2)));

					if(newDomItem != this.lastDomItem){

						var ditems = [],
							lastDomItem = this.lastDomItem,
							loader = jQuery('#infscr-loading').detach().hide();

						if(newDomItem > 0){
							if(window.html5){
								var dummy = html5.createElement('div');
								dummy.innerHTML = this.items.eq(newDomItem - 1).html();
								ditems.push(jQuery(dummy).addClass(this.items.eq(newDomItem - 1).attr('class'))[0]);
							} else {
								ditems.push(this.items.eq(newDomItem - 1).clone().addClass('dummy')[0]);
							}
						}
						
						for(var i = 0, il =  Math.min(this.items.length - newDomItem, options.maxDomItems + this.visible); i < il; i++){
							ditems.push(this.items[newDomItem + i]);
						}

						loader.length && ditems.push(loader[0]);

						//update
						jQuery(this.content).empty().append(ditems);
						this.itemLength = ditems.length - (loader.length || 0);
						this.lastDomItem = newDomItem;
						this.curItems = jQuery(ditems).removeClass('active');
						this.reflow();
						
						this.selectedIndex = lastDomItem + Math.ceil(left / this.itemWidth);
						this.scroller.scrollTo((this.selectedIndex - newDomItem) * this.itemWidth, 0, false);

						//update selected item
						this.items.eq(this.selectedIndex).addClass('active');
						
						this.needUpdate = false;

						updated = true;
					}
				}
			}

			//in case there are fews items added
			if(!updated && force){
				this.curItems = jQuery(this.content).children('.item');
				this.itemLength = this.curItems.length;
				this.selectedIndex = this.lastDomItem + Math.ceil(this.scroller.getValues().left / this.itemWidth);
				this.reflow();
				
				this.needUpdate = false;

				updated = true;
			}

			return updated;
		},

		willUpdate: function(){
			this.needUpdate = true;
			this.updateCurrent = true;
		},

		activeTo: function(idx){
			this.items.eq(this.selectedIndex).removeClass('active');
			this.selectedIndex = idx;
			this.items.eq(idx).addClass('active');
		},

		next: function(){

			if(this.selectedIndex < this.lastDomItem + this.itemLength -1 - (this.lastDomItem > 0 ? 1 : 0)){
				this.activeTo(this.selectedIndex + 1);

				this.scroller.scrollBy( this.itemWidth, 0, true);
				
				clearTimeout(this.nuid);
				this.needUpdate = false;
				this.updateCurrent = false;
				this.nuid = setTimeout($.proxy(this.willUpdate, this), 300);
			}
		},

		prev: function(){
			if(this.selectedIndex > this.lastDomItem){
				this.activeTo(this.selectedIndex - 1);

				this.scroller.scrollBy( -this.itemWidth, 0, true);

				clearTimeout(this.nuid);
				this.needUpdate = false;
				this.updateCurrent = false;
				this.nuid = setTimeout($.proxy(this.willUpdate, this), 300);
			}
		},

		scrollToElm: function(elm){
			var idx = this.items.index(elm);

			if((this.selectedIndex > idx && idx >= this.lastDomItem) || (idx > this.lastDomItem && idx < this.lastDomItem + this.itemLength - (this.lastDomItem > 0 ? 1 : 0))){
				this.activeTo(idx);
				this.scroller.scrollTo((idx - this.lastDomItem) * this.itemWidth, 0, true);

				clearTimeout(this.nuid);
				this.needUpdate = false;
				this.updateCurrent = false;
				this.nuid = setTimeout($.proxy(this.willUpdate, this), 300);
			}
		}
	};


	SmashBoard.plugins.push({

		onmobile: function(){

			if(!this.ismobile && this.iscroll){
				this.ismobile = true;
			
				this.iscroll.scroller && this.iscroll.scroller.scrollTo(0, 0, 0);
				jQuery(window).off('.smbscroll');
				jQuery(document).off('.smbscroll');
				jQuery(this.iscroll.container).off('.smbscroll');
				jQuery(this.iscroll.content)
					.off('.smbscroll')
					.empty().append(this.iscroll.items.removeClass('active'))
					.data('iscroll', false);
			}
		},

		onnormal: function(){

			var infinity = jQuery('.ja-infinity');
			if(!infinity.length){
				return false;
			}

			var	iscroll = this.iscroll = new SMBScroller(infinity[0], {
				
				scrollingComplete: function(){
					
					infinity.infinitescroll('scroll');

					var values = iscroll.scroller.getValues();

					if(iscroll.needUpdate || values.left === Math.round(values.left / iscroll.itemWidth) * iscroll.itemWidth){
					
						iscroll.updateItems();
					}
				}
			});

			infinity
				.data('iscroll', iscroll)
				.on('click', '> .item', function(e){

					if(iscroll.noclick){
						return false;
					}

					if(e.which && e.which == 2){
						var link = jQuery(item).find('.article-link, .readmore-link, .video-link').eq(0).attr('href');
						if(link){
							window.open('', '_blank');
							e.preventDefault();
							e.stopPropagation();
						}
					}

					iscroll.scrollToElm(this);
				});

			this.ismobile = false;
		}
	});
})(jQuery);


//initilized infinitescroll
(function($){

	//extend infinityscroll
	$.extend($.infinitescroll.prototype, {
		_nearbottom_smashboard: function() {
			var opts = this.options,
				iscroll = this.element.data('iscroll');

			//has iscroll => !mobile
			if(iscroll){
				
				//check for 5 items left
				var nearbottom = iscroll.lastDomItem + Math.ceil(iscroll.scroller.getValues().left / iscroll.itemWidth) + 5 >= iscroll.items.length;

				if (nearbottom) {
					iscroll.invalidate = true;
				}

				return nearbottom;
				
			} else {
				//mobile
				return jQuery(document).height() - (opts.binder.scrollTop()) > 2 * jQuery(window).height();
			}
		},

		_showdonemsg_smashboard: function(){
			var opts = this.options,
				iscroll = this.element.data('iscroll');

			if(iscroll){
				iscroll.invalidate = false;
			}

			opts.loading.msg
				.find('img')
				.hide()
				.parent()
				.find('div').html(opts.loading.finishedMsg).animate({ opacity: 1 }, 2000, function () {
					jQuery(this).parent().fadeOut(opts.loading.speed);
				});

				// user provided callback when done    
				opts.errorCallback.call(jQuery(opts.contentSelector)[0],'done');
		}
	});

	//init
	var itemSelector = '.item:not(.category-info)',
		contentSelector = '.ja-infinity',
		infinity = null,

		pathobject = {
			init: function(link){
				this.path = (link || jQuery('#page-next-link').attr('href') || '');
				var match = this.path.match(/((page|limitstart|start)[=-])(\d*)(&*)/i);
				if(match){
					this.type = match[2].toLowerCase();
					this.number = match[3];
					this.limit = this.type == 'page' ? 1 : this.number;
					this.number = this.type == 'page' ? this.number : 1;
				} else {
					this.type = 'unk';
					this.number = 2;
					this.path = this.path + (this.path.indexOf('?') == -1 ? '?' : '') + 'start=';
				}

				var urlparts = this.path.split('#');
				if(urlparts[0].indexOf('?') == -1){
					urlparts[0] += '?tmpl=component';
				} else {
					urlparts[0] += '&tmpl=component';
				}

				this.path = urlparts.join('#');
			},
			
			join: function(){
				if(pathobject.type == 'unk'){
					return pathobject.path + pathobject.number++;
				} else{
					return pathobject.path.replace(/((page|limitstart|start)[=-])(\d*)(&*)/i, '$1' + (pathobject.limit * pathobject.number++) + '$4');
				}
			}
		};

	function initialize(){
		

		infinity = jQuery('.ja-infinity');
	
		//check if exist element and no need to re-initialize
		if(!infinity.length || infinity.data('infinitescroll')){
			return false;
		}

		pathobject.init();
	
		//init an instance
		infinity.infinitescroll({
			loading: {
				finished: undefined,
				finishedMsg: T3JSVars.finishedMsg,
				img: T3JSVars.tplUrl + '/images/ajax-load.gif',
				msg: null,
				msgText: T3JSVars.msgText,
				selector: null,
				speed: 'fast',
				start: undefined
			},
			state: {
				isDuringAjax: false,
				isInvalidPage: false,
				isDestroyed: false,
				isDone: false, // For when it goes all the way through the archive.
				isPaused: false,
				currPage: 0
			},
			debug: false,
			behavior: 'smashboard',
			binder: jQuery(window), // used to cache the selector for the element that will be scrolling
			nextSelector: '#page-next-link',
			navSelector: '#page-nav',
			contentSelector: contentSelector, // rename to pageFragment
			extraScrollPx: 150,
			itemSelector: itemSelector,
			animate: false,
			pathParse: pathobject.join,
			dataType: 'html',
			appendCallback: true,
			bufferPx: 350,
			errorCallback: function () { },
			infid: 0, //Instance ID
			pixelsFromNavToBottom: undefined,
			path: pathobject.join, // Can either be an array of URL parts (e.g. ["/page/", "/"]) or a function that accepts the page number and returns a URL
			prefill: false, // When the document is smaller than the window, load data until the document is larger or links are exhausted
			maxPage: undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
		}, function(newitems){

			newitems = jQuery(newitems).filter(function(){
				if(jQuery(this).hasClass('no-repeat')){
					jQuery(this).remove();

					return false;
				} else {
					return true;
				}
			});
			
			//update the scroller
			var iscroll = infinity.data('iscroll');
			if(iscroll && !iscroll.disabled){
				iscroll.invalidate = false;
				iscroll.addItems(newitems);
			}

			if(typeof DISQUSWIDGETS != 'undefined'){
				DISQUSWIDGETS.getCount();
			}

		});

		infinity.data('pathobject', pathobject);

		//we remove autoload when have iscroll
		if(!SmashBoard.ismobile && infinity.data('iscroll')){
			jQuery(window).unbind('.infscr');
		}
	};

	SmashBoard.plugins.push({

		onmobile: function(){
			initialize();
			infinity.infinitescroll('bind'); //rebind event				
		},

		onnormal: function(){
			initialize();
		}
	});
})(jQuery);


//application starter
(function($){

	jQuery(document).ready(function(){

		jQuery('.t3-megamenu ul.nav li a').wrapInner("<span class='menu-title'></span>");

		//detect screen size for mobile device
		SmashBoard.rtl          = jQuery(document.documentElement).attr('dir') == 'rtl';
		SmashBoard.irtl         = SmashBoard.rtl ? -1 : 1;
		SmashBoard.ismobile     = (jQuery(window).width() < SmashBoard.define.SMB_MINIMUM_WIDTH);
		SmashBoard.hasTouch     = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
		SmashBoard.isIpadSafari = (window.navigator.userAgent.match(/ipad/i) && !window.navigator.userAgent.match(/crios/i));

		//fix hack t3-sidebar-1
		jQuery('#t3-sidebar-1').addClass('fade hide').insertAfter('#t3-mainbody').each(function(){
			this.show = null;
			this.hide = null;
		});

		//fix hack system message
		if($.trim(jQuery('#system-message').html()) != ''){
			jQuery('#t3-content').addClass('systemmsg');
		}

		//==========================================================//
		// 			Responsive by check window resize  				//
		//==========================================================//
		
		(function(){

			var rzid = null;
			jQuery(window).on('resize', function(){

				clearTimeout(rzid);
				rzid = setTimeout(function(){
					if(SmashBoard.ismobile != jQuery(window).width() < SmashBoard.define.SMB_MINIMUM_WIDTH){
						SmashBoard.ismobile = !SmashBoard.ismobile;
						
						if(SmashBoard.ismobile){
							SmashBoard.onmobile();
						} else {
							SmashBoard.onnormal();
						}
					}
				}, 100);
			});

		})();

		//initialize the 360 left navigation
		(function($){
			var navleft = jQuery('#t3-mainnav'),
				threesixty = navleft.find('.nav-list'),
				current = threesixty.find('li.active');

			threesixty.threesixty({
				dir: 'verticle',
				activeFrame: current.length ? current.index() : -1,
				activeOffset: 2
			}).on('mouseenter', 'li', function(){
				
				threesixty.threesixty('hightlight', this);
			});

			navleft.on('mousewheel', function(e, delta, deltaX, deltaY){
				
				if(!visible && !SmashBoard.ismobile){
					threesixty.threesixty(delta > 0 ? 'prev' : 'next');
					return false;
				}

				return true;
			});

			SmashBoard.plugins.push({
				onmobile: function(){

					threesixty.threesixty('unbind');
				},

				onnormal: function(){

					threesixty.threesixty('bind');
					threesixty.threesixty('reset');
				}
			});


			var clbtn = jQuery('#t3-mainnav .btn-navbar[data-toggle="collapse"]'),
				rzid = null,
				visible = clbtn.is(':visible');

			jQuery(window).on('resize', function(){

				clearTimeout(rzid);
				rzid = setTimeout(function(){
					if(visible != clbtn.is(':visible')){
						visible = !visible;
						
						if(visible || SmashBoard.ismobile){
							threesixty.threesixty('unbind');
						} else {
							threesixty.threesixty('bind');
							threesixty.threesixty('reset');
						}
					}
				}, 100);
			});
		})(jQuery);

		//initalize all plugins
		SmashBoard.init();
		


		//navigation
		(function() {
			
			var content = jQuery('#t3-content'),
				threesixty = jQuery('#t3-mainnav .nav-list'),

				infinity = null, 
				aindicator = null, 
				iscroll = null,

				invalidate = false,

				navfocus = false,
				isfullscreen = false,
				allowfullscreen = false,

				kbhdelay = 500,
				kbvdelay = 100,
				kbhid = null,
				kbvid = null,

				curajax = null,			//store ajax instance

				keys = SmashBoard.keys,

				curactive = threesixty.find('li.current'),
				socials = jQuery('.btn-social'),

				dim = jQuery('<div id="mega-dim" class="mega-dim"></div>').appendTo(document.body),
				dimretain = [],

				initorreset = function(){
					
					infinity = jQuery('.ja-infinity');
					aindicator = jQuery('#page-loader');
					iscroll = infinity.data('iscroll');

					invalidate = false;

					navfocus = false;
					isfullscreen = false;
					allowfullscreen = false;

					jQuery('#t3-mainnav').removeClass('focus');
				},

				changehtmlclass = function(classes){
					
					var cclass = (jQuery(document.documentElement).attr('class') || '').split(' '),
						result = (classes || '').split(' ');

					if(cclass.length){
						var removesig = ['com_', 'view-', 'layout-', 'task-', 'itemid-', 'home'],
							hclass = '',
							keep = true;

						for(var i = 0, il = cclass.length; i < il; i++){
							hclass = $.trim(cclass[i]);
							keep = true;

							for(var j = 0; j < removesig.length; j++){
								if(hclass.indexOf(removesig[j]) === 0){
									keep = false;
									break;
								}
							}

							keep && $.inArray(hclass, result) === -1 && result.push(hclass);
						}
					}

					jQuery(document.documentElement).attr('class', result.join(' '));
				},

				shortcutkeys = function(keyCode){

					if(keyCode == keys.F || keyCode == keys.S || keyCode == keys.U){
						dim.addClass('active');
					} else if(keyCode == keys.I){
						dim.removeClass('active');
					}

					/* F: Search / Find */
					if(keyCode == keys.F){
						
						SmashBoard.focusin(
							socials
								.find('[data-altkey]').removeClass('open')
								.trigger('hidesub')
								.filter('[data-altkey="F"]').addClass('open')
								.trigger('showsub')
								.find('.dropdown-menu:first')
						);

						return true;
					}
					/* I: Info (left column) */
					else if(keyCode == keys.I){
						
						var href = socials
									.find('[data-altkey]').removeClass('open')
									.trigger('hidesub')
									.filter('[data-altkey="I"]').addClass('open')
									.find('a').attr('href'),

							focus = jQuery(href && href.replace(/.*(?=#[^\s]+$)/, ''));

						if(focus.length){
							focus.modal('show');
							SmashBoard.focusin(focus);

							var viewport = focus.children('.sidebar-inner'),
								t3logo = viewport.next();

							viewport.scrollTop(0);

							clearTimeout(focus.data('iscrollid'));
							jQuery(document.body).addClass('sidebar-modal');

							focus.data('iscrollid', setTimeout(function(){

								var iscroll = focus.data('iscroll');
								if(iscroll){
									iscroll.refresh();
								} else {

									viewport.css('height', (t3logo.length ? jQuery(window).height() - t3logo.outerHeight(true) - 30 : jQuery(window).height()));

									iscroll = new iScroll(viewport[0], {
										vScrollbar: true,
										hScrollbar: false,
										checkDOMChanges: true,
										scrollbarClass: 'popup-tracker'
									});

									jQuery(window).off('resize.sidebar').on('resize.sidebar', function(){
										viewport.css('height', (t3logo.length ? t3logo.offset().top - 30 : jQuery(window).height()));										
									});
								}

								focus.data('iscroll', iscroll);

							}, 600));
							
							
							return true;	
						}
					}
					/* S: Share / Social */
					else if(keyCode == keys.S){
						SmashBoard.focusin(
							socials
								.find('[data-altkey]').removeClass('open')
								.trigger('hidesub')
								.filter('[data-altkey="S"]').addClass('open')
								.find('.dropdown-menu:first')
						);

						return true;
					}
					/* U: User login */
					else if(keyCode == keys.U){
						SmashBoard.focusin(
							socials
								.find('[data-altkey]').removeClass('open')
								.trigger('hidesub')
								.filter('[data-altkey="U"]').addClass('open')
								.find('.dropdown-menu:first')
						);

						return true;
					}
					/* Z: Zoom (fullscreen in signle content page)*/
					//else if(keyCode == keys.Z){
						
					//	fullscreen();
						
					//	return false;
					//}

					return false;
				},

				keyhandler = function(keyCode, e){
					//ignore
					if(invalidate){
						return false;
					}

					//no fullscreen - no popupview - no focus on input element
					//all popupview actions will be handle by jquery.article.js instead
					if(!(isfullscreen ||
						document.body.className.match(/popupview|popup-simulate|qsearch|sidebar-modal/) ||
						document.activeElement.tagName.match(/input|textarea|select/i))){

						//focus to left navigation if press up/down
						if(!navfocus && (keyCode == keys.UP || keyCode == keys.DOWN)){
							jQuery('#t3-mainnav').addClass('focus');
							navfocus = true;

							return false;
						}

						//exit fullscreen
						if(isfullscreen && keyCode == keys.ESCAPE){
							
							offscreen();

							return false;
						}

						//loose focus and do nothing
						if(navfocus && keyCode == keys.ESCAPE){
							
							threesixty.threesixty('reset');

							jQuery('#t3-mainnav').removeClass('focus');
							navfocus = false;

							return false;
						}

						//navigate to selected item
						if(keyCode == keys.ENTER){

							if(navfocus){
								
								threesixty.threesixty('active');
								var item = threesixty.find('li.active');

								if(item && ajaxible(item)){
									ajaxload(item);
								} else if(item) {
									var link = jQuery(item).find('a').attr('href');
									if(link){
										window.location.href = link;
									}
								}

								return false;
							}

							if(!document.activeElement.tagName.match(/input|textarea|select/i)){
								if(jQuery(document.documentElement).hasClass('no-preview')){
									infinity
										.find('.item.active')
										.find('.article-link, .readmore-link, .video-link')
										.each(function(){
											var link = this.href;

											if(link != window.location.href){
												window.location.href = link;
												return false;
											}
										});

								} else {
									var item = iscroll && iscroll.items.eq(iscroll.selectedIndex);
									if(item && item.hasClass('category-item')){

										var link = item.find('.cat-link').attr('href');

										if(link != window.location.href){
											window.location.href = link;
											return false;
										}
									} else {

										item && item.trigger('click');
									}
								}
							}
						}

						//move up/down
						if(navfocus){
							if(keyCode == keys.UP || keyCode == keys.DOWN){
								if(!kbvid){
									
									kbvid = setTimeout(function(){
										kbvid = 0;
									}, kbvdelay);
									
									threesixty.threesixty(keyCode == keys.DOWN ? 'next' : 'prev');
								}
								
								return false;
							}

							//disabled key
							if(keyCode == keys.LEFT || keyCode == keys.RIGHT){
								return false;
							}
						}

						if(keyCode == keys.HOME && iscroll){

							//remove focus on mainnav
							threesixty.threesixty('reset');

							jQuery('#t3-mainnav').removeClass('focus');
							navfocus = false;

							//move
							if(iscroll.lastDomItem > 0){
								invalidate = true;

								iscroll.scroller.scrollBy(-Math.max(iscroll.visible, 2) * iscroll.itemWidth, 0, true);
								infinity.addClass('animate').css('opacity', 0);

								setTimeout(function(){
									iscroll.scroller.scrollTo(0, 0, 0);
									iscroll.lastDomItem = 1;
									iscroll.updateItems(true);
									iscroll.scroller.scrollTo(Math.max(iscroll.visible, 2) * iscroll.itemWidth, 0, 0);

									setTimeout(function(){
										iscroll.scroller.scrollTo(0, 0, true);
										infinity.css('opacity', 1);

										setTimeout(function(){
											infinity.removeClass('animate');

											invalidate = false;
										}, 500);
									}, 100);

								}, 510);
							} else {

								iscroll.scroller.scrollTo(0, 0, true);
							}
						
						}

						//slide item
						if(!navfocus && iscroll && (keyCode == keys.LEFT || keyCode == keys.RIGHT)){
							if(!kbhid){
								
								kbhid = setTimeout(function(){
									kbhid = 0;
								}, kbhdelay);
								
								keyCode == keys.LEFT ? iscroll.prev() : iscroll.next();
							}

							return false;
						}

						//handle shortcut keys
						if(shortcutkeys(keyCode)){
							return false;
						}
						
						//stop event for arrow key, cause some issue in firefox
						if(keyCode == keys.LEFT || keyCode == keys.RIGHT || keyCode == keys.UP || keyCode == keys.DOWN){					
							return false;
						}
					}
				},

				ajaxible = function(item){
          // check if external link
          if (jQuery(item).find('a').attr('href').test(/^https?:\/\//)) return false; 
					return !SmashBoard.ismobile && 
							history.pushState &&
							iscroll && 
							!((jQuery(item).attr('data-pagecls') || '').indexOf('noajax') !== -1 || jQuery(item).find('a').hasClass('noajax') || jQuery(item).find('a').prop('onclick'));
				},

				ajaxload = function(item){

					var linkelm = jQuery(item).find('a'),
						link = linkelm.attr('href');

					if(link){

						//switch page class
						if(curactive.length){
							jQuery(document.documentElement).removeClass(curactive.attr('data-pagecls'));
						}

						curactive = jQuery(item);
						jQuery(document.documentElement).addClass(curactive.attr('data-pagecls'));

						//remove link focus - just for sure
						linkelm[0].blur();

						//update address link
						history.pushState && $.address.value(link.replace(T3JSVars.baseUrl, ''));
						
						if(curajax){
							curajax.abort();
						}

						curajax = $.ajax({
							url: link,

							beforeSend: function() {
								aindicator.modal('show');
							}

						}).done(function(data){
					
							aindicator.modal('hide');

							var bdhtml = data.match(/<body[^>]*>([\w|\W]*)<\/body>/im),
								title = data.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,
								htmlclass = data.match( /<html[^>](.*)class="(.*)"(.*)>/im ) && RegExp.$2;

							if(bdhtml){
								bdhtml = bdhtml[1];
							}

							data = jQuery('<div></div>');
							data.get(0).innerHTML = bdhtml;

							var newlanglinks = data.find('.mod-languages .lang-inline a'),
								langlinks = jQuery('.mod-languages .lang-inline a');
							for(var i = 0, il = newlanglinks.length; i < il; i++){
								langlinks.eq(i).attr('href', newlanglinks.eq(i).attr('href'));
							}

							data = data.find('#t3-content');

							content.get(0).innerHTML = data.get(0).innerHTML;

							//change classes
							if(htmlclass){
								changehtmlclass(htmlclass);
							}

							document.title = title;

							//re-init page function
							SmashBoard.init();

							//update path object
							var pathobject = infinity.data('pathobject'),
								pathlink = data.find('#page-next-link').attr('href');

							if(pathobject && pathlink){
								pathobject.init(pathlink);
							}

							if(SmashBoard.popup){
								SmashBoard.popup.init();
							}

							//retrieve new object
							initorreset();

							//re-init fullscreen
							//initfullscreen();

							//handle category link
							initcategorylink();
							
							//focus on desired element
							focuselm();

							//check for disqus
							if(typeof DISQUSWIDGETS != 'undefined'){
								DISQUSWIDGETS.getCount();
							}

							//trigger ready and load event for joomla core function
							window.fireEvent('domready');
							window.fireEvent('load');

						}).fail(function(xhr, textStatus){
							
							aindicator.modal('hide');

							if (textStatus === 'timeout') {
								infinity.html(T3JSVars.ajaxTimeout);
							}

							document.title = T3JSVars.pageNotFound;
							infinity.html(T3JSVars.pageNotFoundDesc);

						}).always(function(){
							curajax = null;
						})
					}
				},

				initfullscreen = function(){

					var btnfs = jQuery('#btn-fullscreen').off('click').removeClass('show');

					allowfullscreen = false;
					content.removeClass('allowfullscreen');

					//only available when we have more content to view
					if(content.prop('scrollHeight') > content.height() + 50 && !iscroll && !((window.parent != window || window.opener) && /tmpl=component/gi.test(window.location.href))){

						isfullscreen = false;
						allowfullscreen = true;
						content.addClass('allowfullscreen');

						btnfs.addClass('show').on('click',function(){
							var icon = jQuery(this).find('i');

							if(isfullscreen){
								icon.removeClass('icon-remove').addClass('icon-fullscreen');
								content.removeClass('fullscreen');
								isfullscreen = false;

							} else {
								icon.removeClass('icon-fullscreen').addClass('icon-remove');
								content.addClass('fullscreen');
								isfullscreen = true;
							}

							return false;
						});
					}
				},

				offscreen = function(){
					
					if(isfullscreen){
						jQuery('#btn-fullscreen i').removeClass('icon-remove').addClass('icon-fullscreen');
						content.removeClass('fullscreen');

						isfullscreen = false;
					}
				},

				fullscreen = function(){

					if(allowfullscreen){
				
						if(!isfullscreen){
							jQuery('#btn-fullscreen i').removeClass('icon-fullscreen').addClass('icon-remove');
							content.addClass('fullscreen');

							isfullscreen = true;
						}
					}
				},

				initcategorylink = function(){

					infinity && infinity.length && infinity.find('.category-item:first').length && infinity.off('click.ajax').on('click.ajax', '.category-item', function(e){
						
						//find out if there was a handle dom or link
						if(jQuery(e.target).parentsUntil('.category-item').addBack().filter(function(){
							
							var events = $._data && $._data(this, 'events') || jQuery(this).data('events');

							if(events && events.click){
								return true;
							}

							if(this.className.match(/cat-link/)){
								return false;
							}

							if(this.tagName.toUpperCase() == 'A'){
								return true;
							}

							return false;

						}).length){
							return true;
						}						

						//click up to parent
						var link = jQuery(this).find('.cat-link').attr('href');
                        if (jQuery('.ja-infinity').hasClass('item-moving')) {
                            return false;
                        }
                        if(link != window.location.href){
							window.location.href = link;
							return false;
						}
					});
				},

				focuselm = function () {
					if(!iscroll){
						jQuery('#t3-content').find(':tabbable:first').focus();
					}
				};

			//initialize jquery address
			history.pushState && $.address.state(T3JSVars.baseUrl);

			//init or reset
			initorreset();

			//handle category link
			initcategorylink();

			//init detect fullscreen function
			//initfullscreen();

			//focus on desired element
			focuselm();

			//add class
			curactive.length && jQuery(document.documentElement).addClass(curactive.attr('data-pagecls'));

			//keyboard navigation
			jQuery(document.documentElement).on('keydown.iscroll', function(e){

				//only handle if not mobile
				if(SmashBoard.ismobile || e.ctrlKey || e.altKey || e.shiftKey){
					return;
				}

				return keyhandler(e.keyCode);
			});

			//reset if click on document
			jQuery(document).add(dim).on('click', function(e){

				e.stopPropagation();
				
				if(!SmashBoard.ismobile){
					threesixty.threesixty('reset');
				}

				jQuery('#t3-mainnav').removeClass('focus');
				navfocus = false;

				//remove focus
				SmashBoard.removefocus();
			});

			jQuery('#t3-mainnav').on('click', function(e){
				
				if(SmashBoard.ismobile){
					return;
				}

				//prevent propagation to body
				e.stopPropagation();
				
			}).on('touchstart mouseenter', function(){

				if(SmashBoard.ismobile){
					return;
				}

				//focus to left navigation
				
				jQuery('#t3-mainnav').addClass('focus');
				navfocus = true;

				return false;

			}).on('mouseleave', function(){

				if(SmashBoard.ismobile){
					return;
				}

				if(!SmashBoard.hasTouch){
					jQuery('#t3-mainnav').removeClass('focus');
					threesixty.threesixty('reset');
				}

				navfocus = false;

				return false;
			}).find('ul.nav-list').on('click', ' > li', function(){

				//only handle if not mobile
				if(SmashBoard.ismobile){
					return;
				}

				//ajax and return false;
				if(ajaxible(this)){

					clearTimeout(SmashBoard.ajaxloadid);
					SmashBoard.ajaxloadid = setTimeout($.proxy(function(){
						threesixty.threesixty('active', this);
						ajaxload(this);
					}, this), 200);

					return false;
				}
			});

			//navigation buttons
			jQuery('.ja-keyboard-btns').on('click', 'a', function(){

				//should we disabled when on mobile ? => this controls should not visible when on mobile
				if(SmashBoard.ismobile){
					return;
				}

				var jelm = jQuery(this),
					keyCode = 0,
					keymaps = [keys.UP, 'up', keys.DOWN, 'down', keys.LEFT, 'left', keys.RIGHT, 'right', keys.HOME, 'playback'];

				for(var i = 0, il = keymaps.length; i < il; i += 2){
					if(jelm.hasClass('ja-keyboard-' + keymaps[i + 1])){
						keyCode = keymaps[i];
						break;
					}
				}

				//remove focus on link
				this.blur();

				if(keyCode != 0){
					keyhandler(keyCode);

					return false;
				}

				return false;
			});

			//social dropdown
			socials.find('>li').on('click.social', function(e){

				//only handle it not mobile
				//if(SmashBoard.ismobile){
				//	return;
				//}

				var altkey = jQuery(this).attr('data-altkey'),
					keyCode = keys[altkey];

				if(typeof keyCode != 'undefined'){
					return !shortcutkeys(keyCode);
				}
			});
	
			socials.find('>li>a').on('click touchstart', function(e){
				e.preventDefault();

				jQuery(this).parent().trigger('click.social');
        		return false;
			});

			jQuery(document.body).addClass('wnd-loaded');

		})();
	});
	jQuery(document).ready(function(){
		var isInIframe = (window.location != window.parent.location) ? true : false;
		if (!isInIframe) {
			jQuery('#toolbar-cancel a').unbind('click');
		}
		jQuery('#toolbar-cancel a').click(function(e){
			e = e || window.event; // support  for IE8 and lower
			e.preventDefault(); // stop browser from doing native logic
			window.history.back(); 
		});
	});
})(jQuery);


// override off canvas
jQuery(document).ready(function(){
	if (jQuery.support.t3transform !== false) {

		var $btn = jQuery('.btn-navbar[data-toggle="collapse"]'),
			$nav = null,
			$fixeditems = null;

		if (!$btn.length){
			return;
		}

		//mark that we have off-canvas menu
		jQuery(document.documentElement).addClass('off-canvas-ready');

		$nav = jQuery('<div class="t3-mainnav" />');

		$btn.off().unbind().click (function(e){
			if (jQuery(this).data('off-canvas') == 'show') {
				hideNav();
			} else {
				showNav();
			}

			return false;
		});

		var posNav = function () {
			var t = jQuery(window).scrollTop();
			if (t < $nav.position().top) $nav.css('top', t);
		},

		bdHideNav = function (e) {
			e.preventDefault();
			hideNav();
			return false;
		},

		showNav = function () {
			jQuery('html').addClass ('off-canvas');

			$nav.css('top', jQuery(window).scrollTop());
			wpfix(1);
			
			setTimeout (function(){
				$btn.data('off-canvas', 'show');
				jQuery('html').addClass ('off-canvas-enabled');
				jQuery(window).on('scroll touchmove', posNav);

				// hide when click on off-canvas-nav
				jQuery('#off-canvas-nav').on ('click', function (e) {
					e.stopPropagation();
				});
				
				//jQuery('#off-canvas-nav a').on ('click', hideNav);
				jQuery('body').on ('click', bdHideNav);
			}, 50);

			setTimeout (function(){
				wpfix(2);
			}, 1000);
		},

		hideNav = function (e) {

			//prevent close on the first click of parent item
			if(e && e.type == 'click' 
				&& e.target.tagName.toUpperCase() == 'A' 
				&& jQuery(e.target).parent('li').data('noclick')){
				return true;
			}

			jQuery(window).off('scroll touchmove', posNav);
			jQuery('#off-canvas-nav').off ('click');
			//jQuery('#off-canvas-nav a').off ('click', hideNav);
			jQuery('body').off ('click', bdHideNav);
			
			jQuery('html').removeClass ('off-canvas-enabled');
			$btn.data('off-canvas', 'hide');

			setTimeout (function(){
				jQuery('html').removeClass ('off-canvas');
			}, 600);
		},

		wpfix = function (step) {
			// check if need fixed
			if ($fixeditems == -1){
				return;// no need to fix
			}

			if (!$fixeditems) {
				$fixeditems = jQuery('body').children().filter(function(){ return jQuery(this).css('position') === 'fixed' });
				if (!$fixeditems.length) {
					$fixeditems = -1;
					return;
				}
			}

			if (step==1) {
				$fixeditems.each (function () {
					var $this = jQuery(this);
					var style = $this.attr('style'),
					opos = style && style.match('position') ? $this.css('position'):'',
					otop = style && style.match('top') ? $this.css('top'):'';

					$this.data('opos', opos).data('otop', otop);
					$this.css({'position': 'fixed', 'top': (jQuery(window).scrollTop() + parseInt($this.css('top'))) });
				});

			} else {
				$fixeditems.each (function () {
					$this = jQuery(this);
					$this.css({'position': $this.data('opos'), 'top': $this.data('otop')});
				});
			}
		};
	}
});
// END override off canvas