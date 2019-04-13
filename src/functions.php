<?php

function register_menus() {
    register_nav_menus(
        array( 'main-nav' => __( 'Main Nav' ) )
    );
}
add_action( 'init', 'register_menus' );
add_theme_support( 'post-thumbnails' );
register_sidebar( array(
    'id'          => 'footer-spot',
    'name'        => 'Footer Spot',
    'description' => __( 'Spot for content in the footer.', 'text_domain' ),
) );

// Callback function to insert 'styleselect' into the $buttons array
function my_mce_buttons_2( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}

// Register our callback to the appropriate filter
add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );

// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {
	// Define the style_formats array
	$style_formats = array(
		// Each array child is a format with it's own settings
		array(
			'title' => 'Small text',
			'inline' => 'small',
			'wrapper' => false,
		)
	);
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array['style_formats'] = json_encode( $style_formats );

	return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

// Ensure that editor styles get imported to the editor as well.
add_editor_style();
