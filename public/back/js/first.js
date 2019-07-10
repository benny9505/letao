$(function(){
    var currentPage =1;
    var pageSize =5;
    render()
    function render(){
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data: {
                page: currentPage,
                pageSize: pageSize,

            },
            dataType: "json",
            success: function(info) {
                console.log(info);
                // 模版引擎渲染
                var htmlStr = template("first-tpl", info);
                $('.lt_content tbody').html(htmlStr);

                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked:function(a, b ,c ,page){
                        currentPage = page;
                        render();
                    }

                })
            }

        })


    };
    $('#addBtn').click(function() {
        $('#addModal').modal("show");

    });
    /*表单校验*/
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "名字不能为空"
                    }
                }
            }
        }
    })

    $('#form').on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            url:"/category/addTopCategory",
            type: "post",
            data: $('#form').serialize(),
            dataType: "json",
            success: function(info){
                console.log(info);
                currentPage = 1;
                render();
                $('#addModal').modal("hide");
                $('#form').data("bootstrapValidator").resetForm( true );
            }
        })
    })
})