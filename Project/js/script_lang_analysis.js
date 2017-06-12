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

function lang_analysis() {
//	var j = {
//		'data': [{
//			'lang_name': 'Python',
//			'user_num': '25',
//			'repos_num': '25',
//			'potential': 12,
//			'stars': 555,
//			'fork': 222
//		}, {
//			'lang_name': 'JavaScript',
//			'user_num': '25',
//			'repos_num': '25',
//			'potential': 22,
//			'stars': 333,
//			'fork': 444
//		}]
//	};
	var data_url = '';
	$.getJSON(data_url, function(result) {
		pack_data(result);
	});
}

function pack_data(jsonItem) {
	var lang_names = new Array();
	var lang_value = new Array();

	$.each(jsonItem, function(key, item) {
		switch(key) {
			case 'data':
				$.each(item, function(index, value) {
					lang_names.push(value.lang_name);
					var arr = new Array();
					arr.push(value.user_num);
					arr.push(value.repos_num);
					arr.push(value.potential);
					arr.push(value.stars);
					arr.push(value.fork);
					lang_value.push(arr);
					console.log(arr);
				});

				var chartBundle = {
					label: lang_names,
					datasets: lang_value
				}

				drawRadar(chartBundle);
		}
	});
}

function drawRadar(chartBundle) {
	if(window.radar_chart == null) {
		console.log('新建雷达图');
		var radarChartData = new Array();
		$.each(chartBundle.label, function(index, item) {
			var chartItem = {
				label: chartBundle.label[index],
				backgroundColor: radar_bgColor[index],
				borderColor: radar_borderColor[index],
				pointBackgroundColor: radar_bgColor[index],
				data: chartBundle.datasets[index]
			};
			radarChartData.push(chartItem);
		});
		var config = {
			type:'radar',
			data:{
				labels: ['用户数', '项目数', '潜力', '关注度（star）', 'fork数'],
				datasets: radarChartData
			},
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
		
		window.radar_chart=new Chart(document.getElementById('myChart-lang-analysis').getContext('2d'),config);
		window.radar_chart_config=config;
		window.radar_chart_datasets=radarChartData;
	}
	else
	{
		//更新数据
		console.log("更新数据");
		var radarChartData = new Array();
		$.each(chartBundle.label, function(index, item) {
			var chartItem = {
				label: chartBundle.label[index],
				backgroundColor: radar_bgColor[index],
				borderColor: radar_borderColor[index],
				pointBackgroundColor: radar_bgColor[index],
				data: chartBundle.datasets[index]
			};
			radarChartData.push(chartItem);
		});
		
		window.radar_chart_config.datasets=radarChartData;
		window.radar_chart_datasets=radarChartData;
		window.radar_chart.update();
	}
}