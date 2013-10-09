(function($){
    if(!$.vb_banner){
        $.vb_banner = new Object();
    };
    
    $.vb_banner.esprit = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("vb_banner.esprit", base);
        base.n = {};
        base.info = {};
        base.activeRow = false; 
        base.activeCell = false;
        
        base.init = function(){
            base.options = $.extend({},$.vb_banner.esprit.defaultOptions, options);
            base.setup();
        };
        
        base.setup = function() {
        	base.n.rows = base.$el.find( base.options.row_selector );
        	if( base.n.rows.length < 1 ) { 
        		return false;
        	}
        	base.$el.addClass( base.options.cname );
        	base.n.wrapper = $('<div />').addClass( base.options.cnameWrapper ).prependTo( base.$el );
        	base.n.overview = $('<div />').addClass( base.options.cnameOverview ).appendTo( base.n.wrapper );
        	base.n.content = $('<div />').addClass( base.options.cnameContent ).appendTo( base.n.wrapper );
        	base.n.container = $('<div />').addClass( base.options.cnameContainer ).appendTo( base.n.content );
        	base.n.rows.appendTo( base.n.container );
        	base.info.height = base.$el.height(); 
        	base.setupOverview();
        	base.setupContent();
        	base.goto( 0 );
        };
        
        base.setupOverview = function() {
        	base.n.overviewContainer = $('<ul />').appendTo( base.n.overview );
        	for( var i=0; i<base.n.rows.length; i++ ) {
        		var n_row = $(base.n.rows[i]);
        		n_row.attr('data-vb_banner_esprit-index', i ).addClass('vb_banner_esprit-index'+i);
        		var title = n_row.find( base.options.title_selector );
        		var n = $('<li />').attr('data-vb_banner_esprit-index', i ).html( title.html() ).appendTo( base.n.overviewContainer );
        		n.addClass('vb_banner_esprit-index'+i);
        		n.on( 'mouseenter', function(){
        			var n_this = $(this);
        			base.goto( n_this.attr('data-vb_banner_esprit-index') );
        		});
        	}
        };
        
        base.setupContent = function() {
        	for( var i=0; i<base.n.rows.length; i++ ) {
        		var n_row = $(base.n.rows[i]);
        		n_row.css({'height': base.info.height });
        	}
        };
        
        base.goto = function( index ) {
        	index = parseInt(index);
        	base.n.overview.find('li').removeClass( base.options.cnameActive );
        	base.n.overview.find('li.vb_banner_esprit-index'+index).addClass( base.options.cnameActive );
        	base.n.rows.removeClass( base.options.cnameActive );
        	base.n.container.find('.vb_banner_esprit-index'+index).addClass( base.options.cnameActive );
        	var m_top = 0;
        	if( index > 0 ) {
        		for( var i=1; i<base.n.rows.length; i++ ) {
            		var n = $(base.n.rows[i]);
            		var indexEl = parseInt(n.attr('data-vb_banner_esprit-index'));
            		m_top += n.height() + parseFloat( n.css('margin-top') ) +  parseFloat( n.css('margin-bottom') );
            		if ( indexEl >= index ) {
            			break;
            		}
            	}
        	}
        	m_top = m_top - (m_top*2);
        	base.n.container.stop().animate( {'margin-top': m_top}, base.options.duration, base.options.easing );
        };
        
        base.init();
    };
    
    $.vb_banner.esprit.defaultOptions = {
    	cname: 'vb_banner_esprit',
    	cnameWrapper: 'vb_banner_esprit-wrapper',
    	cnameOverview: 'overview',
    	cnameContent: 'content',
    	cnameContainer: 'container',
    	cnameActive: 'active',
    	row_selector: false,
    	title_selector: false,
    	duration: 750,
    	easing: 'easeOutSine'
    };
    
    $.fn.vb_banner_esprit = function(options){
    	var base = this.data("vb_banner.esprit");
    	if ( base ) {
    		if( typeof base['methods'][options] == 'function' ) {
    			base['methods'][options].apply( base, Array.prototype.slice.call( arguments, 1 ));
    			return false;
    		}
    	}
        return this.each( function(){ (new $.vb_banner.esprit(this, options));} );
    };
    
    
})(jQuery);