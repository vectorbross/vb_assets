(function($){
	'use strict';
    $.stretch = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("stretch", base);
        base.n = {};
        
        base.methods = {
            stretch: function() {
                if( base.$el.hasClass('loading') ) {
                    return ;
                }
                base.resizeBox();
                base.resizeImg();
            }
        };

        base.init = function(){
            base.options = $.extend({},$.stretch.defaultOptions, options);
            base.build();
        };

        base.build = function() {
        	if( base.$el.hasClass('stretch') ) {
        		return false;
        	}
        	base.$el.addClass('stretch');
        	if( !$.isNumeric(parseInt( base.$el.css('z-index') )) ) {
        		base.$el.css('z-index', 0 );
        	}
        	base.n.box = $('<div />').addClass('stretch-box').addClass('loading').css( {'left': 0, 'top': 0, 'overflow': 'hidden', 'margin': 0, 'padding': 0, 'z-index': -999998, 'position': 'relative', 'min-width': 0, 'min-height': 0, 'max-width': '100%', 'max-height': '100%'} ).appendTo(base.$el);
        	base.n.img = $('<img src="' + base.options.src + '" />').addClass('stretch-img').css('display', 'none').one('load', function(){ base.imgLoaded(); }).each(function(){ if( this.complete ) $(this).trigger('load'); }).appendTo( base.n.box );
        	base.resizeBox();
        };

        base.imgLoaded = function() {
        	base.resizeBox();
        	base.n.box.removeClass('loading').addClass('loaded');
        	base.n.img.css({ 'display': 'block', 'position': 'absolute', 'margin': 0, 'padding': 0, 'border': 'none', 'max-height': 'none', 'max-width': 'none', 'z-index': -999999 });
        	base.options.imgWidth = base.n.img.width();
        	base.options.imgHeight = base.n.img.height();
        	base.resizeImg();
        };

        base.resizeBox = function() {
            base.options.boxWidth = base.$el.innerWidth();
            base.options.boxHeight = base.$el.innerHeight();
        	base.n.box.width( base.options.boxWidth );
        	base.n.box.height( base.options.boxHeight );
        };

        base.resizeImg = function() {
        	var ratioWidth = base.options.boxWidth / base.options.imgWidth;
        	var ratioHeight = base.options.boxHeight / base.options.imgHeight;
        	if ( ratioHeight >= ratioWidth ) {
        		base.options.imgCurrWidth = base.ruleOf3( base.options.imgHeight, base.options.boxHeight, base.options.imgWidth );
        		base.options.imgCurrHeight = base.options.boxHeight;
        	} else {
        		base.options.imgCurrWidth = base.options.boxWidth;
        		base.options.imgCurrHeight = base.ruleOf3( base.options.imgWidth, base.options.boxWidth, base.options.imgHeight );
        	}
        	base.n.img.width( base.options.imgCurrWidth ).height( base.options.imgCurrHeight );
        	base.positionImg();
        };

        base.positionImg = function() {
        	if( base.options.imgCurrWidth > base.options.boxWidth ) {
        		var hcenter = 1 - base.options.hcenter;
        		var margin = base.options.imgCurrWidth - base.options.boxWidth;
        		var left = (margin * hcenter ) - margin;
        		base.n.img.css('left', left);
        	} else if( base.options.imgCurrWidth < base.options.boxWidth ) {
        		var vcenter = 1 - base.options.vcenter;
        		var margin = base.options.imgCurrHeight - base.options.boxHeight;
                console.log( margin );
        		var top = (margin * vcenter) - margin;
        		base.n.img.css('top', top);
        	} else {
                base.n.img.css({'top': 0, 'left': 0});
            }
        };

        base.ruleOf3 = function( fromValue, toValue, changeValue ) {
			return Math.round((changeValue / fromValue) * toValue);
		};

        base.init();
    };
    
    $.stretch.defaultOptions = {
    	src: false,
    	hcenter: 1, 
    	vcenter: 0.5
    };
    
    $.fn.stretch = function(options){ 
        var base = this.data("stretch");
        if ( base ) {
            if( typeof base['methods'][options] == 'function' ) {
                return base['methods'][options].apply( base, Array.prototype.slice.call( arguments, 1 ));
            }
        }
        return this.each( function(){ (new $.stretch(this, options));} );
    };

})(jQuery);