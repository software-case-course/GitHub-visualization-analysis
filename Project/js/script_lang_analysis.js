var radar_borderColor = [
	'rgba(26, 188, 156,1.0)',
	'rgba(22, 160, 133,1.0)',
	'rgba(46, 204, 113,1.0)',
	'rgba(39, 174, 96,1.0)',
	'rgba(52, 152, 219,1.0)',
	'rgba(41, 128, 185,1.0)',
	'rgba(155, 89, 182,1.0)',
	'rgba(142, 68, 173,1.0)',
	'rgba(241, 196, 15,1.0)',
	'rgba(243, 156, 18,1.0)',
	'rgba(230, 126, 34,1.0)',
	'rgba(211, 84, 0,1.0)',
	'rgba(231, 76, 60,1.0)',
	'rgba(192, 57, 43,1.0)'
];
var radar_bgColor = [
	'rgba(26, 188, 156,0.5)',
	'rgba(22, 160, 133,0.5)',
	'rgba(46, 204, 113,0.5)',
	'rgba(39, 174, 96,0.5)',
	'rgba(52, 152, 219,0.5)',
	'rgba(41, 128, 185,0.5)',
	'rgba(155, 89, 182,0.5)',
	'rgba(142, 68, 173,0.5)',
	'rgba(241, 196, 15,0.5)',
	'rgba(243, 156, 18,0.5)',
	'rgba(230, 126, 34,0.5)',
	'rgba(211, 84, 0,0.5)',
	'rgba(231, 76, 60,0.5)',
	'rgba(192, 57, 43,0.5)'
];
var lang_nameLabels = new Array();
var lang_usersNum = new Array();
var lang_reposNum = new Array();
var lang_trendArr = new Array();
var lang_starsNum = new Array();
var lang_forksNum = new Array();

function lang_analysis() {
	$("#loading-tip").modal('show');
	$.ajax({
		type: "get",
		url: "http://139.199.196.203/checkmysql.php?callback=?",
		dataType: 'JSONP',
		success: function(jsonItem) {
			//加载用户数据、仓库数据成功
			$.each(jsonItem.data, function(index, value) {
				lang_nameLabels.push(value.lang_name);
				lang_usersNum.push(parseFloat(value.user_percentage));
				lang_reposNum.push(parseFloat(value.rep_percentage));
			});
			$(document).trigger('user_repos_data_loaded');
		}
	});

	$(document).on('user_repos_data_loaded', function() {
		console.log('用户数，仓库数加载完毕，执行回调函数，加载趋势数据');
		$.ajax({
			type: "get",
			url: "http://139.199.196.203/checkmysql2.php?callback=?",
			dataType: 'JSONP',
			success: function(jsonItem) {
				$.each(lang_nameLabels, function(index, value) {
					var total = 0;
					var length = 0;
					$.each(jsonItem[value], function(key, item) {
						total += parseFloat(item);
						length++;
					});
					var avg = total / length;
					lang_trendArr.push(avg);
				});
				$(document).trigger('trend_data_loaded');
			}
		});
	});

	$(document).on('trend_data_loaded', function() {
		console.log('趋势数据加载完毕,开始加载stars数以及forks数');
		$.ajax({
			type: "get",
			url: "http://139.199.196.203/checkmysql4.php?callback=?",
			dataType: 'JSONP',
			success: function(jsonItem) {
				$.each(lang_nameLabels, function(index, value) {
					lang_starsNum.push(parseFloat(jsonItem[value].stars));
					lang_forksNum.push(parseFloat(jsonItem[value].forks));
				});
				$(document).trigger('stars_forks_data_loaded');
			}
		});
	});

	$(document).on('stars_forks_data_loaded', function() {
		adjust_data();
		var radarChartData = {};
		var datasets = new Array();
		radarChartData.labels = ['用户数', '仓库数', '活跃度', 'stars数', 'forks数'];
		$.each(lang_nameLabels, function(index, value) {
			var item = {};
			item.label = value;
			item.backgroundColor = radar_bgColor[index];
			item.borderColor = radar_borderColor[index];
			item.pointBackgroundColor = radar_bgColor[index];
			var dataArr = new Array();
			dataArr.push(lang_usersNum[index]);
			dataArr.push(lang_reposNum[index]);
			dataArr.push(lang_trendArr[index]);
			dataArr.push(lang_starsNum[index]);
			dataArr.push(lang_forksNum[index]);
			item.data = dataArr;
			datasets.push(item);
		}); //循环结束后数据就准备好了
		radarChartData.datasets = datasets;
		drawRadar(radarChartData);
		$("#loading-tip").modal('hide');
	});
}

function drawRadar(radarChartData) {
	if(window.lang_analysis_chart == null) {
		console.log("新建雷达图");
		var config = {
			type: 'radar',
			data: radarChartData,
			options: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Chart.js Radar Chart'
				},
				scale: {
					ticks: {
						beginAtZero: true
					}
				}
			}
		};
		window.lang_analysis_chart=new Chart(document.getElementById('myChart-lang-analysis'),config);
		window.lang_analysis_chart_config=config;
		window.lang_analysis_chart_datasets=radarChartData;
	}
	else
	{
		console.log('更新雷达图');
		window.lang_analysis_chart_config.data=radarChartData;
		window.lang_analysis_chart_datasets=radarChartData;
		window.lang_analysis_chart.update();
	}
}

function adjust_data()
{
	var users_standard=0;
	var repos_standard=0;
	var trend_standard=0;
	var stars_standard=0;
	var forks_standard=0;
	//求出各个维度的平均值
	$.each(lang_nameLabels, function(index,value) {
		users_standard+=lang_usersNum[index];
		repos_standard+=lang_reposNum[index];
		trend_standard+=lang_trendArr[index];
		stars_standard+=lang_starsNum[index];
		forks_standard+=lang_forksNum[index];
	});
	
	users_standard=users_standard/lang_usersNum.length;
	repos_standard=repos_standard/lang_reposNum.length;
	trend_standard=trend_standard/lang_trendArr.length;
	stars_standard=stars_standard/lang_starsNum.length;
	forks_standard=forks_standard/lang_forksNum.length;
	//对各个维度的数据进行标准化
	$.each(lang_nameLabels, function(index,value) {
		lang_usersNum[index]=lang_usersNum[index]/users_standard;
		lang_reposNum[index]=lang_reposNum[index]/repos_standard;
		lang_trendArr[index]=lang_trendArr[index]/trend_standard;
		lang_starsNum[index]=lang_starsNum[index]/stars_standard;
		lang_forksNum[index]=lang_forksNum[index]/forks_standard;
	});
	//对数据比较小的维度进行放大
	var times=getTimes();
	$.each(lang_nameLabels, function(index,value) {
		lang_usersNum[index]*=times[0];
		lang_reposNum[index]*=times[1];
		lang_trendArr[index]*=times[2];
		lang_starsNum[index]*=times[3];
		lang_forksNum[index]*=times[4];
	});
}

function getTimes(){
	//求出5个维度中的最大值
	var arr=new Array();
	arr.push(Math.max.apply(null,lang_usersNum));
	arr.push(Math.max.apply(null,lang_reposNum));
	arr.push(Math.max.apply(null,lang_trendArr));
	arr.push(Math.max.apply(null,lang_starsNum));
	arr.push(Math.max.apply(null,lang_forksNum));
	var max=Math.max.apply(null,arr);
	
	var times=new Array();
	var user_max=Math.max.apply(null,lang_usersNum);
	var repos_max=Math.max.apply(null,lang_reposNum);
	var trend_max=Math.max.apply(null,lang_trendArr);
	var stars_max=Math.max.apply(null,lang_starsNum);
	var forks_max=Math.max.apply(null,lang_forksNum);
	
	times.push(max/user_max);
	times.push(max/repos_max);
	times.push(max/trend_max);
	times.push(max/stars_max);
	times.push(max/forks_max);
	
	return times;
}
