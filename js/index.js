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
			this.map = __DEFAULT__.mission[0].map;


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
			console.log(that.box);
			switch (direction){
				case "up": 
					that.box.forEach(function(box){
						if (box.y == (that.person.y-1) && box.x == that.person.x) {
							box.boxElement.style.top = (box.y - 2)*50 +"px";
							box.y = box.y -1;
						}
					})
					this.person.personElement.style.top = (this.person.y - 2)*50 +"px";
					this.person.y = this.person.y - 1;
					break;
				case "down": 
					this.box.forEach(function(box){
						if (box.y == (that.person.y+1) && box.x == that.person.x) {
							box.boxElement.style.top = box.y*50 +"px";
							box.y = box.y + 1;
						}
					})
					this.person.personElement.style.top = this.person.y*50 +"px";
					this.person.y = this.person.y + 1;
					break;
				case "left": 
					this.box.forEach(function(box){
						if (box.x == (that.person.x-1) && box.y == that.person.y) {
							box.boxElement.style.left = (box.x-2)*50 +"px";
							box.x = box.x - 1;
						}
					})
					this.person.personElement.style.left = (this.person.x-2)*50 +"px";
					this.person.x = this.person.x - 1;
					break;	
				case "right": 
					this.box.forEach(function(box){
						if (box.x == (that.person.x+1) && box.y == that.person.y) {
							box.boxElement.style.left = box.x*50 +"px";
							box.x = box.x + 1;
						}
					})			
					this.person.personElement.style.left = this.person.x*50 +"px";
					this.person.x = this.person.x + 1;
					break;
			}

			
		}

	}


	return Sokoban;
})(window);