var lineColor = [
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

function lang_trend() {
//	var j = {
//		"data": [{
//			"lang_name": "Java",
//			"trend": {
//				"Jun": "1",
//				"Feb": "2",
//				"Web": "3",
//				"Apr": "4",
//				"May": "5",
//				"June": "6",
//				"July": "7",
//				"Aug": "8",
//				"Sec": "9",
//				"Oct": "10",
//				"Nov": "11",
//				"Dec": "12",
//			}
//		}, {
//			"lang_name": "Python",
//			"trend": {
//				"Jun": "2",
//				"Feb": "3",
//				"Web": "4",
//				"Apr": "4",
//				"May": "5",
//				"June": "6",
//				"July": "7",
//				"Aug": "8",
//				"Sec": "9",
//				"Oct": "10",
//				"Nov": "11",
//				"Dec": "12",
//			}
//		}]
//	};
	$("#loading-tip").modal('show');
	$.ajax({
		type:"GET",
		url:"http://139.199.196.203/checkmysql2.php?callback=?",
		dataType:'JSONP',
		success:function(data){
			var month_labels=new Array();
			var lang_nameSets=new Array();
			var trend_arr=new Array();
			$.each(data, function(key,item) {
				lang_nameSets.push(key);
				var trend_item=new Array();
				$.each(item, function(index,value) {
					if(month_labels.indexOf(index)==-1) month_labels.push(index);
					trend_item.push(value);
				});
				trend_arr.push(trend_item);
			});
			
			var lineChartDataset=new Array();
			$.each(lang_nameSets, function(index,value) {
				var item={
					label:value,
					fill:false,
					backgroundColor:lineColor[index],
					borderColor:lineColor[index],
					data:trend_arr[index]
				}
				lineChartDataset.push(item);
			});
			var chartBundle={
				x_labels:month_labels,
				datasets:lineChartDataset
			};
			drawTrend(chartBundle);
			$("#loading-tip").modal('hide');
		}
	});
}

function drawTrend(chartBundle) {
	console.log('画折线图');
	if(window.lang_trend_chart == null) {
		console.log('新建柱状图');
		var config = {
			type: 'line',
			data: {
				labels: chartBundle.x_labels,
				datasets:chartBundle.datasets
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: '近段时间Github上的项目创建情况'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

		window.lang_trend_chart = new Chart(document.getElementById('myChart-lang-trend').getContext('2d'), config);
		window.lang_trend_config = config;
		window.lang_trend_datasets = chartBundle.datasets;
	} else {
		//更新数据
		window.lang_trend_config.datasets = chartBundle.datasets;
		window.lang_trend_datasets = chartBundle.datasets;
		window.lang_trend_chart.update();
	}
}