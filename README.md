  

在input中添加属性x9-validate，如：  
```
<input type="text" class="col-sm-6 input-lg" x9-validate="email" placeholder="这里只能输入的必须是邮箱格式"/>

```
#####校验规则
目前就提供以下几种常见校验规则：
required：必填  
length[6-16]：长度区间  
email：邮箱  
integer：整数  
phone：电话  
max[16]：最大长度  
min[6]：最小长度  
CN：汉字  
多重校验只需英文逗号相隔：x9-validate="required,email,length[10-16]"  

- - -
#####ajax提交表单校验
//formId为表单ID  
var result = $("#formId").x9Validate();     //返回值 true：该表单校验成功 ，false : 该表单中有不满足校验项  
#####无表单的input校验
//inputId为表单域控件ID  
var result  = $("#inputId").x9Valid();    //返回值 true：验证成功，false : 校验失败!
