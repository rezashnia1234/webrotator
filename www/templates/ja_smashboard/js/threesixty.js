;(function($){

	function threesixty(elm, options){
		this.jelm = $(elm);
		this.options = options;

		if(this.jelm.length){	
			this.initialize();
		}
	};

	threesixty.prototype = {
		initialize: function(){

			this.ready = false;
			this.dragging = false;
			this.pointerStartPos = 0;
			this.pointerEndPos = 0;
			this.pointerDistance = 0;
			
			this.currentFrame = 0;
			this.endFrame = 0;
			this.activeOffset = this.options.activeOffset;
			this.activeFrame = Math.max(0, this.options.activeFrame);
			
			this.monitorStartTime = 0;
			
			this.jitems = this.jelm.find(this.options.itemSel);
			this.jelm.data('items', this.jitems);
			
			if(this.jitems.length > 2){

				this.istouch = 'ontouchstart' in window;
				
				this.bind();

				this.prepare();
				this.begin();
			}
		},

		start: function (e) {
			e.preventDefault();

			this.pointerStartPos = this.getPointerPos(e);
			this.startTime = this.monitorStartTime = new Date().getTime();

			$(this).stop(true);
			this.endFrame = this.currentFrame = 
								this.currentFrame > 0 ? 
								Math.ceil(this.currentFrame) :
								Math.floor(this.currentFrame);

			this.dragging = true;
			this.moving = false;
		},

		move: function(e){
			if (this.dragging || e.type === 'touchmove') {
				e.preventDefault();
				e.stopPropagation();
			}

			this.trackPointer(e);

			this.moving = true;
		},

		end: function(e){

			if(this.dragging){

				var now = new Date().getTime();

				if(this.startTime + this.options.monitorInt >= now){
					
					var duration = now - this.monitorStartTime;
					if (duration  < this.options.monitorInt && this.options.momentum) {
						
						var deceleration = 0.06,
							dist = (this.displayFrame - this.currentFrame) * this.elmsize,
							speed = Math.abs(dist) / duration,
							newDist = (speed * speed) / (2 * deceleration);

						this.currentFrame = this.displayFrame;
						this.endFrame = this.currentFrame + Math.ceil(newDist / this.elmsize) * (dist > 0 ? 1 : -1);
						
						this.render();
					}
				} else {
					this.currentFrame = this.displayFrame;
					this.endFrame = this.currentFrame;
						
				}

				this.dragging = false;
			}

			if(this.istouch && !this.moving){
				
				e = e.originalEvent || e;

				var	point = e.changedTouches[0] || e,
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
		},

		normalize: function(){
			this.currentFrame = this.currentFrame % this.totalFrames;
			this.displayFrame = this.displayFrame % this.totalFrames;
			this.endFrame = this.endFrame % this.totalFrames;
		},

		next: function(){
			if(this.ready){
				
				this.normalize();

				this.endFrame = ++this.currentFrame;
				this.display(true, this.currentFrame);
			}
		},

		prev: function(){
			if(this.ready){

				this.normalize();

				this.endFrame = --this.currentFrame;
				this.display(true, this.currentFrame);
			}
		},

		hightlight: function(elm){
			if(this.ready){

				if(typeof elm != 'undefined'){
					var idx = $(elm).index();
					
					this.jelm.find('.hightlight').removeClass('hightlight');
					
					this.activeOffset = idx;
					this.jelm.children().eq(this.activeOffset).addClass('hightlight');
				}
			}
		},

		reset: function(){
			if(this.ready){
				
				//remove active class of all items
				this.jitems.removeClass('active hightlight');
				if(this.options.activeFrame >= 0){ //add active frame if it is available
					this.jitems.eq(this.options.activeFrame).addClass('active');
				}

				this.activeOffset = this.options.activeOffset; //should be 2 by default
				this.activeFrame = Math.max(0, this.options.activeFrame);

				this.endFrame = this.activeFrame - this.activeOffset;

				//only add class hightlight if it is available
				if(this.options.activeFrame >= 0){
					this.jelm.children().eq(this.activeOffset).addClass('hightlight');
				}

				this.render();
			}
		},

		active: function(elm){
			if(this.ready){

				var idx = -1;
				
				if(typeof elm != 'undefined'){
					idx = this.jitems.index(elm);
				} else {
					idx = (this.displayFrame + this.activeOffset) % this.totalFrames;

					if(idx < 0){
						idx += this.totalFrames;
					}

					this.currentFrame = idx - this.activeOffset;
				}

				if(idx >= 0){
					this.activeFrame = this.options.activeFrame = idx;
					return this.jitems.removeClass('active').eq(this.activeFrame).addClass('active');
				}
			}

			return false;
		},

		prepare: function(force){
			
			var wndsize = $(window)[this.options.dir == 'horizontal' ? 'width' : 'height'](),
				nitems = this.options.visible,
				elmsize = 0;

			if(!this.options.visible){

				var elmsize = this.jitems.eq(0).prependTo(this.jelm)[this.options.dir == 'horizontal' ? 'outerWidth' : 'outerHeight'](true),
					wndsize = $(window)[this.options.dir == 'horizontal' ? 'width' : 'height'](),
					nitems = this.options.visible ? this.options.visible : Math.floor(wndsize / elmsize),
					padd = (wndsize - (nitems * elmsize)) / 2;
				
				this.jelm.css('margin-' + (this.options.dir == 'horizontal' ? 'left' : 'top'), padd);

			} else {

				elmsize = wndsize / this.options.visible;

			}

			this.jelm.css(this.options.dir == 'horizontal' ? 'width' : 'height', elmsize * nitems);

			this.totalFrames = this.jitems.length;
			if(!this.firsttime){
				this.jitems.detach();
				this.firsttime = true;
			}

			this.visible = nitems;
			this.elmsize = elmsize;
			this.ready = true;

			if(typeof force == 'boolean'){
				this.display(force);
			}
		},
		
		begin: function () {
			
			this.jelm.fadeIn('fast');
			
			//remove active class of all items
			this.jitems.removeClass('active hightlight');
			if(this.options.activeFrame >= 0){ //add active frame if it is available
				this.jitems.eq(this.options.activeFrame).addClass('active');
			}

			this.activeOffset = this.options.activeOffset; //should be 2 by default
			this.activeFrame = Math.max(0, this.options.activeFrame);

			this.endFrame = this.activeFrame - this.activeOffset;

			//only add class hightlight if it is available
			if(this.options.activeFrame >= 0){
				this.jelm.children().eq(this.activeOffset).addClass('hightlight');
			}

			this.display();
			
			this.render();
		},
	
		render: function () {
			if(this.ready && this.currentFrame !== this.endFrame){
				
				this.display();

				$(this).animate({
					currentFrame: this.endFrame
				}, {

					step: function(now){
						this.ready && this.display(true, now);
					},
					duration: 800
				});

			} else {
				$(this).stop(true);
			}
		},

		bind: function(){
			if(!this.ready){
				this.ready = true;

				this.currentFrame = 0;
				this.endFrame = 0;
				
				this.jelm
					.on((this.istouch ? 'touchstart' : 'mousedown') + '.smbthreesixty', $.proxy(this.start, this))
					.on((this.istouch ? 'touchmove' : 'mousemove') + '.smbthreesixty', $.proxy(this.move, this))
					.on((this.istouch ? 'touchend' : 'mouseup') + '.smbthreesixty', $.proxy(this.end, this));
				
				$(document)
					.on('mouseup.smbthreesixty', $.proxy(function (){
					
					this.dragging = false;

				}, this))
					.on('mousemove.smbthreesixty', $.proxy(function (e){
					
					if(this.dragging){
						e.preventDefault();
						this.trackPointer(e);
					}

				}, this));

				$(window).on('resize.smbthreesixty', $.proxy(this.prepare, this));

				this.jelm.on('mousewheel.smbthreesixty', $.proxy(function(e, delta, deltaX, deltaY){
					delta > 0 ? this.prev() : this.next();

					return false;
				}, this));

				this.prepare(true);
			}
		},

		unbind: function(){
			if(this.ready){
				this.ready = false;
				this.jelm.empty().append(this.jitems);

				this.jelm.off('.smbthreesixty');
				$(window).off('.smbthreesixty');
				$(document).off('.smbthreesixty');
			}
		},

		display: function (force, frame) {
			
			if(this.ready || (force && this.visible)){

				if(typeof frame == 'undefined'){
					frame = this.currentFrame;
				}

				frame = frame > 0 ? Math.floor(frame) : Math.ceil(frame);

				if(frame != this.displayFrame){
					
					var	ditems = [],
						idx = 0;

					for (var i = 0, il = Math.min(this.totalFrames, this.visible); i < il; i++){
						idx = (frame + i) % this.totalFrames;
						if(idx < 0){
							idx += (this.totalFrames);
						}

						ditems.push(this.jitems[idx]);
					}

					this.jelm.empty().append(ditems);
					//set highlight class
					$(ditems).removeClass('hightlight').eq([Math.min(this.activeOffset, ditems.length -1)]).addClass('hightlight');
					
					this.displayFrame = frame;
				}
			}
		},
		
		getPointerPos: function (e) {
			e = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0] : e;

			return this.options.dir == 'horizontal' ? e.pageX : e.pageY;
		},
		
		trackPointer: function (e) {
			if (this.ready && this.dragging) {
				
				this.pointerEndPos = this.getPointerPos(e);
				this.pointerDistance = this.pointerEndPos - this.pointerStartPos;
				
				if(Math.abs(this.pointerDistance) >= this.elmsize){
					this.display(true, this.currentFrame - Math.round(this.pointerDistance / this.elmsize));
				}

				if(this.monitorStartTime < new Date().getTime() - this.options.monitorInt) {
					this.monitorStartTime = new Date().getTime();
				}
			}
		}
	};

	$.fn.threesixty = function(option){
		
		var args = null;
		
		if ( typeof option === 'string' ) {
			args = Array.prototype.slice.call( arguments, 1 );
      	}

		return this.each(function () {
			var $this = $(this),
				data = $this.data('threesixty'),
				options = $.extend({}, $.fn.threesixty.defaults, $this.data(), typeof option == 'object' && option);

			if (!data && typeof option == 'object') {
				$this.data('threesixty', (data = new threesixty(this, options)))
			}

			if (typeof option == 'string' && data){
				data[option].apply(data, args)
			}
		});
	};

	$.fn.threesixty.defaults = {
		
		dir: 'horizontal',

		itemSel: '> *',

		framerate: 60,

		momentum: 'ontouchstart' in window,

		monitorInt: 350,

		speedMultiplier: 1,

		activeOffset: 2,

		visible: 12,

		activeFrame: 0
	};

})(jQuery);