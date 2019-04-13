
function init(){
    var htmlStr='<div id="tipModel">'
        +'<div class="dialog">'
        +'<div class="header">'
        +'提示框'
        +'</div>'
        +'<div class="body">'
        +'</div>'
        +'<div class="footer">'
        +'<button class="cancel-btn">取消</button>'
        +'<button class="confirm-btn">确定</button>'
        +'</div>'
        +'</div>'
        +'</div>'
    var $tipModel=$(htmlStr).appendTo($("body"));
    $tipModel.find(".cancel-btn").click(function(){
        $tipModel.hide();
    })
    

    $("body").on("click",".myCheckbox",function(){
        $(this).toggleClass("myCheckbox_checked");
    })

    $("body").on("click",".model > .dialog > .header .close,.model > .dialog > .footer .cancel-btn",function(){
        var $model=$(this).parents(".model");
        if($model.length > 1){
            $model.eq(0).hide();
        }else{
            $model.hide();
        }
        if($model.find(".footer-searchList").length){
            global.pageIndex=global.pageIndex_previous;
            global.pageSize=global.pageSize_previous;
        }
    })
}

function beginDateGtEndDate(beginDate,endDate) {
    var separator="";
    if(beginDate.indexOf("/") != -1){
        separator="/";
    }
    if(beginDate.indexOf("-") != -1){
        separator="-";
    }
    if(beginDate.indexOf(".") != -1){
        separator=".";
    }
    if(beginDate.indexOf("年") != -1){
        separator="年";
    }
    var beginYear;
    var beginMonth;
    var beginDay;
    var endYear;
    var endMonth;
    var endDay;
    if(separator == "年"){
        beginYear=parseInt(beginDate.split("年")[0]);
        beginMonth=parseInt(beginDate.split("年")[1].split("月")[0]);
        beginDay=parseInt(beginDate.split("年")[1].split("月")[1].split("日")[0]);
        endYear=parseInt(endDate.split("年")[0]);
        endMonth=parseInt(endDate.split("年")[1].split("月")[0]);
        endDay=parseInt(endDate.split("年")[1].split("月")[1].split("日")[0]);
    }else{
        beginYear=parseInt(beginDate.split(separator)[0]);
        beginMonth=parseInt(beginDate.split(separator)[1]);
        beginDay=parseInt(beginDate.split(separator)[2]);
        endYear=parseInt(endDate.split(separator)[0]);
        endMonth=parseInt(endDate.split(separator)[1]);
        endDay=parseInt(endDate.split(separator)[2]);
    }
    if(beginYear > endYear){
        return true;
    }else if(beginYear < endYear){
        return false;
    }else{
        if(beginMonth > endMonth){
            return true;
        }else if(beginYear < endYear){
            return false;
        }else{
            if(beginDay > endDay){
                return true;
            }else{
                return false;
            }
        }
    }
}

function resetObj(allObj,resetObj){
    for(var key in allObj){
        allObj[key] = null;
    }
    if(resetObj){
        for(var key in resetObj){
            allObj[key] = resetObj[key];
        }
    }
}

function makeTooltip(content,x,y,width){
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
}
function tooltipMousemove(x,y){
	$("#tooltip").css("left",x+5);
	$("#tooltip").css("top",y+5);
	if(($("#tooltip")[0].offsetLeft+$("#tooltip")[0].offsetWidth)>$(window).width()){
		$("#tooltip").css("left",x-$("#tooltip")[0].offsetWidth-5);
	}
	if(($("#tooltip")[0].offsetTop+$("#tooltip")[0].offsetHeight)>$(window).height()){
		$("#tooltip").css("top",y-$("#tooltip")[0].offsetHeight-5);
	}
}

function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 36), 1);
	}
	//s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	//s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	//s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid;

	//var d = new Date().getTime();
	//var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	//	var r = (d + Math.random()*16)%16 | 0;
	//	d = Math.floor(d/16);
	//	return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	//});
	//return uuid;
}

function showTipModel(param,callback){
	var $modal=$("#tipModel");
	$modal.find(".body").css("max-width","3rem");
	$modal.find(".body").css("width","auto");
	$modal.find(".body").css("text-align","center");
	$modal.find('.footer .confirm-btn').unbind();
	$modal.find('.footer .confirm-btn').click(function(){
		$modal.hide();
	})
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
}

function makeWaiting($container){
	var waiting='<div id="waiting"><img src="'+require("@/common/image/waiting.gif")+'"/></div>';
	if($container && $container.length){
		$(waiting).appendTo($container);
	}else{
		$(waiting).appendTo($("body"));
	}

	//var $waitingImg=$waiting.find("img");
	//$waitingImg.css("left",($container.width() - $waitingImg.width())/2);
	//$waitingImg.css("top",($container.height() - $waitingImg.height())/2);
}

function removeWaiting(){
	$("#waiting").remove();
}

function isNull(value){
    value=$.trim(value);
    var isNull=false;
    if(!value && (value !== 0)){
        isNull=true;
    }
    return isNull;
};

function validate_isNotNull($model){
    var validateResult=true;
    $model.find(".each .notNull").each(function(){
        var name=$(this).parent(".name").text();
        name=name.split("*")[1].split("：")[0];
        $(this).parents(".each").find("input,textarea").each(function(){
            var value=$(this).val();
            if(isNull(value)){
                showTipModel(name+"不能为空");
                validateResult=false;
                return false;
            }
        })
        if($(this).parents(".each").find(".radio").length || $(this).parents(".each").find(".checkbox").length){
            if(!$(this).parents(".each").find(".checked").length){
                showTipModel(name+"不能为空");
                validateResult=false;
                return false;
            }
        }
        if(!validateResult){
            return false;
        }
    })
    return validateResult;
};

function getBranchOfTree(linkDataArray){
    var node = "4";
    var childs = get_node_childs(node,linkDataArray);
    //var childs = get_node_father(node,linkDataArray);
    var leafs = get_node_leafs(linkDataArray);
    var array = new Array();
    //alert(array.length);
    var data = get_tree_route(linkDataArray);
    //document.getElementById("demo").innerHTML = leafs;
    return data;

    function get_root_node(linkDataArray){
        /*寻在数的根节点
         [
         {"from":"1", "to":"3"},
         {"from":"3", "to":"4"},
         {"from":"4", "to":"5"},
         {"from":"5", "to":"2"},
         {"from":"4", "to":"6"},
         {"from":"6", "to":"5"},
         {"from":"4", "to":"7"},
         {"from":"7", "to":"5"}
         ]
         */
        var i;
        //nodeRoot = -1
        for(i=0;i<linkDataArray.length;i++){
            var nodeFrom = linkDataArray[i].from;
            var nodeTo = linkDataArray[i].to;
        }
    }

    function get_node_childs(node,linkDataArray){
        /*
         获取节点node的所有子节点
         example:
         node=='4':
         linkDataArray = [{"from":"4", "to":"6"},
         {"from":"6", "to":"5"},
         {"from":"4", "to":"7"}]
         return
         [4,7]
         */
        var nodeList = new Array();//存储节点node的子节点
        var i;
        //nodeRoot = -1
        for(i=0;i<linkDataArray.length;i++){
            var nodeFrom = linkDataArray[i].from;
            var nodeTo   = linkDataArray[i].to;
            if(node==nodeFrom){
                nodeList.push(nodeTo);
            }
        }
        return nodeList;
    }

    function get_node_father(node,linkDataArray){
        /*
         获取节点node的父节点
         example:
         node=='5':
         linkDataArray = [{"from":"4", "to":"6"},
         {"from":"6", "to":"5"},
         {"from":"4", "to":"7"}]
         return
         '6'
         */
        var fatherNode = null;//根节点默认父子节点不存在 为null
        var i;
        //nodeRoot = -1
        for(i=0;i<linkDataArray.length;i++){
            var nodeFrom = linkDataArray[i].from;
            var nodeTo   = linkDataArray[i].to;
            if(node==nodeTo){
                fatherNode =nodeFrom ;
                break;
            }
        }
        return fatherNode;
    }

    function  get_node_leafs(linkDataArray){
        /*
         获取数的所有根节点
         example:
         linkDataArray = [{"from":"4", "to":"6"},
         {"from":"6", "to":"5"},
         {"from":"4", "to":"7"}]
         return :[5,7]
         */
        var nodeLeafs = new Array();//存储叶子节点
        var i;
        for(i=0;i<linkDataArray.length;i++){
            var nodeFrom = linkDataArray[i].from;
            var nodeTo   = linkDataArray[i].to;
            //如果某一个节点无子节点，那么该节点就为叶子节点
            var  childNodes = get_node_childs(nodeTo,linkDataArray);
            if(childNodes.length==0){
                nodeLeafs.push(nodeTo);
            }
        }
        return nodeLeafs;

    }

    function get_tree_route(linkDataArray){
        /*
         获取所有路径
         example:
         linkDataArray = [
         {"from":"1", "to":"2"},
         {"from":"2", "to":"4"},
         {"from":"4", "to":"5"},
         {"from": "3","to":'31'}
         ];
         return [[1,2,4,5],[3,31]]
         */
        var leafs = get_node_leafs(linkDataArray);//获取所有叶子节点
        var i;
        var routes = {};

        for(i=0;i<leafs.length;i++){
            var leaf =  leafs[i];
            var route= new Array();
            route.push(leaf);
            var fatherNode = get_node_father(leaf,linkDataArray);

            while(fatherNode!=undefined){

                route.push(fatherNode);

                fatherNode = get_node_father(fatherNode,linkDataArray);
            }

            routes[leaf] = route;
        }
        return routes;
    }
}

function deleteSelectedNodeAndRelation(diagram){
    var selnode = diagram.selection.first();
    var selKey=selnode.data.key;
    //diagram.commandHandler.deleteSelection();
    var nodeDataArray=diagram.model.nodeDataArray;
    var linkDataArray=diagram.model.linkDataArray;
    var branchObj=getBranchOfTree(linkDataArray);
    //var branchList=[];
    var needDeletedNodes=[];
    for(var key in branchObj){
        var needDelete=false;
        branchObj[key].reverse();
        //branchList.push(branchObj[key]);
        for(var i=0;i<branchObj[key].length;i++){
            if(needDelete){
                needDeletedNodes.push(branchObj[key][i]);
            }else{
                if(selKey == branchObj[key][i]){
                    needDelete=true;
                    needDeletedNodes.push(branchObj[key][i]);
                }
            }
        }
    }
    var needDeletedNodes=[...new Set(needDeletedNodes)];
    var newNodeDataArray=[];
    var needDeletedParentNodes=$.extend(true, [], needDeletedNodes);
    for(var i=0;i<needDeletedParentNodes.length;i++){
        for(var j=0;j<nodeDataArray.length;j++){
            if(needDeletedParentNodes[i] == nodeDataArray[j].key){
                getChildNodeKeysByNode(nodeDataArray[j],nodeDataArray,needDeletedNodes);
                break;
            }
        }
    }
    for(var i=0;i<nodeDataArray.length;i++){
        var needDelete=false;
        for(var j=0;j<needDeletedNodes.length;j++){
            if((nodeDataArray[i].key == needDeletedNodes[j])){
                needDelete=true;
                break;
            }
        }
        if(!needDelete){
            newNodeDataArray.push(nodeDataArray[i]);
        }
    }
    var newLinkDataArray=[];
    for(var i=0;i<linkDataArray.length;i++){
        var needDelete=false;
        for(var j=0;j<needDeletedParentNodes.length;j++){
            if((linkDataArray[i].from == needDeletedParentNodes[j]) || (linkDataArray[i].to == needDeletedParentNodes[j])){
                needDelete=true;
                break;
            }
        }
        if(!needDelete){
            newLinkDataArray.push(linkDataArray[i]);
        }
    }
    diagram.startTransaction("delete node");
    diagram.model.nodeDataArray=newNodeDataArray;
    diagram.model.linkDataArray=newLinkDataArray;
    diagram.commitTransaction("delete node");
}

function getChildNodeKeysByNode(parentNode,nodeDataArray,keyContainer){
    if(parentNode.isGroup){
        for(var k=0;k<nodeDataArray.length;k++){
            if(parentNode.key == nodeDataArray[k].group){
                keyContainer.push(nodeDataArray[k].key);
                getChildNodeKeysByNode(nodeDataArray[k],nodeDataArray,keyContainer);
            }
        }
    }
}

export default{
    init,
	makeTooltip,
	tooltipMousemove,
	uuid,
	showTipModel,
	makeWaiting,
	removeWaiting,
    validate_isNotNull,
    isNull,
    resetObj,
    getBranchOfTree,
    deleteSelectedNodeAndRelation,
    getChildNodeKeysByNode,
};