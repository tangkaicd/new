
(function(){
	//获取元素
	var $model = $(".model");
	var x = 0;
	var y = 0;
	var l = 0;
	var t = 0;
	var isDown = false;
	var input = false;
	$model.each(function(){
		$(this).on("mousedown","input",function(e){
			//input=true;
		})
		$(this).find(".dialog > .header").css("cursor","move");
		$(this).find(".dialog > .header").on("mousedown",function(e){
			 //获取x坐标和y坐标
		    x = e.clientX;
		    y = e.clientY;

		    //获取左部和顶部的偏移量
		    l = $(this).parents(".dialog")[0].offsetLeft;
		    t = $(this).parents(".dialog")[0].offsetTop;
		    //开关打开
		    if(!input){
			    isDown = true;	
		    }
		    input=false;
		    //设置样式  
//		    $(this).css("cursor","move")
		})
		$(this).on("mousemove",function(e){
			if (isDown == false) {
		        return;
		    }
		    //获取x和y
		    var nx = e.clientX;
		    var ny = e.clientY;
		    //计算移动后的左偏移量和顶部的偏移量
		    var nl = nx - (x - l);
		    var nt = ny - (y - t);
		    $(this).find(".dialog").css("left",nl + 'px');
		    $(this).find(".dialog").css("top",nt + 'px');
		})
		$(window).on("mouseup",function(e){
			//开关关闭
		    isDown = false;
//		    $(this).find(".dialog").css("cursor",'default');
		})
	})
	
	$("#tipModel").on("mouseup",function(e){
		//开关关闭
	    isDown = false;
	    $(this).find(".dialog").css("cursor",'default');
	})
	
//	$(".model").each(function(index){
//		//获取元素
//		var dv = $(this).find(".dialog");
//		var x = 0;
//		var y = 0;
//		var l = 0;
//		var t = 0;
//		var isDown = false;
//		//鼠标按下事件
//		dv.onmousedown = function(e) {
//		    //获取x坐标和y坐标
//		    x = e.clientX;
//		    y = e.clientY;
//
//		    //获取左部和顶部的偏移量
//		    l = dv.offsetLeft;
//		    t = dv.offsetTop;
//		    //开关打开
//		    isDown = true;
//		    //设置样式  
//		    dv.style.cursor = 'move';
//		}
//		//鼠标移动
//		window.onmousemove = function(e) {
//		    if (isDown == false) {
//		        return;
//		    }
//		    //获取x和y
//		    var nx = e.clientX;
//		    var ny = e.clientY;
//		    //计算移动后的左偏移量和顶部的偏移量
//		    var nl = nx - (x - l);
//		    var nt = ny - (y - t);
//
//		    dv.style.left = nl + 'px';
//		    dv.style.top = nt + 'px';
//		}
//		//鼠标抬起事件
//		dv.onmouseup = function() {
//		    //开关关闭
//		    isDown = false;
//		    dv.style.cursor = 'default';
//		}
//	})
	
	$("body").on("click",".openModelBtn",function(e){
		$(".model .dialog").css("left","50%");
		$(".model .dialog").css("top","50%");
	})
	
})()


$("body").on("click",".dropdown-wrapper",function(e){
    var isShow=true;
    if($(this).find(".dropdown").is(":hidden")){
        isShow=false;
    }
    $("body").find(".dropdown-wrapper .dropdown").hide();
    if(isShow){
        $(this).find(".dropdown").hide();
    }else{
    	$(this).find(".dropdown .search-wrapper input").val("");
    	$(this).find(".dropdown > div").show();
        $(this).find(".dropdown").show();
    }
    e.stopPropagation();
})

$("body").on("click",".dropdown-wrapper .dropdown .search-wrapper",function(e){
    e.stopPropagation();
})

$("body").on("keyup",".dropdown-wrapper .dropdown .search-wrapper input",function(e){
	$(this).parent().siblings("div").show();
	var value=$(this).val();
    $(this).parent().siblings("div").each(function(){
    	if($(this).html().indexOf(value) == -1){
    		$(this).hide();
    	}
    })
})

$("body").on("click",".dropdown-wrapper .dropdown > div",function(){
    var value=$(this).text();
//    var key=$(this).attr("key");
    var $input=$(this).parent(".dropdown").siblings("input");
    $input.val(value);
//    $input.attr("key",key);
    var attrMap = $(this)[0].attributes;
    for(var i = 0; i < attrMap.length; i++){
        $input.attr(attrMap[i].nodeName,attrMap[i].nodeValue);
    }
})

$(window).click(function(){
    $(".dropdown-wrapper .dropdown").hide();
    $(".dropdown-wrapper .dropdown",parent.document).hide();
})

$(".navbar-top .nav").click(function(){
	if($(this).find(".dropdown").length){
		return;
	}
    $(this).siblings(".nav").removeClass("navCheaked");
    $(this).addClass("navCheaked");
})

$(".navbar-top .nav .dropdown > div").click(function(){
    var $nav=$(this).parents(".nav");
    $nav.siblings(".nav").removeClass("navCheaked");
    $nav.addClass("navCheaked");
})

$(".navbar-top .nav").mouseover(function(){
	var $dropdown=$(this).find(".dropdown");
	$dropdown.css("min-width",$dropdown.parents(".nav").width())
	$dropdown.show();
})

$(".navbar-top .nav").mouseout(function(){
	$(this).find(".dropdown").hide();
})

$(".navbar-top .nav .dropdown > div").click(function(){
	$(this).parents(".dropdown").hide();
})

$("#tipModel .cancel-btn").click(function(){
	$("#tipModel").hide();
})		

$("body").on("click",".model .dialog > .header .close,.model .dialog > .footer .cancel-btn",function(){
    var $model=$(this).parents(".model");
    $model.hide();
    if($model.find(".footer-searchList").length){
    	global.pageIndex=global.pageIndex_previous;
        global.pageSize=global.pageSize_previous;
    }
})

$("body").on("click",".myCheckbox",function(){
    $(this).toggleClass("myCheckbox_checked");
})

$("body").on("keyup",".positiveInteger",function(){
    var value=$.trim($(this).val());
    if(!global.isPositiveInteger(value)){
    	$(this).val("");
    }
})

$("body").on("keyup",".naturalNumber",function(){
	var value=$.trim($(this).val());
    if(!global.isNaturalNumber(value)){
    	$(this).val("");
    }
})

			$("body").on("click","table .checkAll",function(){
				$(this).toggleClass("checked");
				var $myCheckbox=$(this).parents("table").find(".myCheckbox");
				if($(this).hasClass("checked")){
					$myCheckbox.addClass("myCheckbox_checked");
				}else{
					$myCheckbox.removeClass("myCheckbox_checked");
				}	
			})
					

function global(){
	this.pageIndex=0;
	this.total;
	this.pageSizeList=[8,20,50,100];
	this.pageSize=this.pageSizeList[0];
	this.pageIndex_previous;
	this.pageSize_previous;
	this.updateTrIndex=function($table){
		$table.find("tr").each(function(index){
			$(this).find("td:first-child").html(index+1);
		})
	};
	this.tdHeadEqualtdBody=function($headTable,$bodyTable){
		$headTable.find(" > div").each(function(index){
			var tdWidth=$bodyTable.find("tr td").eq(index).width();
			$headTable.css("width",$bodyTable.width());
			$(this).css("width",tdWidth);
//			console.log($bodyTable.find("tr").eq(0).find("td").width());
//			console.log($bodyTable.find("tr td").eq(index).width());
//			console.log($bodyTable.find("tr td").eq(index).attr("width"));
//			console.log($bodyTable.find("tr td").eq(index)[0].offsetWidth);
//			$(this).css("width",width);
		})
	};
	this.getImgSizeBySrc=function(src,maxWidth1,maxHeight1,callBack,$container){
		var image=new Image();
		image.src=src;
		image.onload=function(result){
			var maxWidth=maxWidth1?maxWidth1:350;
			var maxHeight=maxHeight1?maxHeight1:350;
			var width=image.width;
			var height=image.height;
			var size="";
			if((width > maxWidth) || (height > maxHeight)){
				if(width > height){
					size="width="+maxWidth;
				}else{
					size="height="+maxHeight;
				}
			}
			callBack(size,src,$container);
		}
//    	var $img=$('<img class="none" src="'+src+'"/>').appendTo($("body")); 
//    	var maxWidth=maxWidth1?maxWidth1:350;
//		var maxHeight=maxHeight1?maxHeight1:350;
//		var width=$img.width();
//		var height=$img.height();
//		alert(width)
//		$img.remove();
//		if((width > maxWidth) || (height > maxHeight)){
//			if(width > height){
//				return "width="+maxWidth;
//			}else{
//				return "height="+maxHeight;
//			}
//		}else{
//			return "";
//		}
	};
	this.getImgBySrc=function(src,maxWidth1,maxHeight1,callBack){
		var image=new Image();
		image.src=src;
		image.onload=function(result){
			var maxWidth=maxWidth1?maxWidth1:350;
			var maxHeight=maxHeight1?maxHeight1:350;
			var width=image.width;
			var height=image.height;
			var sizeStyle="";
			if((width > maxWidth) || (height > maxHeight)){
				if(width > height){
					sizeStyle="width="+maxWidth;
				}else{
					sizeStyle="height="+maxHeight;
				}
			}
			var img='<img '+sizeStyle+' src="'+src+'"/>';
			callBack(img);
		}
//    	var $img=$('<img class="none" src="'+src+'"/>').appendTo($("body")); 
//    	var maxWidth=maxWidth1?maxWidth1:350;
//		var maxHeight=maxHeight1?maxHeight1:350;
//		var width=$img.width();
//		var height=$img.height();
//		var widthStyle="";
//		var heightStyle="";
//		$img.remove();
//		if((width > maxWidth) || (height > maxHeight)){
//			if(width > height){
//				widthStyle="width="+maxWidth;
//			}else{
//				heightStyle="height="+maxHeight;
//			}
//		}
//		return '<img '+widthStyle+' '+heightStyle+' src="'+src+'"/>';
	};
	this.getValueForDisplay=function(value,map,str){
		str=(str !== undefined)?str:"----";
		if(map){
			return (value || value === 0)?map[value]:str;
		}else{
			return (value || value === 0)?value:str;
		}
	};
	this.setFormData=function($container,data,mapList){
		$container.find("input[name],textarea[name]").each(function(){
			var name=$(this).attr("name");
			var value=data[name];
			if($(this).hasClass("input_dropdown")){
				$(this).attr("key",value);
				for(var i=0;i<mapList.length;i++){
					if(mapList[i].key == name){
						$(this).val(global.getValueForDisplay(value,mapList[i].value,""));
						break;
					}
				}
			}else{
				$(this).val(global.getValueForDisplay(value,null,""));
			}
		})
	};
	this.getFormData=function($container){
		var obj={};
		$container.find("input[name],textarea[name]").each(function(){
			var key=$(this).attr("name");
			var value;
			if($(this).hasClass("input_dropdown")){
				value=$(this).attr("key");
			}else{
				value=$(this).val();
			}
			obj[key]=value;
		})
		return obj;
	};
	this.isNull=function(value){
		value=$.trim(value);
		var isNull=false;
		if(!value && (value !== 0)){
			isNull=true;
		}
		return isNull;
	};
	this.isNotNull_model=function($model){
		var isNotNull=true;
		$model.find(".body > .each .notNull").each(function(){
			var value;
			if($(this).parent(".name").next(".value").length){
				value=$.trim($(this).parent(".name").next(".value").val());
			}else{
				value=$.trim($(this).parent(".name").next().find(".value").val());
			}
			if(!value && (value !== 0)){
				var name=$(this).parent(".name").text();
				name=name.split("*")[1].split("：")[0];
				global.showTipModel(name+"不能为空");
				isNotNull=false;
				return false;
			}
		})
		return isNotNull;
	};
	this.isPositiveInteger=function (value){
		var re = /^[1-9][0-9]*$/ ;
		return re.test(value);
	};
	this.isNaturalNumber=function (value){
		if(global.isPositiveInteger(value) || (value === 0) || (value == "0")){
			return true;
		}else{
			return false;
		}
	}
	this.isInteger=function (value){
		var re = /^-?[0-9]*$/ ;
		return re.test(value);
	}
	this.makeTable=function ($table,data,fieldMap,attrField){
		$table.empty();
 	    var str='<tr style="background: #F2F2F2"><td>序号</td>';
 	    for(var key in fieldMap){
 	    	str+='<td>'+key+'</td>';
 	    }
 	   str+='</tr>';
 	    for(var i=0;i<data.length;i++){
 	    	if(!data[i]){
 	    		return;
 	    	}
 	 	   var attrStr="";
 	 	   for(var j=0;j<attrField.length;j++){
 	 		  attrStr+='data-'+attrField[j]+'="'+result[i][attrField[j]]+'" '
 	 	   }
 	 	 str+='<tr data-certTypeId="'+result[i].certTypeId+'" data-certTypeCode="'+result[i].certTypeCode+'">'
 	 	   
 	 	   
 	    	var certTypeCode=(result[i].certTypeCode || result[i].certTypeCode == 0)?result[i].certTypeCode:"----";
 	    	
 	    	
 	    		+'<td>'+(i+1)+'</td>'
 	    		+'<td>'+certTypeCode+'</td>'
 	    		+'<td>'+certTypeName+'</td>'
 	    		+'<td>'+certLevel+'</td>'
 	    		+'<td>'+orgName+'</td>'
 	    		+'<td>'+certHolderType+'</td>'
 	    		+'<td>'
 	    		+'<span class="updateBtn_small"><span class="fa fa-edit"></span><span class="name">编辑</span></span>'
 	    		+'</td>'
 	    }
 	   $table.append(str);
	}
	this.uuid=function (){
		var s = [];
		var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 36), 1);
		}
		var uuid = s.join("");
		return uuid;
	};
	this.showTipModel=function (param,callback){
		var $modal=$("#tipModel");
		$modal.find(".body").css("max-width","300px");
		$modal.find('.footer .confirm-btn').unbind();
		if(!(param && param.modelHide_controllable)){
			$modal.find('.footer .confirm-btn').click(function(){
				$modal.hide();
			})
		}
		if(param.constructor == Object){
			if(param.width){
				$modal.find(".body").css("max-width",param.width);
			}
			if(param.title){
				$modal.find(".header").html(param.title);
			}else{
				$modal.find(".header").html('提示框');
			}
			$modal.find('.body').html(param.content);
		}else{
			$modal.find(".header").html('提示框');
			$modal.find('.body').html(param);
		}
		if(callback){
			$modal.find('.footer .cancel-btn').show();
			$modal.find('.footer .confirm-btn').click(function(){
				callback();
			})
		}else{
			$modal.find('.footer .cancel-btn').hide();
		}
		$modal.show();
	};
	this.showTipModel_top=function (param,callback){
		var $modal=$("#tipModel_top");
		$modal.find(".body").css("max-width","300px");
		$modal.find('.footer .confirm-btn').unbind();
		if(!(param && param.modelHide_controllable)){
			$modal.find('.footer .confirm-btn').click(function(){
				$modal.hide();
			})
		}
		if(param.constructor == Object){
			if(param.width){
				$modal.find(".body").css("max-width",param.width);
			}
			if(param.title){
				$modal.find(".header").html(param.title);
			}else{
				$modal.find(".header").html('提示框');
			}
			$modal.find('.body').html(param.content);
		}else{
			$modal.find(".header").html('提示框');
			$modal.find('.body').html(param);
		}
		if(callback){
			$modal.find('.footer .cancel-btn').show();
			$modal.find('.footer .confirm-btn').click(function(){
				callback();
			})
		}else{
			$modal.find('.footer .cancel-btn').hide();
		}
		$modal.show();
	};
	this.makeWaiting=function ($container){
		var waiting='<div id="waiting"><img src="'+ctx+'/static/common/image/waiting.gif"/></div>';
		if($container && $container.length){
			$(waiting).appendTo($container);
		}else{
			// $(waiting).appendTo($("body",parent.document));
			$(waiting).appendTo($("body"));
		}
	};
	this.removeWaiting=function (){
		// $("#waiting",parent.document).remove();
		$("#waiting").remove();
	}
	this.makeTooltip=function (content,x,y,width){
		$("#tooltip").css("width","auto");
		$("#tooltip").empty();
		$("#tooltip").append(content);
		if(width){
			$("#tooltip").css("width",width);
			//$("#tooltip").css("white-space","normal");
		}
		$("#tooltip").css("left",x+5);
		$("#tooltip").css("top",y+5);
		$("#tooltip").show();
		if(($("#tooltip")[0].offsetLeft+$("#tooltip")[0].offsetWidth)>$(window).width()){
			$("#tooltip").css("left",x-$("#tooltip")[0].offsetWidth-5);
		}
		if(($("#tooltip")[0].offsetTop+$("#tooltip")[0].offsetHeight)>$(window).height()){
			$("#tooltip").css("top",y-$("#tooltip")[0].offsetHeight-5);
		}
	};
	this.tooltipMousemove=function (x,y){
		$("#tooltip").css("left",x+5);
		$("#tooltip").css("top",y+5);
		if(($("#tooltip")[0].offsetLeft+$("#tooltip")[0].offsetWidth)>$(window).width()){
			$("#tooltip").css("left",x-$("#tooltip")[0].offsetWidth-5);
		}
		if(($("#tooltip")[0].offsetTop+$("#tooltip")[0].offsetHeight)>$(window).height()){
			$("#tooltip").css("top",y-$("#tooltip")[0].offsetHeight-5);
		}
	};
	this.updateTable_event=function ($container,$searchParamList,updateTable){
		
		$container.on("click",".searchWapper .dropdown-wrapper .dropdown > div",function(){
			var value=$(this).text();
		    var key=$(this).attr("key");
		    var $input=$(this).parent(".dropdown").siblings("input");
		    $input.val(value);
		    $input.attr("key",key);
			global.pageIndex=0;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global.pageIndex,global.pageSize,paramList);
		})

		$container.on("click",".searchWapper .search",function(){
			global.pageIndex=0;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			console.log(paramList);
			updateTable(global.pageIndex,global.pageSize,paramList);
		})
		
		$container.on('keyup',".searchWapper .searchInput",function(event){ 
		    if(event.keyCode == 13){  
		    	global.pageIndex=0;
				var paramList=[];
				for(var i=0;i<$searchParamList.length;i++){
					if($searchParamList[i].key == "input"){
						paramList.push($searchParamList[i].value.val());
					}else{
						paramList.push($searchParamList[i].value.attr("key"));
					}
				}
				updateTable(global.pageIndex,global.pageSize,paramList);
		    }  

		})

		$container.on("click",".footer-searchList .dropdown-wrapper .dropdown > div",function(){
			global.pageIndex=0;
			global.pageSize=$(this).text();
			$(this).parents(".dropdown-wrapper").find(".pageSize").text(global.pageSize);
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global.pageIndex,global.pageSize,paramList);
		})

		$container.on("keyup",".footer-searchList .pageIndex",function(e){
			if (e.keyCode === 13) {
				var totalPage=(global.total%global.pageSize)?(parseInt(global.total/global.pageSize)+1):(parseInt(global.total/global.pageSize));
				if(totalPage == 0){
					return;
				}
				var value= parseInt($.trim($(this).val()));
				if(!value || (value<1) || (value>totalPage)){
					global.showTipModel('只能输入1到'+totalPage+'之间的数字');
					return;
				}
				global.pageIndex=value-1;
				var paramList=[];
				for(var i=0;i<$searchParamList.length;i++){
					if($searchParamList[i].key == "input"){
						paramList.push($searchParamList[i].value.val());
					}else{
						paramList.push($searchParamList[i].value.attr("key"));
					}
				}
				updateTable(global.pageIndex,global.pageSize,paramList);
			}
		})

		$container.on("click",".footer-searchList .firstPage",function(){
			var totalPage=(global.total%global.pageSize)?(parseInt(global.total/global.pageSize)+1):(parseInt(global.total/global.pageSize));
			if(totalPage == 0){
				return;
			}
			global.pageIndex=0;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global.pageIndex,global.pageSize,paramList);
		})

		$container.on("click",".footer-searchList .lastPage",function(){
			var totalPage=(global.total%global.pageSize)?(parseInt(global.total/global.pageSize)+1):(parseInt(global.total/global.pageSize));
			if(totalPage == 0){
				return;
			}
			global.pageIndex=totalPage-1;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global.pageIndex,global.pageSize,paramList);
		})

		$container.on("click",".footer-searchList .prePage",function(){
			if(0 == global.pageIndex){
				return;
			}
			global.pageIndex=--global.pageIndex;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global.pageIndex,global.pageSize,paramList);
		})

		$container.on("click",".footer-searchList .nextPage",function(){
			var totalPage=(global.total%global.pageSize)?(parseInt(global.total/global.pageSize)+1):(parseInt(global.total/global.pageSize))
			if(!totalPage || (totalPage == global.pageIndex+1)){
				return;
			}
			global.pageIndex=++global.pageIndex;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global.pageIndex,global.pageSize,paramList);
		})
	}
	
}
var global=new global();

function global_copy(){
	this.pageIndex=0;
	this.total;
	this.pageSizeList=[5,10,20,50,100];
	this.pageSize=this.pageSizeList[0];
	this.pageIndex_previous;
	this.pageSize_previous;
	this.uuid=function (){
		var s = [];
		var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 36), 1);
		}
		var uuid = s.join("");
		return uuid;
	};
	this.showTipModel=function (param,callback){
		var $modal=$("#tipModel");
		$modal.find(".body").css("max-width","300px");
		$modal.find('.footer .confirm-btn').unbind();
		if(!(param && param.modelHide_controllable)){
			$modal.find('.footer .confirm-btn').click(function(){
				$modal.hide();
			})
		}
		if(param.constructor == Object){
			if(param.width){
				$modal.find(".body").css("max-width",param.width);
			}
			if(param.title){
				$modal.find(".header").html(param.title);
			}else{
				$modal.find(".header").html('提示框');
			}
			$modal.find('.body').html(param.content);
		}else{
			$modal.find(".header").html('提示框');
			$modal.find('.body').html(param);
		}
		if(callback){
			$modal.find('.footer .cancel-btn').show();
			$modal.find('.footer .confirm-btn').click(function(){
				callback();
			})
		}else{
			$modal.find('.footer .cancel-btn').hide();
		}
		$modal.show();
	};
	this.showTipModel_top=function (param,callback){
		var $modal=$("#tipModel_top");
		$modal.find(".body").css("max-width","300px");
		$modal.find('.footer .confirm-btn').unbind();
		if(!(param && param.modelHide_controllable)){
			$modal.find('.footer .confirm-btn').click(function(){
				$modal.hide();
			})
		}
		if(param.constructor == Object){
			if(param.width){
				$modal.find(".body").css("max-width",param.width);
			}
			if(param.title){
				$modal.find(".header").html(param.title);
			}else{
				$modal.find(".header").html('提示框');
			}
			$modal.find('.body').html(param.content);
		}else{
			$modal.find(".header").html('提示框');
			$modal.find('.body').html(param);
		}
		if(callback){
			$modal.find('.footer .cancel-btn').show();
			$modal.find('.footer .confirm-btn').click(function(){
				callback();
			})
		}else{
			$modal.find('.footer .cancel-btn').hide();
		}
		$modal.show();
	};
	this.makeWaiting=function ($container){
		var waiting='<div id="waiting"><img src="'+ctx+'/resources/common/image/waiting.gif"/></div>';
		if($container && $container.length){
			$(waiting).appendTo($container);
		}else{
			$(waiting).appendTo($("body",parent.document));
		}
	};
	this.removeWaiting=function (){
		$("#waiting",parent.document).remove();
	}
	this.makeTooltip=function (content,x,y,width){
		$("#tooltip").css("width","auto");
		$("#tooltip").empty();
		$("#tooltip").append(content);
		if(width){
			$("#tooltip").css("width",width);
			//$("#tooltip").css("white-space","normal");
		}
		$("#tooltip").css("left",x+5);
		$("#tooltip").css("top",y+5);
		$("#tooltip").show();
		if(($("#tooltip")[0].offsetLeft+$("#tooltip")[0].offsetWidth)>$(window).width()){
			$("#tooltip").css("left",x-$("#tooltip")[0].offsetWidth-5);
		}
		if(($("#tooltip")[0].offsetTop+$("#tooltip")[0].offsetHeight)>$(window).height()){
			$("#tooltip").css("top",y-$("#tooltip")[0].offsetHeight-5);
		}
	};
	this.tooltipMousemove=function (x,y){
		$("#tooltip").css("left",x+5);
		$("#tooltip").css("top",y+5);
		if(($("#tooltip")[0].offsetLeft+$("#tooltip")[0].offsetWidth)>$(window).width()){
			$("#tooltip").css("left",x-$("#tooltip")[0].offsetWidth-5);
		}
		if(($("#tooltip")[0].offsetTop+$("#tooltip")[0].offsetHeight)>$(window).height()){
			$("#tooltip").css("top",y-$("#tooltip")[0].offsetHeight-5);
		}
	};
	this.updateTable_event=function ($container,$searchParamList,updateTable){
		
		$container.on("click",".searchWapper .dropdown-wrapper .dropdown > div",function(){
			var value=$(this).text();
		    var key=$(this).attr("key");
		    var $input=$(this).parent(".dropdown").siblings("input");
		    $input.val(value);
		    $input.attr("key",key);
			global_copy.pageIndex=0;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		})

		$container.on("click",".searchWapper .search",function(){
			global_copy.pageIndex=0;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			console.log(paramList);
			updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		})
		
		$container.on('keyup',".searchWapper .searchInput",function(event){ 
		    if(event.keyCode == 13){  
		    	global_copy.pageIndex=0;
				var paramList=[];
				for(var i=0;i<$searchParamList.length;i++){
					if($searchParamList[i].key == "input"){
						paramList.push($searchParamList[i].value.val());
					}else{
						paramList.push($searchParamList[i].value.attr("key"));
					}
				}
				updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		    }  

		})

		$container.on("click",".footer-searchList .dropdown-wrapper .dropdown > div",function(){
			global_copy.pageIndex=0;
			global_copy.pageSize=$(this).text();
			$(this).parents(".dropdown-wrapper").find(".pageSize").text(global_copy.pageSize);
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		})

		$container.on("keyup",".footer-searchList .pageIndex",function(e){
			if (e.keyCode === 13) {
				var totalPage=(global_copy.total%global_copy.pageSize)?(parseInt(global_copy.total/global_copy.pageSize)+1):(parseInt(global_copy.total/global_copy.pageSize));
				if(totalPage == 0){
					return;
				}
				var value= parseInt($.trim($(this).val()));
				if(!value || (value<1) || (value>totalPage)){
					global_copy.showTipModel('只能输入1到'+totalPage+'之间的数字');
					return;
				}
				global_copy.pageIndex=value-1;
				var paramList=[];
				for(var i=0;i<$searchParamList.length;i++){
					if($searchParamList[i].key == "input"){
						paramList.push($searchParamList[i].value.val());
					}else{
						paramList.push($searchParamList[i].value.attr("key"));
					}
				}
				updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
			}
		})

		$container.on("click",".footer-searchList .firstPage",function(){
			var totalPage=(global_copy.total%global_copy.pageSize)?(parseInt(global_copy.total/global_copy.pageSize)+1):(parseInt(global_copy.total/global_copy.pageSize));
			if(totalPage == 0){
				return;
			}
			global_copy.pageIndex=0;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		})

		$container.on("click",".footer-searchList .lastPage",function(){
			var totalPage=(global_copy.total%global_copy.pageSize)?(parseInt(global_copy.total/global_copy.pageSize)+1):(parseInt(global_copy.total/global_copy.pageSize));
			if(totalPage == 0){
				return;
			}
			global_copy.pageIndex=totalPage-1;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		})

		$container.on("click",".footer-searchList .prePage",function(){
			if(0 == global_copy.pageIndex){
				return;
			}
			global_copy.pageIndex=--global_copy.pageIndex;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		})

		$container.on("click",".footer-searchList .nextPage",function(){
			var totalPage=(global_copy.total%global_copy.pageSize)?(parseInt(global_copy.total/global_copy.pageSize)+1):(parseInt(global_copy.total/global_copy.pageSize))
			if(!totalPage || (totalPage == global_copy.pageIndex+1)){
				return;
			}
			global_copy.pageIndex=++global_copy.pageIndex;
			var paramList=[];
			for(var i=0;i<$searchParamList.length;i++){
				if($searchParamList[i].key == "input"){
					paramList.push($searchParamList[i].value.val());
				}else{
					paramList.push($searchParamList[i].value.attr("key"));
				}
			}
			updateTable(global_copy.pageIndex,global_copy.pageSize,paramList);
		})
	}
	
}
var global_copy=new global_copy();

for(var i=0;i<global.pageSizeList.length;i++){
	$(".footer-searchList .dropdown-wrapper .dropdown").append('<div key="'+global.pageSizeList[i]+'">'+global.pageSizeList[i]+'</div>');
}

jQuery(function ($) {
    var _ajax = $.ajax;
    $.ajax = function (opt) {
        var _error = opt && opt.error || function (a, b, c) { };
        var _opt = $.extend(opt, {
            error: function (xhr, status, error) {
            	global.removeWaiting();
            	global.showTipModel("服务异常,请稍后重试!");
                if(xhr.status == 401) {//status这里是error，因为是在相应中的401状态位，所以需要用xhr.status判断
                        //warningInfo(xhr.responseText);//封装的弹窗提醒
                        top.location.href = ctx+'/login/perLogin.do';//跳转到登录页面
                	//window.location.href = ctx+'/login/perLogin.do';//跳转到登录页面
                        return;
                    }
                    _error(xhr, status, error);
                }
        });

        _ajax(_opt);
    };
});

/*jQuery(function($){
    // 备份jquery的ajax方法  
    var _ajax=$.ajax;
    // 重写ajax方法，先判断登录在执行success函数 
    $.ajax=function(opt){
    	var _success = opt && opt.success || function(a, b){};
        var _opt = $.extend(opt, {
        	success:function(data, textStatus){
        		console.log(textStatus);
        		console.log(data);
        		// 如果后台将请求重定向到了登录页，则data里面存放的就是登录页的源码，这里需要找到data是登录页的证据(标记)
        		if(data){
        			if(data.indexOf('49cdd9d3-a473-4aef-8190-5dc5bf7b3984') != -1) {
            			window.location.href=ctx+'/login/perLogin.do';
            			return;
            		}
        		}
        		
        		_success(data, textStatus);  
            }  
        });
        _ajax(_opt);
    };
});*/
