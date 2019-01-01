
import EventDispatcher from "./EventDispatcher.js";

class System extends EventDispatcher {

	constructor() {

		super();

		this.entities = [];

	}

	test() {

		return true;

	}

	addEntity( entity ) {

		if ( this.entities.includes( entity ) ) return;

		this.entities.push( entity );
		this.dispatchEvent( "entityAdded", { entity } );

	}

	removeEntity( entity ) {

		const index = this.entities.indexOf( entity );
		if ( index === - 1 ) return;

		this.entities.splice( index, 1 );
		this.dispatchEvent( "entityRemoved", { entity } );

	}

}

export default System;
