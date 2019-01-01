
import EventDispatcher from "./EventDispatcher.js";

const dirtyEvents = "componentAdded componentRemoved updated";

class App extends EventDispatcher {

	constructor() {

		super();

		this.systems = [];
		this.entities = [];

		Object.defineProperty( this, "onDirtyEntity", {
			value: this.onDirtyEntity.bind( this )
		} );

	}

	addSystem( system ) {

		this.systems.push( system );

		for ( let i = 0; i < this.entities.length; i ++ )
			if ( system.test( this.entities[ i ] ) ) system.addEntity( this.entities[ i ] );

	}

	removeSystem( system ) {

		const index = this.systems.indexOf( system );
		if ( index >= 0 ) this.systems.splice( index, 1 );

	}

	addEntity( entity ) {

		this.entities.push( entity );

		for ( let i = 0; i < this.systems.length; i ++ )
			if ( this.systems[ i ].test( entity ) ) this.systems[ i ].addEntity( entity );

		entity.addEventListener( dirtyEvents, this.onDirtyEntity );

		return entity;

	}

	removeEntity( entity ) {

		const index = this.entities.indexOf( entity );
		if ( index >= 0 ) this.entities.splice( index, 1 );

		for ( let i = 0; i < this.systems.length; i ++ )
			if ( this.systems[ i ].test( entity ) ) this.systems[ i ].removeEntity( entity );

		entity.removeEventListener( dirtyEvents, this.onDirtyEntity );

	}

	onDirtyEntity( event ) {

		const entity = event.target;

		for ( let i = 0; i < this.systems.length; i ++ )
			if ( this.systems[ i ].test( entity ) ) this.systems[ i ].addEntity( entity );
			else this.systems[ i ].removeEntity( entity );

	}

	update( elapsed ) {

		for ( let i = 0; i < this.systems.length; i ++ ) {

			if ( this.systems[ i ].preUpdate ) this.systems[ i ].preUpdate( elapsed );

			if ( this.systems[ i ].update )
				for ( let n = 0; n < this.systems[ i ].entities.length; n ++ )
					this.systems[ i ].update( this.systems[ i ].entities[ n ], elapsed );

			if ( this.systems[ i ].postUpdate ) this.systems[ i ].postUpdate( elapsed );

		}

	}

	render( elapsed ) {

		for ( let i = 0; i < this.systems.length; i ++ ) {

			if ( this.systems[ i ].preRender ) this.systems[ i ].preRender( elapsed );

			if ( this.systems[ i ].render )
				for ( let n = 0; n < this.systems[ i ].entities.length; n ++ )
					this.systems[ i ].render( this.systems[ i ].entities[ n ], elapsed );

			if ( this.systems[ i ].postRender ) this.systems[ i ].postRender( elapsed );

		}

	}

}

export default App;
