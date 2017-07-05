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
				perPos: {x:5,y:5}
				
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
			this.map = __DEFAULT__.mission[0].map;


			// 生成箱子
			for (var i = __DEFAULT__.mission[0].boxPos.length - 1; i >= 0; i--) {
				var box = document.createElement("div");
				box.className = "box";
				box.style.left = __DEFAULT__.mission[0].boxPos[i].x * 50 +"px";
				box.style.top = __DEFAULT__.mission[0].boxPos[i].y * 50 +"px";
				ul.appendChild(box);
			};
			this.box = __DEFAULT__.mission[0].boxPos;


			// 生成人物
			var person = document.createElement("div");
			person.className = "person";
			person.style.left = (__DEFAULT__.mission[0].perPos.x-1) * 50 +"px";
			person.style.top = (__DEFAULT__.mission[0].perPos.y-1) * 50 +"px";
			ul.appendChild(person);
			this.person = {x: __DEFAULT__.mission[0].perPos.x, y: __DEFAULT__.mission[0].perPos.y, element: person};


			el.appendChild(ul);
		},

		bindKey: function(){
			var that = this;
			onkeyup = function(ev){
				var oEvent = ev || event;
				// console.log(that);
				switch (oEvent.keyCode){
					case 38: 
						that.personMove("up");
						// var className = "tree";
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
		},

		personMove: function(direction){
			console.log((this.person.y - 2)*50 +"px");
			this.person.element.style.top = (this.person.y - 2)*50 +"px";
		}

	}


	return Sokoban;
})(window);