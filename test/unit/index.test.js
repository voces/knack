
import appTest from "./app.test.js";
import eventDispatcherTest from "./EventDispatcher.test.js";

export default () => describe( "unit", () => {

	appTest();
	eventDispatcherTest();

} );
