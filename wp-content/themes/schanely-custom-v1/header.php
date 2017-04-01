<?php
global $post;
$post_slug=$post->post_name;
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <title>Schanely Photography | <?php wp_title(); ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <link type="text/css" rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" />
    <?php wp_head(); ?>
</head>
<body class="page-<?php echo $post_slug; ?>">
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-96126003-1', 'auto');
    ga('send', 'pageview');

</script>
<header>
    <h1><a href="<?php bloginfo('url'); ?>">Karen Schanely <small>Photography</small></a></h1>
</header>
<nav>
    <?php wp_nav_menu( array( 'theme_location' => 'main-nav', 'container' => false )); ?>
</nav>