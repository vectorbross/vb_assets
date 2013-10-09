function be_vb_device() {
	if( /ipad/i.test(navigator.userAgent.toLowerCase()) ) {
		return 'ipad';
	} else if( /iphone/i.test(navigator.userAgent.toLowerCase()) ) {
		return 'iphone';
	} else if( /ipod/i.test(navigator.userAgent.toLowerCase()) ) {
		return 'ipod';
	} else if( /android/i.test(navigator.userAgent.toLowerCase()) ) {
		return 'android';
	} else if( /blackberry/i.test(navigator.userAgent.toLowerCase()) ) {
		return 'blackberry';
	} else if( /windows phone/i.test(navigator.userAgent.toLowerCase()) ) {
		return 'windowsphone';
	} else if( /webos/i.test(navigator.userAgent.toLowerCase()) ) {
		return 'webos';
	} else {
		return 'computer';
	}
}
/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

if( typeof console == 'undefined' ) {
	var console = {	log: function( ) {}	};
}

var be_vb_url = {
		
	glue: function( url ) {
		if ( typeof url != 'string' ) {
			return false;
		}
		return ( url.indexOf('?') == -1 ) ? '?' : '&';
	},

	addFied: function( url, mixed, value ) {
		if ( typeof url != 'string' ) {
			return false;
		}
		if( typeof mixed == 'string' ) {
			return url + be_vb_url.glue( url ) + mixed + '=' + encodeURIComponent(value);
		}
		if( typeof mixed == 'object' ) {
			var glue = be_vb_url.glue( url );
			for( var key in mixed ) {
				var valueField = mixed[key];
				if( typeof valueField != 'string' ) {
					continue;
				}
				url += glue + key + '=' + encodeURIComponent(valueField);
				glue = '&';
			}
			return url;
		}
		return false;
	},
	
	setParam: function( url, mixed, value) {
		var oUrl = be_vb_url.splitUrl( url );
		if ( !oUrl ) {
			return false;
		} 
		if ( typeof mixed == 'string' ) {
			oUrl.param[mixed] = value;
		} else if( typeof mixed == 'object' ) {
			for( var key in mixed ) {
				var valueParam = mixed[key];
				oUrl.param[key] = valueParam;
			}
		} else {
			return false;
		}
		var returnUrl = oUrl.url ;
		var glue = '?';
		for( var key in oUrl.param ) {
			returnUrl += glue + key + '=' + encodeURIComponent(oUrl.param[key]);
			glue = '&';
		}
		return returnUrl;
	},
	
	splitUrl: function( url ) {
		if ( typeof url != 'string' ) {
			return false;
		}
		var returnObject = {};
		var aUrl = url.split('?');
		returnObject.url = aUrl[0];
		returnObject.param = {};
		var qs = aUrl[1];
		var oQs = {};
		if ( qs != undefined ) {
			var aQs = qs.split('&');
			for( var i=0; i<aQs.length; i++ ) {
				var aParam = aQs[i].split('=');
				returnObject.param[ aParam[0] ] = aParam[1];
			}
		}
		return returnObject;
	},
	
	get: function( name, url ) {
		if( url == undefined ) {
			url = window.location.href;
		}
		var oUrl = be_vb_url.splitUrl( url );
		return ( oUrl.param[ name ] == undefined ) ? undefined : decodeURIComponent(oUrl.param[ name ]);
	},

	getFilename: function( url ){
		if( url == undefined ) {
			url = window.location.pathname;
		}
		var filename = url.substring(url.lastIndexOf('/')+1);
		return filename;
	}
	
}

var be_vb_drupal = {
		
	loadView: function( n, o ) {
		var data = [];
		var row_selector = ( o.row_selector ) ? o.row_selector : '> .view-content > .views-row';
		var field_selector = ( o.field_selector ) ? o.field_selector : '> .views-field';
		var ns_row = n.find( row_selector );
		cb = ( o.cb != undefined && typeof o.cb == 'function' ) ? o.cb : false;
		for( var j=0; j<ns_row.length; j++) {
			var ns_field = $(ns_row[j]).find( field_selector );
			var o = {};
			for( var i=0; i<ns_field.length; i++) {
				var n_field = $(ns_field[i]);
				var value = n_field[0].cloneNode(true);
				var name = ( n_field.attr('data-name').length > 0 ) ?  n_field.attr('data-name') : n_field.attr('class');
				o[name] = value;
			}
			if ( cb != false ) {
				var returnedData = cb( obj );
				o = ( returnedData !== undefined ) ? returnedData : o;
			}
			data.push( o );
		}
		return data;
	},
	
	uniqueKey: function( key, object ) {
		if ( typeof object !== 'object' ) {
			return key;
		}
		if ( object[key] === undefined ) {
			return key;
		}
		return key + '_1';
	},
	
	server: function( key ) {
		if( typeof key != 'string' ) {
			return null;
		}
		var selector = 'div#server-info div#' + key;
		var node = $(selector);
		if( node.length !== 1 ) {
			return null;
		}
		return node.text();
	}
			
};

be_vb_drupal.timeField = {
  		
  		toCansasCityShuffle: function( node_field, node_container, colorScheme, layout ) {
  			var nodes_days = node_field.children('div');
  			var data = [];
  			var rowNr = 0;
  			var minHour = false;
  			var maxHour = false;
  			nodes_days.each(function(){
  				var node_day = $(this);
  				data[ rowNr ] = [];
  				var nodes_row = node_day.children('div');
  				nodes_row.each(function(){
  					var node_row = $(this);
  					var open = node_row.find('span.open').text();
  					var openHour = be_vb_drupal.timeField.hourToInt( open );
  					var close = node_row.find('span.close').text();
  					var closeHour = be_vb_drupal.timeField.hourToInt( close );
  					if( minHour == false || openHour.numeric < minHour ) {
  						minHour = openHour.numeric;
  					}
  					if( maxHour == false || closeHour.numeric > maxHour ) {
  						maxHour = closeHour.numeric;
  					}
  					data[ rowNr ].push( {start: openHour.numeric, stop: closeHour.numeric} );
  				});
  				rowNr += 1;
  			});
  			// setup config
  			var config = {};
  			config.rows = [ {'label':'M'}, {'label':'D'}, {'label':'W'}, {'label':'D'}, {'label':'V'}, {'label':'Z'}, {'label':'Z'} ];
  	  		config.columns = [];
  			var colStart = Math.floor( minHour - 1);
  			var colStop = Math.ceil( maxHour );
  			for( var i=colStart; i<=colStop; i++ ) {
  				var lbl = (String(i).length < 2) ? '0'+i  : i;
  				config.columns.push( {'label': lbl + '.'} );
  			}
  			// data 
  			config.data = [];
  			for( var i=0; i<data.length; i++ ) {
  				if( data[i].length < 1 ) {
  					continue;
  				}
  				for( var j=0; j<data[i].length; j++ ) {
  					var start = data[i][j].start - colStart;
  					var stop = data[i][j].stop - colStart - 1;
  					if( stop - Math.floor(stop) > 0 ) {
  						stop += 1;
  					}
  					var col = {'start':start, 'stop':stop};
  					config.data.push( {'row': i, col: col  } );
  				}
  				// 
  			}
  			// build element
  	  		config.selectable = false;
  	  		config.hoverable = false;
  	  		config.colorScheme = colorScheme;
  	  		config.layout = layout;
  	  		node_container.be_vb_cansasCityShuffle( config );
  		},
  		
  		toCansasCityShuffleSelector: function( node_field, node_container, node_data, colorScheme, layout ) {
  	  		// load data
  			var nodes_days = node_field.children('div');
  			var rowNr = 0;
  			var minHour = false;
  			var maxHour = false;
  			var data = [];
  			nodes_days.each(function(){
  				var node_day = $(this);
  				var nodes_row = node_day.children('div');
  				nodes_row.each(function(){
  					var node_row = $(this);
  					var open = node_row.find('span.open').text();
  					var openHour = be_vb_drupal.timeField.hourToInt( open );
  					var close = node_row.find('span.close').text();
  					var closeHour = be_vb_drupal.timeField.hourToInt( close );
  					if( minHour == false || openHour.numeric < minHour ) {
  						minHour = openHour.numeric;
  					}
  					if( maxHour == false || closeHour.numeric > maxHour ) {
  						maxHour = closeHour.numeric;
  					}
  					data.push( {row: rowNr, start:Math.ceil(openHour.numeric), stop: Math.floor(closeHour.numeric)})
  				});
  				rowNr += 1;
  			});
  			// ini config
  			var config = {};
  			config.rows = [ {'label':'M','name':'Monday'}, {'label':'D','name':'Tuesday'}, {'label':'W','name':'Wednesday'}, {'label':'D','name':'Thursday'}, {'label':'V','name':'Friday'}, {'label':'Z','name':'Saturday'}, {'label':'Z','name':'Sunday'} ];
  	  		config.columns = [];
  			var colStart = Math.ceil( minHour - 1);
  			var colStop = Math.floor( maxHour );
  			for( var i=colStart; i<=colStop; i++ ) {
  				var lbl = (String(i).length < 2) ? '0'+i  : i;
  				config.columns.push( {'label': lbl + '.', 'name':lbl+'h.'} );
  			}
  	  		config.enabled = [];
  	  		for( var i=0; i<data.length; i++ ) {
  	  			for( var j=data[i].start; j<data[i].stop; j++ ) {
  	  				config.enabled.push( {'row': data[i].row, 'col': j-colStart} );
  	  			}
  	  		}
  	  		config.colorScheme =  colorScheme;
	  		config.layout = layout;
	  		node_container.be_vb_cansasCityShuffle( config );
	  		node_container.on('be_vb_cansasCityShuffle-change', function(event, data) {
  	  	  		var dataPr = '';
  	  	  		var glue = "";
  	  	  		for( var i=0; i<data.length; i++ ) {
  	  	  			dataPr += glue + data[i].rowLbl + ': ' + data[i].colLbl;
  	  	  			glue = "\n"; 
  	  	  		}
  	  	  		node_data.val( dataPr );
  	  	  	});
  		},
  		
  		hourToInt: function( hour ) {
  			var aHour =  hour.split(':');
  			var hourInt = parseInt(aHour[0]);
  			var minInt = parseInt(aHour[1]) / 0.6 ;
  			return {hour: hourInt, min: minInt, numeric: hourInt + (minInt/100)};
  		}
  			
  	}


var be_vb_events = { 
	
	event: function( category, action, spec ) {
		category = be_vb_events.textPlain( category );
		action = be_vb_events.textPlain( action );
		var specs = false;
		if( typeof spec == 'string' && spec.length > 0 ) {
			specs = be_vb_events.textPlain( spec );
		} else if ( typeof spec == 'object' ) {
			var specsGlue = '';
			specs = '';
			for( var key in spec ) {
				specs += specsGlue + be_vb_events.textPlain(key) + ':' + be_vb_events.textPlain(spec[key]);
				specsGlue = ',';
			}
		}
		if( specs !== false ) {
			action = action + '[' + specs + ']';
		}
		console.log("%c Event called \n\t category: " + category + " \n\t action: " + action + " ", 'color: green');
		if( typeof _gaq !== 'undefined' ) {
			_gaq.push(['_trackEvent', category, action]);
		} else {
			console.log('%c WARNING: gaq is not defined ', 'background: #222; color: red');
		}
	},
	
	textPlain: function( text ) {
		if( typeof text !== 'string' ) {
			return text;
		}
		text = text.replace(/[ ]{1,}/g,"_").replace(/[^a-zA-Z\d\._\/:]/g, '').replace(/(\r\n|\n|\r)/gm,"").toLowerCase();
		return text;
		// category = category.replace(/\W/g, '').replace(/ {1,}/g,"_").toLowerCase();
	}

};


function objectKeys( obj ) {
	var keys = [];
	for(var k in obj) {
		keys.push(k);
	}
	return keys
}



















