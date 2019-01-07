
import EventDispatcher from "./EventDispatcher.js";
import applyProperties from "./properties.js";
import { merge } from "./util.js";

class Component extends EventDispatcher {

	constructor() {

		super();
		applyProperties( this );

	}

	update( data, silent = false ) {

		merge( this, data );

		if ( ! silent ) this.dispatchEvent( "updated" );

	}

	get fieldName() {

		return this.constructor.name[ 0 ].toLowerCase() + this.constructor.name.slice( 1 );

	}

}

export default Component;
