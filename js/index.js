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
	localStrage.setItem("age",Number($("#age").val()));
	localStrage.setItem("gender",Number($("#gender").val()));
}

function loading(){
	var code = localStorage.getItem("log").split("&&&");
    $.each(code,function(ind,val){
    	console.log(ind);
    	/*var block1 = val.split("{{")[0].split("&&");
    	var block2 = val.split("{{")[1].split("}}")[0].split("&&");
    	var block3 = val.split("{{")[1].split("}}")[1].split("&&");
    	
    	$("#log > h1").after('<form class = "edit ' + block1[2] + '" onsubmit = "return false" data-sum = "' + block1[4] + '" data-portion = "' + block1[5] + '"></form>');
    	var thislog = $("#log form").eq(0);
    	$(thislog).append('<p class = "l-time"><span class = "l-month">' + block1[0] + '</span><span class = "l-date">' + block1[1] + '</span></p>');
    	$(thislog).append('<h2 class = "ingname">' + block[3] + '</h2>');
    	if(window.innerWidth > 600){
			$(thislog).append('<canvas class="b-sheet" width="400" height="200"></canvas>');
		}else{
			$(thislog).append('<canvas class="b-sheet" width="200" height="200"></canvas>');
		}*/
		
    });
}
//loading();
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
		code = code + "}}" + $(thisform).children(".l-comment").text() + "&&&";
	});
	alert(code);
};



$("#submit").on("click",function(){
	input = $("#editform input[type='text']");
	select = $("#editform select");
	$("#log h1").after('<form class = "edit ' +  bldclass[Number($(select).eq(2).prop("value"))] + '" onsubmit="return false" data-sum="' + $(input).eq(1).prop("value") + '" data-portion="' + $(input).eq(2).prop("value") + '"><p class = "l-time"><span class = "l-month">' + $(select).eq(0).prop("value") + '</span>月<span class = "l-date">' + $(select).eq(1).prop("value") + '</span>日　<span class = "l-bld">' + bld[Number($(select).eq(2).prop("value"))] + '</span></p><h2 class = "l-ingname">' + $(input).eq(0).prop("value") + '</h2></div>');
	
	thislog = $("#log form").eq(0);
	if(window.innerWidth > 600){
		$(thislog).append('<canvas class="b-sheet" width="400" height="200"></canvas>');
	}else{
		$(thislog).append('<canvas class="b-sheet" width="200" height="200"></canvas>');
	}
	if($(input).eq(2).prop("value") != "" && $(input).eq(1).prop("value") != ""){
		portion = Number($(input).eq(2).prop("value")) / Number($(input).eq(1).prop("value"));
	}else{
		portion = 1;
	}
	

	$(thislog).append('<div class = "l-ing"><p>食品名と摂取量</p></div>');
	for(i=0;i < $("body .edit").eq(0).children().children(".ingredients").length;i++){
		if($(input).eq(i * 2 + 3).prop("value") != "" && $(input).eq(i * 2 + 4).prop("value") > 0){
			$(thislog).children(".l-ing").append('<div data-fg = "' + $(select).eq(i + 3).val() + '"><p>' + $(input).eq(i * 2 + 3).prop("value") + '</p><p>' + Math.floor(Number($(input).eq(i * 2 + 4).prop("value")) * portion) + '</p></div>');
		}
	}
	makechart(0);
	$(thislog).append('<p class = "l-comment">' + $(".comment").eq(0).val() + '</p>');
	makecode();
	savetows(code);
});

$(document).on("click",".l-ing > p",function(){
	$(this).parent().children("div").slideToggle(300);
	$(this).toggleClass("show");
});


var cdata1 = [];
var cdata2 = [];
var sum = 0;
function makechart(logind){
	cdata1 = [];
	cdata2 = [];
	
	var thislog = $("#log form").eq(logind);
	if($("#gender").val() == "m"){
		cdata1 = fsm[Number($("#age").val())].split(",");
	}else if($("#gender").val() == "f"){
		cdata1 = fsf[Number($("#age").val())].split(",");
	}

	$.each(cdata1,function(ind,val){
		sum = 0;
		$.each($(thislog).children(".l-ing").children("div"),function(ind2,val2){
			if(Number($(thislog).children(".l-ing").children("div").eq(ind2).data("fg")) == ind){
				sum = sum + Number($(thislog).children(".l-ing").children("div").eq(ind2).children("p").eq(1).text());
			}
		});
		if(sum > cdata1[ind] / 3){
			cdata2.push(100);
		}else{
			cdata2.push(sum * 300 / cdata1[ind]);
		}
		
	});

	var ctx = $(".b-sheet");
	
	new Chart(ctx, {
		type:"radar",
		data:{
			labels:["乳・乳製品","卵","魚介・肉","豆・豆製品","野菜","いも類","果物","穀物","油脂","砂糖"],
			datasets:[

				{
					label:"あなたの摂取量",
					data:cdata2,
					backgroundColor:"rgba(60,138,175,0.3)",
					borderWidth:3,
					pointBackgroundColor:"rgba(60,138,175,1)",
					borderColor:"rgba(60,138,175,1)",
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
					stepSize:10
				}
			}
		}
	});
}
makechart(0);