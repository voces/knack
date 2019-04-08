
import EventDispatcher from "./EventDispatcher.mjs";
import applyProperties, { properties } from "./properties.mjs";

export default class System extends EventDispatcher {

	static get properties() {

		return properties( "app" );

	}

	constructor() {

		super();
		applyProperties( this );

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
