(function($) {
	var version = '1.0.0';
	var settings = { 
		loadSelector: 'img',
		classLoading: 'be_vb_loader-loading',
		classLoaded: 'be_vb_loader-loaded'
	}; 
	
	$.fn.be_vb_loader = function( options ) {
		if ( typeof options == 'object' ) {
			var instanceSettings = $.extend(true, {}, settings , options);
		} else {
			instanceSettings = settings;
		}
		instanceSettings.classLoadingPrivate = 'be_vb_loader-private-loading';
		instanceSettings.classLoadedPrivate = 'be_vb_loader-private-loaded';
		instanceSettings.classItemPrivate = 'be_vb_stickyhighlight-private-item-jd1a2aq1';
		return this.each( function(){ init($(this), instanceSettings); } );
	};
	
	function init( node, settings ) {
		node = $(node);
		node.addClass( settings.classLoading );
		if ( node.is('img') ) {
			var nodes_load = node;
		} else {
			var nodes_load = node.find( settings.loadSelector );
		}
		if ( nodes_load.length > 0 ) {
			nodes_load.addClass( settings.classLoadingPrivate );
			nodes_load.addClass( settings.classLoading );
			if( !jQuery.browser.msie ) {
				nodes_load.one('load', function() { isLoaded( node, settings, this ); } );
			} else {
				nodes_load.each( function(){
					var node_img = $(this);
					if ( this.readyState != 'complete' ) {
						var glue = (node_img.attr( 'src' ).indexOf('?') == -1) ? '?' : '&';
						node_img.attr( 'src', node_img.attr( 'src' ) + glue + 'I-realy-realy-realy-HATE-internet-explorer=' + new Date().getTime() );
						node_img.one('load', function() { isLoaded( node, settings, this ); } );
					} else {
						isLoaded( node, settings, node_img );
					}
				});
			}
			return node;
		}
		isLoaded( node, settings );
		return node;
	};
	
	function isLoaded( node, settings, node_loaded ) {
		node_loaded = $(node_loaded);
		node_loaded.removeClass( settings.classLoadingPrivate );
		node_loaded.removeClass( settings.classLoading );
		node_loaded.addClass( settings.classLoadedPrivate );
		var nodes_loading = node.find( '.' + settings.classLoadingPrivate );
		if ( nodes_loading.length == 0 ) {
			var event = $.Event( 'be_vb_loader-loaded');
			node.trigger( event );
			node.removeClass( settings.classLoading );
		}
	};
	
	function selectItems( node, itemsSelector ) {
		if ( typeof itemsSelector != 'string' ) {
			return node.children();
		}
		return node.children( itemsSelector );
	};
	
	function log() {
		if ( window.console && console.log ) {
			if ( typeof arguments == 'object' ) {
				for (x in arguments) {
					console.log( arguments[x] );
				}
			} else {
				console.log( arguments );
			}
		}
	};
		
})(jQuery);

