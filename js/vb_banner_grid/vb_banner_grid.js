(function($){
    if(!$.vb_banner){
        $.vb_banner = new Object();
    };
    
    $.vb_banner.grid = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("vb_banner.grid", base);
        base.n = {};
        base.info = {};
        base.activeRow = false; 
        base.activeCell = false;
        
        base.init = function(){
            base.options = $.extend({},$.vb_banner.grid.defaultOptions, options);
            base.setup();
        };
        
        base.setup = function() {
        	base.$el.addClass( base.options.cname );
        	base.n.container = $('<div />').addClass('vb_banner_grid-container').css({'position': 'relative'}).prependTo( base.$el );
        	base.n.rows = base.$el.find( base.options.row_selector );
        	base.n.rows.appendTo( base.n.container );
        	base.n.rows.addClass(base.options.cnameDefault);
        	base.info.cells = base.n.rows.length;
        	base.info.rows = Math.ceil(base.info.cells / base.options.cells);
        	base.info.width = base.n.container.width();
        	base.info.cellWidth = base.info.width / base.options.cells;
        	base.info.cellHeight = base.info.cellWidth;
        	base.info.height = base.info.cellHeight * base.info.rows;
        	base.n.container.css( {'height': base.info.height, 'width': base.info.width});
        	base.animSetup();
        	var row = 1;
        	var cell = 1;
        	for( var i=0; i<base.n.rows.length; i++ ) {
        		var n_row = $(base.n.rows[i]);
        		base.rowSetup( n_row, row, cell );
        		if( cell == base.options.cells ) {
        			cell = 0;
        			row ++;
        		}
        		cell ++ ;
        	}
        };
        
        base.animSetup = function() {
        	base.n.animWrap = $('<div />').css( {'border': '1px solid white', 'background': 'black', 'width': 100, 'display': 'none'} ).appendTo( base.$el );
        	base.n.anim = $('<div />').css({'background': 'white', 'width': 25, 'height': 5}).appendTo( base.n.animWrap );
        };
        
        base.rowSetup = function( n, row, cell ) {
        	var dim = {};
        	dim.ini = {}; // initial dimension
        	dim.from = {}; // from dimension animation
        	dim.curr = {}; // current dimension
        	dim.to = {};  // to dimension
        	dim.ini.width = base.info.cellWidth - parseFloat(n.css('margin-left')) - parseFloat(n.css('margin-right'));
        	dim.ini.height = base.info.cellHeight - parseFloat(n.css('margin-top')) - parseFloat(n.css('margin-bottom'));
        	dim.ini.left = (cell - 1) * base.info.cellWidth;  
        	dim.ini.top = (row - 1) * base.info.cellHeight;  
        	dim.from = $.extend(true, {}, dim.ini);
        	dim.curr = $.extend(true, {}, dim.ini);
    		n.css( {'position': 'absolute', 'width': dim.ini.width, 'height': dim.ini.height, 'left': dim.ini.left, 'top': dim.ini.top });
    		n.attr( {'data-vb_banner_grid-row': row, 'data-vb_banner_grid-cell': cell} );
    		n.addClass( 'vb_banner_grid_row_' + row + ' vb_banner_grid_cell' + cell );
    		n.data( 'dim', dim );
    		n.click( function(){
    			var n_this = $(this);
    			base.rowActivate( n_this.attr('data-vb_banner_grid-row'), n_this.attr('data-vb_banner_grid-cell') );
    		});
        };
        
        base.rowActivate = function( activeRow, activeCell ) {
        	if( base.isActive( activeRow, activeCell ) ) {
        		base.rowDefault();
        		return false;
        	}
        	base.activeRow = activeRow; 
            base.activeCell = activeCell;
        	var regularWidth = base.info.cellWidth;
        	var activeWidth = base.info.cellWidth * base.options.margin;
        	var inactiveWidth = (base.info.width - activeWidth) / ( base.options.cells-1);
        	if ( inactiveWidth < base.options.minWidth ) {
        		inactiveWidth = base.options.minWidth;
        		activeWidth = base.info.width - ((base.info.cells-1)*inactiveWidth);
        	}
        	var activeHeight = base.info.cellHeight * base.options.margin;
        	var inactiveHeight = (base.info.height - activeHeight) / ( base.info.rows-1);
        	if( inactiveHeight < base.options.minHeight) {
        		inactiveHeight = base.options.minHeight;
        		activeHeight = base.info.height - (( base.info.rows-1) * inactiveHeight); 
        	}
        	var l = 0;
        	var t = 0;
        	for( var i=0; i<base.n.rows.length; i++ ) {
        		var n = $( base.n.rows[i] );
        		n.addClass( base.options.cnameAnim );
        		var dim = n.data('dim');
        		var row = parseInt(n.attr('data-vb_banner_grid-row')); 
        		var cell = parseInt(n.attr('data-vb_banner_grid-cell'));
        		var w = regularWidth;
        		var h = inactiveHeight;
        		if( row == activeRow ) {
        			w = ( cell == activeCell ) ? activeWidth : inactiveWidth;
        			h = activeHeight;
        		}
        		// cnameInactive cnameActive
        		if( cell == 1 ) {
        			l = 0;
        		}
        		dim.to.width = w - parseFloat(n.css('margin-left')) - parseFloat(n.css('margin-right'));
        		dim.to.left = l;
        		dim.to.top = t;
        		dim.to.height = h - parseFloat(n.css('margin-top')) - parseFloat(n.css('margin-bottom'));
        		dim.from = $.extend(true, {}, dim.curr);
        		n.data( 'dim', dim );
        		l += w;
        		t += ( cell == base.options.cells ) ? h : 0; 
        	}
        	base.anim();
        };
        
        base.rowDefault = function( ) {
        	base.activeRow = false; 
            base.activeCell = false;
        	for( var i=0; i<base.n.rows.length; i++ ) {
        		var n = $( base.n.rows[i] );
        		n.addClass( base.options.cnameAnim );
        		var dim = n.data('dim');
        		dim.to = $.extend(true, {}, dim.ini);
        		dim.from = $.extend(true, {}, dim.curr);
        		n.data('dim', dim);
        	}
        	base.anim();
        };
        
        base.isActive = function( row, cell ) {
        	var n_act = base.$el.find('.vb_banner_grid_row_' + row + '.vb_banner_grid_cell' + cell);
        	return ( n_act.hasClass(base.options.cnameActive) ) ? true : false;  
        };
        
        base.anim = function() {
        	var step = function( val ) {
        		base.anim_step( val );
        	};
        	var completed = function() {
        		base.anim_complete();
        	};
    		var duration = base.options.duration;
    		var easing = base.options.easing;
    		base.n.anim.stop().width(0).animate( {width: 100}, {easing: easing, duration: duration, step:step, complete: completed} );
        };
        
        base.anim_step = function( val ) {
        	for( var i=0; i<base.n.rows.length; i++ ) {
        		var n = $(base.n.rows[i]);
        		var dim = n.data('dim');
        		dim.curr.width = dim.from.width + ((( dim.to.width-dim.from.width ) / 100) * val) ;
        		dim.curr.left = dim.from.left + ((dim.to.left - dim.from.left) / 100)*val;
        		dim.curr.height = dim.from.height + ((dim.to.height - dim.from.height) / 100)*val;
        		dim.curr.top = dim.from.top + ((dim.to.top - dim.from.top) / 100)*val;
        		n.css( dim.curr );
        		n.data('dim', dim);
        		// event
        		var event = $.Event( 'vb_banner.grid.step' );
        		base.$el.trigger( event, {n: n, percent: val} );
        	}
        };
        
        base.anim_complete = function() {
        	for( var i=0; i<base.n.rows.length; i++ ) {
        		var n = $( base.n.rows[i] );
        		n.removeClass( base.options.cnameAnim );
        		if( base.activeRow == false && base.activeCell == false ) {
        			n.removeClass( base.options.cnameInactive + ' ' + base.options.cnameActive );
        			n.addClass( base.options.cnameDefault );
        		} else {
        			var row = parseInt(n.attr('data-vb_banner_grid-row')); 
        			var cell = parseInt(n.attr('data-vb_banner_grid-cell'));
        			if( row == base.activeRow && base.activeCell == cell ) {
        				n.addClass( base.options.cnameActive );
        				n.removeClass( base.options.cnameInactive + ' ' + base.options.cnameDefault );
        			} else {
        				n.removeClass( base.options.cnameActive );
        				n.addClass( base.options.cnameInactive + ' ' + base.options.cnameDefault );
        			}
        		}
        		var event = $.Event( 'vb_banner.grid.complete' );
        		base.$el.trigger( event, {n: n} );
        	}
        };
        
        base.init();
    };
    
    $.vb_banner.grid.defaultOptions = {
    	cells: 3,
    	margin: 2,
    	cname: 'vb_banner_grid', 
    	cnameDefault: 'vb_banner_grid-default', 
    	cnameInactive: 'vb_banner_grid-inactive', 
    	cnameActive: 'vb_banner_grid-active',
    	cnameAnim: 'vb_banner_grid-anim',
    	duration: 1000,
    	easing: 'easeInOutBack', // easeOutCirc,
    	minWidth: 150,
    	minHeight: 150
    };
    
    $.fn.vb_banner_grid = function(options){
    	var base = this.data("vb_banner.grid");
    	if ( base ) {
    		if( typeof base['methods'][options] == 'function' ) {
    			base['methods'][options].apply( base, Array.prototype.slice.call( arguments, 1 ));
    			return false;
    		}
    	}
        return this.each( function(){ (new $.vb_banner.grid(this, options));} );
    };
    
    
})(jQuery);