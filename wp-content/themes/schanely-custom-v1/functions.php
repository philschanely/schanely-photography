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