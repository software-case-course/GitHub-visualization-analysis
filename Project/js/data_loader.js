var borderBlue="rgba(54, 162, 235,1)";
var backgroundBlue="rgba(54, 162, 235,0.6)";
var borderRed="rgba(255, 99, 132,1)";
var backgroundRed="rgba(255, 99, 132,0.6)";
var borderGreen="rgba(75, 192, 192,1)";
var backgroundGreen="rgba(75, 192, 192,0.6)";

var borderColorset=[borderBlue,borderRed,borderGreen];
var backgroundColorset=[backgroundBlue,backgroundRed,backgroundGreen];

var lang_keys=new Array();
var map_repos={};
var map_users={};

function get_lang_rank_repos(callback){
	var lang_rank_r = Bmob.Object.extend("lang_rank_repos");
	var query_r = new Bmob.Query(lang_rank_r);
	// 查询所有数据
	query_r.find({
  		success: function(results) {
    	// 循环处理查询到的数据
    		for (var i = 0; i < results.length; i++) {
      			var obj=results[i];
					if(lang_keys.indexOf(obj.get("lang_name"))==-1)//keys数组中不含该关键字
					{
						lang_keys[lang_keys.length]=obj.get("lang_name");
						map_repos[obj.get("lang_name")]=parseFloat(obj.get("lang_percent"));
						map_users[obj.get("lang_name")]=0;
					}
					else
					{
						map_repos[obj.get("lang_name")]=parseFloat(obj.get("lang_percent"));				
					}
    		}
    		
    		//控制台输出keys数组
			for(var j=0;j<lang_keys.length;j++) console.log(lang_keys[j]);
			console.log("repos数据获取完毕-------------------------------------------------");
			
			callback();
  		},
  		error: function(error) {
    		alert("查询失败: " + error.code + " " + error.message);
  		}	
	});
}

function get_lang_rank_users(){
	var lang_rank_u = Bmob.Object.extend("lang_rank_users");
	var query_u = new Bmob.Query(lang_rank_u);
	// 查询所有数据
	query_u.find({
  		success: function(results) {
    	// 循环处理查询到的数据
    		for (var i = 0; i < results.length; i++) {
     	 		var obj=results[i];
				if(lang_keys.indexOf(obj.get("lang_name"))==-1)//keys数组中不含该关键字
				{
					lang_keys[lang_keys.length]=obj.get("lang_name");
					map_repos[obj.get("lang_name")]=0;
					map_users[obj.get("lang_name")]=parseFloat(obj.get("lang_percent"));
				}
				else
				{
					map_users[obj.get("lang_name")]=parseFloat(obj.get("lang_percent"));				
				}
    		}
    		//控制台输出keys数组
				for(var j=0;j<lang_keys.length;j++) console.log(lang_keys[j]);
				console.log("users数据获取完毕--------------------------------------------------");
				
			onDataLoad();
  		},
  		error: function(error) {
    		alert("查询失败: " + error.code + " " + error.message);
  		}
	});
}

function get_lang_rank()
{
	get_lang_rank_repos(get_lang_rank_users);
}

function onDataLoad()
{
	var data_repos=new Array();
	var data_users=new Array();
	for(var i=0;i<lang_keys.length;i++)
	{
		data_repos[i]=map_repos[lang_keys[i]];
		data_users[i]=map_users[lang_keys[i]];
	}
	var data_array=new Array();
	data_array[0]=data_repos;
	data_array[1]=data_users;
	
	var chartBundle={
		chart_title:"语言排行",
		labels:lang_keys,
		data_array:data_array,
		dataset_title:['仓库占比','用户占比'],
		border_colorset:borderColorset,
		bg_colorset:backgroundColorset,
		display_mode:"bar"
	}
	drawChart(chartBundle);//根据数据画图
	$("#loading-tip").trigger('done');//画图完成后消除模态框
}

function drawChart(chartBundle)
{
	var _dataset=new Array();
	for(var i=0;i<chartBundle.data_array.length;i++)
	{
		_dataset[i]={
			type:chartBundle.display_mode,
			label:chartBundle.dataset_title[i],
			borderColor:chartBundle.border_colorset[i],
			borderWidth:2,
			backgroundColor:chartBundle.bg_colorset[i],
			data:chartBundle.data_array[i]
		}
		
		console.log(chartBundle.bg_colorset[i]);
	}
	var chartData={
		labels:chartBundle.labels,
		datasets:_dataset
	};
	
	var ctx=document.getElementById("myChart").getContext("2d");
	var myMixedChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: chartBundle.chart_title
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
       });
}
