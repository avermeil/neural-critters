var brain = function(){
	return {
		layers : [
			//layer().init(3, 2),
			//layer().init(2, 3)
		],
		genome : [],
		init : function (input_count, hidden_layer_size, weights) {
			var w = _.cloneDeep(weights)
			var l1_weights = _.pullAt(w, _.range((input_count + 1) * hidden_layer_size))

			this.layers.push(layer().init(hidden_layer_size, input_count, l1_weights))
			this.layers.push(layer().init(2, hidden_layer_size, w))
			
			return this
		},
		think : function (inputs) {

			inputs = this.layers[0].activate(inputs);
			inputs = this.layers[1].activate(inputs);

			return inputs
		}
	}
}