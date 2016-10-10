var neuron = function(){
	return {
		weights : [],
		init : function (weights) {

			this.input_count = weights.length - 1

			this.weights = weights
			//init random weights
			// _.range(input_count + 1).forEach(() => {
			// 	this.weights.push(this.getRandomWeight())
			// })

			//console.log(this)

			return this
		},
		
		activate : function(inputs){
			if(inputs.length !== this.input_count){
				console.log(inputs.length)
				console.log(this.input_count)
				throw 'bad input for neuron'
			}

			var output = 0;

			this.weights.forEach((weight, index) => {

				if(!inputs[index]){
					return
				}
				output = output + (weight * inputs[index])
			})

			output += _.last(this.weights) * -1;

			return this.getSigmoid(output)
		},
		getRandomWeight : function () {
			return Math.random() * 2 -1
		},
		getSigmoid : function (input) {
			return ( 1 / ( 1 + Math.exp(-input / 1)));
		}
	}
}