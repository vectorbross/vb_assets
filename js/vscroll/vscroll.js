// vscroll.js
(function($){
	'use strict';
    $.vscroll = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("vscroll", base);
        base.n = {};
        
        base.methods = {
            set: function() {
                base.set();
            },
            resize: function() {
                base.calibrate();
                base.set();
            }
        };

        base.init = function(){
            base.options = $.extend({},$.vscroll.defaultOptions, options);
            base.calibrate();
            base.$el.addClass('vscroll');
            if( base.$el.css('position') == 'static' ) {
                base.$el.css('position', 'relative');
            }
            base.n.els = base.$el.children();
            base.n.wrap = $('<div />').css({'overflow': 'hidden', 'position': 'relative'}).addClass('vscroll-wrap').width( base.options.width ).height( base.options.height ).appendTo( base.$el );
            base.n.container = $('<div />').css({'overflow': 'hidden', 'position': 'relative'}).addClass('vscroll-container').width( base.options.width ).height( base.options.height ).appendTo( base.n.wrap );
            base.n.els.appendTo( base.n.container );
            base.n.els.css( {'position': 'absolute', 'top':'0px'} );
            base.options.nrOf = base.n.els.length;
            var mouseHotzone = ($.isNumeric(base.options.mouseHotzone) && base.options.mouseHotzone >=0 && base.options.mouseHotzone <=1 ) ? (1 - base.options.mouseHotzone)/2 : 0;
            base.options.mouseDmzFrom =  0 - mouseHotzone;
            base.options.mouseDmzTo = 0 + mouseHotzone;
            base.options.mouseMargin = (5 - (mouseHotzone*10))/10;
            base.set();
        };

        base.calibrate = function() {
			base.options.width = base.$el.innerWidth()
			base.options.height = base.$el.innerHeight()
        };

        base.set = function() {
        	base.options.totalWidth = 0;
        	var left = 0;
        	for( var i=0; i<base.options.nrOf; i++ ) {
        		var n_el = $(base.n.els[i]);
        		n_el.css('left', base.options.totalWidth );
        		base.options.totalWidth += n_el.width();
        	}
            base.n.wrap.width( base.options.width );
            base.n.container.width( base.options.totalWidth ).css('left', 0 );
            base.options.leftPos = 0;
        	base.options.margin = base.options.totalWidth - base.options.width;
        	if( base.options.margin > 0 ) {
                base.setListener();
        	} else {
                base.unsetListener();
        	}
        };

        base.setListener = function() {
            base.unsetListener();
            base.$el.on('mousemove.vscroll', function(event) { base.mousepos( event ); }); 
            base.$el.on('mouseleave.vscroll', function(){ base.moveStop(); });
        };

        base.unsetListener = function() {
            base.$el.unbind('mousemove.vscroll');
        };

        base.mousepos = function(event ) {
            var offset = base.$el.offset(); 
            var relX = event.pageX - offset.left;
            var percent = relX / base.options.width;
            percent -= 0.5;
            if( percent > base.options.mouseDmzFrom && percent < base.options.mouseDmzTo ) {
                if( base.options.moving ) {
                    base.moveStop();
                }
                return true;
            }
            base.options.moveUp = (percent<0) ? false : true;
            base.options.movePercent = (Math.abs( percent ) - Math.abs( base.options.mouseDmzTo )) / base.options.mouseMargin;
            base.options.movePercent = ( base.options.movePercent > 1 ) ? 1 : (base.options.movePercent<0) ? 0 : base.options.movePercent;
            if( !base.options.moving ) {
                base.moveStart();
            }
        };

        base.moveStart = function() {
            base.options.interval = setInterval(function(){ base.position(); }, base.options.interval );
            base.options.moving = true;
        };

        base.moveStop = function() {
            clearInterval( base.options.interval );
            base.options.moving = false;
        };

        base.position = function() {
            var incr = base.options.moveIncrement * base.options.movePercent;
            var left = base.options.leftPos;
            if( base.options.moveUp ) {
                left -= incr;
                if( left < (base.options.margin-(base.options.margin*2)) ) {
                    left = base.options.margin-(base.options.margin*2);
                }
            } else {
                left += incr;
                if( left > 0 ) {
                    left = 0;
                }
            }
            base.n.container.css('left', left);
            base.options.leftPos = left;
        };

        base.init();
    };
    
    $.vscroll.defaultOptions = {
        mouseHotzone: 0.85,
        moveIncrement: 15,
        interval: 50
    };
    
    $.fn.vscroll = function(options){ 
        var base = this.data("vscroll");
        if ( base ) {
            if( typeof base['methods'][options] == 'function' ) {
                return base['methods'][options].apply( base, Array.prototype.slice.call( arguments, 1 ));
            }
        }
        return this.each( function(){ (new $.vscroll(this, options));} );
    };

})(jQuery);
