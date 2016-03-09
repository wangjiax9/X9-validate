/***
 * X9校验插件
 * @Author wjl
 */
(function($){
	var x9Validate = {};
	
	x9Validate.methods = {
		showMsgBox : function(obj,msg){	//显示校验提示框
			var boxId = obj.data("boxId");
			if(boxId == null || boxId == ""){
				var $messageBox =$("<div class='x9-validate-msg-box'>\
					<span class='box-msg'></span></div>");
				$messageBox = $messageBox.insertAfter(obj).text(msg);
				var boxtLeft = obj.position().left+(obj.width()-$messageBox.width())/2+"px";
				var boxtTop = obj.position().top-obj.height()-30+"px";
				$messageBox
					.append("<span class='arrow-down'></span>")
					.attr("id","boxId"+parseInt(Math.random()*100000))
					.css({
							left:boxtLeft,
							top:boxtTop
						});
				obj.data("boxId",$messageBox.attr("id"));
			}
		},
		destoryMsgBox : function(obj){	//销毁校验提示框
			if(obj.data("boxId") != null && obj.data("boxId") != ""){
				$("#"+obj.data("boxId")).remove();
				obj.data("boxId","");
			}
		},
		formValid : function(obj){
			var result = true;
			obj.find("input[x9-validate]").each(function(){
				result = $(this).x9Valid();
				if(!result){
					return false;
				}
			});
			return result;
		}
	};
	
	x9Validate.rules = {
		required : {
			valid:function(value){
				if(value != null && value.trim() != ""){ return true;}
				else{return false;}
			},
			message:function(){return "此项为必填项！";}
		},
		length : {
			valid:function(value,param){
				var size = value.length;
				if( param.min <= size && size <= param.max){ return true;}
				else {return false;}
			},
			message:function(param){return "输入的字符必须在"+param.min+"~"+param.max+"之间";}
		},
		max : {
			valid:function(value,param){
				var size = value.length;
				if( size <= param.max){ return true;}
				else {return false;}
			},
			message:function(param){return "最大不能超过"+param.max+"个字符";}
		},
		min : {
			valid:function(value,param){
				var size = value.length;
				if( size >= param.min){ return true;}
				else {return false;}
			},
			message:function(param){return "不能少于"+param.min+"个字符";}
		},
		email : {
			valid:function(value){
				var reg = /^\w+@\w+.[a-zA-Z]{2,3}$/;
				return reg.test(value);
			},
			message:function(){return "请输入正确的邮箱格式！";}
		},
		integer :{
			valid:function(value){
				var reg = /^\d+$/;
				return reg.test(value);
			},
			message:function(){return "请输入整数！";}
		},
		CN :{
			valid:function(value){
				var reg =  /^[\u0391-\uFFE5]+$/
				return reg.test(value);
			},
			message:function(){return "请输入汉字！";}
		},
		phone :{
			valid:function(value){
				var reg = /^(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
				return reg.test(value);
			},
			message:function(){return "输入的电话号码格式不正确！";}
		}
	};
	function validate(obj,ruleName){
		//参数
		var param = {};
		//保留原始规则名
		var rName = ruleName;
		if(ruleName.indexOf("length") != -1){
			//取得规则名称
			ruleName = ruleName.substring(0,ruleName.indexOf("["));
			param.min = rName.substring(rName.indexOf("[")+1,rName.indexOf("-"));
			param.max = rName.substring(rName.indexOf("-")+1,rName.indexOf("]"));
		}
		if(ruleName.indexOf("max") != -1){
			//取得规则名称
			ruleName = ruleName.substring(0,ruleName.indexOf("["));
			param.max = rName.substring(rName.indexOf("[")+1,rName.indexOf("]"));
		}
		if(ruleName.indexOf("min") != -1){		
			//取得规则名称
			ruleName = ruleName.substring(0,ruleName.indexOf("["));
			param.min = rName.substring(rName.indexOf("[")+1,rName.indexOf("]"));
		}
		//先判断该规则名称存不存在
		if(x9Validate.rules.hasOwnProperty(ruleName)){
			rule = x9Validate.rules[ruleName];
			if(!rule.valid(obj.val(),param)){
				x9Validate.methods.showMsgBox(obj,rule.message(param));
				return false;
			}else{
				x9Validate.methods.destoryMsgBox(obj);
				return true;
			}
		}
	}
	//对象插件，x9校验从这里开始
	$.fn.x9Valid = function(){
		var result =  true;
		var opts = $(this).attr("x9-validate");
		if(typeof opts == "string"){
			var rules = opts.split(",");
			for (var i in rules) {
				result = validate($(this),rules[i]);
				if(!result) break;
			}
		}
		return result;
		
	}
	$.fn.x9Validate = function(){
		return x9Validate.methods.formValid($(this));
	}
	
	$(function(){
		$("input[type='text'],input[type='password'],textarea").on("blur",function(){
			if($(this).attr("x9-validate")){
				$(this).x9Valid();
			}
		});
		$("input[x9-validate]").closest("form").on("submit",function(){
			return x9Validate.methods.formValid(fObj);
		});
	});
})(jQuery)
