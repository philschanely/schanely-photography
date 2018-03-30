<?php get_header(); ?>
    <main class="flex-tile">
        <?php if (have_posts()) :?>
            <?php while(have_posts()) : the_post(); ?>
                <?php the_content(); ?>
            <?php endwhile; ?>
        <?php else : ?>
            <p>Page not found.</p>
        <?php endif; ?>
    </main>
<?php get_footer(); ?>