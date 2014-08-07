;(function(app, constructor){
	var $cache = {};
	constructor[app] = {
		myScroll : [],
		pubInit : function(){
			this.myScroll[0] = new IScroll('#center', { mouseWheel: true, click: true });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		},
		pubNav : function(){
			$cache.topBox = $('#topBox'), $cache.centerBox = $('#center');
			$cache.topBox.on('click', '.nav', function(e){
				e.stopPropagation();
				var $self = $(this), $popBox = $('#topBox .navPop');
				if(!$self.data('lock')){
					$self.data('lock', true);
					$self.addClass('active');
					$popBox.show();
				}else{
					$self.data('lock', false);
					$self.removeClass('active');
					$popBox.hide();
				}
			});
			$cache.topBox.on('click', '.navPop li', function(e){
				e.stopPropagation();
				var $selft = $(this), link;
				switch($selft.index()){
					case 0:
						link = 'paiqi.html';
						break;
					case 1:
						link = 'choubei.html';
						break;
					case 2:
						link = 'baobei.html';
						break;
					case 3:
						link = 'other.html';
						break;
					default:
						break;
				}
				window.location.href = link;
			});
		},
		dateInit : function(){
			var dateNs = {
				dayNames:["周日","周一","周二","周三","周四","周五","周六"],
				abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
			};
			var jsondata = [
				{
					"tit": "排期提醒",
					"data":[
						"区域车展",
						"上海锦骏汽车",
						"2014/07/11-10/11"
					]
				},
				{
					"tit": "筹备表审核",
					"data":[
						"2042342",
						"2014/07/11",
						"2014/07/11",
						"2014/07/11-10/11"
					]
				},
			];
			var tmpHtml = 
					'<div class="msg msgDate">'+
						'<div class="msgTit">2014-07-21 周一</div>'+
						'<div class="pqtx">'+
							'<div class="tit">'+jsondata[0].tit+'</div>'+
							'<ul>'+
								'<li class="iconLine light">路线: '+jsondata[0].data[0]+'</li>'+
								'<li class="iconAddr">主办经销商: '+jsondata[0].data[1]+'</li>'+
								'<li class="iconClock">活动时间: '+jsondata[0].data[2]+'</li>'+
							'</ul>'+
						'</div>'+
						'<div class="cbbsh">'+
							'<div class="tit">筹备表审核</div>'+
							'<ul>'+
								'<li class="iconPen light">编号: '+jsondata[1].data[0]+'</li>'+
								'<li class="iconClock">提交截止时间: '+jsondata[1].data[1]+'</li>'+
								'<li class="iconClock">审核截止时间: '+jsondata[1].data[2]+'</li>'+
								'<li class="iconClock">活动时间: '+jsondata[1].data[3]+'</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
			var self = this;
			self.myScroll[0] = new IScroll('#dateLeft', { probeType: 3, deceleration:0.006,mouseWheel: true, click: true });
			self.myScroll[1] = new IScroll('#dateRight', { probeType: 3, deceleration:0.004, mouseWheel: true, click: true });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
			$cache.dateLeft = $('#dateLeft .scroll'), $cache.dateRight = $('#dateRight .scroll');
			var date = {}, nextDate, time = new XDate();
			
			date.now = {
				date : time.getDate(),
				day : time.getDay(),
				month : time.getMonth(),
				year : time.getFullYear(),
				monthDay : time.setDate(0).getDate()
			};
			date.next = $.extend({}, date.now);
			var getMsg = function(data, time){
				var d = new XDate(time, true);
				var tmpHtml = 
					'<div id="R-'+time+'" class="msg msgDate">'+
						'<div class="msgTit">'+time+' '+dateNs.dayNames[d.getDay()]+'</div>'+
						'<div class="pqtx">'+
							'<div class="tit">'+data[0].tit+'</div>'+
							'<ul>'+
								'<li class="iconLine light">路线: '+data[0].data[0]+'</li>'+
								'<li class="iconAddr">主办经销商: '+data[0].data[1]+'</li>'+
								'<li class="iconClock">活动时间: '+data[0].data[2]+'</li>'+
							'</ul>'+
						'</div>'+
						'<div class="cbbsh">'+
							'<div class="tit">筹备表审核</div>'+
							'<ul>'+
								'<li class="iconPen light">编号: '+data[1].data[0]+'</li>'+
								'<li class="iconClock">提交截止时间: '+data[1].data[1]+'</li>'+
								'<li class="iconClock">审核截止时间: '+data[1].data[2]+'</li>'+
								'<li class="iconClock">活动时间: '+data[1].data[3]+'</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
				var leftHtml = '<li id=L-'+time+'><span class="month">'+dateNs.abbreviatedMonthNames[d.getMonth()]+'</span><span class="date">'+d.toUTCString('dd');+'</span></li>';
				return {
					tmpHtml : tmpHtml,
					leftHtml : leftHtml
				};
			};
			var padNum = function (num, n) {
				var len = num.toString().length;
				while(len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			};
			var nowId = '2014-08-01';
			var getHtml = function(){
				var tmpHtml = '',leftHtml = '', time;
				for(var i = 1; i<=31; i++){
					time = '2014-08-'+padNum(i, 2);
					var msg = getMsg(jsondata, time);
					tmpHtml+=msg.tmpHtml;
					leftHtml+=msg.leftHtml;
				}
				$cache.dateRight.html(tmpHtml);
				$cache.dateLeft.html('<ul>'+leftHtml+'</ul>');
				self.myScroll[0].refresh();
				self.myScroll[1].refresh();
				
				$('#R-'+nowId+', #L-'+nowId).addClass('active');
			};
			getHtml();
			/*
			self.myScroll[0].on("scroll",function(){
				var topRightBox = $('#L-'+nowId);
				if(!topRightBox.get(0)){
					return false;
				}
				var topLeftBox = $('#R-'+nowId);
				var leftBoxSize = $('#dateLeft li').size();
			
				var topLeftBoxH = topLeftBox.outerHeight();
				
				var topLeftOffT = topLeftBox.index() * topLeftBoxH;
				
				var topLeftT = topLeftBox.position().top;
				
				var topRightH = topRightBox.outerHeight();
				var topRightT = topRightBox.position().top;
				var rightPercent = (topRightH+topRightT)/topRightH;	
				
				self.myScroll[1].scrollTo(0, -topLeftOffT + (topLeftBoxH * (rightPercent - 1 )) , 0);
				if(rightPercent<0){
					var d = new XDate(nowId, true);
					d.setDate(d.getDate()+1);
					var Id = d.toUTCString('yyyy-MM-dd');
					if(!$('#L-'+Id).get(0)){
						return false;
					}
					nowId=Id;
					$('#dateRight .msg[class~="active"], #dateLeft li[class~="active"]').removeClass('active');
					$('#R-'+nowId+', #L-'+nowId).addClass('active');
				}else if(rightPercent>1){
					var d = new XDate(nowId, true);
					d.setDate(d.getDate()-1);
					var Id = d.toUTCString('yyyy-MM-dd');
					if(!$('#L-'+Id).get(0)){
						return false;
					}
					nowId=Id;
					$('#dateRight .msg[class~="active"], #dateLeft li[class~="active"]').removeClass('active');
					$('#R-'+nowId+', #L-'+nowId).addClass('active');
				}
			});
			*/
			var scrollLock = false;
			self.myScroll[1].on("scroll",function(){
				var topRightBox = $('#R-'+nowId);
				if(!topRightBox.get(0) || scrollLock){
					return false;
				}
				var topLeftBox = $('#L-'+nowId);
				var leftBoxSize = $('#dateLeft li').size();
			
				var topLeftBoxH = topLeftBox.outerHeight();
				
				var topLeftOffT = topLeftBox.index() * topLeftBoxH;
				
				var topLeftT = topLeftBox.position().top;
				
				var topRightH = topRightBox.outerHeight();
				var topRightT = topRightBox.position().top;
				var rightPercent = (topRightH+topRightT)/topRightH;	
				
				self.myScroll[0].scrollTo(0, -topLeftOffT + (topLeftBoxH * (rightPercent - 1 )) , 0);
				if(rightPercent<0){
					var d = new XDate(nowId, true);
					d.setDate(d.getDate()+1);
					var Id = d.toUTCString('yyyy-MM-dd');
					if(!$('#R-'+Id).get(0)){
						return false;
					}
					nowId=Id;
					$('#dateRight .msg[class~="active"], #dateLeft li[class~="active"]').removeClass('active');
					$('#R-'+nowId+', #L-'+nowId).addClass('active');
				}else if(rightPercent>1){
					var d = new XDate(nowId, true);
					d.setDate(d.getDate()-1);
					var Id = d.toUTCString('yyyy-MM-dd');
					if(!$('#R-'+Id).get(0)){
						return false;
					}
					nowId=Id;
					$('#dateRight .msg[class~="active"], #dateLeft li[class~="active"]').removeClass('active');
					$('#R-'+nowId+', #L-'+nowId).addClass('active');
				}
			});
			$('li', $cache.dateLeft).click(function(){
				if(scrollLock){
					return false;
				}
				var $self = $(this);
				scrollLock = true;
				setTimeout(function(){
					scrollLock = false;
				}, 1200);
				nowId = $self.attr('id').substr(2,this.leight);
				$('#dateRight .msg[class~="active"], #dateLeft li[class~="active"]').removeClass('active');
				$('#R-'+nowId+', #L-'+nowId).addClass('active');
				self.myScroll[0].scrollToElement($('#L-'+nowId).get(0), 1000);
				self.myScroll[1].scrollToElement($('#R-'+nowId).get(0), 1000);
			});
			
			/*
			var getHtml = function (time) {
				var monthText = dateNs.abbreviatedMonthNames[time.month];
				var html = '';
				for(var i = 1 ; i <= time.monthDay; i++){
					html = '<li id='+time.year+'-'+(time.month+1)+'-'+i+'><span class="month">'+monthText+'</span><span class="date">'+i+'</span></li>' +html;
					if(time.year == date.now.year && time.month == date.now.month && i == date.now.date){
						break;
					}
				}
				return '<ul id="'+time.year+'-'+(time.month+1)+'">'+html+'</ul>';
			};
			var nextDate = function(){
				date.next.month -= 1;
				date.next.monthDay = time.setMonth(date.next.month).setDate(0).getDate();
				return date.next;
			};
			var addHtml = function(){
				if($('#dateLeft ul').last().position().top < 0){
					if(date.next.month > 0){
						$cache.dateLeft.append(getHtml(nextDate()));
						self.myScroll[0].refresh();
					}
				}
			};
			date.thisId = date.now.year+'-'+(date.now.month+1)+'-'+date.now.date;
			$cache.dateLeft.html(getHtml(date.now) + getHtml(nextDate()));
			$cache.thisId = $('#'+date.thisId);
			$cache.thisId.addClass('active');
			self.myScroll[0].refresh();
			self.myScroll[0].scrollToElement($cache.thisId.get(0), 0);
			
			self.myScroll[0].on("scrollStart",function(){
				addHtml();
			});
			
			$cache.dateLeft.on('click', 'li', function(){
				var $self = $(this);
				$('li',$cache.dateLeft).removeClass('active');
				$self.addClass('active');
				self.myScroll[0].scrollToElement($self.get(0), 1000);
			});
			*/
		},
		pubinfo: function(){
			$cache.topBox = $('#topNav');
			$cache.navli = $('.nav li' ,$cache.topBox);
			$cache.navli.on('click', function(){
				var $self = $(this);
				$cache.navli.removeClass('active');
				$self.addClass('active');
			});
		},
		info: function(){
			$cache.topBox = $('#topBox');
			$cache.topBox.on('click', '.goback', function(){
				window.history.go(-1);
			});
		}
	};
})('app', this);

;(function($){
	$(document).ready(function (){
		switch(window.pgName){
			case 'pubinfo':
				app.pubInit();
				app.pubinfo();
				break;
			case 'info':
				app.pubInit();
				app.info();
				break;
			case 'paiqi':
				app.pubInit();
				app.pubNav();
				break;
			case 'other':
				app.pubInit();
				app.pubNav();
				break;
			case 'choubei':
				app.pubInit();
				app.pubNav();
				break;
			case 'baobei':
				app.pubInit();
				app.pubNav();
				break;
			case 'date':
				app.pubNav();
				app.dateInit();
				break;
			default:
		}
		
	});

	$(window).load(function() {
		
	});
	
	$(window).resize(function() {
		
	});
})(window.jQuery);
