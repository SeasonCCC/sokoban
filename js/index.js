;
var Sokoban = (function(root){

	var __DEFAULT__ = {
		mission: [
			{
				map: [
					0,0,1,1,1,0,0,0,
					0,1,3,3,1,1,1,1,
					0,1,2,2,3,2,2,1,
					1,2,2,2,1,2,1,0,
					1,2,2,2,2,3,1,0,
					1,2,2,2,2,2,2,1,
					0,1,2,2,2,2,1,0,
					0,0,1,1,1,1,1,0
				],
				boxPos: [
					{x:5,y:3},
					{x:3,y:5},
					{x:2,y:4},
					{x:4,y:5}
				],
				perPos: {x:5,y:6}
				
			}
		]
	}

	function Sokoban(options){
		var el = document.querySelector(options.el);
		this.init(el);
		this.bindKey();
	};

	Sokoban.prototype = {
		init: function(el) {
			// 生成地图
			var ul = document.createElement("ul");
			for (var i = 0; i < 64; i++) {
				var li = document.createElement("li");

				switch (__DEFAULT__.mission[0].map[i]){
					case 0: 
						var className = "tree";
						break;

					case 1: 
						var className = "wall";
						break;

					case 2: 
						var className = "allow";
						break;

					case 3: 
						var className = "target";
						break;
				}

				li.setAttribute("class", className);
				ul.appendChild(li);
			};


			// 生成箱子
			for (var i = __DEFAULT__.mission[0].boxPos.length - 1; i >= 0; i--) {
				var box = document.createElement("div");
				box.className = "box";
				box.style.left = __DEFAULT__.mission[0].boxPos[i].x * 50 +"px";
				box.style.top = __DEFAULT__.mission[0].boxPos[i].y * 50 +"px";
				ul.appendChild(box);
			};


			// 生成人物
			var person = document.createElement("div");
			person.className = "person";
			person.style.left = __DEFAULT__.mission[0].perPos.x * 50 +"px";
			person.style.top = __DEFAULT__.mission[0].perPos.y * 50 +"px";
			ul.appendChild(person);
			this.person = {x: __DEFAULT__.mission[0].perPos.x, y: __DEFAULT__.mission[0].perPos.y};


			el.appendChild(ul);
		},

		bindKey: function(){
			onkeyup = function(ev){
				var oEvent = ev || event;
				console.log(oEvent.keyCode);
				switch (oEvent.keyCode){
					case 38: 
						var className = "tree";
						break;

					case 40: 
						var className = "wall";
						break;

					case 37: 
						var className = "allow";
						break;

					case 39: 
						var className = "target";
						break;
				}			
			}
		}

	}


	return Sokoban;
})(window);