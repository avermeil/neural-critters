var creature = function () {
		return {
			init: function () {
				this.x = 500;
				this.y = 200;
				this.speed = Math.random() * 5;
				this.rotation_speed = 0.5
				this.rotation = Math.random() * 360
				this.id = (''+Math.random()).replace('.', '');
				this.lifetime = 0
				this.radius = 5
				this.fullness = 2
				this.left_track_speed = Math.random();
				this.right_track_speed = Math.random();
 
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

			},
			think : function () {
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

				this.right_track_speed += Math.random() - 0.5
				this.left_track_speed += Math.random() - 0.5



				this.el.css({
					'border-top-width' : Math.abs(this.left_track_speed),
					'border-bottom-width' : Math.abs(this.right_track_speed)
				})


		        this.speed = (this.left_track_speed + this.right_track_speed)/2


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

				this.x += change[0];

				this.y += change[1]

				this.fullness = this.fullness - 0.0005 - (Math.abs(this.speed) * 0.0005)


				if(!isInsideWorld(this)){
					this.rotation += 180
				}

				if(render){
					this.el.css({transform : 'translate3d('+this.x+'px, '+this.y+'px, 0) rotate('+ this.rotation +'deg) scale('+this.fullness+')'})
				}

				var found_food = _.find(foods, (food) => {
					return isCollidingWith(food, this)
				})

				if(found_food){
					if(!this.eating){
						this.eating = true
						this.fullness += 0.2
						this.el.css({'background-color' : 'blue'})
						found_food.beEaten()
					}
					
				}
				else {
					this.eating = false
					this.el.css({'background-color' : 'pink'})
				}

				this.lifetime ++;

			},
			die : function(){
				this.el.remove()
				
				_.remove(creatures, {id : this.id})
			},
			addFlag : function () {
				this.inner.addClass('flagged')
			}
		}
	}