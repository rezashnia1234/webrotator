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

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

(function($){

	//init object
	SmashBoard.popup = {};

	$(document).ready(function(){
		// popup preview
		
		SmashBoard.popup.init = (function(){

			var iframeid = null,
				framedelay = 500,
				fdelay = 500,
				curitem = null,
				scroller = null,
				infinity = null, 
				iscroll = null,

				//keyboard limited event fired
				kbhdelay = 400,
				kbhid = null,

				aload = false,
				pload = false,
				aloader = $('#article-loader').detach(),
				ploader = $('#popup-loader'),

				ableaction = true,

				moved = false,
				posx = null,
				posy = null,
				movethreshold = 3,

				backurl = null,

				keys = SmashBoard.keys,

				mousedown = function(e){
					posx = e.pageX;
					posy = e.pageY;
					moved = false;
				},

				mousemove = function(e){
					moved = Math.abs(posx - e.pageX) > movethreshold || Math.abs(posy - e.pageY) > movethreshold;
				},

				//function check iframe popup load to resize
				onload = function(){
					if(this.src == 'about:blank'){
						return;
					}
					
					//change state class
					$(document.body).addClass ('popupview-loaded');
					aload && aloader.modal('hide');
					pload && ploader.modal('hide');
					$('#popup-view').removeClass('popup-hide popup-loading');
					
					var ifdoc = $(this).contents().get(0);
					
					if (!ifdoc || (ifdoc.readyState && ifdoc.readyState != 'complete')){
					   return;
					}

					if (ifdoc.body && ifdoc.body.innerHTML == "false"){
						return;
					}
					
					//set the height of iframe and initialize iscroll instance
					this.height = $(ifdoc).height();

					var ifmscroller = new iScroll(this.parentNode, {vScrollbar: true, hScrollbar: false, scrollbarClass: 'popup-tracker', useTransform: SmashBoard.hasTouch, scroller: (SmashBoard.hasTouch ? ifdoc.body : null) });
					$(this).data('iscroll', ifmscroller).addClass('loaded');

					//replace links
					$(ifdoc.body).find('a').each(function(){
						if($(this).attr('target') != '_blank'){
							$(this).attr('target', '_parent');
						}
					});
					
					$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
                    $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
                    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());

					//compatible
					if($.browser.opera || $.browser.mozilla || ($.browser.msie && $.browser.version >= 9)){
						$(ifdoc).on('mousewheel.iscroll', function(e, which){
							ifmscroller._wheel(e, which);
						});
					} else if($.browser.msie && $.browser.version < 9){
						ifdoc.onmousewheel = function(e){
							if(ifmscroller){
								ifmscroller._wheel((e || this.window.event).wheelDelta/120);
							}
						};
					}

					var parent = $(this).closest('.popup-inner');

					//set current scroller instance
					if(parent.hasClass('current')){
						scroller = ifmscroller;
					}

					if(!parent.hasClass('showup') && aload){
						showup(parent);
					}
					
					//auto resize this iframe
					autoresize(curitem && this);
				},

				showup = function (pitem) {

					var parent = pitem.addClass('showup');

					clearTimeout(parent.data('shid'));

					//change state class
					$(document.body).addClass ('popupview-loaded');
					aload && aloader.modal('hide');
					pload && ploader.modal('hide');
					$('#popup-view').removeClass('popup-hide popup-loaded popup-loading');

					//animate this popup
					if(curitem && aload && parent.hasClass('current')){
						
						var citem = $(curitem),
							fromoffset = citem.offset(),
							toitem = $('#popup-content'),
							tooffset = toitem.offset(),
							complete = function(){
								$('#popup-view').removeClass('popup-hidectrl');
								$(parent).css(SmashBoard.support.transformProperty, 'none');
							};

						if(SmashBoard.support.transform){

							var scalex = citem.width() / toitem.width(),
								scaley = citem.height() / toitem.height(),
								left = (fromoffset.left - tooffset.left),
								top = (fromoffset.top - tooffset.top);

							left -= (toitem.width() - citem.width()) / 2;
							top -= (toitem.height() - citem.height()) / 2;

							$(parent)
								.removeClass('animate')
								.css({
									top: '',
									opacity: 0
								})
								.css(SmashBoard.support.transformProperty, 'translate(' + left + 'px, ' + top + 'px)' + SmashBoard.support.translateZ + ' scaleX(' + scalex + ') scaleY(' + scaley + ')');

							setTimeout(function(){
								$(parent)
									.addClass('animate')
									.css('opacity', 1)
									.css(SmashBoard.support.transformProperty, 'translate(0px, 0px)' + SmashBoard.support.translateZ + ' scaleX(1) scaleY(1)');

								if($.support.transition){
									
									$(parent).one($.support.transition.end, complete);

								} else {
									setTimeout(complete, 600);
								}
								
							}, 0);
							
						} else {
							$(parent).removeClass('animate').css({
								width: citem.width(),
								height: citem.height(),
								top: fromoffset.top - tooffset.top,
								left: fromoffset.left - tooffset.left,
								opacity: 0.2
							}).animate({
								width: toitem.width(),
								height: toitem.height(),
								top: 0,
								left: 0,
								opacity: 1
							}, {
								duration: 600,
								complete: function(){
									
									$(parent).css({
										width: '',
										height: '',
										top: '',
										left: ''
									});

									$('#popup-view').removeClass('popup-hidectrl');
								}
							});
						}

					} else if(pload) {

					} else {
						
						parent.css('top', 0);
					}

					aload = false;
					pload = false;
				},

				//when first open the popup
				startpopup = function(e) {

					if(e.isTrigger){
						moved = false;
					}

					if(moved || $(this).hasClass('category-item') || (e.which && e.which != 1)){
						return false;
					}

					//not support popup in small screen size
					if($(window).width() < 768){
						return true;
					}

					// check if window is smaller than popup width - 768px or if we already open a popup
					if($(document.body).hasClass ('popupopening') || $(document.body).hasClass ('popupview')){
						return false;
					}

					if(e && !$(e.target).hasClass('item')){

						if($(e.target).parentsUntil('.item').addBack().filter(function(){

							var events = $._data && $._data(this, 'events') || $(this).data('events');

							if(events && events.click){
								return true;
							}

							if(this.className.match(/article-link|readmore-link|video-link/)){
								return false;
							}

							if(this.tagName.toUpperCase() == 'A'){
								return true;
							}

							return false;

						}).length){
							return true;
						}
					}

					//handle focusin
					//$('#popup-view').data('focuselm', $('#popup-view'));
					//$(document).on('focusin.smbpopup', focusin);

					//store the current link
					backurl = SmashBoard.cleanurl(window.location.href);

					$(document.body).addClass('popupopening');

					//wait for the slide effect complete effect
					//should we check for current index?
					var item = this;
					setTimeout(function (argument) {

						//attach keyboard event
						$(document.documentElement).on('keydown.smbpopup', keyhandle);

						// add popup class to body
						$(document.body).addClass ('popupview');
						$('#popup-view').addClass('popup-hide popup-hidectrl');
	
						aload = true;
						aloader.appendTo($(item).find('article:first')).modal('show');

						//set the open to current active
						var popupitem = openpopup(item).addClass('current');
						popupitem.data('shid', setTimeout(function(){
							showup(popupitem);
						}, 2000 + (SmashBoard.hasTouch ? 1000 : 0)));

						scroller = popupitem.find('iframe').data('iscroll');

					}, 700 + (SmashBoard.hasTouch ? 1000 : 0));
					
					return false;
				},

				openpopup = function(item) {
					
					//merge url params
					var url = ($(item).find('.article-link, .readmore-link, .video-link').eq(0).attr('href') || ''),
						urlparts = url.split('#');

					//update address
					if(history.pushState && $.address){
						$.address.value(SmashBoard.cleanurl(url));
					}

					if(urlparts[0].indexOf('?') == -1){
						urlparts[0] += '?tmpl=component';
					} else {
						urlparts[0] += '&tmpl=component';
					}
					
					url = urlparts.join('#');
					
					//build the popup item
					var popupitem = $('' +
						'<div class="popup-inner"' + (aload ? ' style="top: -90000px"' : '') + '>' +
							'<div class="popup-inner-content"></div>' +
						'</div>').appendTo('#popup-content');
	
						popupitem
							.find('.popup-inner-content')
							.html ($('<iframe class="popup-iframe" src="' + url + '" scrolling="no" frameborder="0" />')
							.on('load', onload));

					//add state class
					$('#popup-view').removeClass('popup-loaded').addClass('popup-loading');

					curitem = item;

					return popupitem;
				},

				opennext = function(){
					
					//check for timeout
					if(!ableaction){
						return false;
					}

					//make sure that the scroller is available
					if(!iscroll){
						iscroll = infinity.data('iscroll');
					}

					if(curitem && iscroll){

						var citem = $(curitem);
						if(citem.length){

							var popupcontent = $('#popup-content'),
								current = popupcontent.find('.current'),
								prev = popupcontent.find('.prev'),
								next = popupcontent.find('.next');

							//check for next item
							if(!next.length){

								var idx = iscroll.items.index(citem) + 1,
									nextitem = null;

								if(idx < iscroll.items.length){
									nextitem = iscroll.items.eq(idx);
								}

								if(nextitem && nextitem.length){
									
									next = openpopup(nextitem).addClass('next');

									pload = true;
									ploader.modal('show');
								}
							} else {
								curitem = iscroll.items.eq(iscroll.items.index(curitem) + 1);

								//update address
								var url = ($(curitem).find('.article-link, .readmore-link, .video-link').eq(0).attr('href') || '');
								if(history.pushState && $.address && url){
									$.address.value(SmashBoard.cleanurl(url));
								}
							}

							if(next.length){

								iscroll && iscroll.scrollToElm(curitem);

								setTimeout(function(){
									current.css(SmashBoard.support.transformProperty, '').removeClass('current').addClass('animate prev');
									next.addClass('animate current').removeClass('next');
								
									autoresize(true);

									//change scoller instance
									scroller = next.find('iframe').data('iscroll');
									scroller && scroller.refresh();

									fdelay = framedelay;

									ableaction = false;
									if($.support.transition){
										$(next).one($.support.transition.end, cleanup);
									} else {
										setTimeout(cleanup, 600);
									}

								}, 0);
							}
						}
					}

					return false;
				},

				openprev = function(){

					//check for timeout
					if(!ableaction){
						return false;
					}

					//make sure that the scroller is available
					if(!iscroll){
						iscroll = infinity.data('iscroll');
					}

					if(curitem && iscroll){

						var citem = $(curitem);
						if(citem.length){

							var popupcontent = $('#popup-content'),
								current = popupcontent.find('.current'),
								prev = popupcontent.find('.prev'),
								next = popupcontent.find('.next');

							//check for next item
							if(!prev.length){

								var idx = iscroll.items.index(citem) -1,
									nextitem = null;

								if(idx >= 0){
									nextitem = iscroll.items.eq(idx);
								}

								if(nextitem && nextitem.length){
									prev = openpopup(nextitem).addClass('prev');

									pload = true;
									ploader.modal('show');
								}
							} else {
								curitem = iscroll.items.eq(iscroll.items.index(curitem) - 1);

								//update address
								var url = ($(curitem).find('.article-link, .readmore-link, .video-link').eq(0).attr('href') || '');
								if(history.pushState && $.address && url){
									$.address.value(SmashBoard.cleanurl(url));
								}
							}

							if(prev.length){

								iscroll && iscroll.scrollToElm(curitem);

								setTimeout(function(){
									current.css(SmashBoard.support.transformProperty, '').removeClass('current').addClass('animate next');
									prev.addClass('animate current').removeClass('prev');

									autoresize(true);
									scroller = prev.find('iframe').data('iscroll');
									scroller && scroller.refresh();

									fdelay = framedelay;

									ableaction = false;
									if($.support.transition){
										$(prev).one($.support.transition.end, cleanup);
									} else {
										setTimeout(cleanup, 600);
									}

								}, 0);
							}
						}
					}

					return false;
				},

				startqs = function(item){
					//not support popup in small screen size
					if($(window).width() < 768){
						return false;
					}

					// check if window is smaller than popup width - 768px or if we already open a popup
					if(document.body.className.match(/popupview|popupopening/)){
						return false;
					}

					//store the current link
					backurl = SmashBoard.cleanurl(window.location.href);

					$(document.body).addClass('popupopening');
				
					//attach keyboard event
					$(document.documentElement).on('keydown.smbpopup', keyhandle);

					// add popup class to body
					$(document.body).addClass ('popupview popupview-loaded');
					$('#popup-view').removeClass('popup-hide popup-hidectrl popup-loaded popup-loading');

					openqs(item).addClass('current');

					setTimeout(function(){
						pload = true;
						ploader.modal('show');
					}, 0);

					return true;
				},

				openqs = function(item){

					//merge url params
					var url = ($(item).find('.qs-link').attr('href') || ''),
						urlparts = url.split('#');

					//update address
					if(history.pushState && $.address){
						$.address.value(SmashBoard.cleanurl(url));
					}

					if(urlparts[0].indexOf('?') == -1){
						urlparts[0] += '?tmpl=component';
					} else {
						urlparts[0] += '&tmpl=component';
					}
					
					url = urlparts.join('#');
					
					//build the popup item
					var popupitem = $('' +
						'<div class="popup-inner"' + (aload ? ' style="top: -90000px"' : '') + '>' +
							'<div class="popup-inner-content"></div>' +
						'</div>').appendTo('#popup-content');
	
						popupitem
							.find('.popup-inner-content')
							.html ($('<iframe class="popup-iframe" src="' + url + '" scrolling="no" frameborder="0" />')
							.on('load', onload));

					//add state class
					$('#popup-view').removeClass('popup-loaded').addClass('popup-loading');

					curitem = item;

					return popupitem;
				},

				openqsnext = function(){

					//check for timeout
					if(!ableaction){
						return false;
					}

					var qsearch = SmashBoard.qsearch;
					if(!qsearch.qsitems || !qsearch.qsitems.length){
						return false;
					}

					if(curitem){

						var citem = $(curitem);
						if(citem.length){

							var popupcontent = $('#popup-content'),
								current = popupcontent.find('.current'),
								prev = popupcontent.find('.prev'),
								next = popupcontent.find('.next');

							//check for next item
							if(!next.length){

								var idx = qsearch.qsitems.index(citem) + 1,
									nextitem = null;

								if(idx < qsearch.qsitems.length){
									nextitem = qsearch.qsitems.eq(idx);
								}

								if(nextitem && nextitem.length){
									
									next = openqs(nextitem).addClass('next');

									pload = true;
									ploader.modal('show');
								}
							} else {
								curitem = qsearch.qsitems.eq(qsearch.qsitems.index(curitem) + 1);

								//update address
								var url = ($(curitem).find('.qs-link').attr('href') || '');
								if(history.pushState && $.address && url){
									$.address.value(SmashBoard.cleanurl(url));
								}
							}

							if(next.length){

								qsearch.iscroll && qsearch.iscroll.focusto(curitem);

								setTimeout(function(){
									current.css(SmashBoard.support.transformProperty, '').removeClass('current').addClass('animate prev');
									next.addClass('animate current').removeClass('next');
								
									autoresize(true);

									//change scoller instance
									scroller = next.find('iframe').data('iscroll');
									scroller && scroller.refresh();

									fdelay = framedelay;

									ableaction = false;
									if($.support.transition){
										$(next).one($.support.transition.end, cleanup);
									} else {
										setTimeout(cleanup, 600);
									}

								}, 0);
							}
						}
					}

					return false;
				},

				openqsprev = function(){
					//check for timeout
					if(!ableaction){
						return false;
					}

					var qsearch = SmashBoard.qsearch;
					if(!qsearch.qsitems || !qsearch.qsitems.length){
						return false;
					}

					if(curitem){

						var citem = $(curitem);
						if(citem.length){

							var popupcontent = $('#popup-content'),
								current = popupcontent.find('.current'),
								prev = popupcontent.find('.prev'),
								next = popupcontent.find('.next');

							//check for next item
							if(!prev.length){

								var idx = qsearch.qsitems.index(citem) -1,
									nextitem = null;

								if(idx >= 0){
									nextitem = qsearch.qsitems.eq(idx);
								}

								if(nextitem && nextitem.length){
									prev = openqs(nextitem).addClass('prev');

									pload = true;
									ploader.modal('show');
								}
							} else {
								curitem = qsearch.qsitems.eq(qsearch.qsitems.index(curitem) - 1);

								//update address
								var url = ($(curitem).find('.qs-link').attr('href') || '');
								if(history.pushState && $.address && url){
									$.address.value(SmashBoard.cleanurl(url));
								}
							}

							if(prev.length){

								qsearch.iscroll && qsearch.iscroll.focusto(curitem);

								setTimeout(function(){
									current.css(SmashBoard.support.transformProperty, '').removeClass('current').addClass('animate next');
									prev.addClass('animate current').removeClass('prev');

									autoresize(true);
									scroller = prev.find('iframe').data('iscroll');
									scroller && scroller.refresh();

									fdelay = framedelay;

									ableaction = false;
									if($.support.transition){
										$(prev).one($.support.transition.end, cleanup);
									} else {
										setTimeout(cleanup, 600);
									}

								}, 0);
							}
						}
					}
				},

				onresize = function(){
					var jiframe = $('#popup-content').find('.current iframe.loaded');
					
					if(jiframe.length){
						var ifmdoc = jiframe.contents();

						if(ifmdoc.length){

							if(scroller){
								var ifbody = ifmdoc.find('body'),
									padding = ifbody.outerHeight(true) - ifbody.height(),
									height = parseFloat(jiframe.attr('height')),
									nheight = ifmdoc.height();

								//extend the time span
								fdelay = fdelay * 2;

								if((!jiframe.data('fixed') && height + padding <= nheight) || (height + padding < nheight) || height - padding > nheight){
									jiframe.data('fixed', 1);

									var scroll = scroller.y,
										nheight = 0;

									//try
									scroll && scroller.scrollTo(0, 0);
									nheight = ifmdoc.height();

									//restore
									if(nheight >= height){
										jiframe.attr('height', nheight);
										scroller.refresh();
									}

									scroll && scroller.scrollTo(0, Math.max(scroll, -nheight + $('#popup-content').height()));
									
									fdelay = framedelay;
								}
							}

							iframeid = setTimeout(onresize, fdelay);
						}
					}
				},

				autoresize = function(iframe){
					clearTimeout(iframeid);
					
					if(iframe){
						fdelay = framedelay;
						iframeid = setTimeout(onresize, fdelay);
					}
				},

				closepopup = function(e){

					//no propagate event
					if(e){
						e.stopPropagation();
						e.preventDefault();
					}

					//check for timeout
					if(!ableaction){
						return false;
					}

					//remove timeout
					clearTimeout(iframeid);

					//remove keyboard event
					$(document.documentElement).off('keydown.smbpopup');

					//remove focusin
					$(document).off('focusin.smbpopup');

					//already close ?
					if(!curitem){
						return false;
					}

					if(scroller){
						scroller.destroy();
						scroller = null;
					}

					//hide popup control first
					$('#popup-view').addClass('popup-hidectrl');

					var 
						toitem = $('#popup-content'),
						citem = $(curitem),
						parent = toitem.find('.current'),

						fromoffset = citem.offset(),
						tooffset = toitem.offset();

					if(parent.length){

						if(SmashBoard.support.transform){

							var scalex = citem.width() / toitem.width(),
								scaley = citem.height() / toitem.height(),
								left = (fromoffset.left - tooffset.left),
								top = (fromoffset.top - tooffset.top);

							left -= (toitem.width() - citem.width()) / 2;
							top -= (toitem.height() - citem.height()) / 2;

							$(parent)
								.removeClass('animate')
								.css('opacity', 1)
								.css(SmashBoard.support.transformProperty, 'translate(0px, 0px)' + SmashBoard.support.translateZ + ' scaleX(1) scaleY(1)');

							setTimeout(function(){
								$(parent)
									.addClass('animate')
									.css('opacity', 0)
									.css(SmashBoard.support.transformProperty, 'translate(' + left + 'px, ' + top + 'px)' + SmashBoard.support.translateZ + ' scaleX(' + scalex + ') scaleY(' + scaley + ')');
							}, 0);

							if($.support.transition){
								
								$(parent).one($.support.transition.end, collectgarbage);

							} else {
								setTimeout(collectgarbage, 600);
							}

						} else {

							$(parent).css({
								width: toitem.width(),
								height: toitem.height(),
								top: 0,
								left: 0,
								opacity: 1
							}).animate({
								width: citem.width(),
								height: citem.height(),
								top: fromoffset.top - tooffset.top,
								left: fromoffset.left - tooffset.left,
								opacity: 0.2
							}, {
								duration: 600,
								complete: collectgarbage
							});
						}

					} else {
						collectgarbage();
					}

					if(history.pushState && $.address && backurl && SmashBoard.cleanurl(window.location.href) != backurl){
						$.address.value(backurl);
					}

					//grant focus
					if(!SmashBoard.hasTouch && document.body.className.match(/qsearch/)){
						if(curitem){
							curitem.find(':tabbable:first').focus();
						} else if(SmashBoard.focuselm) {
							SmashBoard.focuselm.focus();
						}
					}

					curitem = null;

					return false;
				},

				collectgarbage = function(){
					//current iframe
					var jiframe = $('#popup-content').find('iframe');
					
					if(jiframe.length){
						//fix swf object error
						jiframe.contents().find('object, embed').remove();
					}
					
					//remove class loading
					$('#popup-view').removeClass('popup-loaded popup-loading');
					
					//fix iframe IE9
					jiframe
						.off()
						.css('visibility', 'hidden');

					if(!navigator.userAgent.match(/Trident\/7\./)){
						jiframe.attr('src', 'about:blank');
					} else {
						jiframe.contents().empty();
					}

					setTimeout(function(){
						$('.popup-inner').remove();
						$(document.body).removeClass('popupview popupview-loaded popupopening');
					}, 100);
				},

				cleanup = function() {
					$('#popup-content').find('.current').css(SmashBoard.support.transformProperty, 'none');
					$('#popup-content').find('.prev, .next').find('iframe')
						.each(function(argument) {
							//iframe
							$(this).contents().find('object, embed').remove();

							var scroller = $(this).data('iscroll');
							if(scroller){
								scroller.destroy();
							}

							$(this)
								.off()
								.css('visibility', 'hidden');

							//fix iframe IE9
							if(!navigator.userAgent.match(/Trident\/7\./)){
								$(this).attr('src', 'about:blank');
							} else {
								$(this).contents().empty();
							}

						});

					setTimeout(function(){
						$('#popup-content').find('.prev, .next').remove();
						ableaction = true;
					}, 100);
				},

				keyhandle = function(e){
					if($(document.body).hasClass('popupview')){
						
						if(e.keyCode == keys.ESCAPE){
							
							closepopup(e);

						} else if (scroller && e.keyCode == keys.UP){
							
							scroller._wheel(1);

						} else if (scroller && e.keyCode == keys.DOWN) {
							
							scroller._wheel(-1);

						} else if (e.keyCode == keys.LEFT || e.keyCode == keys.RIGHT){
							
							if(!kbhid){
									
								kbhid = setTimeout(function(){
									kbhid = 0;
								}, kbhdelay);
								
								e.keyCode == 37 ? 
									($(document.body).hasClass('qsearch') ? openqsprev() : openprev()) : 
									($(document.body).hasClass('qsearch') ? openqsnext() : opennext());

							}
						} else if(scroller && e.keyCode == keys.HOME) {
							scroller.scrollTo(0, 0, 500);
						}
					}
				},

				focusin = function( e ) {
					var tgt = e.target, $tgt, container = $('#popup-view');

					if ( !$(document.body).hasClass('popupview') ) {
						return;
					}

					if ( tgt !== container[ 0 ] ) {
						$tgt = $( e.target );
						if ( 0 === $tgt.parents().filter( container[ 0 ] ).length ) {
							$( document.activeElement ).one( 'focus', function(/* e */) {
								$tgt.blur();
							});

							container.data('focuselm').focus();
							e.preventDefault();
							e.stopImmediatePropagation();

							return false;
						} else {
							container.data('focuselm', $tgt);
						}
					}
				};


			$(document)
				.on('mousedown', mousedown)
				.on('mousemove', mousemove);


			//extend popup
			$.extend(SmashBoard.popup, {
				keyhandle: keyhandle,
				startpopup: startpopup,
				startqs: startqs
			});

			//bind a live event
			return function(){
				if (!$(document.documentElement).hasClass ('no-preview')) {

					infinity = $('.ja-infinity');
					iscroll = infinity.data('iscroll');

					if (isMobile.any()) {
						// tap device
						//click on overlay => close
						$('#popup-view, #popup-close').off('tap').on('tap', closepopup);

						//popup nav
						$('#popup-prev').off('tap').on('tap', function(){
							$(document.body).hasClass('qsearch') ? openqsprev() : openprev();
							
							return false;
						});
						$('#popup-next').off('tap').on('tap', function(){
							$(document.body).hasClass('qsearch') ? openqsnext() : opennext();

							return false;
						});
					} else {
						//click on overlay => close
						$('#popup-view, #popup-close').off('click.smbpopup').on('click.smbpopup', closepopup);

						//popup nav
						$('#popup-prev').off('click.smbpopup').on('click.smbpopup', function(){
							$(document.body).hasClass('qsearch') ? openqsprev() : openprev();

							return false;
						});
						$('#popup-next').off('click.smbpopup').on('click.smbpopup', function(){
							$(document.body).hasClass('qsearch') ? openqsnext() : opennext();

							return false;
						});
					}
					
					//click on popup content => stop the propagate event
					$('#popup-content').off('click.smbpopup').on('click.smbpopup', function (e) {
						e.stopPropagation();
					});

					infinity.off('click.smbpopup').on('click.smbpopup', '.item', startpopup);
				}
			}
		
		})();

		//init
		SmashBoard.popup.init();

		//enable popup
		(function(){

			//check for iframe
			try {
				if(window.parent != window && window.parent.SmashBoard && window.parent.SmashBoard.popup){
					$(document.documentElement).on('keydown.iscroll', function(e){
						window.parent.SmashBoard.popup.keyhandle(e);
					});
				}
			} catch(e){
			}

			try {
				if(/tmpl=component/gi.test(window.location.href) && window.parent.SmashBoard){
					//support K2 back to top
					$('.itemBackToTop .k2Anchor').click(function(e) {
						
						if(window.parent.SmashBoard.popup && window.parent.SmashBoard.popup.keyhandle){
							window.parent.SmashBoard.popup.keyhandle({keyCode: SmashBoard.keys.HOME});
							e.preventDefault();
						}
					});
				}
			} catch(e){
			}

		})();

	});

})(jQuery);