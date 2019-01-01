
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

}

export default Component;
