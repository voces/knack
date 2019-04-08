
export const merge = ( target, ...sources ) => {

	for ( let i = 0; i < sources.length; i ++ )

		for ( const prop in sources[ i ] )

			if ( target[ prop ] === undefined && typeof sources[ i ][ prop ].clone === "function" )
				target[ prop ] = sources[ i ][ prop ].clone();

			else if ( typeof sources[ i ][ prop ] === "object" )

				if ( typeof target[ prop ] !== "object" ) target[ prop ] = sources[ i ][ prop ];
				else merge( target[ prop ], sources[ i ][ prop ] );

			else target[ prop ] = sources[ i ][ prop ];

	return target;

};
