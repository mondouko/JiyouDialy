$(document).on("click","#adding",function(){
	$(this).before('<div class = "ingredients"><p>食品名</p><input class = "ingname" type = "text" placeholder = "食品名　例｜かんぴょう"><p>摂取量(g)</p><input type = "text"><span class = "weight">g</span></div>');	
})
