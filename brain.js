var brain = function(){
	return {
		layers : [
			layer().init(3, 2),
			layer().init(2, 3)
		],
		init : function () {
			console.log('initing brain')
			return this
		},
		think : function (inputs) {

			inputs = this.layers[0].activate(inputs);
			inputs = this.layers[1].activate(inputs);

			return inputs
		}
	}
}