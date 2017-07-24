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
					{x:5,y:6},
					{x:3,y:5},
					{x:2,y:4},
					{x:4,y:5}
				],
				perPos: {x:4,y:6}
				
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
			this.map = {mapData: __DEFAULT__.mission[0].map, mapElement: ul};


			// 生成箱子
			for (var i = __DEFAULT__.mission[0].boxPos.length - 1; i >= 0; i--) {
				var box = document.createElement("div");
				box.className = "box";
				box.style.left = (__DEFAULT__.mission[0].boxPos[i].x-1) * 50 +"px";
				box.style.top = (__DEFAULT__.mission[0].boxPos[i].y-1) * 50 +"px";
				ul.appendChild(box);
				this.box = this.box || [];
				this.box.push({
					x: __DEFAULT__.mission[0].boxPos[i].x,
					y: __DEFAULT__.mission[0].boxPos[i].y,
					boxElement: box
				});
			};
			


			// 生成人物
			var person = document.createElement("div");
			person.className = "person";
			person.style.left = (__DEFAULT__.mission[0].perPos.x-1) * 50 +"px";
			person.style.top = (__DEFAULT__.mission[0].perPos.y-1) * 50 +"px";
			ul.appendChild(person);
			this.person = {x: __DEFAULT__.mission[0].perPos.x, y: __DEFAULT__.mission[0].perPos.y, personElement: person};


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
						break;

					case 40: 
						that.personMove("down");
						break;

					case 37: 
						that.personMove("left");
						break;

					case 39: 
						that.personMove("right");
						break;
				}			
			}
		},

		personMove: function(direction){
			var that = this;
			switch (direction){
				case "up":
					that.moveAction(0, -1);
					break;
				case "down": 
					that.moveAction(0, 1);
					break;
				case "left": 
					that.moveAction(-1, 0);
					break;	
				case "right": 
					that.moveAction(1, 0);
					break;
			}
		},

		moveAction: function(x, y){
			var that = this;
			var personNextElement = that.map.mapElement.children[(that.person.y + y) * 8 - (8 - that.person.x - x) - 1].getAttribute("class");
			var flag = true;
			if(personNextElement == "allow" || personNextElement == "target"){
				that.box.forEach(function(box){
					if (box.y == (that.person.y + y) && box.x == (that.person.x + x)) {

						var boxNextElement = that.map.mapElement.children[(box.y + y) * 8 - (8 - box.x - x) - 1].getAttribute("class");
						if (boxNextElement == "allow" || boxNextElement == "target") {
							that.box.forEach(function(boxCheck){
								if (boxCheck.y == (that.person.y + 2 * y) && boxCheck.x == (that.person.x + 2 * x)) {
									flag = false;
									x = 0;
									y = 0;
								}
							});

							box.boxElement.style.top = (box.y - 1 + y)*50 +"px";
							box.boxElement.style.left = (box.x - 1 + x)*50 +"px";
							box.y = box.y + y;
							box.x = box.x + x;
						}else{
							flag = false;
						}

					}
				});					
			}else{
				flag = false;
			}

			if (flag) {
				that.person.personElement.style.top = (that.person.y - 1 + y)*50 +"px";
				that.person.personElement.style.left = (that.person.x - 1 + x)*50 +"px";
				that.person.y = that.person.y + y;
				that.person.x = that.person.x + x;
			}			
		}

	}


	return Sokoban;
})(window);