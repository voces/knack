
import EventDispatcher from "./EventDispatcher.js";

import { merge } from "./util.js";
import applyProperties, { properties } from "./properties.js";
import Component from "./Component.js";

const nextId = () => ++ nextId._id;
nextId._id = 0;

const lowerCamelize = str => str[ 0 ].toLowerCase() + str.slice( 1 );
const name = component => lowerCamelize( component.constructor.name );

const entities = {};

class Entity extends EventDispatcher {

	static get properties() {

		return properties( "app" );

	}

	static get components() {

		return [];

	}

	static get defaultData() {

		return {};

	}

	static fromId( id ) {

		return entities[ id ];

	}

	static nextId() {

		return nextId();

	}

	constructor( data = {} ) {

		super();
		applyProperties( this );

		data = merge( {}, this.constructor.defaultData, data );

		this.id = data.id || this.constructor.nextId();
		if ( entities[ this.id ] ) {

			console.warn( "Duplicate ids on entity!" );
			console.log( "new", this );
			console.log( "old", entities[ this ].id );
			entities[ this.id ] = this;

		}

		Object.defineProperties( this, {
			onComponentUpdated: { value: this.onComponentUpdated.bind( this ) }
		} );

		const components = data.components || this.constructor.components;
		for ( let i = 0; i < components.length; i ++ ) {

			const componentName = lowerCamelize( components[ i ].name );
			const args = data[ componentName ];
			const component = new components[ i ]( ...( typeof args === "object" && args instanceof Array ? args : [ args ] ) );
			this[ componentName ] = component;

			component.addEventListener( "updated", this.onComponentUpdated );

		}

		const properties = data.properties || this.constructor.properties;
		if ( properties )
			for ( const prop of properties )
				if ( data[ prop ] !== undefined )
					this[ prop ] = data[ prop ];

	}

	addComponent( component ) {

		this[ name( component ) ] = component;
		this.dispatchEvent( "componentAdded", { component } );

		component.addEventListener( "updated", this.onComponentUpdated );

	}

	removeComponent( component ) {

		if ( ! this[ name( component ) ] ) return;

		this[ name( component ) ].name = undefined;
		this.dispatchEvent( "componentRemoved", { component } );

		component.removeEventListener( "updated", this.onComponentUpdated );

	}

	update( data, silent ) {

		for ( const prop in data )
			if ( this[ prop ] instanceof Component ) this[ prop ].update( data[ prop ] );
			else if ( typeof this[ prop ] === "object" ) merge( this[ prop ], data[ prop ] );
			else this[ prop ] = data[ prop ];

		if ( ! silent ) this.dispatchEvent( "updated" );

	}

	onComponentUpdated( event ) {

		this.dispatchEvent( "updated", event );

	}

	get reference() {

		return { id: this.id };

	}

	remove() {

		if ( this.app ) this.app.removeEntity( this );

	}

}

export default Entity;
