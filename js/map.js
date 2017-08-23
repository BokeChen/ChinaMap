
// 各省市在地图上的坐标
 var province_config = [
   {name:'xinjiang',nameCH:'新疆',location:{x:"110",y:"170"}},    
   {name:'Tibet',nameCH:'西藏',location:{x:"130",y:"270"}},
   {name:'qinghai',nameCH:'青海',location:{x:"200",y:"236"}},
   {name:'jilin',nameCH:'吉林',location:{x:"454",y:"129"}},
   {name:'liaoning',nameCH:'辽宁',location:{x:"430",y:"154"}},
   {name:'hebei',nameCH:'河北',location:{x:"370",y:"197"}},
   {name:'shandong',nameCH:'山东',location:{x:"394",y:"222"}},
   {name:'jiangsu',nameCH:'江苏',location:{x:"420",y:"248"} },
   {name:'zhejiang',nameCH:'浙江',location:{x:"430",y:"292"} },
   {name:'anhui',nameCH:'安徽',location:{x:"400",y:"274"} },
   {name:'henan',nameCH:'河南',location:{x:"359",y:"251"} },
   {name:'shanxi',nameCH:'山西',location:{x:"345",y:"219"} },
   {name:'shaanxi',nameCH:'陕西',location:{x:"318",y:"255"} },
   {name:'gansu',nameCH:'甘肃',location:{x:"210",y:"182"} },
   {name:'hubei',nameCH:'湖北',location:{x:"354",y:"280"} },
   {name:'jiangxi',nameCH:'江西',location:{x:"388",y:"317"} },
   {name:'fujian',nameCH:'福建',location:{x:"414",y:"325"} },
   {name:'hunan',nameCH:'湖南',location:{x:"349",y:"320"} },
   {name:'guizhou',nameCH:'贵州',location:{x:"300",y:"334"} },
   {name:'sichuan',nameCH:'四川',location:{x:"270",y:"294"} },
   {name:'yunnan',nameCH:'云南',location:{x:"250",y:"358"} },
   {name:'hainan',nameCH:'海南',location:{x:"338",y:"415"} },
   {name:'shanghai',nameCH:'上海',location:{x:"433",y:"262"} },
   {name:'chongqing',nameCH:'重庆',location:{x:"309",y:"298"} },
   {name:'tianjin',nameCH:'天津',location:{x:"387",y:"185"} },
   {name:'beijing',nameCH:'北京',location:{x:"377",y:"175"} },
   {name:'ningxia',nameCH:'宁夏',location:{x:"290",y:"215"} },
   {name:'neimongol',nameCH:'内蒙古',location:{x:"320",y:"175"} },
   {name:'guangxi',nameCH:'广西',location:{x:"325",y:"371"} },   
   {name:'guangdong',nameCH:'广东',location:{x:"372",y:"360"} },
   {name:'hongkong',nameCH:'香港',location:{x:"383",y:"372"} },
   {name:'taiwan',nameCH:'台湾',location:{x:"448",y:"351"} },
   {name:'macau',nameCH:'澳门',location:{x:"350",y:"387"} },
   {name:'heilongjiang',nameCH:'黑龙江',location:{x:"456",y:"80"} }  
   
];

/**
* showPathFlowInMap 在地图上描绘出 A点（from）B点（to）的路线，A点画棕色（三色）圈，B点画蓝色（双色）圈。
* @ from Oject 类型，格式：{name:'xinjiang',nameCH:'新疆',location:{x:"110",y:"170"}} ，location是该点在地图上的坐标,路径起点（A点）
* @ to Oject 类型，格式：{name:'xinjiang',nameCH:'新疆',location:{x:"110",y:"170"}}，locationlocation是该点在地图上的坐标,路径终点（B点）
*/

function showPathFlowInMap(from,to){
var html=document.createElementNS('http://www.w3.org/2000/svg',"g");
html.innerHTML +=`
<circle cx="${to.location.x}" cy="${to.location.y}" r="6"  stroke="#476F8E"  stroke-width="2" fill="transparent" />
<circle cx="${to.location.x}" cy="${to.location.y}" r="2"  fill="#3C9CEF" />  

<circle cx="${from.location.x}" cy="${from.location.y}" r="7" stroke="#99834C"  stroke-width="2" fill="transparent" />        
<circle cx="${from.location.x}" cy="${from.location.y}" r="4" stroke="#58513C"  stroke-width="1.5" fill="transparent" />
<circle cx="${from.location.x}" cy="${from.location.y}" r="2" fill="#A97631" />
`;
document.getElementById("s1").appendChild(html);
createPath(from,to);

}


/**
* createPath: showPathFlowInMap 的子函数，作用：描绘Path，添加渐变，添加箭头动态效果
* @ from Oject 类型，格式：{name:'xinjiang',nameCH:'新疆',location:{x:"110",y:"170"}} ,location是该点在地图上的坐标,路径起点（A点）
* @ to Oject 类型，格式：{name:'xinjiang',nameCH:'新疆',location:{x:"110",y:"170"}}，locationlocation是该点在地图上的坐标,路径终点（B点）
* svg path A 指令参数 d="M ${from.location.x} ${from.location.y}（前两个参数起点坐标）     A${r},${r} （椭圆半径）   0 （与x轴的夹角） 0 （大弧度，小弧度选择）,1（圆弧方向，顺时针为0，逆时针为1） ${to.location.x},${to.location.y}（中点坐标）"
*/

function createPath(from,to){
var r= Math.sqrt((Math.pow(Math.abs(from.location.x-to.location.x),2)+Math.pow(Math.abs(from.location.y-to.location.y),2)))*0.9;  //算出两点间的距离，然后乘以0.8
var linearColor= from.location.x<to.location.x?"grad1":"grad3";
var radianOrientation= from.location.x<to.location.x?"1":"1";//调整圆弧方向，这里用不上。所以都赋值为1.
let html=document.createElementNS('http://www.w3.org/2000/svg',"g");
html.innerHTML+=`
<path d="M${from.location.x} ${from.location.y} A${r},${r} 0 0,${radianOrientation} ${to.location.x},${to.location.y}" stroke-width="2" stroke="url(#${linearColor})" fill="transparent" id="route${from.location.x}${from.location.y}_${to.location.x}${to.location.y}"/>
<image  x="-17" y="-10.7" width="25px" xlink:href="img/arrows.png"> 
   <animateMotion           
          dur="3s"
          begin="0s"
          fill="freeze"
          repeatCount="indefinite"
           rotate="auto"> 
           <mpath xlink:href="#route${from.location.x}${from.location.y}_${to.location.x}${to.location.y}" />         
   </animateMotion>
  </image>
`;

document.getElementById("s1").appendChild(html);
}
showPathFlowInMap(province_config[1],province_config[2]);
setTimeout(10000);
showPathFlowInMap(province_config[5],province_config[8]);
//showPathFlowInMap(province_config[9],province_config[2]);
//showPathFlowInMap(province_config[6],province_config[2]);




 