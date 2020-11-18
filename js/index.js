$(document).on("click","#adding",function(){
	$(this).before('<div class = "ingredients"><p>食品名</p><input class = "ingname" type = "text"><br><p>分類</p><select id = "fkind" name = "fkind"><option value = "0">乳・乳製品</option><option value = "1">卵</option><option value = "2">魚介・肉</option><option value = "3">豆・豆製品</option><option value = "4">野菜</option><option value = "5">いも類</option><option value = "6">果物</option><option value = "7">穀類</option><option value = "8">油脂</option><option value = "9">砂糖</option></select><p>使用量(g)</p><input  class = "weight" type = "text"><span>g</span></div>');	
});

var bld = ["朝食","昼食","夕食","間食"];
var bldclass = ["breakfast","lunch","dinner","snak"];
var fsm = ["250,30,60,40,180,50,100,110,5,3","250,30,60,60,240,60,150,170,10,5","300,50,80,60,270,60,150,200,10,10","330,50,120,80,300,60,200,240,15,10","350,50,140,80,350,100,200,300,20,10","400,50,160,100,350,100,200,360,25,10","400,50,160,100,350,100,200,420,30,10","300,50,140,80,350,100,200,400,30,10","250,50,140,80,350,100,200,400,30,10","250,50,140,80,350,100,200,400,30,10","250,50,140,80,350,100,200,370,25,10","250,50,120,80,350,100,200,320,20,10"];
var fsf = ["250,30,50,35,180,50,100,100,5,3","250,30,60,60,240,60,150,150,10,5","250,50,80,60,270,60,150,180,10,10","330,50,80,80,300,60,200,220,15,10","350,50,100,80,350,100,200,280,20,10","350,50,100,80,350,100,200,340,25,10","330,50,120,80,350,100,200,340,25,10","330,50,120,80,350,100,200,320,25,10","250,50,100,80,350,100,200,260,20,10","250,50,100,80,350,100,200,270,20,10","250,50,100,80,350,100,200,260,15,10","250,50,100,80,350,100,200,220,15,10","250,50,150,80,350,100,200,310,20,10","250,50,150,150,350,100,200,320,20,10"];
//食品群別摂取量の目安　香川芳子案　身体活動レベルⅡ
var input = 0;
var select = 0;
var thislog = 0;
var portion = 0;
var code = "";

function savetows(code){
	localStorage.setItem("log",code);
	localStorage.setItem("age",Number($("#age").val()));
	localStorage.setItem("gender",Number($("#gender").val()));
}

function loading(){
	if(localStorage.getItem("log") == null){

	}else{
		var code = localStorage.getItem("log").split("&&&");
	    $.each(code,function(ind,val){
	    	var block1 = val.split("{{")[0].split("&&");
	    	var block2 = val.split("{{")[1].split("}}")[0].split("&&");
	    	var block3 = val.split("{{")[1].split("}}")[1].split("&&");
	    	switch(block1[2]){
	    		case "朝食":
	    			var bldind = 0;
	    			break;
	    		case "昼食":
	    			var bldind = 1;
	    			break;
	    		case "夕食":
	    			var bldind = 2;
	    			break;
	    		case "間食":
	    			var bldind = 3;
	    			break;
	    	}

	    	$("#log").append('<form class = "edit ' + bldclass[bldind] + '" onsubmit = "return false" data-sum = "' + block1[4] + '" data-portion = "' + block1[5] + '" data-year = "' + block3[1] + '" data-date = "' + block3[1] + "," + block1[0] + "," + block1[1] + '"></form>');
	    	var thislog = $("#log form").last();
	    	if(ind == 0 || $("#log form").eq($("#log form").length - 2).data("date") != $(thislog).data("date")){
	    		if(window.innerWidth > 600){
	    			$(thislog).before('<div class = "daylog" data-date = "' + $(thislog).data("date") + '"><p>' + block1[0] + "月" + block1[1] + "日の合計" + '</p><canvas width="400" height="200"></canvas></div>');
				}else{
					$(thislog).before('<div class = "daylog" data-date = "' + $(thislog).data("date") + '"><p>' + block1[0] + "月" + block1[1] + "日の合計" + '</p><canvas width="200" height="200"></canvas></div>');
				}
	    	}
	    		
	    	
	   
	    	$(thislog).append('<p class = "l-time"><span class = "l-month">' + block1[0] + '</span>月<span class = "l-date">' + block1[1] + '</span>日　<span class = "l-bld">' + bld[bldind] + '</span></p>');
	    	$(thislog).append('<h2 class = "l-ingname">' + block1[3] + '</h2>');
	    	$(thislog).append('<div class = "l-chart"><p>食品群別摂取量チャート</p></div>');
	    	if(window.innerWidth > 600){
				$(thislog).children(".l-chart").append('<canvas class="b-sheet" width="400" height="200"></canvas>');
			}else{
				$(thislog).children(".l-chart").append('<canvas class="b-sheet" width="200" height="200"></canvas>');
			}
	    	$(thislog).append('<div class = "l-ing"><p>食品名と摂取量</p></div>');
			for(var i=0;i < block2.length;i=i+3){
				$(thislog).children(".l-ing").append('<div data-fg = "' + block2[i] + '"><p>' + block2[i + 1] + '</p><p>' + block2[i + 2] + '</p></div>')
			}
			$(thislog).append('<p class = "l-comment">' + block3[0] + '</p>');

			var ltime = $(thislog).children(".l-time");
			var logdate = new Date($(thislog).data("year"),Number($(ltime).children(".l-month").text()) - 1,$(ltime).children(".l-date").text(),$.inArray($(ltime).children(".l-bld").text(),bld),0,0);
			var ltime = $("#log form").eq($("#log form").length - 2).children(".l-time");
			var logdate2 = new Date($("#log form").eq($("#log form").length - 2).data("year"),Number($(ltime).children(".l-month").text()) - 1,$(ltime).children(".l-date").text(),$.inArray($(ltime).children(".l-bld").text(),bld),0,0);
			if(logdate - logdate2 == 0 && $("#log form").length > 1){
				$(thislog).addClass("sametime");
			}
	    });
	}
	
}

if(localStorage.getItem("log") != ""){
	loading();
	$.each($("#log form"),function(ind,val){
		makechart(ind,0);
	});

	for(var i=0;i < $("#log .daylog").length;i++){
		makechart(i,1);
	}
}

function makecode(){
	code = "";
	$.each($("#log form"),function(ind,val){
		var thisform = $("#log form").eq(ind)
		code = code + $(thisform).children(".l-time").children(".l-month").text() + "&&" + $(thisform).children(".l-time").children(".l-date").text() + "&&" + $(thisform).children(".l-time").children(".l-bld").text() + "&&";
		code = code + $(thisform).children(".l-ingname").text() + "&&" + $(thisform).data("sum") + "&&" + $(thisform).data("portion");
		code = code + "{{";
		$.each($(thisform).children(".l-ing").children("div"),function(ind2,val2){
			var thisblock = $(thisform).children(".l-ing").children("div").eq(ind2);
			code = code + $(thisblock).data("fg") + "&&" + $(thisblock).children("p").eq(0).text() + "&&" + $(thisblock).children("p").eq(1).text() + "&&";
		});
		code = code.slice(0,-2);
		code = code + "}}" + $(thisform).children(".l-comment").text() +  "&&" + $(thisform).data("year") + "&&&";
	});
	code = code.slice(0,-3);
};




var lognum = 0;
$("#submit").on("click",function(){
	lognum = 0
	input = $("#editform input[type='text']");
	select = $("#editform select");


	if($(input).eq(2).prop("value") != "" && $(input).eq(1).prop("value") != ""){
		portion = Number($(input).eq(2).prop("value")) / Number($(input).eq(1).prop("value"));
	}else{
		portion = 1;
		$(input).eq(1).prop("value",1);
		$(input).eq(2).prop("value",1);
	}


	var container = '<form class = "edit ' +  bldclass[Number($(select).eq(2).prop("value"))] + '" onsubmit="return false" data-sum="' + $(input).eq(1).prop("value") + '" data-portion="' + $(input).eq(2).prop("value") + '" data-year = "' + $("#editform .year").children("input").prop("value") + '"><p class = "l-time"><span class = "l-month">' + $(select).eq(0).prop("value") + '</span>月<span class = "l-date">' + $(select).eq(1).prop("value") + '</span>日　<span class = "l-bld">' + bld[Number($(select).eq(2).prop("value"))] + '</span></p><h2 class = "l-ingname">' + $(input).eq(0).prop("value") + '</h2></div>';
	if($("#log form").length == 0){
		lognum = 0;
		$("#log h1").after(container);
	}else{
		var logdate = new Date($("#editform .year").children("input").prop("value"),Number($(select).eq(0).prop("value")) - 1,$(select).eq(1).prop("value"),Number($(select).eq(2).prop("value")),0,0);
		$.each($("#log form"),function(ind,val){
			var ltime = $("#log form").eq(ind).children(".l-time");
			var logdate2 = new Date($("#log form").eq(ind).data("year"),Number($(ltime).children(".l-month").text()) - 1,$(ltime).children(".l-date").text(),$.inArray($(ltime).children(".l-bld").text(),bld),0,0);
			if(logdate - logdate2 >= 0){
				if(logdate - logdate2 == 0){
					$("#log form").eq(ind).addClass("sametime");
				}
				return false;
			}
			lognum = lognum + 1;
		});
	}

	
	if(lognum == $("#log form").length && lognum > 0){
		$("#log form").eq(lognum - 1).after(container);
	}else{
		$("#log form").eq(lognum).before(container);
	}
	thislog = $("#log form").eq(lognum);
	$(thislog).append('<div class = "l-chart"><p>食品群別摂取量チャート</p></div>');
	if(window.innerWidth > 600){
		$(thislog).children(".l-chart").append('<canvas class="b-sheet" width="400" height="200"></canvas>');
	}else{
		$(thislog).children(".l-chart").append('<canvas class="b-sheet" width="200" height="200"></canvas>');
	}
	
	

	$(thislog).append('<div class = "l-ing"><p>食品名と摂取量</p></div>');
	for(i=0;i < $("body .edit").eq(0).children().children(".ingredients").length;i++){
		if($(input).eq(i * 2 + 3).prop("value") != "" && $(input).eq(i * 2 + 4).prop("value") > 0){
			$(thislog).children(".l-ing").append('<div data-fg = "' + $(select).eq(i + 3).val() + '"><p>' + $(input).eq(i * 2 + 3).prop("value") + '</p><p>' + Math.floor(Number($(input).eq(i * 2 + 4).prop("value")) * portion) + '</p></div>');
		}
	}
	makechart(lognum,0);
	$(thislog).append('<p class = "l-comment">' + $(".comment").eq(0).val() + '</p>');
	makecode();
	savetows(code);
	$("#editform input").prop("value","");
	for(var i=0;i < $("#editform .ingredients").length - 2;i++){
		$("#editform .ingredients").last().remove();
	}
	$("#editform .year").children("input").prop("value","2020");
});




$(document).on("click",".l-ing > p",function(){
	$(this).parent().children("div").slideToggle(300);
	$(this).toggleClass("show");
});
$(document).on("click",".daylog > p",function(){
	$(this).parent().children("canvas").slideToggle(300);
	$(this).toggleClass("show");
});
$(document).on("click",".l-chart > p",function(){
	$(this).parent().children("canvas").slideToggle(300);
	$(this).toggleClass("show");
});


var cdata1 = [];
var cdata2 = [];
var sum = 0;



function makechart(logind,op){
	if(op != 1 && $("#log form").eq(logind).hasClass("sametime")){

	}else{
		cdata1 = [];
		cdata2 = [];
		
		
		if($("#gender").val() == "m"){
			cdata1 = fsm[Number($("#age").val())].split(",");
		}else if($("#gender").val() == "f"){
			cdata1 = fsf[Number($("#age").val())].split(",");
		}


		if(op == 1){

			sum = [0,0,0,0,0,0,0,0,0,0];
			var bdc = "rgba(80,80,80,1)";
			var bgc = "rgba(80,80,80,0.3)";
			var allind = $("#log form,#log .daylog").index($("#log .daylog").eq(logind));
			var timelist = $("#log .daylog").eq(logind).data("date").split(",")
			for(var i=0;i < $("#log form,#log .daylog").length - 1 - allind;i++){
				var thislog = $("#log form,#log .daylog").eq(allind + 1 + i)
				if($("#log .daylog").eq(logind).data("date") == $(thislog).data("date") || i == 0){
					if($(thislog).hasClass("sametime")){
					}else{
						var nutlist = $(thislog).data("nutritions");
						for(var j=0;j < cdata1.length;j++){
							var datasum = Number(sum[j]) + Number(nutlist[j]);
							sum.splice(j,1,datasum);
						}
					}
					
				}else{
					break;
				}
			}
			$.each(sum,function(ind,val){
				if(val > cdata1[ind]){
					cdata2.push(100);
				}else{
					cdata2.push(val * 100/ cdata1[ind]);
				}
			});
			console.log(sum);
			console.log(cdata2);
			var ctx = $("#log .daylog").eq(logind).children("canvas");
		}else{
			var nutlist = [];
			$.each(cdata1,function(ind,val){
				sum = 0;
				
				for(var i=0;i < $("#log form").length;i++){
					if($("#log form").eq(logind + i).hasClass("sametime") || i == 0){
						var thislog = $("#log form").eq(logind + i);
						$.each($(thislog).children(".l-ing").children("div"),function(ind2,val2){
							if(Number($(thislog).children(".l-ing").children("div").eq(ind2).data("fg")) == ind){
								sum = sum + Number($(thislog).children(".l-ing").children("div").eq(ind2).children("p").eq(1).text());
							}
						});
					}else{
						break;
					}
				}
				nutlist.push(sum);
				if(sum > cdata1[ind] / 3){
					cdata2.push(100);
				}else{
					cdata2.push(sum * 300 / cdata1[ind]);
				}
				
			});
			$("#log form").eq(logind).data("nutritions",nutlist);
			$("#log form").eq(logind).attr("data-nutritions",nutlist);

			var ctx = $("#log form").eq(logind).children(".l-chart").children(".b-sheet");
			if($("#log form").eq(logind).hasClass("breakfast")){
				var bdc = "rgba(60,138,175,1)";
				var bgc = "rgba(60,138,175,0.3)";
			}else if($("#log form").eq(logind).hasClass("lunch")){
				var bdc = "rgba(211,137,15,1)";
				var bgc = "rgba(211,137,15,0.3)";
			}else if($("#log form").eq(logind).hasClass("dinner")){
				var bdc = "rgba(153,115,102,1)";
				var bgc = "rgba(153,115,102,0.3)";
			}else{
				var bdc = "rgba(134,155,50,1)";
				var bgc = "rgba(134,155,50,0.3)";
			}
		}
		
		new Chart(ctx, {
			type:"radar",
			data:{
				labels:["乳・乳製品","卵","魚介・肉","豆・豆製品","野菜","いも類","果物","穀物"/*,"油脂","砂糖"*/],
				datasets:[

					{
						label:"あなたの摂取量(%)",
						data:cdata2,
						backgroundColor:bgc,
						borderWidth:3,
						pointBackgroundColor:bdc,
						borderColor:bdc,
						pointBorderWidth:0
					},
					/*{
						label:"めやすの摂取量",
						data:[100,100,100,100,100,100,100,100,100,100],
						backgroundColor:"rgba(200,200,200,0)",
						borderWidth:3,
						pointBackgroundColor:"rgba(1,1,1,0)",
						pointerBorderColor:"rgba(0,0,0,0)",
						borderColor:"rgba(200,200,200,1)",
						pointBorderWidth:0
					}*/
				],
			},
			options:{
				title:{
					fontSize:17
				},
				scale:{
					scaleLabel:{
						fontSize:17
					},
					ticks:{
						min:0,
						max:100,
						stepSize:10
					}
				}
			}
		});
	}
	
}
