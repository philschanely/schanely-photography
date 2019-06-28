/*
	Adapted from Tomasz Jakut:
	- https://medium.com/content-uneditable/implementing-single-file-web-components-22adeaa0cd17
	- https://blog.comandeer.pl/assets/jednoplikowe-komponenty/loader.js
*/

window.loadComponent = ( function() {

	// #1: Fetches component definition file and parses out the pieces
	function fetchAndParse( URL ) {
		return fetch( URL ).then( ( response ) => {
			return response.text();
		} ).then( ( html ) => {
			const parser = new DOMParser();
			const document = parser.parseFromString( html, 'text/html' );
			const head = document.head;
			const template = head.querySelector( 'template' );
			const style = head.querySelector( 'style' );
			const script = head.querySelector( 'script' );

			return {
				template,
				style,
				script
			};
		} );
	}

	// #2: Extracts settings and applies them
	function getSettings( { template, style, script } ) {
		const jsFile = new Blob( [ script.textContent ], { type: 'application/javascript' } );
		const jsURL = URL.createObjectURL( jsFile );

		function getListeners( settings ) {
			return Object.entries( settings ).reduce( ( listeners, [ setting, value ] ) => {
				if ( setting.startsWith( 'on' ) ) {
					listeners[ setting[ 2 ].toLowerCase() + setting.substr( 3 ) ] = value;
				}

				return listeners;
			}, {} );
		}

		return import( jsURL ).then( ( module ) => {
			const listeners = getListeners( module.default );

			return {
				name: module.default.name,
				listeners,
				template,
				style
			}
		} );
	}

	// #3: Registers the component for use on the page
	function registerComponent( { template, style, name, listeners } ) {
		class UnityComponent extends HTMLElement {
			connectedCallback() {
				this._upcast();
				this._attachListeners();

				if (listeners.connected) {
					listeners.connected(this);
				}
			}

			_upcast() {
				const shadow = this.attachShadow( { mode: 'open' } );

				shadow.appendChild( style.cloneNode( true ) );
				shadow.appendChild( document.importNode( template.content, true ) );
			}

			_attachListeners() {
				Object.entries( listeners ).forEach( ( [ event, listener ] ) => {
					this.addEventListener( event, listener, false );
				} );
			}
		}

		return customElements.define( name, UnityComponent );
	}

	function loadComponent( URL ) {
		return fetchAndParse( URL ).then( getSettings ).then( registerComponent );
	}

	return loadComponent;
}() );
