document.writeln("<div class=\"header\">");
document.writeln("    <div class=\"box clearfix header_top\">");
document.writeln("        <div class=\"fl logo-top \">");
document.writeln("            <a href=\"https://www.yantai.gov.cn\">");
document.writeln("                <img src=\"http://www.yantai.gov.cn/picture/83/2504161416486839601.png\" class=\"bz-img\">");
document.writeln("                <img src=\"http://www.yantai.gov.cn/picture/83/2110191703187567099.png\" class=\"old-img\"");
document.writeln("                     style=\"display: none;\">");
document.writeln("            </a>");
document.writeln("        </div>");
document.writeln("        <div class=\"search clearfix fl search-top\">");
document.writeln("            <form action=\"/api-gateway/jpaas-jsearch-web-server/search\" method=\"get\" target=\"_blank\"");
document.writeln("                  onsubmit=\"return checkFormguolv()\" style=\"outline: none;\">");
document.writeln("                <div class=\"fl\">");
document.writeln("                    <select class=\"sele\" id=\"select1\" name=\"\">");
document.writeln("                        <option value=\"1\">本站</option>");
document.writeln("                        <option value=\"2\">全网</option>");
document.writeln("                    </select>");
document.writeln("                </div>");
document.writeln("                <div class=\"fl\">");
document.writeln("                    <input name=\"serviceId\" type=\"hidden\" value=\"yglRfIhpRHsFrLutGVCBO\" style=\"outline: none;\">");
document.writeln("                    <input type=\"text\" id=\"q\" name=\"q\" maxlength=\"50\" class=\"searchText ss-txt\"");
document.writeln("                           onfocus=\"if(this.value==\'请输入关键字查询\'){this.value=\'\'}\"");
document.writeln("                           onblur=\"if(this.value==\'\'){this.value=\'请输入关键字查询\'}\" value=\"请输入关键字查询\" autocomplete=\"off\">");
document.writeln("                    <input type=\"hidden\" name=\"cateid\" id=\"cateid\" value=\"7I4sUcelGun35EIkKd3dy\" style=\"outline: none;\">");
document.writeln("                    <input type=\"hidden\" name=\"pos\" id=\"posid\" value=\"title,content,postnumber\">");
document.writeln("                </div>");
document.writeln("                <div class=\"fl\">");
document.writeln("                    <input type=\"submit\" class=\"ss-btn\" value=\"\" style=\"outline: none;\" tabindex=\"0\" accesskey=\"s\"");
document.writeln("                           role=\"button\">");
document.writeln("                </div>");
document.writeln("            </form>");
document.writeln("            <script language=\"javascript\">");
document.writeln("                function checkFormguolv() {");
document.writeln("                    var oTxe = document.getElementById(\"q\");");
document.writeln("                    if (oTxe.value == \"请输入关键字查询\" || oTxe.value == \"\") {");
document.writeln("                        alert(\"请输入关键字查询!\")");
document.writeln("                        oTxe.value = \"\";");
document.writeln("                        return false;");
document.writeln("                    }");
document.writeln("                }");
document.writeln("            </script>");
document.writeln("        </div>");
document.writeln("");
document.writeln("        <div class=\"header_right fr\">");
document.writeln("            <div class=\"login\">");
document.writeln("                <a href=\"javascript:void(0)\" class=\"jft_a\" tabindex=\"0\" aria-label=\"标题：繁体版\">繁体版</a>");
document.writeln("                <a tabindex=\"1\" href=\"javascript:;\" onclick=\"toggleToolBar();\" >无障碍</a>");
document.writeln("                <div style=\"display:none;\" class=\"waiwen\">");
document.writeln("                    <a>外文版</a>");
document.writeln("                    <div id=\"waiwen_xiala\" class=\"waiwen_xiala hide\">");
document.writeln("                        <a href=\"http://jp.yantai.gov.cn/\">日文版</a>");
document.writeln("                        <a href=\"http://kr.yantai.gov.cn/\">한국어판</a>");
document.writeln("                    </div>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("            <div class=\"login\">");
document.writeln("                <a href=\"https://ytcms.yantai.gov.cn/api-gateway/jpaas-airobot-web-server/front/index?robotId=EeUUCKMOde4v8wAj3nJnX\" tabindex=\"0\"");
document.writeln("                   aria-label=\"标题：智能机器人\">智能机器人</a>");
// document.writeln("                <a href=\"/jrobotfront-server/index.do?webid=1\" tabindex=\"0\"");
// document.writeln("                   aria-label=\"标题：智能机器人\">智能机器人</a>");
document.writeln("                <div class=\"top_left\">");
document.writeln("                    <a href=\"https://tysfrz.isdapp.shandong.gov.cn/api-gateway/jpaas-jis-sso-server/sso/entrance/auth-center?appMark=YTZFMKWZTYWTG&backUrl=https://www.yantai.gov.cn/yhzx/front/getinfo.do?gotourl=aHR0cHM6Ly93d3cueWFudGFpLmdvdi5jbi95aHp4L3VzZXJjZW50ZXIvbXl3b3JrLmRv\"");
document.writeln("                       class=\"login1\" accesskey=\"x\" tabindex=\"0\" aria-label=\"标题：用户中心\">用户中心</a>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"header-tubiao\">");
document.writeln("            <a href=\"/\"><img src=\"http://www.yantai.gov.cn/picture/83/2109101914444947142.png\" tabindex=\"-1\"");
document.writeln("                             aria-hidden=\"true\"></a>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("</div>");
document.writeln("");
document.writeln("<div class=\"nav\">");
document.writeln("    <ul class=\"box clearfix\">");
document.writeln("        <li class=\"\" id=\"shouye\">");
document.writeln("            <a href=\"https://www.yantai.gov.cn\">首页</a>");
document.writeln("        </li>");
document.writeln("        <li class=\"\">");
document.writeln("            <a href=\"/col/col51386/index.html\">党务公开</a>");
document.writeln("        </li>");
document.writeln("        <li>");
document.writeln("            <a href=\"/col/col11807/index.html\">政务公开</a>");
document.writeln("        </li>");
document.writeln("        <li>");
document.writeln("            <a href=\"/col/col41126/index.html\">政务服务</a>");
document.writeln("        </li>");
document.writeln("        <li>");
document.writeln("            <a href=\"/col/col11783/index.html\">互动交流</a>");
document.writeln("        </li>");
document.writeln("        <li>");
document.writeln("            <a href=\"/col/col11747/index.html\">品重烟台</a>");
document.writeln("        </li>");
document.writeln("        <li>");
document.writeln("            <a href=\"https://www.yantai.gov.cn/yhzx/front/threeAddTicket.do?zwAddr=http://data.yantai.gov.cn/yantai/index?siteCode=3706\"");
document.writeln("               target=\"_blank\">数据查询</a>");
document.writeln("        </li>");
document.writeln("        <div class=\"oldType_switch\">进入关怀模式</div>");
document.writeln("    </ul>");
document.writeln("    <div class=\"subnav-zong\">");
document.writeln("        <div class=\"subnav\"></div>");
document.writeln("        <div class=\"subnav\" id=\"subnav2\">");
document.writeln("            <div class=\"box\">");
document.writeln("                <a href=\"/col/col51397/index.html\" target=\"_blank\">领导动态</a>");
document.writeln("                <a href=\"/col/col51402/index.html\" target=\"_blank\">政策法规</a>");
document.writeln("                <a href=\"/col/col51398/index.html\" target=\"_blank\">公示公告</a>");
document.writeln("                <a href=\"/col/col51400/index.html\" target=\"_blank\">部门工作</a>");
document.writeln("                <a href=\"/col/col51401/index.html\" target=\"_blank\">基层党务</a>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"subnav\" id=\"subnav3\">");
document.writeln("            <div class=\"box\">");
document.writeln("                <a href=\"/col/col48053/index.html\">市政府领导</a>");
document.writeln("                <a");
document.writeln("                        href=\"/col/col12205/index.html\">机构职能</a>");
document.writeln("                <a");
document.writeln("                        href=\"/col/col42829/index.html?vc_xxgkarea=113706000042603877-1&jh=263\">政府信息公开</a>");
document.writeln("                <a href=\"/col/col99947/index.html?vc_xxgkarea=113706000042603877-1\">政策法规库</a>");
document.writeln("                <a href=\"/col/col43362/index.html?number=C2002\">市政府会议</a>");
document.writeln("                <a href=\"/col/col43369/index.html?number=C2003\">政策解读</a>");
//document.writeln("                <a href=\"http://www.yantai.gov.cn/col/col46594/index.html\">重点领域信息公开</a>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"subnav\" id=\"subnav4\">");
document.writeln("            <div class=\"box\">");
document.writeln("                <a href=\"http://ytzwfw.sd.gov.cn/yt/icity/doublehundred/index\" target=\"_blank\">一件事办理</a>");
document.writeln("                <a href=\"http://ytzwfw.sd.gov.cn/yt/icity/project/index\">办事服务</a>");
// document.writeln("                <a href=\"https://www.yantai.gov.cn/jiqfront/item/gr_index.do\">个人办事</a>");
// document.writeln("                <a href=\"https://www.yantai.gov.cn/jiqfront/item/fr_index.do\">法人办事</a>");
document.writeln("                <a href=\"http://ytzwfw.sd.gov.cn/yt/icity/result\" target=\"_blank\">结果公示</a>");
document.writeln("                <a href=\"https://www.yantai.gov.cn/api-gateway/jpaas-jact-web-server/front/mail-write.do?platformIid=TBCxiImkDT42EEoX3QnkW&appMark=jact-WSMS\" target=\"_blank\">办事咨询</a>");
document.writeln("                <a href=\"https://www.yantai.gov.cn/yhzx/supervisecomment/list.do\" target=\"_blank\">监督投诉</a>");
document.writeln("                <a href=\"http://www.shandong.gov.cn/zwfwzjcs/intermediary/index?site=yantaishibenji\" target=\"_blank\">中介超市</a>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"subnav\" id=\"subnav5\">");
document.writeln("            <div class=\"box\">");
document.writeln("                <a href=\"https://tysfrz.isdapp.shandong.gov.cn/jis-web/login?appMark=TYZQITONGZHFUWLPN\" target=\"_blank\">12345接诉即办</a>");
document.writeln("                <a href=\"https://www.yantai.gov.cn/ytcxm/Cxm/views/cxm.aspx\" target=\"_blank\">12345诉求进度查询</a>");
document.writeln("                <a href=\"https://www.yantai.gov.cn/api-gateway/jpaas-jact-web-server/front/mail-write.do?platformIid=YgMOPJeFKdxv803E2TKqr&appMark=jact-SZXX\" target=\"_blank\">市长信箱</a>");
document.writeln("                <a href=\"https://www.yantai.gov.cn/api-gateway/jpaas-jact-web-server/front/mail-write.do?platformIid=TBCxiImkDT42EEoX3QnkW&appMark=jact-WSMS\">我要提问</a>");
document.writeln("                <a");
document.writeln("                        href=\"http://www.yantai.gov.cn/col/col45031/index.html?vc_xxgkarea=113706000042603877-1&jh=263\">意见征集</a>");
document.writeln("                <a href=\"/col/col118136/index.html\">在线访谈</a>");
document.writeln("                <a href=\"https://www.yantai.gov.cn/api-gateway/jpaas-jact-web-server/front/mail-pub-list.do?platformIid=TBCxiImkDT42EEoX3QnkW&type=2\"");
document.writeln("                   target=\"_blank\">办理情况</a>");
document.writeln("                <a href=\"http://www.yantai.gov.cn/col/col12299/index.html\" target=\"_blank\">数据统计</a>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"subnav\" id=\"subnav6\">");
document.writeln("            <div class=\"box\">");
document.writeln("                <a href=\"/col/col11751/index.html\">烟台概况</a>");
document.writeln("                <a href=\"/col/col11759/index.html\">城市名片</a>");
document.writeln("                <a href=\"/col/col11762/index.html\">区市之窗</a>");
document.writeln("                <a href=\"http://dsyjy.yantai.gov.cn/col/col49118/index.html\">烟台名人</a>");
document.writeln("                <a href=\"http://dsyjy.yantai.gov.cn/col/col49166/index.html\">地方志</a>");
document.writeln("                <a href=\"http://dsyjy.yantai.gov.cn/col/col49165/index.html\">烟台年鉴</a>");
//document.writeln("                <a href=\"/col/col12210/index.html\">友好城市</a>");
document.writeln("                <a href=\"/col/col11748/index.html\">今日烟台</a>");
document.writeln("                <a href=\"/col/col11750/index.html\">影像烟台</a>");
document.writeln("                <a href=\"/col/col11769/index.html\">图说烟台</a>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"subnav\"></div>");
document.writeln("    </div>");
document.writeln("");
document.writeln("");
document.writeln("</div>");
document.writeln("<!-- <div class=\"navWap\">");
document.writeln("");
document.writeln("	<ul id=\"wapul\">");
document.writeln("		<li>");
document.writeln("			<a href=\"https://www.yantai.gov.cn/\">首页</a>");
document.writeln("		</li>");
document.writeln("		<li>");
document.writeln("			<a href=\"/col/col51386/index.html\">党务公开</a>");
document.writeln("		</li>");
document.writeln("		<li>");
document.writeln("			<a href=\"/col/col11807/index.html\">政务公开</a>");
document.writeln("		</li>");
document.writeln("		<li>");
document.writeln("			<a href=\"/col/col41126/index.html\">政务服务</a>");
document.writeln("		</li>");
document.writeln("		<li>");
document.writeln("			<a href=\"/col/col11783/index.html\">互动交流</a>");
document.writeln("		</li>");
document.writeln("		<li>");
document.writeln("			<a href=\"/col/col11747/index.html\">品重烟台</a>");
document.writeln("		</li>");
document.writeln("		<li>");
document.writeln("			<a href=\"http://ytdata.sd.gov.cn\" target=\"_blank\">数据查询</a>");
document.writeln("		</li>");
document.writeln("		<li></li>");
document.writeln("	</ul>");
document.writeln("	<p onclick=\"check1()\" id=\"wapImg\"></p>");
document.writeln("");
document.writeln("</div> -->");
document.writeln("");
document.writeln("<div class=\"wap-ty-top\">");
document.writeln("    <div class=\"wap-ty-top-1\">");
document.writeln("        <img src=\"https://www.yantai.gov.cn/picture/83/2109161423157381531.png\">");
document.writeln("    </div>");
document.writeln("    <div class=\"wap-ty-top-2\">");
document.writeln("        <a href=\"https://www.yantai.gov.cn/jsearchfront/search.do?websiteid=370600000000000&tpl=63\"><img");
document.writeln("                src=\"https://www.yantai.gov.cn/picture/83/2109161423158957323.png\"></a>");
document.writeln("    </div>");
document.writeln("    <div class=\"wap-ty-top-3\">");
document.writeln("        <p onclick=\"check1()\" class=\"\" id=\"wapImg\"><img src=\"https://www.yantai.gov.cn/picture/83/2109161423158192671.png\"></p>");
document.writeln("    </div>");
document.writeln("    <div class=\"wap-ty-top-4\">");
document.writeln("        <a href=\"http://www.yantai.gov.cn/col/col50590/index.html\">");
document.writeln("            <img src=\"https://www.yantai.gov.cn/picture/83/2109161423158588052.png\">");
document.writeln("        </a>");
document.writeln("    </div>");
document.writeln("    <ul class=\"\" id=\"wapul\">");
document.writeln("        <li><a href=\"https://www.yantai.gov.cn/col/col51386/index.html\">党务公开</a></li>");
document.writeln("        <li><a href=\"https://www.yantai.gov.cn/col/col11807/index.html\">政务公开</a></li>");
document.writeln("        <li><a href=\"https://www.yantai.gov.cn/col/col50593/index.html\">政务服务</a></li>");
document.writeln("        <li><a href=\"https://www.yantai.gov.cn/col/col50594/index.html\">互动交流</a></li>");
document.writeln("        <li><a href=\"https://www.yantai.gov.cn/col/col50595/index.html\">品重烟台</a></li>");
document.writeln("        <li><a href=\"http://ytdata.sd.gov.cn\" target=\"_blank\">数据查询</a></li>");
document.writeln("    </ul>");
document.writeln("</div>");
document.writeln("<style type=\'text/css\'>");
document.writeln("	* {");
document.writeln("		margin: 0;");
document.writeln("		padding: 0;");
document.writeln("		text-decoration: none;");
document.writeln("		list-style: none;");
document.writeln("		font-family: \'微软雅黑\';");
document.writeln("		outline: none;");
document.writeln("		box-sizing: border-box;");
document.writeln("	}");
document.writeln("");
document.writeln("	a {");
document.writeln("		outline: none !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	a:focus {");
document.writeln("		outline: none !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.hide {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.ultr {");
document.writeln("		height: 200px !important;");
document.writeln("		opacity: 1 !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.zindex {");
document.writeln("		position: fixed;");
document.writeln("		z-index: 999;");
document.writeln("		top: 20px;");
document.writeln("	}");
document.writeln("");
document.writeln("");
document.writeln("");
document.writeln("	/* 头部 */");
document.writeln("	.wap-ty-top {");
document.writeln("		width: 100%;");
document.writeln("		height: 60px;");
document.writeln("		position: relative;");
document.writeln("		background: #305CAC;");
document.writeln("		font-size: initial;");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-1 {");
document.writeln("		position: absolute;");
document.writeln("		top: 50%;");
document.writeln("		transform: translateY(-50%);");
document.writeln("		left: 0;");
document.writeln("		width: 44px;");
document.writeln("		height: 44px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-2 {");
document.writeln("		position: absolute;");
document.writeln("		top: 50%;");
document.writeln("		transform: translateY(-50%);");
document.writeln("		right: 44px;");
document.writeln("		width: 44px;");
document.writeln("		height: 44px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-1 img,");
document.writeln("	.wap-ty-top-1 img,");
document.writeln("	.wap-ty-top-1 img {");
document.writeln("		width: 100%;");
document.writeln("		height: 100%;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-3 {");
document.writeln("		position: absolute;");
document.writeln("		top: 50%;");
document.writeln("		transform: translateY(-50%);");
document.writeln("		right: 0;");
document.writeln("		width: 44px;");
document.writeln("		height: 44px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top ul {");
document.writeln("		width: 100%;");
document.writeln("		background: #2B5CAC;");
document.writeln("		position: absolute;");
document.writeln("		top: 100%;");
document.writeln("		left: 0;");
document.writeln("		z-index: 9;");
document.writeln("		opacity: 0;");
document.writeln("		height: 0;");
document.writeln("		overflow: hidden;");
document.writeln("		transition: all 0.3s ease-out 0s;");
document.writeln("		;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top ul li {");
document.writeln("		width: 100%;");
document.writeln("		height: 40px;");
document.writeln("		line-height: 40px;");
document.writeln("		text-align: center;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top ul li a {");
document.writeln("		color: #ffffff;");
document.writeln("		font-size: 18px;");
document.writeln("		display: block;");
document.writeln("		width: 60%;");
document.writeln("		margin: auto;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-3 img,");
document.writeln("	.wap-ty-top-2 img {");
document.writeln("		width: 100%;");
document.writeln("		height: 100%;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-close {");
document.writeln("		position: absolute;");
document.writeln("		top: 0;");
document.writeln("		right: 0;");
document.writeln("		width: 40px !important;");
document.writeln("		height: 40px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-4 {");
document.writeln("		text-align: center;");
document.writeln("		height: 33px;");
document.writeln("		font-size: initial;");
document.writeln("		width: auto;");
document.writeln("		position: absolute;");
document.writeln("		top: 50%;");
document.writeln("		left: 50%;");
document.writeln("		transform: translate(-50%, -50%);");
document.writeln("");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-4 img {");
document.writeln("		height: 33px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-5 {");
document.writeln("		height: auto;");
document.writeln("	}");
document.writeln("");
document.writeln("	.wap-ty-top-5 img {");
document.writeln("		width: 100%;");
document.writeln("		height: auto;");
document.writeln("		background: #FFFFFF;");
document.writeln("	}");
document.writeln("</style>");
document.writeln("");
document.writeln("");
document.writeln("");
document.writeln("<style type=\'text/css\'>");
document.writeln("	/* 头 */");
document.writeln("");
document.writeln("	* {");
document.writeln("		box-sizing: border-box;");
document.writeln("		-moz-box-sizing: border-box;");
document.writeln("		-webkit-box-sizing: border-box;");
document.writeln("		outline: none;");
document.writeln("		font-family: \'微软雅黑\';");
document.writeln("	}");
document.writeln("");
document.writeln("	ins {");
document.writeln("		font-family: inherit !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.clearfix:after {");
document.writeln("		content: \'.\';");
document.writeln("		/*加一段内容*/");
document.writeln("		display: block;");
document.writeln("		/*让生成的元素以块级元素显示，占满剩余空间*/");
document.writeln("		height: 0;");
document.writeln("		/*避免生成的内容破坏原有布局高度*/");
document.writeln("		clear: both;");
document.writeln("		/*清除浮动*/");
document.writeln("		visibility: hidden;");
document.writeln("		/*让生成的内容不可见*/");
document.writeln("	}");
document.writeln("");
document.writeln("	.clearfix {");
document.writeln("		zoom: 1;");
document.writeln("		/*为IE6，7的兼容性设置*/");
document.writeln("	}");
document.writeln("");
document.writeln("	.fr {");
document.writeln("		float: right");
document.writeln("	}");
document.writeln("");
document.writeln("	a {");
document.writeln("		text-decoration: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.fl {");
document.writeln("		float: left;");
document.writeln("	}");
document.writeln("");
document.writeln("	.mt30 {");
document.writeln("		margin-top: 30px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.hidden {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	select::-ms-expand {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.dn {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.db {");
document.writeln("		display: block;");
document.writeln("	}");
document.writeln("");
document.writeln("	.header {");
document.writeln("		width: 100%;");
document.writeln("		/* width: 1200px; */");
document.writeln("		height: 168px;");
document.writeln("		background-color: #115db2;");
document.writeln("		border-bottom: 1px solid #0c417c;");
document.writeln("		font-size: initial;");
document.writeln("	}");
document.writeln("");
document.writeln("	.box {");
document.writeln("		width: 1200px;");
document.writeln("		margin: 0 auto;");
document.writeln("	}");
document.writeln("");
document.writeln("	.logo-top {");
document.writeln("		margin-top: 48px;");
document.writeln("		margin-left: 10px;");
document.writeln("		width: 362px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.search {");
document.writeln("		margin-left: 90px;");
document.writeln("		margin-top: 65px;");
document.writeln("		width: 410px;");
document.writeln("		height: 40px;");
document.writeln("		background-color: #ffffff;");
document.writeln("		border: 1px solid #b5b5b5;");
document.writeln("		border-radius: 2px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.search-top {");
document.writeln("		padding-top: 0px !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.header-tubiao {");
document.writeln("		width: 48px;");
document.writeln("		height: 54px;");
document.writeln("		float: right;");
document.writeln("		padding-top: 57px;");
document.writeln("		margin-right: 15px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.header-tubiao img {");
document.writeln("		width: 48px;");
document.writeln("		height: 54px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.search>form>div:last-child {");
document.writeln("		float: right;");
document.writeln("	}");
document.writeln("");
document.writeln("	.search select {");
document.writeln("		width: 80px;");
document.writeln("		height: 40px;");
document.writeln("		padding: 10px 0 10px 10px;");
document.writeln("		border: none;");
document.writeln("		font-size: 16px;");
document.writeln("		color: #666;");
document.writeln("		outline: none;");
document.writeln("		appearance: none;");
document.writeln("		-moz-appearance: none;");
document.writeln("		-webkit-appearance: none;");
document.writeln("		-ms-appearance: none;");
document.writeln("		background: url(http://www.yantai.gov.cn/picture/83/2108091721061819509.png) no-repeat 90% center;");
document.writeln("	}");
document.writeln("");
document.writeln("	.search select::-ms-expand {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.search input[type=\'text\'] {");
document.writeln("		/* margin-top: 14px; */");
document.writeln("		width: 263px;");
document.writeln("		height: 38px;");
document.writeln("		padding-left: 10px;");
document.writeln("		border: none;");
document.writeln("		border-left: 1px solid #b5b5b5;");
document.writeln("		font-size: 16px;");
document.writeln("		line-height: 38px;");
document.writeln("		color: #666;");
document.writeln("		outline: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.search input[type=\'submit\'] {");
document.writeln("		width: 50px;");
document.writeln("		height: 38px;");
document.writeln("		border: none;");
document.writeln("		background: #fff url(http://www.yantai.gov.cn/picture/83/2108091715103958314.png) no-repeat center center;");
document.writeln("		outline: none;");
document.writeln("		cursor: pointer;");
document.writeln("	}");
document.writeln("");
document.writeln("	.header_right {");
document.writeln("		width: 220px;");
document.writeln("		padding-top: 58px;");
document.writeln("		font-size: 12px;");
document.writeln("		line-height: 24px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.header_right a {");
document.writeln("		margin: 0 5px;");
document.writeln("		font-size: 12px;");
document.writeln("		cursor: pointer;");
document.writeln("	}");
document.writeln("");
document.writeln("	.login {");
document.writeln("		height: 24px;");
document.writeln("		overflow: hidden;");
document.writeln("	}");
document.writeln("");
document.writeln("	.login a {");
document.writeln("		color: #fff;");
document.writeln("		float: left;");
document.writeln("	}");
document.writeln("");
document.writeln("	.hide {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.waiwen {");
document.writeln("		width: 55px;");
document.writeln("		float: left;");
document.writeln("		height: 24px;");
document.writeln("		position: relative;");
document.writeln("		background: url(/picture/0/2109131722176774987.png) no-repeat right;");
document.writeln("		background-size: 15px;");
document.writeln("		line-height: 24px !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.waiwen a {");
document.writeln("		text-align: center;");
document.writeln("		cursor: pointer;");
document.writeln("		color: #FFFFFF;");
document.writeln("		font-size: 12px !important;");
document.writeln("		line-height: 24px !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.waiwen_xiala {");
document.writeln("		height: auto;");
document.writeln("		position: absolute;");
document.writeln("		top: 30px;");
document.writeln("		width: 100%;");
document.writeln("");
document.writeln("	}");
document.writeln("");
document.writeln("	.waiwen_xiala a {");
document.writeln("		display: block;");
document.writeln("		width: 100%;");
document.writeln("		color: #333333;");
document.writeln("		background: #FFFFFF;");
document.writeln("		font-size: 12px !important;");
document.writeln("");
document.writeln("	}");
document.writeln("");
document.writeln("	.nav {");
document.writeln("		width: 100%;");
document.writeln("		/* min-width: 1200px; */");
document.writeln("		padding-top: 2px;");
document.writeln("		background-color: #115db2;");
document.writeln("		height: 58px;");
document.writeln("		margin-bottom: 45px;");
document.writeln("		position: relative;");
document.writeln("		transition: all 0.3s ease-out 0s;");
document.writeln("		font-size: initial;");
document.writeln("	}");
document.writeln("");
document.writeln("	.nav ul {");
document.writeln("		padding-left: 0;");
document.writeln("	}");
document.writeln("");
document.writeln("	.nav li {");
document.writeln("		float: left;");
document.writeln("		width: 150px;");
document.writeln("		text-align: center;");
document.writeln("	}");
document.writeln("");
document.writeln("	.nav li>a {");
document.writeln("		display: inline-block;");
document.writeln("		font-size: 24px;");
document.writeln("		line-height: 56px;");
document.writeln("		color: #fff;");
document.writeln("		height: 56px;");
document.writeln("		outline: none !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.nav li.on>a {");
document.writeln("		font-weight: bold;");
document.writeln("		border-bottom: 2px solid #fff;");
document.writeln("		line-height: 54px;");
document.writeln("		height: 56px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.nav .oldType_switch {");
document.writeln("		float: left;");
document.writeln("		width: 150px;");
document.writeln("		background: #ef920e;");
document.writeln("		line-height: 40px;");
document.writeln("		height: 40px;");
document.writeln("		text-align: center;");
document.writeln("		color: #fff;");
document.writeln("		border-radius: 8px;");
document.writeln("		margin-top: 8px;");
document.writeln("		cursor: pointer;");
document.writeln("		font-size: 18px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.subnav {");
document.writeln("		display: none;");
document.writeln("		width: 100%;");
document.writeln("		/* min-width: 1200px; */");
document.writeln("		height: 44px;");
document.writeln("		background-color: #daecfb;");
document.writeln("		border-bottom: 1px solid #93ceff;");
document.writeln("		z-index: 99;");
document.writeln("");
document.writeln("		position: absolute;");
document.writeln("		top: 58px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.subnav .box {");
document.writeln("		text-align: center;");
document.writeln("	}");
document.writeln("");
document.writeln("	.subnav .box a {");
document.writeln("		display: inline-block;");
document.writeln("		padding: 0 20px;");
document.writeln("		font-size: 16px;");
document.writeln("		line-height: 44px;");
document.writeln("		color: #333;");
document.writeln("	}");
document.writeln("");
document.writeln("	.subnav .box a:hover {");
document.writeln("		color: #115db2;");
document.writeln("	}");
document.writeln("");
document.writeln("	.subnav.on {");
document.writeln("		display: block;");
document.writeln("	}");
document.writeln("");
document.writeln("	.box1 {");
document.writeln("		padding: 32px 0;");
document.writeln("	}");
document.writeln("");
document.writeln("	.navWap {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.no {");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.block {");
document.writeln("		display: block;");
document.writeln("	}");
document.writeln("");
document.writeln("	.top_left {");
document.writeln("		float: left;");
document.writeln("		line-height: 24px;");
document.writeln("		margin-left: 10px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.dl-top,");
document.writeln("	.zc-top {");
document.writeln("		float: left;");
document.writeln("		position: relative;");
document.writeln("	}");
document.writeln("");
document.writeln("	.top_left a {");
document.writeln("		font-size: 12px;");
document.writeln("		color: #ffffff;");
document.writeln("		float: left;");
document.writeln("		cursor: pointer;");
document.writeln("	}");
document.writeln("");
document.writeln("	.dl-top .dl_sub {");
document.writeln("		position: absolute;");
document.writeln("		top: 100%;");
document.writeln("		left: 0;");
document.writeln("		width: 80px;");
document.writeln("		padding-top: 5px;");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.zc-top .zc_sub {");
document.writeln("		position: absolute;");
document.writeln("		top: 100%;");
document.writeln("		right: 0;");
document.writeln("		width: 80px;");
document.writeln("		padding-top: 5px;");
document.writeln("		text-align: right;");
document.writeln("		display: none;");
document.writeln("	}");
document.writeln("");
document.writeln("	.dl_sub a,");
document.writeln("	.zc_sub a {");
document.writeln("		float: none;");
document.writeln("		display: block;");
document.writeln("		line-height: 24px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.zc-top span {");
document.writeln("		display: none !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	/* 适老化 */");
document.writeln("	.old_type{");
document.writeln("		cursor: url(\'http://www.yantai.gov.cn/picture/83/2111021549269886913.png\'),auto;");
document.writeln("	}");
document.writeln("	.old_type .old_pointer{");
document.writeln("		cursor: url(\'http://www.yantai.gov.cn/picture/83/2111021558006361803.png\'),auto!important;");
document.writeln("	}");
document.writeln("	.old_type .old_text{");
document.writeln("		cursor: url(\'http://www.yantai.gov.cn/picture/83/2111021648583715907.png\'),auto!important;");
document.writeln("	}");
document.writeln("	.old_type .header {");
document.writeln("		height: auto;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .header_top {");
document.writeln("		position: relative;");
document.writeln("		padding-top: 120px;");
document.writeln("		padding-bottom: 40px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .logo-top {");
document.writeln("		margin: auto;");
document.writeln("		width: 100%;");
document.writeln("		float: none;");
document.writeln("		text-align: center;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .logo-top a{");
document.writeln("		display: inline-block;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .header_right {");
document.writeln("		float: none;");
document.writeln("		position: absolute;");
document.writeln("		top: 0px;");
document.writeln("		left: 55px;");
document.writeln("		padding-top: 0;");
document.writeln("		width: 80%;");
document.writeln("		text-align: left;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .header_right a {");
document.writeln("		font-size: 28px;");
document.writeln("		line-height: 50px;");
document.writeln("		margin: 20px 10px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .login {");
document.writeln("		display: inline-block;");
document.writeln("		height: auto;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .header-tubiao {");
document.writeln("		padding-top: 0;");
document.writeln("		float: none;");
document.writeln("		position: absolute;");
document.writeln("		top: 20px;");
document.writeln("		left: 0;");
document.writeln("");
document.writeln("		width: 50px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .search {");
document.writeln("		margin-top: 0;");
document.writeln("		width: auto;");
document.writeln("		height: auto;");
document.writeln("	}");
document.writeln("	");
document.writeln("	.old_type .search-top {");
document.writeln("		float: none;");
document.writeln("		width: 920px;");
document.writeln("		border-radius: 10px;");
document.writeln("		margin:50px auto;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .search select {");
document.writeln("		height: 70px;");
document.writeln("		font-size: 22px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .search input[type=\'text\'] {");
document.writeln("		width: 710px;");
document.writeln("		height: 70px;");
document.writeln("		font-size: 22px;");
document.writeln("	}");
document.writeln("	.old_type .search>form>div:last-child{");
document.writeln("		padding-right: 20px;");
document.writeln("	}");
document.writeln("	.old_type .search input[type=\'submit\'] {");
document.writeln("		height: 66px;");
document.writeln("		width: 90px;");
document.writeln("		background-size:40px !important;");
document.writeln("		background: #fff url(http://www.yantai.gov.cn/picture/83/2110191718356891957.png) no-repeat center center;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .nav {");
document.writeln("		height: auto;");
document.writeln("		margin-bottom: 0 !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .nav li {");
document.writeln("		width: 200px;");
document.writeln("		margin: 10px 20px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .nav li>a {");
document.writeln("		font-size: 36px;");
document.writeln("		height: 98px;");
document.writeln("		line-height: 100px;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .subnav-zong {");
document.writeln("		display: none !important;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .nav .oldType_switch {");
document.writeln("		height: auto !important;");
document.writeln("		line-height: 90px;");
document.writeln("		padding: 10px 0;");
document.writeln("		margin-top: 60px;");
document.writeln("		width: 280px;");
document.writeln("		position: absolute;");
document.writeln("		right: 0px;");
document.writeln("		font-size: 38px;");
document.writeln("		background: #ef920e;");
document.writeln("		font-weight: bold;");
document.writeln("		");
document.writeln("	}");
document.writeln("	");
document.writeln("	.old_type .nav .on>a{");
document.writeln("		border-bottom: 2px solid #FFFFFF;");
document.writeln("	}");
document.writeln("");
document.writeln("	.old_type .nav .oldType_switch span {");
document.writeln("		display: block;");
document.writeln("	}");
document.writeln("	.old_type .nav ul{");
document.writeln("		position: relative;");
document.writeln("		padding-left: 165px;");
document.writeln("		padding-right: 300px;");
document.writeln("	}");
document.writeln("	.old_type #shouye{");
document.writeln("		position: absolute;");
document.writeln("		left: 0px;");
document.writeln("		top:60px;");
document.writeln("	}");
document.writeln("	");
document.writeln("");
document.writeln("	/* 手机端 */");
document.writeln("");
document.writeln("	@media only screen and (max-width: 1200px) {");
document.writeln("");
document.writeln("		.logo-top,");
document.writeln("		.search {");
document.writeln("			/* width: 45%; */");
document.writeln("			margin: 0;");
document.writeln("		}");
document.writeln("");
document.writeln("		.logo-top {");
document.writeln("			width: 45%;");
document.writeln("			margin-top: 48px;");
document.writeln("			margin-left: 5%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search {");
document.writeln("			width: 40%;");
document.writeln("			float: right !important;");
document.writeln("			margin-top: 60px;");
document.writeln("			margin-right: 2%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.nav>ul {");
document.writeln("			width: 100% !important;");
document.writeln("		}");
document.writeln("");
document.writeln("		.nav li {");
document.writeln("			width: 14%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.header>div {");
document.writeln("			width: 100%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.header_right {");
document.writeln("			display: none;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search>form>div:nth-child(2) {");
document.writeln("			width: 50%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search>form>div:nth-child(2)>input {");
document.writeln("			width: 100%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search>form>div:nth-child(3) {");
document.writeln("			float: right;");
document.writeln("		}");
document.writeln("");
document.writeln("		.box {");
document.writeln("			width: 100% !important;");
document.writeln("		}");
document.writeln("");
document.writeln("		.subnav .box a {");
document.writeln("			padding: 0 15px;");
document.writeln("		}");
document.writeln("");
document.writeln("		.header-tubiao {");
document.writeln("			display: none;");
document.writeln("		}");
document.writeln("	}");
document.writeln("");
document.writeln("	@media only screen and (max-width: 768px) {");
document.writeln("");
document.writeln("		.nav,");
document.writeln("		.header_right {");
document.writeln("			display: none;");
document.writeln("		}");
document.writeln("");
document.writeln("		.header-tubiao {");
document.writeln("			display: none;");
document.writeln("		}");
document.writeln("");
document.writeln("		.hide {");
document.writeln("			background: url(http://www.yantai.gov.cn/picture/83/2108091715097654213.png)no-repeat;");
document.writeln("			background-size: 100%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search,");
document.writeln("		.logo-top {");
document.writeln("			float: none !important;");
document.writeln("		}");
document.writeln("");
document.writeln("		.logo-top {");
document.writeln("			margin: auto;");
document.writeln("			width: 90%;");
document.writeln("			text-align: center;");
document.writeln("			margin-top: 40px;");
document.writeln("		}");
document.writeln("");
document.writeln("		.logo-top img {");
document.writeln("			width: 100%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.header {");
document.writeln("			height: auto;");
document.writeln("			overflow: hidden;");
document.writeln("			width: 100%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.header>div {");
document.writeln("			width: 100%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search {");
document.writeln("			margin: 30px auto;");
document.writeln("			width: 95%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search>form>div:nth-child(2) {");
document.writeln("			width: 50%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search>form>div:nth-child(2)>input {");
document.writeln("			width: 100%;");
document.writeln("		}");
document.writeln("");
document.writeln("		.search>form>div:nth-child(3) {");
document.writeln("			float: right !important;");
document.writeln("		}");
document.writeln("");
document.writeln("		.header,");
document.writeln("		.nav,");
document.writeln("		.navWap {");
document.writeln("			display: none !important;");
document.writeln("		}");
document.writeln("");
document.writeln("		.wap-ty-top {");
document.writeln("			display: block;");
document.writeln("		}");
document.writeln("	}");
document.writeln("</style>");
document.writeln("");
document.writeln("<script language=\'javascript\' src=\'/module/jslib/gtb/language.js\' style=\'outline: none;\'>");
document.writeln("</script>");
document.writeln("");
document.writeln("");
document.writeln("");
document.writeln("");
document.writeln("<script id=\'barrierfree\' src=\'/accessiblereading/load.js\'></script>");



// 创建yhzx_Base64对象
var yhzx_Base64 = {
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function (e) {
        var t = '';
        var n, r, i, s, o, u, a;
        var f = 0;
        e = yhzx_Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr
                .charAt(a)
        }
        return t
    },
    decode: function (e) {
        var t = '';
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, '')
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = yhzx_Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function (e) {
        e = e.replace(/rn/g, 'n')
        var t = '';
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function (e) {
        var t = '';
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

var local = window.location.href;
var resultbase = yhzx_Base64.encode(local);// 对url编码

// var logingrhref = 'http://zwfw.sd.gov.cn/JIS/front/login.do?flag=true&uuid=QCckFFhG5G51&type=1&gotourl='+ resultbase + '&fwgjpt=false';
// var loginfrhref = 'http://zwfw.sd.gov.cn/JIS/front/login.do?flag=true&uuid=QCckFFhG5G51&type=2&gotourl='+ resultbase + '&fwgjpt=false';
var loginhref = 'https://tysfrz.isdapp.shandong.gov.cn/api-gateway/jpaas-jis-sso-server/sso/entrance/auth-center?appMark=YTZFMKWZTYWTG&backUrl=https://www.yantai.gov.cn/yhzx/front/getinfo.do?gotourl=aHR0cHM6Ly93d3cueWFudGFpLmdvdi5jbi95aHp4L3VzZXJjZW50ZXIvbXl3b3JrLmRv';

$.ajax({
    url: 'https://www.yantai.gov.cn/yhzx/login/type.do?timestamp=' + new Date().getTime(),
    type: 'post',
    dataType: 'json',
    xhrFields: {
        withCredentials: true
    },
    success: function (datasrc) {
        if (datasrc.code == '0') {
            $('.dl-top').html("<a href=\"\" class='login1'>用户中心</a>")
// $('.zc-top').html("<span>|</span><a>注册</a><div class=\"zc_sub\"><a href=\"http://zwfw.sd.gov.cn/JIS/front/register/perregister1.do?uuid=QCckFFhG5G51\">个人注册</a><a href=\"http://zwfw.sd.gov.cn/JIS/front/register/corregister.do?uuid=QCckFFhG5G51\">法人注册</a></div>")
            $('.login1').attr('href', loginhref)
// $('.login2').attr('href', loginfrhref)
        } else {
            $('.top_left').html("<a class='names' target='_blank' href='https://www.yantai.gov.cn/yhzx/usercenter/mywork.do'>" + datasrc.params.realname + "</a><a class='name_out' id='outButton'>退出</a>")
            var outhref ='https://www.yantai.gov.cn/yhzx/usercenter/logout.do?logout=http://zwfw.sd.gov.cn/JIS/sso/logout.do?appmark=jisyt6ywtb&usertype=' + datasrc.params.usertype + '&gotourl=' + resultbase;
            var outhref2 = 'https://www.yantai.gov.cn/yhzx/usercenter/logout.do?gotourl=' + resultbase;

            //清除互动系统用户信息
            const button = document.getElementById('outButton');
            button.addEventListener('click', function(event) {
                // 发送GET请求到链接
                fetch('https://www.yantai.gov.cn/jact/front/logout.action', {
                    method: 'GET',

                })

            });

            $('.name_out').attr('href', outhref2)
        }
    }
})

$(".top_left .dl-top").hover(function () {
    $(this).find(".dl_sub").show();
},function () {
    $(this).find(".dl_sub").hide();
});
$(".top_left .zc-top").hover(function () {
    $(this).find(".zc_sub").show();
},function () {
    $(this).find(".zc_sub").hide();
});

function check1() {
    var wapul = $('#wapul').attr('class');
    var wapImg = $('#wapImg').attr('class');
    if (wapul == 'ultr') {
        $('.wap-ty-top ul').removeClass('ultr');
        $('#wapImg').parent().removeClass('zindex');
    } else {
        $('.wap-ty-top ul').addClass('ultr');
        $('#wapImg').parent().addClass('zindex');
    }
};

var cur;
$('.nav li').each(function() {
    if($(this).hasClass('on')) {
        cur = $(this).index();
        console.log(cur)
    }
});

$(".nav").css("margin-bottom","0");
$('.nav li').hover(function() {
    var num = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    $('.subnav-zong>.subnav').eq(num).show().siblings().hide();
    if(num == 0 || num == 6){
        $('.subnav-zong>.subnav').hide();
        $(".nav").css("margin-bottom","0");
    }else {
        $(".nav").css("margin-bottom","45px");
    }
});

$('.nav ul').css('display', 'block');

$(".sele option").click(function () {
    var btn_val = $(this).text();
    console.log(btn_val222)
    var btn_ind = $(this).get(0).selectedindex;
    console.log(btn_ind111)
    if (btn_ind == 0){
        $("#searchid").val("");
    }else {
        $("#searchid").val("15");
    }
});
/*简繁体*/
var i=0;
$(".jft_a").click(function(){
    i++;
    if (i%2!=0) {
        $(this).attr("id","zh_click_t")
        $(this).text("简体版")
        window.open("javascript:zh_tran('t');","_self")

    } else{
        $(this).attr("id","zh_click_s")
        $(this).text("繁體版")
        window.open("javascript:zh_tran('n');","_self")
    }
});



/*频道页导航高亮*/
$(function () {
    var columnName = $("meta[name='ColumnName']").attr("content");
    if (columnName == "政府信息公开"){
        $(".nav .box li").eq(2).children("a").css({"font-weight":"bold","border-bottom":"2px solid #fff"});
        $(".nav .box li").eq(2).addClass("on").siblings().removeClass("on");
        $(".subnav-zong>.subnav").eq(2).show().siblings().hide();
        $(".nav").css("margin-bottom","45px");

        $(".nav").mouseleave(function () {
            $(".nav .box li").eq(2).addClass("on").siblings().removeClass("on");
            $(".subnav-zong>.subnav").eq(2).show().siblings().hide();
            $(".nav").css("margin-bottom","45px");
        })
    } else {
        $(".nav .box li").each(function () {
            var menu_name = $(this).find("a").text();
            if(menu_name == columnName){
                var nav_ind = $(this).index();
                $(this).children("a").css({"font-weight":"bold","border-bottom":"2px solid #fff"});
                $(this).addClass("on").siblings().removeClass("on");
                $(".nav").css("margin-bottom","45px");

                $(".nav").mouseleave(function () {
                    $(".nav .box li").eq(nav_ind).addClass("on").siblings().removeClass("on");
                    $(".subnav-zong>.subnav").eq(nav_ind).show().siblings().hide();
                    $(".nav").css("margin-bottom","45px");
                })
                $(".subnav-zong>.subnav").eq(nav_ind).show().siblings().hide();
            }
        });
    }
});

//检索
$(function(){
    var w =  $("select[name='test']").val();
    $('#select1').click(function(){
        var ssss = $("select[name='test']").val();
        console.log(ssss);
        if(ssss == 1){
            $("#searchid").val("");
        }else{
            $("#searchid").val("15");
        }
    });
});
function checkFormguolv() {
    var key = document.getElementById('q').value;
    if (key == '' || key == '请输入关键字查询') {
        alert('请输入关键字查询!')
        document.getElementById('q').focus()
        return false;
    }
}



$(function() {
    $(".waiwen").click(function() {
        var index1 = $("#waiwen_xiala").attr("class").indexOf('hide');
        // console.log(index1);
        if(index1 > -1){
            $(".waiwen div").removeClass("hide");
        }else{
            $(".waiwen div").addClass("hide");
        }
        // .indexOf('hide')
        // $(".content-text-mian>div").show().siblings().hide();
        // if
    });
});

//js代码（统一使用localstorage）
// 判断老年版和普通版
var storage = window.localStorage;
// 获取浏览器页面宽度
var clientWidth = $("html").outerWidth();
// 判断localstorage存储中是否含有key为mode，true则是老年版，添加老年版class类名old_type
var switchNum;// 判断老年模式的开关
if (storage.hasOwnProperty("mode")) {
    $("body").addClass("old_type");
    $(".nav .oldType_switch").html("退出关怀模式");
    $(".old-img").css({"display":"block","margin":"auto"});
    $(".bz-img").css("display","none");
    switchNum = 1;
} else {
    $("body").removeClass("old_type");
    $(".nav .oldType_switch").text("进入关怀模式");
    $(".old-img").css("display","none");
    $(".bz-img").css("display","block");
    switchNum = 0;
}
// 进入老年版按钮点击，创建存储键值，并在body添加class类名
$(".oldType_switch").click(function() { // 进入老年版按钮点击
    if (switchNum == 0){
        $("body").addClass("old_type");
        storage.setItem("mode", 2);
        $(".nav .oldType_switch").html("退出关怀模式");
        $(".old-img").css({"display":"block","margin":"auto"});
        $(".bz-img").css("display","none");
        switchNum = 1;

    }else if (switchNum == 1){
        // 退出老年版按钮点击，删除存储键值，并移除body的class类名
        $("body").removeClass("old_type");
        storage.removeItem("mode");
        $(".nav .oldType_switch").text("进入关怀模式");
        $(".old-img").css("display","none");
        $(".bz-img").css("display","block");
        switchNum = 0;
    }
    // location.reload(true);
});

/*适老化光标样式*/
window.onload = function(){
    $("*").each(function () {
        var cur_name = $(this).css("cursor");
        if (cur_name == "pointer"){
            $(this).addClass("old_pointer");
        }else if (cur_name == "text"){
            $(this).addClass("old_text");
        }
    })
}

//添加mate标签，处理https跨域
// var oMeta = document.createElement('meta');
// oMeta.charset = 'utf-8';
// oMeta.httpEquiv = 'Content-Security-Policy'
// oMeta.content = 'upgrade-insecure-requests'
// document.getElementsByTagName('head')[0].appendChild(oMeta);