
import App from "../src/App.mjs";
import Component from "../src/Component.mjs";
import Entity from "../src/Entity.mjs";
// import System from "../src/System.mjs";

class ComponentA extends Component {

	constructor( data ) {

		super();

		Object.assign( this, data );

	}

}

class EntityA extends Entity {

	static get defaultData() {

		return {
			componentA: { fish: 12 }
		};

	}

	static get components() {

		return [ ComponentA ];

	}

}

const app = new App();
const entityA = new EntityA();

app.addEntity( entityA );

console.log( JSON.stringify( app, null, 2 ) );
