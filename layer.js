var layer = function(){

	return {
		neurons : [],
		init : function (neuron_count, input_count) {
			this.input_count = input_count
			_.range(neuron_count).forEach(() => {
				this.neurons.push(neuron().init(input_count))
			})

			return this;
		},
		activate : function (inputs) {
			if(inputs.length !== this.input_count){
				console.log(inputs.length)
				console.log(this.input_count)
				throw 'Bad number of inputs in layer'
			}

			var outputs = []
			this.neurons.forEach((neuron) => {
				outputs.push(neuron.activate(inputs))
			})

			return outputs
		}
	}
}