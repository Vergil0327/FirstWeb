var brand = document.querySelector(".brand h2");
var brandContent = document.querySelectorAll(".brand h2 i");	
var isStart = false;
brand.addEventListener("mouseover", function(){
		if(isStart === false){
			isStart = !isStart;
			brandAnimation();
		}
		
});

function brandAnimation(){
	for(var i = 0; i < brandContent.length; i++){
		var delayTime = i * 400;
		brandFadeOut(i, delayTime);	
	}

	for(var j = 0; j < brandContent.length; j++){
		var delayTime = 1200 + j * 400;
		brandFadeIn(j, delayTime);	
	}

	setTimeout(function(){
		for(var k = 0; k < brandContent.length; k++){
			brandContent[k].classList.remove("brand_fadeout");
			brandContent[k].classList.remove("brand_fadein");
		}	
		isStart = false;
	}, 5600)
}

function brandFadeOut(i, delayTime) {
	setTimeout(function(){
		brandContent[i].classList.add("brand_fadeout");
	}, delayTime);
}

function brandFadeIn(i, delayTime) {
	setTimeout(function(){
		brandContent[i].classList.add("brand_fadein");
	}, delayTime);
}

	