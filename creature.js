var creature = function () {
	return {
		brain : brain(),
		init: function (genome) {

			this.y = Math.random() * (world.bottom - world.top) + world.top
			this.x = Math.random() * (world.right - world.left) + world.left
			this.speed = 1;
			this.rotation_speed = 0.5
			this.rotation = Math.random() * 360
			this.id = (''+Math.random()).replace('.', '');
			this.lifetime = 0
			this.radius = 5
			this.fullness = 2
			this.left_track_speed = Math.random();
			this.right_track_speed = Math.random();
			this.normalized_direction = {x : 1, y : 0}
			this.genome = genome || _.range(15 + 8).map(function () {
				return Math.random() * 2 -1
			})

			$('#world').append('<div class="creature" id="creature-'+this.id+'"><div class="eye left-eye"></div><div class="eye right-eye"></div></div>');


			this.el = $('#creature-'+this.id);
			this.inner = $('#creature-'+this.id+' .inner-creature');

			// this.righ_eye = 

			// this.left_eye = 

			this.el.css({
				width : this.radius * 2,
				height : this.radius * 2,
				top : -this.radius,
				left : -this.radius
			})

			$('#creature-'+this.id+' .right-eye').css({
				top : 10,
				left : 15
			})

			$('#creature-'+this.id+' .left-eye').css({
				top : -5,
				left : 15
			})

			this.setColor()

			this.brain.init(4, 3, this.genome)
		},
		think : function () {
			var food_direction = this.getClosestFoodDirection()

			var outputs = this.brain.think([
				this.normalized_direction.x,
				this.normalized_direction.y,
				food_direction.x, 
				food_direction.y
			])

			//console.log(outputs)

			this.left_track_speed  = 2 * (outputs[0] - 0.5)
			this.right_track_speed = 2 * (outputs[1] - 0.5)
			//inputs: 
				//normalized vector of closest food

			//outputs
				//right track speed
				//left track speed
		},
		move : function () {
			var _this = this;

			if(this.fullness < 1){
				this.die()
				return;
			} 

			//this.right_track_speed += Math.random() - 0.5
			//this.left_track_speed += Math.random() - 0.5

			this.el.css({
				'border-top-width' : Math.abs(this.left_track_speed),
				'border-bottom-width' : Math.abs(this.right_track_speed)
			})

	        this.speed = (this.left_track_speed + this.right_track_speed)

	        var rotation_force = this.left_track_speed - this.right_track_speed

	        if(rotation_force < -5){
	        	rotation_force = -5
	        }
	        if(rotation_force > 5){
	        	rotation_force = 5
	        }

	        this.rotation += rotation_force;

	        if(this.rotation > 360) {
	        	this.rotation -= 360
	        }

	        if(this.rotation < 0) {
	        	this.rotation += 360;
	        }

			var angle = this.rotation * (Math.PI/180);

			var change = [this.speed * Math.cos(angle), this.speed * Math.sin(angle)]

			var distance_moved = Math.sqrt(Math.pow(change[0], 2) + Math.pow(change[1], 2))

			this.normalized_direction = {
				x : change[0] / distance_moved,
				y : change[1] / distance_moved
			}

			this.x += change[0];

			this.y += change[1]

			this.fullness = this.fullness - 0.0005 - (Math.abs(this.speed) * 0.0005)


			if(!isInsideWorld(this)){
				this.rotation += 180
			}

			this.el.css({transform : 'translate3d('+this.x+'px, '+this.y+'px, 0) rotate('+ this.rotation +'deg) scale('+this.fullness+')'})
			

			var found_food = _.find(foods, (food) => {
				return isCollidingWith(food, this)
			})

			if(found_food){
				if(!this.eating){
					this.eating = true
					this.fullness += 0.4
					this.el.css({'background-color' : 'blue'})
					found_food.beEaten()
				}
				
			}
			else {
				this.eating = false
				this.el.css({'background-color' : this.color})
			}

			this.lifetime ++;

		},
		die : function(){
			this.el.remove()
			
			_.remove(creatures, {id : this.id})

			var new_creature = creature()
			new_creature.init()
			creatures.push(new_creature)

		},
		getClosestFoodDirection : function(){
			var smallest_distance = 99999999;
			var closest_food;

			foods.forEach((food) => {

				var distance = Math.sqrt(Math.pow(this.x - food.x, 2) + Math.pow(this.y - food.y, 2))

				if(distance < smallest_distance){
					smallest_distance = distance
					closest_food = food
				}
			})

			var path_to_food = {
				x : closest_food.x - this.x,
				y : closest_food.y - this.y
			}



			var v = {
				x : path_to_food.x / smallest_distance,
				y : path_to_food.y / smallest_distance
			}
			this.path_to_food = v
			return v
		},
		setColor : function() {
			var str = ''+this.genome.join()
		    var hash = 0;
		    var c = '#';

		    for (var i = 0; i < str.length; i++) {
		        hash = str.charCodeAt(i) + ((hash << 5) - hash);
		    }
		    
		    for (var i = 0; i < 3; i++) {
		        var value = (hash >> (i * 8)) & 0xFF;
		        c += ('00' + value.toString(16)).substr(-2);
		    }
		    console.log(c)
		    this.color = c;
		}
	}
}
