$(function(){
    $("form").bootstrapValidator({
        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'  //校验中
        },
        // 配置字段
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message:"用户名不能为空",
                        },
                    stringLength:{
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2-6位"
                    }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message:"密码不能为空",
                        },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须6-12位"
                    }
                }

            }
        }
    })
});