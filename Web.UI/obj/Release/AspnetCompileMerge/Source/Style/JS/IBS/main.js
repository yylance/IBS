//var menuJsonData;
//模板、用于渲染各个层级的菜单
var mTemplate = {
    1: "<li><a  linkURL='{2}'  selfID='{0}'>{1}</a></li>",
    2: "<a  linkURL='{2}' selfID='{0}' >{1}</a><em>|</em>"
};

var mIsShortcut = false, //用于标记判断是否是快捷菜单点击后的触发
    onHideLevel2 = true;//是否开启隐藏二级空菜单

$(function () {
    //调用GetUserMenu（Aries.Controllers的DefaultController.cs中=》用户首页呈现的菜单数据）
    //获取用户菜单（权限范围内的）
    var menuJsonData = AR.Utility.Ajax.get("GetUserMenu");
    var rootID = undefined;
    var jsondata = formatTreeJson(menuJsonData, 'menuid', 'menuname', 'parentmenuid', rootID);
    //var div_menus = $("#div_menus");
    var ul1 = undefined;
    var ul_power = $("#ul_power");
    var ul = $("#ul_guid"); //一级菜单
    var ul_power_menu_2 = $("#ul_power_menu_2");//DY二级菜单
    var ul_power_2 = $("#ul_power_2");//DY二级菜单列表
    var ul_power_menu_3 = $("#ul_power_menu_3");//DY三级菜单
    var ul_power_3 = $("#ul_power_3");//DY三级菜单列表
    var nav_menu_point_temp = $(this), nav_menu_point_old = $(this), nav_menu_point_new = $(this);//DY 一级菜单临时节点

    //装载菜单
    LoadMainMenu(jsondata, ul, 1);

    //一级菜单项mousover事件
    $("#ul_guid>li").bind("mouseenter", function showUlPowerMenu2() {

        nav_menu_point_temp = $(this);
        var selfID2 = $(this).children("a").attr("selfid");
        var jsondata2 = formatTreeJson(menuJsonData, 'menuid', 'menuname', 'parentmenuid', selfID2);
        if (jsondata2.length == 0) {
            //没有子级
            var url = $(this).children("a").attr("linkurl");
            if (url != '#') {
                var text = $(this).children("a").html();
                $(this).click(function () {
                    closeAllTabs();
                    showTab(url, text);
                });

            }
            return false;
        }

        var position = $(this).offset();
        initMenu(jsondata2, ul_power_2, 1);
        ul_power_menu_2.menu('show', {
            left: position.left,
            top: position.top + $(this).height(),
        });
        ul_power_menu_2.mouseenter(function () {
            ul_power_menu_2.menu('show');
        });
        nav_menu_point_temp.click(function () {
            ul_power_menu_2.menu('show');
        });
        $('body').append(ul_power_menu_2);

    }).bind("mouseleave", function () {
        $("#ul_power_menu_2").menu('hide');
    });



    //二级菜单项mouseenter事件
    $(document).on("mouseenter", "#ul_power_2 > li", function showUlPowerMenu3() {
        var position = $(this).offset();
        var selfID3 = $(this).children("a").attr("selfid");
        jsondata3 = formatTreeJson(menuJsonData, 'menuid', 'menuname', 'parentmenuid', selfID3);
        if (jsondata3.length == 0) {
            //没有子级
            var url = $(this).children("a").attr("linkurl");
            if (url != '#') {
                var text = $(this).children("a").html();
                nav_menu_point_new = nav_menu_point_temp;

                $(this).click(function () {
                var title_new = nav_menu_point_new.children("a").html();
                var title_old = nav_menu_point_old.children("a").html();
                if (title_new != title_old) {

                    $('.tabs-inner span').each(function (i, n) {
                        var t = $(n).text();
                        $('#tabs').tabs('close', t);
                    });
                    nav_menu_point_old = nav_menu_point_new;
                }
                showTab(url, text);
                //加载一级菜单节点样式
                nav_menu_point_new.siblings().removeClass("hover");
                nav_menu_point_new.addClass("hover");
                });
            }
        }
        else {
            initMenu(jsondata3, ul_power_3, 1);
            ul_power_menu_3.menu('show', {
                left: position.left + 114,
                top: position.top
            });
            ul_power_menu_3.mouseenter(function () {
                ul_power_menu_3.menu('show');  
            });

            $('body').append(ul_power_menu_3);
        };
    }).on("mouseleave", "#ul_power_2 > li", function () {
        $("#ul_power_menu_3").menu('hide');
    })


    //二级菜单点击事件处理 DY
    //$(document).on("click", "#ul_power_2 > li", function () {
    //    $("#ul_power_2> li").removeClass("hover");
    //    $(this).addClass("hover");
    //    var text = $(this).children("a").html();
    //    var url = $(this).children("a").attr("linkurl");
    //    nav_menu_point_new = nav_menu_point_temp;  
    //    var title_new = nav_menu_point_new.children("a").html();
    //    var title_old = nav_menu_point_old.children("a").html();
    //    if (url != '#') {
    //        //当一级菜单选中项改变时，关闭当前所有Tab
    //        if (title_new != title_old) {

    //            $('.tabs-inner span').each(function (i, n) {
    //                var t = $(n).text();
    //                $('#tabs').tabs('close', t);
    //            });
    //            nav_menu_point_old = nav_menu_point_new;
    //        }
    //        //打开请求Tab
    //        showTab(url, text);
    //        //加载一级菜单节点样式
    //        nav_menu_point_new.siblings().removeClass("hover");
    //        nav_menu_point_new.addClass("hover");
           
    //    }
    //});

    //三级菜单项mouseenter事件处理 DY
    $(document).on("mouseenter", "#ul_power_3 > li", function () {

        $(this).click(function () {
            var text = $(this).children("a").html();
            var url = $(this).children("a").attr("linkurl");
            nav_menu_point_new = nav_menu_point_temp;
            var title_new = nav_menu_point_new.children("a").html();
            var title_old = nav_menu_point_old.children("a").html();
            if (url != '#') {
                //当一级菜单选中项改变时，关闭当前所有Tab
                if (title_new != title_old) {
                    closeAllTabs();
                    nav_menu_point_old = nav_menu_point_new;
                }
                //打开请求Tab
                showTab(url, text);
                //加载一级菜单节点样式
                nav_menu_point_new.siblings().removeClass("hover");
                nav_menu_point_new.addClass("hover");

            }
        })
    })


    //更换主题
    $('#set_theme').html('主题【' + (AR.Utility.Cookie.get("sys_theme") || 'default') + '】');
    $("#set_theme").mouseover(function () {
        var that = $(this);
        var position = $(this).offset();
        var div = $('#theme_menu');
        if (div.length > 0) {
            div.show();
        } else {
            var div = $("<div id='theme_menu'>");
            var ul = $('<ul>');
            var item = AR.Global.themes;
            for (var i = 0; i < item.length; i++) {
                var li = $('<li>');
                li.append($('<a>').html(item[i]));
                ul.append(li);
            }
            ul.children('li').click(function () {
                var themeName = $(this).children('a').html();
                setThemeName(themeName);
                AR.Utility.Cookie.set('sys_theme', themeName, 1);
                that.html('主题【' + (AR.Utility.Cookie.get("sys_theme") || 'default') + '】');
            }).end().addClass('div_menu');
            div.css({ height: 'auto', width: '120', position: 'absolute', top: position.top + that.height(), left: position.left, zIndex: 1000 });
            div.append(ul);
            div.mouseout(function () {
                div.hide();
            });
            div.mouseover(function () {
                div.show();
            });
            $('body').append(div);
        }
    }).mouseout(function () {
        $('#theme_menu').hide();
    });

    /*function setThemeName(themeName) {
          var ui = AR.Utility.Cookie.get('sys_ui') || '';
          $('#lk_theme').attr('href', ui + '/Style/JS/EasyUI-1.3.4/themes/' + themeName + '/easyui.css');
          $.each($("#tabs").tabs('tabs'), function () {
              var iframe = this.find('iframe')[0];
              if (iframe) {
                  var document = iframe.contentWindow;
                  if (document.$) {
                      document.$('#lk_theme').attr('href', ui + '/Style/JS/EasyUI-1.3.4/themes/' + themeName + '/easyui.css');
                  }

              }
          });
      }*/



    //用户信息鼠标停留菜单--DY
    $('#lbUserName').mouseover(function () {
        var that = $(this);
        var position = $(this).offset();
        var div = $('#lbUserName_menu');
        div.menu('show', {
            left: position.left,
            top: position.top + that.height()
        });
        div.mouseout(function () {
            div.menu('hide');
        });
        div.mouseover(function () {
            div.menu('show');
        });
        $('body').append(div);
    }).mouseout(function () {
        $('#lbUserName_menu').menu('hide')
    });

    //密码修改功能
    $('#btn_modify').click(function () {
        var $div = $('<div>').addClass('wrap');
        var $lbl1 = $('<label>').html(' 新密码：');
        var $lbl2 = $('<label>').html('确认密码：');
        var $pwd1 = $('<input type="password">').attr('id', 'pwd1');
        var $pwd2 = $('<input type="password">').attr('id', 'pwd2');
        var $btnSave = $('<a>').attr('id', 'btn_save').addClass('btn red').html('保存');
        var $btnClose = $('<a>').attr('id', 'btn_save').addClass('btn blue').html('关闭');

        $div.append($('<p>').append($lbl1).append($pwd1)).append($('<p>').append($lbl2).append($pwd2)).append($btnSave).append($btnClose);
        AR.Utility.Window.dialog('修改密码', $div, { width: 480, height: 250 });

        $btnSave.click(function () {
            var pwd1 = $pwd1.val();
            var pwd2 = $pwd2.val();
            if (pwd1 != pwd2) { AR.Utility.Window.showMsg('输入密码不一致！', '系统提示'); return; };
            var reg = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])[^'\"%/\\\\]{8,20}$");
            if (!reg.exec(pwd2)) {
                AR.Utility.Window.showMsg("密码过于简单，必须由[数字、字母、符号]组成的8~20位字符", '系统提示');
                return;
            }
            AR.Utility.Ajax.post('ChangePassword', null, { pwd: pwd2 }, function (result) {
                if (result.success) {
                    AR.Utility.Window.closeDialog();
                }
                AR.Utility.Window.showMsg(result.msg, '系统提示');
            });
        });
        $btnClose.click(function () {
            AR.Utility.Window.closeDialog();
        });
    });
    //主页刷新功能
    $('#btn_refresh').click(function () {
        location.reload();
    });
    //查看about功能
    $('#btn_about').click(function () {
        var $div = $('#about_window');
        $div.css("display", "block");
        AR.Utility.Window.dialog('关于', $div, { width: 480, height: 250 });
    });

});


/*
function getThemeName() {
    return AR.Utility.Cookie.get("sys_theme");
}
*/

//装载菜单
function LoadMainMenu(jsonSource, Dom, tempIndex) {
    initMenu(jsonSource, Dom, tempIndex);
    //
}
//初始化当前根节点下所有子菜单 --initMenu(jsondata, ul, 1);
function initMenu(jsonSource, Dom, tempIndex) {
    var innnerhtml = "";
    for (var i = 0; i < jsonSource.length; i++) {
        if (jsonSource[i].attributes.isshow == 1) {
            var menuID = jsonSource[i].id;
            var menuName = jsonSource[i].text;
            var menuUrl = jsonSource[i].attributes.menuurl;
            var template = mTemplate[tempIndex];
            innnerhtml = innnerhtml + AR.Utility.stringFormat(template, menuID, menuName, menuUrl);
        }
    }
    Dom.html(innnerhtml);
    //先注册完事件，再触发
    //setTimeout(function () {
    //    Dom.children().eq(0).addClass("hover").click();
    //}, 100);
    
}

//使用递归遍历得到最后一层节点
function getFirstNode(jsonItem) {
    if (jsonItem.children.length > 0) {
        return getFirstNode(jsonItem.children[0]);
    } else {
        return jsonItem.id;
    }
}

//功能栏单击事件处理
$(document).on("click", "#ul_power > li", function () {
    $("#ul_power> li").removeClass("hover");
    $(this).addClass("hover");
    var text = $(this).children("a").html();
    var url = $(this).children("a").attr("linkurl");
    if (url != '#') {
       //关闭所有Tab
        closeAllTabs();
        //显示请求Tab
        showTab(url, text);
    }
});


//是否直接打开一个tab
function showTab(url, text, isAddBackUrl) {
    if (typeof (url) == 'string') {
        if (url.length > 4) {
            var tab = addTab(url, text, isAddBackUrl);
            tabCloseFunc(tab);
            return false;
        }
    }
    return true;
}

//传入tab添加关闭功能
function tabCloseFunc(tab) {
    var span = tab.panel('options').tab.find('.tabs-inner');
    span.unbind("dblclick").dblclick(function () {
        var subtitle = $(this).children("span").text();
        $('#tabs').tabs('close', subtitle);
    });

    span.unbind('contextmenu').bind('contextmenu', function (e) {
        var mm = $('#mm');
        mm.menu('show', {
            left: e.pageX,
            top: e.pageY
        });
        var subtitle = $(this).children("span").text();
        mm.data("currtab", subtitle);
        return false;
    });
}
//添加选项卡方法，根据iframe模式
function addTab(url, title, isAddHistory) {
    var h = 43;//DY
    var TabContainer = $("#tabs");
    var iframe = $("<iframe frameborder='0' />");
    iframe.attr({ "src": url, "id": "f_center" }).css({ width: "100%", height: TabContainer.height() - h });
    //判断选项卡不存在则新增一个选项卡
    var tab = null;
    if (!TabContainer.tabs("exists", title)) {
        tab = TabContainer.tabs('add', {
            title: title,
            content: iframe,
            closable: true,
            tools: [{
                iconCls: 'icon-mini-refresh',
                handler: function () {
                    var tab = $("#tabs").tabs("getTab", title);
                    tab.panel('refresh');//ie8下没反应
                    //this.iframe[0].src = url;
                }
            }]
        });
    } else {
        tab = TabContainer.tabs("getTab", title);
        var oldSrc = tab.panel().panel('body').find('#f_center').attr('src');
        if (isAddHistory == true) {
            if (typeof (tab.historyUrl) == 'undefined')
                tab.historyUrl = new Array();
            tab.historyUrl.push(oldSrc);
        }
        tab.panel("options").content = iframe;
        TabContainer.tabs("select", title);
        //TabContainer.tabs('update', { tab: tab, options: { content: iframe } });
        // tab.panel('refresh');
    }
    if (TabContainer.tabs("tabs").length > 5) {
        TabContainer.tabs("close", 0);
    }
    return TabContainer.tabs('getTab', title);
}
//
function formatTreeJson(nodesdatas, idField, textField, parentField, rootID) {
    return function (parentid) {
        var cn = new Array();
        for (var i = 0; i < nodesdatas.length; i++) {
            var n = {}, attrs = {};
            if (nodesdatas[i].isshow == 0) { continue; };
            each: for (var j in nodesdatas[i]) {
                if (j == idField || j == textField) {
                    continue each;
                }
                attrs[j] = nodesdatas[i][j];
            }
            if (!n.attributes) {
                n.attributes = attrs;
            }
            n.id = nodesdatas[i][idField], n.text = nodesdatas[i][textField], n.state = 'open';
            var pid = nodesdatas[i][parentField] == '' ? undefined : nodesdatas[i][parentField];
            if (pid == parentid) {
                var id = nodesdatas[i][idField];
                n.children = arguments.callee(id);
                cn.push(n);

            }
        }
        return cn;
    }(rootID);

}
            //anotherWay Tree

$(function () {
    tabCloseEven();
});
//传入tab添加关闭功能
function tabCloseFunc(tab) {
    var span = tab.panel('options').tab.find('.tabs-inner');
    span.unbind("dblclick").dblclick(function () {
        var subtitle = $(this).children("span").text();
        $('#tabs').tabs('close', subtitle);
    });

    span.unbind('contextmenu').bind('contextmenu', function (e) {
        var mm = $('#mm');
        mm.menu('show', {
            left: e.pageX,
            top: e.pageY
        });
        var subtitle = $(this).children("span").text();
        mm.data("currtab", subtitle);
        return false;
    });
}
//绑定右键菜单事件
function tabCloseEven() {
    //关闭当前
    $('#mm-tabclose').click(function () {
        var currtab_title = $('#mm').data("currtab");
        $('#tabs').tabs('close', currtab_title);
    })
    //全部关闭
    $('#mm-tabcloseall').click(function () {
        closeAllTabs();
    });
    //关闭除当前之外的TAB
    $('#mm-tabcloseother').click(function () {
        var currtab_title = $('#mm').data("currtab");
        $('.tabs-inner span').each(function (i, n) {
            var t = $(n).text();
            if (t != currtab_title)
                $('#tabs').tabs('close', t);
        });
    });
    //关闭当前右侧的TAB
    $('#mm-tabcloseright').click(function () {
        var nextall = $('.tabs-selected').nextAll();
        if (nextall.length == 0) {
            //msgShow('系统提示','后边没有啦~~','error');
            alert('选中项右边不存在Tab');
            return false;
        }
        nextall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });
    //关闭当前左侧的TAB
    $('#mm-tabcloseleft').click(function () {
        var prevall = $('.tabs-selected').prevAll();
        if (prevall.length == 0) {
            alert('选中项左边不存在Tab');
            return false;
        }
        prevall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });
};
function closeAllTabs() {
    $('.tabs-inner span').each(function (i, n) {
        var t = $(n).text();
        $('#tabs').tabs('close', t);
    });
};
