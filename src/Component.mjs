
import EventDispatcher from "./EventDispatcher.mjs";
import applyProperties from "./properties.mjs";
import { merge } from "./util.mjs";

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
