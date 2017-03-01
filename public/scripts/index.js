// NAVBAR ANIMATION
var navbar = {
	brand: document.querySelector(".brand h2"),
	brandContent: document.querySelectorAll(".brand h2 i"),
	isStart: false,
	brandFadeOut: function(i, delayTime) {
			setTimeout(function(){
			navbar.brandContent[i].classList.add("brand_fadeout");
		}, delayTime);
	},
	brandFadeIn: function(i, delayTime) {
			setTimeout(function(){
			navbar.brandContent[i].classList.add("brand_fadein");
		}, delayTime);
	},
	brandAnimation: function(){
		for(var i = 0; i < navbar.brandContent.length; i++){
			var delayTime = i * 400;
			navbar.brandFadeOut(i, delayTime);	
		}

		for(var j = 0; j < navbar.brandContent.length; j++){
			var delayTime = 1200 + j * 400;
			navbar.brandFadeIn(j, delayTime);	
		}

		setTimeout(function(){
			for(var i = 0; i < navbar.brandContent.length; i++){
				navbar.brandContent[i].classList.remove("brand_fadeout");
				navbar.brandContent[i].classList.remove("brand_fadein");
			}	
			navbar.isStart = false;
		}, 5600)
	}
};

navbar.brand.addEventListener("mouseover", function(){
		if(navbar.isStart === false){
			navbar.isStart = !navbar.isStart;
			navbar.brandAnimation();
		}
		
});

//ABOUT PAGE IN MOBILE SIZE - TOGGLE CONTENT - ref: http://stackoverflow.com/questions/3795481/javascript-slidedown-without-jquery

/*Get height of element with display:none*/
var getElHeight = function(el) {
	var elStyle = window.getComputedStyle(el),
		elDisplay = elStyle.display,
		elMaxHeight  = elStyle.maxHeight.replace("px", "").replace("%", ""),
		wantedHeight = 0;

	// if element not hidden, return normal height
	// !!! typeof(elMaxHeight) => "string" (origin: xxx px(string) ->after .replace 'px' with '': xxx (still string))
	if(elDisplay !== "none" && Number(elMaxHeight) !== 0) {
		wantedHeight = el.offsetHeight;
		return wantedHeight;
	} else {
		//if el hidden -> make it display:block in order to measure its height
		el.style.display    = "block";
		
		wantedHeight = el.offsetHeight;
	}

	//revert to original value
	el.style.display = elDisplay;

	return wantedHeight;
};
/*toggle logic*/
	//set data-max-height = wantedHeight when display:block
	//if data-max-height exists -> toggle max-height between data-max-height and 0-height
var toggleContent = function(el) {
		//set up data-max-height attribute
        var el_max_height = 0;
        if(!el.getAttribute("data-max-height")){
			el_max_height                  = getElHeight(el) + 'px';
			el.setAttribute('data-max-height', el_max_height);
			el.style.overflowY             = 'hidden';  //make text hidden to avoid text overflow when max-height=0
			el.style.maxHeight             = '0';       // caution: typeof(el.style.maxHeight) = string
			el.style.display               = 'block';   // default value: {display: none}
        }

		//already set up "data-max-height" attribute
		if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
		    el.style.maxHeight = el.getAttribute('data-max-height');
		} else {
		    el.style.maxHeight = '0';
		}
    };

/*execute*/

// var toggleButton = document.querySelectorAll("div.container h1");
// var toggleText   = document.querySelectorAll(".text");
// for(var i = 0; i < toggleButton.length; i++){
// 	toggleButton[i].addEventListener("click", function(){
// 		toggleContent(toggleText[i]);  // ==> Common for-loop mistake: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Creating_closures_in_loops_A_common_mistake
// 		                               //toggleText[i] will always the the last one(i.e. toggleText[7]) because iteration has already done & i became 7(last one)
// 									   //need closure to create a new lexical environment to memorize i for every iteration of for-loop
// 									   // or use 'let' keyword
// 	});
// }

var toggleButton = document.querySelectorAll("div.container h1");
// var toggleText   = document.querySelectorAll(".text");
for(var i = 0; i < toggleButton.length; i++){
	let toggleText = document.querySelectorAll(".text")[i];

	toggleButton[i].addEventListener("click", function(){
		if(checkWindowWidth()){
			toggleContent(toggleText);
		}else {
			toggleText.style.maxHeight = el.getAttribute("data-max-height"); //avoid that user can't toggle and see the content after user close text and resize window.innerWidth from <580px to >580px
		}
	});
}

function checkWindowWidth(){
	var windowWidth = window.innerWidth;
	if(windowWidth < 580) {
		return true;
	}else {
		return false;
	}
}

