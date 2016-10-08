var food = function(){
	return {
		init : function () {
			this.y = Math.random() * (world.bottom - world.top) + world.top
			this.x = Math.random() * (world.right - world.left) + world.left
			this.id = (''+Math.random()).replace('.', '');
			this.radius = 10

			$('#world').append('<div class="food" id="food-'+this.id+'"></div>');

			this.el = $('#food-'+this.id);
			this.el.css({
				transform : 'translate3d('+this.x+'px, '+this.y+'px, 0)',
				width : this.radius * 2,
				height : this.radius * 2,
				top : -this.radius,
				left : -this.radius
			})
		},
		beEaten : function () {
			this.el.remove()
							
			_.remove(foods, {id : this.id})

			var new_food = food()
			new_food.init()
			foods.push(new_food)
			
		}
	}
}