(function($) {
	var version = '1.0.1';
	var settings = { 
		// scaleMethod options:
		// 	match: child matches parent
		// 	fill: fill the parent, cut of information of the child
		scaleMethod: 'fill',
		position: { horzintal: 'center', vertical: 'center' },
		sticky: false, // follow the changes of the parent be aware that this will use an interval
		loadImages: true, // load the images you should have a verry verry good reason not to do this
		resetImgSrc: false
	}; 
	
	var methods = {
			scale : function( ) {
				var node = $(this);
				var settings = node.data('be_vb_fillParent-settings' );
				scale( node, settings );
			}
	};
	
	var scaleMethods = {
			// disproportional, follow the width & height of the parent
			match : function ( settings ) {
				var node = $(this);
				var dimParent = getDimension( node.parent() );
				node.width( dimParent.width );
				node.height( dimParent.height );
			},
			// proportional, the node always covers the entire parent 
			fill : function ( settings ) {
				var node = $(this);
				var node_parent = node.parent();
				setToOverflow( node_parent );
				var dimParent = getDimension( node_parent );
				var dimNode = getDimension( node );
				var ratioWidth =  dimParent.width  / dimNode.width;
				var ratioHeight =  dimParent.height  / dimNode.height;
				if ( ratioHeight >= ratioWidth ) {
					node.height( dimParent.height );
					node.width( ruleOf3( dimNode.height, dimParent.height, dimNode.width ) ); 
				} else {
					// log('dimParent.width: ' + dimParent.width );
					// log('dimParent.height: ' + dimParent.height );
					// log('dimNode.width: ' + dimNode.width );
					// log('dimNode.height: ' + dimNode.height );
					// log('ruleOf3( dimNode.width, dimParent.width, dimNode.height ): ' + ruleOf3( dimNode.width, dimParent.width, dimNode.height ) );
					node.width( dimParent.width );
					var h2go = (dimNode.height / dimParent.width) *  
					node.height( ruleOf3( dimNode.width, dimParent.width, dimNode.height ) );
				}
				position( node, settings );
			},
			// proportional, the node always shows completely
			contain : function ( settings ) {
				var node = $(this);
				var node_parent = node.parent();
				var dimParent = getDimension( node_parent );
				var dimNode = getDimension( node );
				var ratioNodeW = dimNode.width / dimNode.height;
				var ratioParentW = dimParent.width / dimParent.height;
				if ( ratioParentW < ratioNodeW ) {
					node.width( dimParent.width );
					node.height( ruleOf3( dimNode.width, dimParent.width, dimNode.height ) );
				} else {
					node.height( dimParent.height );
					node.width( ruleOf3( dimNode.height, dimParent.height, dimNode.width ) );
				}
				position( node, settings );
			}
	};
	
	$.fn.be_vb_fillParent = function( options ) {
		if ( methods[options] ) {
			return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else {
			if ( typeof options == 'object' ) {
				var instanceSettings = $.extend(true, {}, settings , options);
			} else {
				instanceSettings = settings;
			}
			return this.each( function(){ init($(this), instanceSettings); } );
		}
		
	};
	
	function init( node, settings ) {
		node = $(node);
		node.data('be_vb_fillParent-settings', settings );
		if ( !scaleMethods[ settings.scaleMethod ] ) {
			log('[be_vb_fillParent] The scale method ' + settings.scaleMethod + ' does not exist for "' + node[0].tagName + '.' + node.attr('class') + '"');
			return node;
		}
		if ( node.is('img') && settings.loadImages == true ) {
			if( !jQuery.browser.msie ) {
				node.addClass('be_vb_fillParent-loading');
				node.one('load', function() { node.removeClass('be_vb_fillParent-loading'); scale( node, settings ); } );
			} else {
				node.one('load', function() { node.removeClass('be_vb_fillParent-loading'); scale( node, settings ); } );
				/*if ( node[0].readyState != 'complete' ) {
					var glue = (node.attr( 'src' ).indexOf('?') == -1) ? '?' : '&';
					node.attr( 'src', node.attr( 'src' ) + glue + 'D-ie=' + new Date().getTime() );
					node.addClass('be_vb_fillParent-loading');
					
				} else {
					scale( node, settings );
				}*/
			}
		} else {
			scale( node, settings );
		}
		node.data('be_vb_fillParent-settings', settings );
		return node;
	};
	
	function scale( node, settings ) {
		scaleMethods[ settings.scaleMethod ].apply( node, [settings] );
		makeSticky(  node, settings );
	};
	
	function getDimension( node ) {
		var dim = [];
		if ( node.is('img') ) {
			node.css( {'min-width': 'none', 'max-width': 'none', 'min-height': 'none', 'max-height': 'none'} );
			node.width('auto');
			node.height('auto');
		}
		dim.width = node.width(); 
		dim.height = node.height();
		return dim;
	};
	
	function setToOverflow( node ) {
		if ( node.css('overflow') != 'hidden' ) {
			log('[be_vb_fillParent] Node automaticly set to overflow ', node[0] );
			node.css('overflow', 'hidden');
		}
	};
	
	function ruleOf3( fromValue, toValue, changeValue ) {
		return Math.round((changeValue / fromValue) * toValue);
	};
	
	function makeSticky( node, settings ) {
		if ( settings.sticky !== true || node.data('be_vb_fillParent-isSticky') == true ) {
			return false;
		}
		node.data('be_vb_fillParent-isSticky', true);
		node.data('be_vb_fillParent-settings', settings );
		var node_parent = node.parent();
		node_parent.data( 'be_vb_fillParent-width', node_parent.width() );
		node_parent.data( 'be_vb_fillParent-height', node_parent.height() );
		node_parent.bind('styleChange', function() {
			if ( node_parent.width() != node_parent.data( 'be_vb_fillParent-width') || node_parent.height() != node_parent.data( 'be_vb_fillParent-height') ) {
				node_parent.data( 'be_vb_fillParent-width', node_parent.width() );
				node_parent.data( 'be_vb_fillParent-height', node_parent.height() );
				scale( node, settings );
			}
  		});
	};
	
	function position( node, settings ) {
		var node_parent = node.parent();
		if ( typeof settings.position != 'object' || !settings.position.horzintal || !settings.position.vertical ) {
			return false;
		}
		var styleUse = ( node_parent.css('position')=='relative' || node.css('position') == 'absolute' ) ? 'absolute' : 'margin';
		// horizontal
		var left = getPosition( node_parent.width(), node.width(), settings.position.horzintal );
		if ( styleUse == 'absolute' ) {
			node.css('left', left);
		} else {
			node.css('margin-left', left);
		}
		// vertical
		var top = getPosition( node_parent.height(), node.height(), settings.position.vertical );
		if ( styleUse == 'absolute' ) {
			node.css('top', top);
		} else {
			node.css('margin-top', top);
		}
	};
	
	function getPosition( parentPos, childPos, position ) {
		if ( position == 'left' || position == 'top' ) {
			var val = 0;
		} else if ( position == 'right' || position == 'bottom') {
			var val = parentPos-childPos;
		} else {
			var val = (parentPos - childPos)/2;
		}
		return val;
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

