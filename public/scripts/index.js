// NAVBAR ANIMATION
var navbar = {
	bar: document.querySelector("nav.container"),
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
//INDEX PAGE - HIDDEN BAR

/* scroll to top button */
var hiddenNav = {
	bar: document.querySelector("#hidden_nav"),
	toTopBtn: document.querySelector(".fa-arrow-circle-up")
};

hiddenNav.toTopBtn.addEventListener("click", function(){
	window.scrollTo(0, 0);
});

/* show hidden nav when scroll down */

window.onscroll = function(){
	if(checkWindowWidth()){
		if(document.body.scrollTop > 1||document.documentElement.scrollTop > 1) {
			hiddenNav.bar.style.top = "0";
			navbar.bar.style.display = "none";
		}else {
			hiddenNav.bar.style.top = "-29px";
			navbar.bar.style.display = "block";
		}
	}else {
		hiddenNav.bar.style.display = "-29px";
		navbar.bar.style.display = "block";
	}
	
}


//ABOUT PAGE IN MOBILE SIZE - TOGGLE CONTENT

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
			el.style.maxHeight             = '0';       
			el.style.display               = 'block';   
        }

		//already set up "data-max-height" attribute
		if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
		    el.style.maxHeight = el.getAttribute('data-max-height');
		} else {
		    el.style.maxHeight = '0';
		}
    };

/*execute*/
var toggleButton = document.querySelectorAll("div.container h1");
// var toggleText   = document.querySelectorAll(".text");
for(var i = 0; i < toggleButton.length; i++){
	let toggleText = document.querySelectorAll(".text")[i];

	toggleButton[i].addEventListener("click", function(){
		if(checkWindowWidth()){
			toggleContent(toggleText);
		}else {
			toggleText.style.maxHeight = toggleText.offsetHeight; //avoid that user can't toggle and see the content after user close text and resize window.innerWidth from <580px to >580px
		}
	});
}

function checkWindowWidth(){
	var windowWidth = window.innerWidth;
	if(windowWidth < 644) {
		return true;
	}else {
		return false;
	}
}

// handle tab in textarea 
function insertAtCursor(myValue) {
	myField = document.getElementById("textarea");
	//IE support
	if (document.selection) {
	    myField.focus();
	    sel = document.selection.createRange();
	    sel.text = myValue;
	}
	//MOZILLA and others
	else if (myField.selectionStart || myField.selectionStart == '0') {
	    var startPos = myField.selectionStart;
	    var endPos = myField.selectionEnd;
	    myField.value = myField.value.substring(0, startPos)
	        + myValue
	        + myField.value.substring(endPos, myField.value.length);  // if lack of this line of code, when insert value into sentence, the sentence behind insert value will be cut off.
	        myField.selectionStart = startPos + myValue.length;
	        myField.selectionEnd = startPos + myValue.length;
	} else {
	    myField.value += myValue;
	}
}

document.getElementById('textarea').onkeydown = function(e){
	if (e.keyCode == 9) {   //keycode of 'tab': 9
                e.preventDefault();    
                insertAtCursor('    '); 
	}
}

// Check User if he/she really wants to delete the post 
function checkDelete() {
	return confirm("Are you sure?");
}