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

			var self = this;
			self.myScroll[0] = new IScroll('#dateLeft', { mouseWheel: true, click: true });
			self.myScroll[1] = new IScroll('#dateRight', { mouseWheel: true, click: true });
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
