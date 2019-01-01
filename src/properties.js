
export default obj => {

	const properties = obj.constructor.properties;
	if ( ! properties ) return;
	for ( const prop of properties )
		defineProperty( obj, prop );

};

export const defineProperty = ( obj, prop ) => {

	let value;
	Object.defineProperty( obj, prop, {
		set: newValue => {

			const prevValue = value;
			value = newValue;

			const event = { field: prop, prevValue };
			obj.dispatchEvent(
				"updated" + prop[ 0 ].toUpperCase() + prop.slice( 1 ),
				event );
			obj.dispatchEvent( "updated", event );

		},
		get: () => value,
		enumerable: true
	} );

	obj[ `set${prop[ 0 ].toUpperCase()}${prop.slice( 1 )}` ] = value => {

		this[ prop ] = value;
		return this;

	};

};

export const properties = ( ...parts ) => {

	const func = ( ...parts2 ) => properties( ...parts, ...parts2 );
	Object.defineProperties( func, {
		funcs: {
			get: () => {

				const value = Object.assign(
					{},
					...parts.filter( p => typeof p !== "string" ) );
				Object.defineProperty( func, "funcs", { value } );
				return value;

			},
			configurable: true
		},
		props: {
			get: () => {

				const value = Array.from( new Set( [
					...parts.filter( p => typeof p === "string" ),
					...Object.keys( func.funcs )
				] ) );
				Object.defineProperty( func, "props", { value } );
				return value;

			},
			configurable: true
		}
	} );

	func[ Symbol.iterator ] = function*() {

		for ( const prop of func.props )
			yield prop;

	};

	return func;

};
