        $(document).ready(function(){
        var range = 660;             //距下边界长度/单位px
        var elemt = 10;           //插入元素高度/单位px
        var maxnum = 20;            //设置加载最多次数
        var num = 1;
        var totalheight = 0;
        var main = $("#tbodytemplate");                     //主体元素
        $(".contenttable").scroll(function(){
             var $this =$(this);
             viewH =$(this).height();
             contentH =$(this).get(0).scrollHeight,//内容高度
             scrollTop =$(this).scrollTop();//滚动高度
            if(scrollTop/(contentH -viewH)>=1){
                var itemNum = 15+ num;
                main.append('<tr><td><div class="c1"><div class="occupationnone"></div><div>'+itemNum+'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div></div></td> </tr>');
                num++;

            }

        });
		
		$("#LoginBox").scroll(function(){
			
            var $this =$(this);
             viewH =$(this).height();
             contentH =$(this).get(0).scrollHeight,//内容高度
             scrollTop =$(this).scrollTop();//滚动高度
            if(scrollTop/(contentH -viewH)>=1){

                var itemNum = 15+ num;
                $("#tbodytemplate2").append('<div class="c1"><div class="occupationnone"></div><div>'+itemNum+'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div></div>');
                num++;
            }
        });
    });
    //翻页获取的新数据用initdata来重新渲染
    /********************************表 格****************************/
    var tbodyId = "#tbodytemplate";
    var tbodyId2 = "#tbodytemplate2";
    var childrenClassName = "navitem";
    var tbodyData = [];
    //在这里填充所需要的数据，替换"item" + i即可
    function initdata(m,n){
        tbodyData = [];
        for(var i = m; i <= n; i++){
            tbodyData.push(["occupationnone",i+"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]);
        }
    }

    initdata(1,15);
    
    var navReplaceStr = ["{{occupation}}","{{content}}"];
    var template = initTemplate(tbodyId);
    var template2= initTemplate(tbodyId2);
    renderDom(tbodyId, tbodyData, navReplaceStr, template);
    renderDom(tbodyId2, tbodyData, navReplaceStr, template2);
    /******************************** common function ***************************/

    function initTemplate(domId){
        var template = $(domId).html();
        return template;
    }
    function renderDom(domId, domData, replaceStr, template){
        var Doms = [];
        for(var i = 0; i < domData.length; i++){
            var replacedDom = replaceTemplate(replaceStr, template, domData[i]);
            Doms.push(replacedDom);
        }
        Doms = Doms.join("");
        $(domId).html(Doms);

    }
    function replaceTemplate(replaceStr, template, realData){
        var replacedDom = "";
        for(var i = 0; i < replaceStr.length; i++){
            var regular = new RegExp(replaceStr[i],"g");
            template = template.replace(regular,realData[i]);
        }
        replacedDom = template;
        return replacedDom;
    }
    /******************************** pages function ***************************/
    switchPage("pages",template);
    function switchPage(domClass,template){
        $("."+domClass).bind("click",function(e){
            clearActive();
            if($(e.target).html() == "首页"){
                $(".first").addClass("active");
                initdata(1,10);
                renderDom(tbodyId, tbodyData, navReplaceStr,template);
            }else if($(e.target).html() == "尾页"){
                $(".last").addClass("active");
                initdata(11,20);
                renderDom(tbodyId, tbodyData, navReplaceStr,template);
            }else if($(e.target).html() == "&lt;"){
                $(".next").addClass("active");
                initdata(1,10);
                renderDom(tbodyId, tbodyData, navReplaceStr,template);
            }else if($(e.target).html() == "&gt;"){
                $(".pre").addClass("active");
                initdata(11,20);
                renderDom(tbodyId, tbodyData, navReplaceStr,template);
            }
        })
    }
    function clearActive(){
        $(".first").removeClass("active");
        $(".last").removeClass("active");
        $(".pre").removeClass("active");
        $(".next").removeClass("active");
    }