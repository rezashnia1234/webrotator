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

(function($){

	//init quicksearch object
	SmashBoard.qsearch = {};

	$(document).ready(function(){

		var qsform = $('.nav-connect .form-search'),
			qspanel = qsform.closest('.nav-child'),
			qsresults = qspanel.find('.qs-result-list'),
			qsresultscroller = qsresults.parent(),
			qspaging = qspanel.find('.qs-result-paging'),
			qskeyword = qspanel.find('.qskeyword'),
			qssearchinput = qsform.find('input[name="searchword"]'),
			//qsloader = $('<div class="qs-ajax-loader"><img src="' + T3JSVars.tplUrl + '/images/ajax-loader.gif' + '" alt="" /></div>'),
			qsloader = $('<div class="qs-ajax-loader"><img src="templates/ja_smashboard/images/ajax-loader.gif' + '" alt="" /></div>'),
			qsajax = null,
			ajaxcount = 0,
			ajaxid = null,
			lastkeyword = null,

			panelshow = false,
			iscroll = null,

			active = 0,
			itemsperline = 1,
			qsitems = null,

			keys = SmashBoard.keys,

			onshowpanel = function(){
				if(qspanel.hasClass('expand')){
					$(document.body).addClass('qsearch');
					$(window).off('resize.qsearch').on('resize.qsearch', itemsperrow);
					qspanel.off('keydown.qsearch').on('keydown.qsearch', keyhandle).on('keyup.qsearch', tabchange);

					//init iscroll
					if(iscroll){
						iscroll.refresh();
					} else {
						iscroll = new iScroll(qsresultscroller[0], {
							vScrollbar: true,
							hScrollbar: false,
							checkDOMChanges: true,
							scrollbarClass: 'popup-tracker'
						});
					}
				}

				panelshow = true;

				//calculate
				itemsperrow();
			},

			itemsperrow = function(){
				itemsperline = 1;

				if(panelshow && qsitems && qsitems.length){
					var rowtop = qsitems.eq(0).offset().top;

					for(var i = 1, il = qsitems.length; i < il; i++){
						
						if(qsitems.eq(i).offset().top > rowtop){
							break;
						}

						itemsperline++;
					}
				}
			},

			openitem = function(item){
				
				if(!SmashBoard.ismobile && SmashBoard.popup){
					SmashBoard.popup.startqs(item);
					return false;
				} else {

					var link = item.find('.qs-link').attr('href');
					if(link){
						window.location.href = link;
						return false;
					}
				}
			},

			ajaxpaging = function(){

				//we will not check ajax
				if($(this).parent().hasClass('disabled') || !$(this).attr('href')){
					return false;
				}

				qsloader.appendTo(qspaging);

				//if we have previous ajax instance, just abort it
				if(qsajax && ajaxcount){
					qsajax.abort();
				}

				ajaxcount++;

				qsajax = $.ajax({
					url: this.href,
					cache: false,
					beforeSend: function(){
						qsloader.addClass('active');
					}
				}).done(function(data){
					
					if(qspanel.hasClass('expand')){
						qsresults.empty();
					} else {
						qspanel.addClass('expand');
					}
					
					var bdhtml = data.match(/<body[^>]*>([\w|\W]*)<\/body>/im);

					if(bdhtml){
						bdhtml = bdhtml[1];
					}

					data = $('<div></div>').html(bdhtml);

					qsresults.html(data.find('.qs-result'));
					qspaging.html(data.find('.qs-pagination').html());

					active = 0;
					SmashBoard.qsearch.qsitems = qsitems = qsresults.find('.qs-item');
					qsitems.eq(active).addClass('active').find(':tabbable:first').focus();
					
					//init iscroll
					if(panelshow){
						if(iscroll){
							iscroll.refresh();
							iscroll.scrollTo(0, 0, 500);
						} else {
							iscroll = new iScroll(qsresultscroller[0], {
								vScrollbar: true,
								hScrollbar: false,
								checkDOMChanges: true,
								scrollbarClass: 'popup-tracker'
							});
						}

						onshowpanel();
					}

				}).fail(function(){

				}).always(function(){
					ajaxcount--;

					if(ajaxcount <= 0){
						ajaxcount = 0;

						qsloader.removeClass('active');
					}
				});

				return false;
			},

			keyhandle = function(e){
				//if(e.keyCode == keys.ESCAPE){
				//	if(document.activeElement != qssearchinput[0]){
				//		qssearchinput.focus();
				//		return false;
				//	}
				//}
				if(document.body.className.match(/popupview|popupopening/)){
					return false;
				}

				var newactive = active;

				if (e.keyCode == keys.UP){
					
					if(active - itemsperline >= 0){
						newactive = active - itemsperline;

						if(iscroll && iscroll.vScrollbar){
							newactive > 0 ? iscroll.scrollToElement(qsitems.get(newactive), 500) : iscroll.scrollTo(0, 0, 500);
						}
					}

				} else if (e.keyCode == keys.DOWN) {
					
					if(active + itemsperline <= qsitems.length -1){
						newactive = active + itemsperline;

						if(iscroll && iscroll.vScrollbar){
							iscroll.scrollToElement(qsitems.get(newactive), 500);
						}
					}

				} else if (e.keyCode == keys.LEFT){
					newactive = Math.max(0, active -1);
				
				} else if(e.keyCode == keys.RIGHT) {
					newactive = Math.min(qsitems.length -1, active +1);
				
				} else if(e.keyCode == keys.ENTER){
					
					//current focus on the result panel
					if(document.activeElement && $(document.activeElement).closest('.qs-result-list-wrap').length){
						openitem(qsitems.eq(active));

						return false;
					}
				}

				if(newactive != active){
					qsitems.eq(active).removeClass('active');
					qsitems.eq(newactive).addClass('active').find(':tabbable').focus();
					active = newactive;

					return false;
				}
			},

			focusto = function(item){

				if(iscroll && iscroll.vScrollbar && item && $(item).length){
					qsitems.eq(active).removeClass('active');
					active = qsitems.index(item);

					iscroll.scrollToElement($(item)[0], 500);
					item.addClass('active');
				}
			},

			tabchange = function(e){
				focusto(document.activeElement && $(document.activeElement).closest('.qs-item'));
			},

			postajax = function(){
				
				qsloader.insertAfter(qssearchinput);
				qskeyword.text(qssearchinput.val());

				//if we have previous ajax instance, just abort it
				ajaxcount++;

				qsajax = $.ajax({
					url: qsform.attr('action'),
					type: qsform.attr('method'),
					cache: false,
					data: qsform.serialize(),
					
					beforeSend: function(){
						qsloader.addClass('active');
					}

				}).done(function(data){
					
					if(qspanel.hasClass('expand')){
						qsresults.empty();
					} else {
						qspanel.addClass('expand');
					}
					
					var bdhtml = data.match(/<body[^>]*>([\w|\W]*)<\/body>/im);

					if(bdhtml){
						bdhtml = bdhtml[1];
					}

					data = $('<div></div>').html(bdhtml);

					var qsrs = data.find('.qs-result'),
						qspage = data.find('.qs-pagination');

					if(qsrs.length){
						qsresults.empty().append(qsrs);
					} else {
						qsresults.empty().html(T3JSVars.searchResultEmpty);
					}

					qspaging.empty().html(qspage.html());

					//active = 0;
					SmashBoard.qsearch.qsitems = qsitems = qsresults.find('.qs-item');
					//qsitems.eq(active).addClass('active');

					//init iscroll
					if(panelshow){
						if(iscroll){
							iscroll.refresh();
						} else {
							iscroll = new iScroll(qsresultscroller[0], {
								vScrollbar: true,
								hScrollbar: false,
								checkDOMChanges: true,
								scrollbarClass: 'popup-tracker'
							});
						}

						onshowpanel();
					}

				}).fail(function(){

				}).always(function(){
					ajaxcount--;

					if(ajaxcount <= 0){
						ajaxcount = 0;

						qsloader.removeClass('active');
					}
				});
			};

		qssearchinput
			.on('keydown', function(e){
				if(e.keyCode == keys.ESCAPE){
					clearTimeout(ajaxid);

					if(qsajax && ajaxcount){
						qsajax.abort();
						ajaxcount = 0;
						qsloader.removeClass('active');
					}
				}

				if((e.keyCode == keys.DOWN) && 
					panelshow && 
					qspanel.hasClass('expand')){
					
					active = 0;
					qsitems.eq(0).addClass('active').find(':tabbable').focus();
					iscroll && iscroll.scrollTo(0, 0, 500);

					e.stopPropagation();
				}
			})
			.on('keyup', function(e){
				
				var keyword = $.trim(this.value);

				if(keyword && keyword.length > 1 && lastkeyword != keyword){

					if(qsajax && ajaxcount){
						qsajax.abort();
						ajaxcount = 0;
						qsloader.removeClass('active');
					}

					lastkeyword = keyword;

					ajaxid = setTimeout(postajax, 250);
				} else if(!keyword || keyword.length < 2){
					qskeyword.text('...');
				}
			});

		qsform
			.on('submit', function(){

				//trigger the event
				qssearchinput.trigger('keyup');

				return false;
			});

		var qsid = null;
		qssearchinput
			.attr('autocomplete', 'off')
			.on('focus', function(){
				if(qspanel){
					clearTimeout(qsid);
					qsid = setTimeout(function(){
						qspanel.addClass('active');
					}, 300);
				}
			})
			.on('blur', function(){
				clearTimeout(qsid);
				qspanel.removeClass('active');
			});

		qspaging.on('click', 'a', ajaxpaging);
		qsresults.on('click', '.qs-item', function(){
			active = qsitems.index(this);
			openitem($(this));

			return false;
		});

		qspanel.closest('.nav-connect')
			.on('showsub', onshowpanel)
			.on('hidesub', function(){
				$(document.body).removeClass('qsearch');
				$(window).off('resize.qsearch');
				qspanel.off('keydown.qsearch').off('keyup.qsearch');

				if(iscroll){
					iscroll.destroy();
					iscroll = null;
				}

				panelshow = false;
			});

		//remove unwanted class
		qspanel.find('.t3-hide').removeClass('t3-hide');

		//extend
		$.extend(SmashBoard.qsearch, {
			qsitems: null,
			focusto: focusto
		});

	});

})(jQuery);