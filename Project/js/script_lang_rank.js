var borderBlue = "rgba(54, 162, 235,1)";
var backgroundBlue = "rgba(54, 162, 235,0.5)";

var borderRed = "rgba(255, 99, 132,1)";
var backgroundRed = "rgba(255, 99, 132,0.5)";

var pie_bgColor_user=[
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
var pie_bgColor_repos=[
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
function lang_rank() {
	var j = {
		"data": [{
				"lang_name": "Java",
				"repos_percent": "15",
				"user_percent": "10"
			},

			{
				"lang_name": "Python",
				"repos_percent": "20",
				"user_percent": "22"
			}, {
				"lang_name": "JavaScript",
				"repos_percent": "8",
				"user_percent": "7"
			}
		]
	};
//	var data_url='';
//	$.getJSON(data_url,function(result){
//		pack_data(result);
//	});
	pack_data(j);
}

function pack_data(jsonItem) {
	var x_labels = new Array();
	var user_dataset = new Array();
	var repos_dataset = new Array();

	$.each(jsonItem, function(key, value) {
		switch(key) {
			case "data":
				$.each(value, function(index) {
					x_labels.push(value[index].lang_name);
					user_dataset.push(value[index].user_percent);
					repos_dataset.push(value[index].repos_percent);
				});
				var chartBunle = {
					labels: x_labels,
					user_data: user_dataset,
					repos_data: repos_dataset
				};
				var chartType = $("#cb5").get(0).checked ? 'pie' : 'bar';
				if(chartType == 'bar') drawBar(chartBunle);
				else drawPie(chartBunle);
				break;
		}
	});
}

function drawBar(chartBundle) {

	console.log('画柱状图');
	if(window.lang_rank_chart == null) {
		//新建图表
		console.log('新建柱状图');
		var barChartData = {
			labels: chartBundle.labels,
			datasets: [{
				label: "仓库占比",
				backgroundColor: backgroundBlue,
				borderColor: borderBlue,
				borderWidth: 2,
				data: chartBundle.repos_data
			}, {
				label: "用户占比",
				backgroundColor: backgroundRed,
				borderColor: borderRed,
				borderWidth: 2,
				data: chartBundle.user_data
			}]
		};

		var config = {
			type: 'bar',
			data: barChartData,
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Github上各种语言的占比情况'
				}
			}
		};

		window.lang_rank_chart = new Chart(document.getElementById("myChart").getContext('2d'), config);
		window.lang_rank_chart_config = config;
		window.lang_rank_chart_dataset = barChartData.datasets;
	}
	else
	{
		//更新数据
		console.log('更新数据')
		var new_dataset=[{
				label: "仓库占比",
				backgroundColor: backgroundBlue,
				borderColor: borderBlue,
				borderWidth: 2,
				data: chartBundle.repos_data
			}, {
				label: "用户占比",
				backgroundColor: backgroundRed,
				borderColor: borderRed,
				borderWidth: 2,
				data: chartBundle.user_data
			}];
			
		window.lang_rank_chart_config.data.datasets=new_dataset;
		window.lang_rank_chart_config.type='bar';
		window.lang_rank_chart_dataset=new_dataset;
		window.lang_rank_chart.update();
	}
}

function drawPie(chartBundle)
{
	console.log('画饼图');
	if(window.lang_rank_chart==null)
	{
		var pieChartData={
			labels:chartBundle.labels,
			datasets:[{
				label:"仓库占比",
				data:chartBundle.repos_data,
				backgroundColor:pie_bgColor_repos
			},
			{
				label:"用户占比",
				data:chartBundle.user_data,
				backgroundColor:pie_bgColor_user
			}
			]
		};
		
		var config={
			type:'pie',
			data:pieChartData,
			options: {
            	responsive: true,
            	legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Github上各种语言的占比情况'
				}
        	}
		};
		
		window.lang_rank_chart=new Chart(document.getElementById('myChart').getContext('2d'),config);
		window.lang_rank_chart_config=config;
		window.lang_rank_chart_dataset=pieChartData.datasets;
	}
	else{
		//更新数据
		console.log('更新数据');
		var new_datasets=[{
				label:"仓库占比",
				data:chartBundle.repos_data,
				backgroundColor:pie_bgColor_repos
			},
			{
				label:"用户占比",
				data:chartBundle.user_data,
				backgroundColor:pie_bgColor_user
			}
			];
		window.lang_rank_chart_config.type='pie';
		window.lang_rank_chart_config.data.datasets=new_datasets;
		window.lang_rank_chart_dataset=new_datasets;
		window.lang_rank_chart.update();
	}
}
