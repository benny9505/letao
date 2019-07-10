$(function() {
    var currentPage = 1;
    var pageSize = 5;
    render();

    // 渲染页面
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("tpl", info);
                $('tbody').html(htmlStr);

                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        // page 当前点击的页码
                        currentPage = page;
                        // 调用 render 重新渲染页面
                        render();
                    }
                });
            }
        })
    };


    // 点击禁用模态框弹出
    $('.lt_content tbody').on("click", ".btn", function () {
        console.log("1");
        $("#userModal").modal("show");
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        console.log(id, isDelete);


    $('#userBtn').on("click", function () {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: id,
                isDelete: isDelete,
            },
            dataType: "json",
            success: function (info) {
                //console.log( info )
                if (info.success) {
                    // 修改状态成功
                    // 关闭模态框 显示show, 关闭hide
                    $('#userModal').modal("hide");
                    // 页面重新渲染
                    render();
                }
            }
        })
    })
    });
})