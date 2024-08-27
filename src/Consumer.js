import React, { useEffect } from "react";
import { useRoktLauncher } from "./Rokt.js";
import './styles/styles.css';

// Imagine this is the component for the confirmation page route
export function Consumer() {
	// Obtain the relevant attributes to pass to Rokt from an internal location
	const launcher = useRoktLauncher();
	const attributes = {
		firstname: "Jon",
		email: "jon@doe.com",
	};

	useEffect(() => {
		// Return if launcher has not been loaded yet or attributes to be passed are not yet ready
		if (!launcher) {
			return;
		}

		const selectionPromise = launcher.selectPlacements({
			attributes: attributes,
		});

		return () => {
			if (selectionPromise) {
				// When the page closes, remove all the Rokt placements
				selectionPromise.then((selection) => selection.close());
			}
		};
	}, [launcher, attributes]);

	return (
		<div id='page-wrapper'>
			<h2>Consumer Component</h2>
			<div id='rokt-placeholder-full' className='embed-box'>#rokt-placeholder-full</div>
			<div id='rokt-placeholder-right' className='embed-box'>#rokt-placeholder-right</div>
			<div id='rokt-placeholder-left' className='embed-box'>#rokt-placeholder-left</div>
		</div>
	);
}
