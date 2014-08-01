import Ember from 'ember';

export default Ember.TextField.extend({

	_picker: null,
 
	modelChangedValue: function(){
		// var picker = this.get("_picker");
		// if (picker){
		// 	picker.setDate(this.get("value"));
		// }
		console.log(this.get('value'));
	}.observes("value"),
 
	didInsertElement: function(){
		var currentYear = (new Date()).getFullYear();
		var formElement = this.$()[0];
		var picker = new Pikaday({
			field: formElement,
			yearRange: [1900,currentYear+2]
		});
		this.set("_picker", picker);
	},
 
	willDestroyElement: function(){
		var picker = this.get("_picker");
		
		if (picker) {
			picker.destroy();
		}
		this.set("_picker", null);
	}

});
