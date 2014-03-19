if(!window.jQuery) {
	var jq = document.createElement('script'); 
	jq.type = 'text/javascript';
	jq.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
	// jq.async = false;
	document.getElementsByTagName('head')[0].appendChild(jq);
	console.log("jquery is missing.");

	var checkReady = function(callback) {
		if (window.jQuery) {
			callback(jQuery);
		}
		else {
			window.setTimeout(function() { checkReady(callback); }, 20);
		}
	};

	checkReady(function($) {
		$(function() {
			flp();
		});
	});
}

function flp() {
	$("input").each(function(i,formElement){//add a placeholder to the input
		var label = $("label[for='"+$(this).attr('id')+"']");//element's label
		if(!$(this).attr('placeholder') && $(label).html() ){//if the label exists and there is no placeholder already
			$(this).attr('placeholder', label.html().replace(/(<([^>]+)>)/ig,"") );//wrap label in div.field--wrapper
		}
		$(label).next('input[type=text], input[type=password]').andSelf().wrapAll("<div class='field--wrapper'></div>");
		$(this).insertAfter(label);
	});

	$(function(){//add .on and .show to <label>s
		var onClass = "on";
		var showClass = "show";
		$("input").bind("checkval",function(){
			var label = $(this).prev("label");
			if(this.value !== ""){
				label.addClass(showClass);
			} else {
				label.removeClass(showClass);
			}
		}).on("keyup",function(){
			$(this).trigger("checkval");
		}).on("focus",function(){
			$(this).prev("label").addClass(onClass);
		}).on("blur",function(){
			$(this).prev("label").removeClass(onClass);
		}).trigger("checkval");
	});

	function insertCss(rule){
		var style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = rule;//internet explorer
		} else {
			style.innerHTML = rule;
		}
		document.getElementsByTagName("head")[0].appendChild( style );
	}

	insertCss('label {position:absolute;top:-13px;left:0;font-size:11px;color:#aaa;transition: all 0.1s linear;opacity:0;font-weight:bold;font-family: sans-serif;}');
	insertCss('.field--wrapper {position:relative;margin-bottom:20px;}');
	insertCss('label.on {color:#4481C4;}');
	insertCss('label.show {top:-15px;opacity:1;}');
}